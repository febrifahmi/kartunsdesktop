import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ImageExist, truncate, getBase64, Purify, ReadCookieLocal } from "../config/utils"
import { MdInfoOutline, MdCheckCircle } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidateInputForm } from "../config/formvalidation";

export const LowonganCard = () => {
    const [joboffers, setJobOffers] = useState([])
    const [idlamar, setIdLamar] = useState(-1)
    const [thisoffer, setThisOffer] = useState({})
    const [datapelamar, setDataPelamar] = useState([])

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    let cookie = ReadCookieLocal()

    const getJobOffers = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.joboffersendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    const FormLamarPekerjaan = (props) => {
        const data = props.data
        const [namapelamar, setNamaPelamar] = useState("")
        const [doksuratlamaran, setDokSuratLamaran] = useState("")
        const [filesuratlamaran, setFileSuratLamaran] = useState()
        const [dokcv, setDokCv] = useState("")
        const [filecv, setFileCv] = useState()
        const [dokportofolio, setDokPortofolio] = useState("")
        const [fileportofolio, setFilePortofolio] = useState()

        var newFormData = new FormData();

        const handleChange = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["namapelamar"] !== undefined) {
                setNamaPelamar(newFormData["namapelamar"])
            }
            if (newFormData["doksuratlamaran"] !== undefined) {
                setDokSuratLamaran(newFormData["doksuratlamaran"])
            }
            if (newFormData["dokcv"] !== undefined) {
                setDokCv(newFormData["dokcv"])
            }
            if (newFormData["dokportofolio"] !== undefined) {
                setDokPortofolio(newFormData["dokportofolio"])
            }
            console.log({
                namapelamar: namapelamar,
                doksuratlamaran: doksuratlamaran,
                dokcv: dokcv,
                dokportofolio: dokportofolio,
                joboffer_id: data.idoffer,
                user_id: cookie.iduser
            })
        }

        const handleFileChange1 = async (event) => {
            const file = await event.target.files[0];
            console.log(file.name);
            setDokSuratLamaran(file.name);
            // Convert data to base64
            let pdf = await getBase64(file)
            // console.log("PDF file: ", pdf)
            setFileSuratLamaran(pdf);
        }

        const handleFileChange2 = async (event) => {
            const file = await event.target.files[0];
            console.log(file.name);
            setDokCv(file.name);
            // Convert data to base64
            let pdf = await getBase64(file)
            // console.log("PDF file: ", pdf)
            setFileCv(pdf);
        }

        const handleFileChange3 = async (event) => {
            const file = await event.target.files[0];
            console.log(file.name);
            setDokPortofolio(file.name);
            // Convert data to base64
            let pdf = await getBase64(file)
            // console.log("PDF file: ", pdf)
            setFilePortofolio(pdf);
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            console.log({
                "namapelamar": namapelamar,
                "doksuratlamaran": doksuratlamaran,
                "dokcv": dokcv,
                "dokportofolio": dokportofolio,
                "joboffer_id": data.idoffer,
                "user_id": cookie.iduser,
                "filesuratlamaran": filesuratlamaran,
                "filecv": filecv,
                "fileportofolio": fileportofolio
            })

            let cekdata = {
                "namapelamar": namapelamar,
                "doksuratlamaran": doksuratlamaran,
                "dokcv": dokcv,
                "dokportofolio": dokportofolio,
                "joboffer_id": data.idoffer,
                "user_id": cookie.iduser,
                "filesuratlamaran": filesuratlamaran,
                "filecv": filecv,
                "fileportofolio": fileportofolio
            }

            let validation = ValidateInputForm(cekdata)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.pelamarkerjasendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "namapelamar": namapelamar,
                        "doksuratlamaran": doksuratlamaran,
                        "dokcv": dokcv,
                        "dokportofolio": dokportofolio,
                        "joboffer_id": data.idoffer,
                        "user_id": cookie.iduser,
                        "filesuratlamaran": filesuratlamaran,
                        "filecv": filecv,
                        "fileportofolio": fileportofolio
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        return data
                    })
                    .catch((err) => console.log(err))
                if (response.code === "success") {
                    success("Sukses mengajukan lamaran pekerjaan.")
                } else {
                    failed("Gagal mengajukan lamaran pekerjaan. Mungkin anda sudah terdaftar!")
                }
                return response
            } else {
                failed(validation.message)
            }

        }

        return (
            <>
                <div className="w-full">
                    <div className="gap-2 flex flex-col">
                        <div className="flex flex-col gap-4 border-[1px] border-slate-700 rounded-xl p-5">
                            <div className="text-sky-500">
                                <span className="px-2 text-sm rounded-full border-[1px] border-sky-500 hover:border-none hover:bg-sky-700 hover:text-white">Form Lamar Pekerjaan {data.idoffer}</span>
                            </div>
                            <div>
                                <div className="flex flex-col gap-4">
                                    <div className="text-xl text-center font-bold text-slate-300">{data.offertitle}</div>
                                    <div className="flex justify-center w-full">
                                        <div className="">
                                            <img className="object-cover rounded-xl" src={APIURLConfig.baseurl + "static/uploads/" + data.companylogo} ></img>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row gap-2 text-sm text-slate-400">
                                            <div className="bg-slate-700 px-2 rounded-full hover:bg-slate-900">Pelaksanaan: <span>{data.startdate} s.d {data.enddate}</span></div>
                                            <div className="bg-slate-700 px-2 rounded-full hover:bg-slate-900">Salary range: <span>{data.salaryrange}</span></div>
                                            <div className="bg-slate-700 px-2 rounded-full hover:bg-slate-900">{data.offertype}</div>
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            {data.offerdesc}
                                        </div>
                                        <hr className="border-slate-700 my-2 border-dotted" />
                                        <div className="text-slate-400" dangerouslySetInnerHTML={{ __html: data.offertext ? Purify(data.offertext) : "" }}></div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-slate-700 mt-8 border-dotted" />
                            <div className="flex justify-center">
                                <form className="w-2/3" method="post">
                                    <div className="flex pt-6 items-center gap-4 text-slate-500">
                                        <input className="grow rounded h-12" name="namapelamar" type={"text"} placeholder={" Isikan nama pelamar/nama anda"} onChange={handleChange} />
                                    </div>
                                    <div className="text-slate-500 bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-slate-500 border-[1px]">
                                        <div className='flex'>
                                            <label className='text-sm mr-6'>Upload file/dokumen surat lamaran (PDF) (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                            <input type="file" name="file1" accept="application/pdf" onChange={handleFileChange1} />
                                        </div>
                                    </div>
                                    <input type="hidden" id="" name="doksuratlamaran" value={doksuratlamaran} ></input>
                                    <div className="text-slate-500 bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-slate-500 border-[1px]">
                                        <div className='flex'>
                                            <label className='text-sm mr-6'>Upload file/dokumen curriculum vitae (CV) (PDF) (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                            <input type="file" name="file2" accept="application/pdf" onChange={handleFileChange2} />
                                        </div>
                                    </div>
                                    <input type="hidden" id="" name="dokcv" value={dokcv} ></input>
                                    <div className="text-slate-500 bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-slate-500 border-[1px]">
                                        <div className='flex'>
                                            <label className='text-sm mr-6'>Upload file/dokumen portofolio anda (PDF) (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                            <input type="file" name="file3" accept="application/pdf" onChange={handleFileChange3} />
                                        </div>
                                    </div>
                                    <input type="hidden" id="" name="dokportofolio" value={dokportofolio} ></input>
                                    <div className='flex justify-center'>
                                        <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Ajukan Lamaran</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const LamaranSaya = (props) => {
        const datapelamar = props.data
        const datajoboffers = props.joboffers
        console.log("Data job offers: ", datajoboffers)
        const [lamaransaya, setLamaranSaya] = useState([])
        return (
            <>
                <div className="my-4">
                    <h3 className='font-bold text-lg text-green-500'>Daftar Lamaran Saya</h3>
                    <div className="mt-4 flex flex-col gap-2">
                        {datapelamar !== undefined && datapelamar.length > 0 ? datapelamar.map((item) =>
                            <div className="px-4 py-1 hover:bg-slate-900 rounded-full flex flex-row items-center gap-2">
                                <span className="text-slate-500"><MdCheckCircle /></span><span className="text-slate-400 hover:text-sky-500 text-sm">{item.namapelamar}</span><span className="text-red-500 text-sm"> | </span><span className="text-slate-400 hover:text-sky-500 text-sm">Lowongan:
                                    {datajoboffers !== undefined ? datajoboffers.map((lowongan) => (
                                        item.joboffer_id == lowongan.idoffer ? <span> {lowongan.offertitle}</span> : ""
                                    )) : ""
                                    }</span><span className="text-red-500 text-sm"> | </span><span className="text-slate-400 hover:text-sky-500 text-sm">Pengajuan: {item.created_at}</span><span className="text-red-500 text-sm"> | </span><span className="text-slate-400 hover:text-sky-500 text-sm">Hasil seleksi: {item.hasilseleksiakhir ? item.hasilseleksiakhir : "(belum ada hasil)"}</span>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </>
        )
    }

    const getDataLamaran = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.pelamarkerjasendpoint + cookie.iduser, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    useEffect(() => {
        getJobOffers()
            .then((isi) => {
                // console.log(isi);
                setJobOffers(isi)
            })
            .catch((err) => console.log(err))
        getDataLamaran()
            .then((isi) => {
                // console.log(isi);
                setDataPelamar(isi)
            })
            .catch((err) => console.log(err))
        console.log("Lowongan: ", joboffers.offers)
        console.log("Data pelamar :", datapelamar)
    }, [])


    return (
        <>
            <div>
                <h3 className="text-sky-500 font-bold">Daftar Tawaran Kerja/<span className="italic">Job Offers</span></h3>
                <div className="flex flex-row flex-nowrap gap-4 p-4 bg-slate-800 border-solid border-[1px] border-slate-700 rounded-lg my-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-slate-600 overflow-x-auto">
                    {
                        joboffers.offers !== undefined && joboffers.offers.length > 0 ?
                            joboffers.offers.slice(0, 10).map((item) => (
                                <div className="flex-none w-1/6">
                                    <div className="flex flex-col flex-nowrap justify-start p-2 gap-4 bg-slate-900 hover:bg-black hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md my-2" key={item.idoffer}>
                                        <div className="flex flex-col gap-4">
                                            <img className=' object-cover rounded-md w-full h-20' src={item.companylogo !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.companylogo) ? APIURLConfig.baseurl + "static/uploads/" + item.companylogo : 'static/img/noimage.png'}></img>
                                            <button className="px-2 rounded-full bg-orange-500 hover:bg-orange-700 text-white font-bold text-sm" onClick={() => {
                                                setIdLamar(item.idoffer);
                                                setThisOffer(item);
                                                console.log("This lowongan: ", thisoffer);
                                            }}>Apply</button>
                                        </div>
                                        <div className="flex flex-col text-xs gap-2">
                                            <div>{truncate(item.offertitle, 40, 8)}</div>
                                            <div className="text-slate-500">Kategori: <span className="font-bold">{item.offertype}</span></div>
                                            <div className="text-slate-500">Periode: {item.startdate} s.d {item.enddate}</div>
                                            <div className="text-slate-500 font-bold">Salary range: {item.salaryrange}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="text-slate-500 flex flex-row items-center gap-2">
                                <MdInfoOutline />
                                Belum ada data tawaran pekerjaan.
                            </div>
                    }
                </div>
                <div>
                    {thisoffer.idoffer !== undefined ?
                        <FormLamarPekerjaan data={thisoffer} /> : ""
                    }
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="">
                    {datapelamar.pelamarkerja !== undefined && datapelamar.pelamarkerja.length > 0 ?
                        <LamaranSaya data={datapelamar.pelamarkerja} joboffers={joboffers.offers} /> : ""}
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}