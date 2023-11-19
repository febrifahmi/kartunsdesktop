import { useState, useEffect } from "react"
import { APIURLConfig } from "../../config"
import { ReadCookie, CreateStatusCookie, resizeImage, ReadCookieLocal } from "../../config/utils"
import { MdReceiptLong } from "react-icons/md";
import { ShowUsername } from '../GetUsername';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AlumDonasi = () => {

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    const [submitted, setSubmitted] = useState(false)
    const [datadonasi, setDataDonasi] = useState([])

    let cookie = ReadCookieLocal()

    const getDonasi = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.donasiendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    useEffect(() => {
        CreateStatusCookie("Manage Donasi");
        getDonasi()
            .then((isi) => {
                // console.log("Isi artikel: ",isi.articles);
                setDataDonasi(isi.donations)
            })
            .catch((err) => console.log(err))
        console.log("Setelah diisi baru", datadonasi)
    }, [submitted])

    const LogoBankJateng = () => {
        return (
            <>
                <img className="bg-slate-200 px-2" width={150} src={APIURLConfig.baseurl + "static/img/" + "Bank_Jateng_logo.png"}></img>
            </>
        )
    }

    const FormKonfirmasiTransfer = () => {
        const [namadonatur, setNamaDonatur] = useState("")
        const [bankpengirim, setBankPengirim] = useState("")
        const [jumlahdonasi, setJumlahDonasi] = useState(0)
        const [rektujuan, setRekTujuan] = useState("KartUNS Beasiswa")
        const [donasiimgurl, setDonasiImgUrl] = useState("")
        const [image, setImage] = useState()
        const [rupiahdonasi, setRupiahDonasi] = useState()

        var newFormData = new FormData();

        const handleChange = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["namadonatur"] !== undefined) {
                setNamaDonatur(newFormData["namadonatur"])
            }
            if (newFormData["bankpengirim"] !== undefined) {
                setBankPengirim(newFormData["bankpengirim"])
            }
            if (newFormData["jumlahdonasi"] !== undefined) {
                setJumlahDonasi(newFormData["jumlahdonasi"])
            }
            if (newFormData["rektujuan"] !== undefined) {
                setRekTujuan(newFormData["rektujuan"])
            }
            console.log({
                namadonatur: namadonatur,
                bankpengirim: bankpengirim,
                jumlahdonasi: jumlahdonasi,
                rektujuan: rektujuan,
                donatur_id: cookie.iduser,
            })
        }

        const handleImageChange = async (event) => {
            const file = event.target.files[0];
            const image = await resizeImage(file);
            // console.log(image);
            setDonasiImgUrl(file.name);
            setImage(image);
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            // console.log(e.target);
            console.log({
                "namadonatur": namadonatur,
                "bankpengirim": bankpengirim,
                "jumlahdonasi": parseInt(jumlahdonasi),
                "rektujuan": rektujuan,
                "donatur_id": cookie.iduser,
                "donasiimgurl": donasiimgurl,
                "file": image,
            })

            let cekdata = {
                "namadonatur": namadonatur,
                "bankpengirim": bankpengirim,
                "jumlahdonasi": parseInt(jumlahdonasi),
                "rektujuan": rektujuan,
                "donatur_id": cookie.iduser,
                "donasiimgurl": donasiimgurl,
                "file": image,
            }

            const validation = ValidateInputForm(cekdata)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.donasiendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "namadonatur": namadonatur,
                        "bankpengirim": bankpengirim,
                        "jumlahdonasi": parseInt(jumlahdonasi),
                        "rektujuan": rektujuan,
                        "donatur_id": cookie.iduser,
                        "donasiimgurl": donasiimgurl,
                        "file": image,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        return data
                    })
                    .catch((err) => console.log(err))
                if (response.code !== undefined && response.code === "success") {
                    success("Sukses mengonfirmasi bukti transfer donasi.")
                    setSubmitted(true)
                }
                return response
            } else {
                failed(validation.message)
            }
        }

        return (
            <>
                <div>
                    <div className="text-slate-900 mt-5">
                        <h3 className="font-bold text-center text-lg text-green-500 my-10">Konfirmasi Transfer Donasi</h3>
                        <form method='post'>
                            <div>
                                <div className="flex">
                                    <input className="grow rounded h-12" name="namadonatur" type={"text"} placeholder=" Nama pengirim" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="bankpengirim" type={"text"} placeholder=" Bank pengirim" onChange={handleChange} />
                            </div>
                            <div className="flex items-center pt-6">
                                <label className="text-white mr-4">Rekening tujuan:</label>
                                <select name="rektujuan" className="text-slate-600 h-10 rounded-md" onChange={handleChange} >
                                    <option value='KartUNS Beasiswa'>KartUNS Beasiswa</option>
                                    <option value='KartUNS Operasional'>KartUNS Operasional</option>
                                </select>
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="jumlahdonasi" type={"text"} placeholder={rupiahdonasi > 0 ? rupiahdonasi : " Jumlah donasi (dalam Rp., tanpa tanda titik/koma ribuan)"} onChange={handleChange} />
                            </div>
                            <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                                <div className='flex'>
                                    <label className='mr-6'>Upload image bukti transfer (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                    <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </div>
                            <input type="hidden" id="" name="adimgurl" value={donasiimgurl} ></input>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Kirim Bukti Tranfer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const DaftarDonasiSaya = (props) => {
        const data = props.data
        const [showImg, setShowImg] = useState(0)
        return (
            <>
                <hr className="border-slate-700 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar Donasi Saya</h3>
                    <div className='py-4'>
                        {data !== undefined && data.length !== 0 ?
                            data.map((item) => {
                                if (item.donatur_id == cookie.iduser) {
                                    return (
                                        <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-col gap-4 my-2 rounded-md' key={item.iddonation}>
                                            <div className='flex flex-row gap-4'>
                                                <div className='rounded-md text-green-600 flex justify-center items-center hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/12'>
                                                    <div className='flex flex-col justify-center items-center gap-2'>
                                                        <MdReceiptLong size={48} />
                                                        <button className='text-xs text-white bg-green-700 px-2 rounded-md' onClick={() => setShowImg(item.iddonation)}>Show</button>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-2 w-11/12'>
                                                    <div className='text-sm font-bold'>
                                                        {item.namadonatur}
                                                    </div>
                                                    <div className='text-xs text-slate-400'>
                                                        <span className='font-bold'>Bank pengirim:</span> {item.bankpengirim}
                                                    </div>
                                                    <div className='text-xs text-slate-400'>
                                                        <span className='font-bold'>Donasi:</span> {item.jumlahdonasi}
                                                    </div>
                                                    <div className='text-xs text-slate-400'>
                                                        <span className='font-bold'>Author:</span> <ShowUsername userid={item.donatur_id} token={cookie.token} />
                                                    </div>
                                                    <div className='text-xs text-slate-500'>
                                                        <p>Published: {item.created_at}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="buktitransfer" className="flex justify-center">
                                                {showImg === item.iddonation ?
                                                    <img width={200} src={APIURLConfig.baseurl + "static/uploads/" + item.donasiimgurl}></img>
                                                    :
                                                    ""}
                                            </div>
                                        </div>

                                    )
                                }
                            })
                            :
                            <div className="text-slate-500">Belum ada data donasi saya di dalam sistem.</div>
                        }
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="px-5 flex flex-col gap-10 my-10">
                <div className=" px-28">
                    <div className="border-[1px] border-solid border-slate-600 hover:outline hover:outline-solid hover:outline-sky-500 hover:outline-offset-2 hover:outline-[1px] hover:bg-slate-900 rounded-xl px-6 py-10">
                        <h3 className="font-bold text-center mb-4 text-green-500 text-2xl">KartUNS Beasiswa</h3>
                        <div className="flex flex-row gap-6">
                            <div className="w-2/6 flex justify-end">
                                <LogoBankJateng />
                            </div>
                            <div className="flex flex-col gap-4 text-left w-4/6">
                                <div className="">No. Rek. <span className="text-xl font-bold text-sky-500">5023129900</span></div>
                                <div>Bank Pembangunan Daerah (BPD) Jawa Tengah (Syariah)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" px-28">
                    <div className="border-[1px] border-solid border-slate-600 hover:outline hover:outline-solid hover:outline-sky-500 hover:outline-offset-2 hover:outline-[1px] hover:bg-slate-900 rounded-xl px-6 py-10">
                        <h3 className="font-bold text-center mb-4 text-yellow-500 text-2xl">KartUNS Operasional</h3>
                        <div className="flex flex-row gap-6">
                            <div className="w-2/6 flex justify-end">
                                <LogoBankJateng />
                            </div>
                            <div className="flex flex-col gap-4 text-left w-4/6">
                                <div className="">No. Rek. <span className="text-xl font-bold text-sky-500">5023129890</span></div>
                                <div>Bank Pembangunan Daerah (BPD) Jawa Tengah (Syariah)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-slate-700 mt-8 border-dotted" />
            <div className="px-44 pb-10">
                <FormKonfirmasiTransfer />
            </div>
            <div className="px-5">
                <DaftarDonasiSaya data={datadonasi} />
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