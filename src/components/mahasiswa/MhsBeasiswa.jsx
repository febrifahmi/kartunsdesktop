import { useEffect, useState } from "react"
import { ReadCookieLocal, getBase64, downloadPDF } from "../../config/utils"
import { APIURLConfig } from "../../config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidateInputForm } from "../../config/formvalidation";
import DataTable, { createTheme } from 'react-data-table-component';

export const MhsBeasiswa = () => {
    const [namamahasiswa, setNamaMahasiswa] = useState("")
    const [batchbeasiswa, setBatchBeasiswa] = useState(-1)
    const [dokproposalbsw, setDokProposalBsw] = useState("")
    const [fileproposalbsw, setFileProposalBsw] = useState()
    const [dokcv, setDokCv] = useState("")
    const [filecv, setFileCv] = useState()
    const [dokportofolio, setDokPortofolio] = useState("")
    const [fileportofolio, setFilePortofolio] = useState()
    const [submitting, setSubmitting] = useState(false)
    const [pengajuanbsw, setPengajuanBsw] = useState([])

    const cookie = ReadCookieLocal()

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    const getPengajuanBsw = (userid) => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.pengajuanbeasiswaendpoint + userid, {
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

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value.trim()
        if (newFormData["namamahasiswa"] !== undefined) {
            setNamaMahasiswa(newFormData["namamahasiswa"])
        }
        if (newFormData["batchbeasiswa"] !== undefined) {
            setBatchBeasiswa(newFormData["batchbeasiswa"])
        }
        console.log({
            namamahasiswa: namamahasiswa,
            batchbeasiswa: batchbeasiswa,
            user_id: cookie.iduser
        })
    }

    const handleFileChange1 = async (event) => {
        const file = await event.target.files[0];
        console.log(file.name);
        setDokProposalBsw(file.name);
        // Convert data to base64
        let pdf = await getBase64(file)
        // console.log("PDF file: ", pdf)
        setFileProposalBsw(pdf);
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
        setSubmitting(true)
        console.log({
            "namamahasiswa": namamahasiswa,
            "batchbeasiswa": batchbeasiswa,
            "dokproposalbsw": dokproposalbsw,
            "dokcv": dokcv,
            "dokportofolio": dokportofolio,
            "user_id": cookie.iduser,
            "fileproposalbsw": fileproposalbsw,
            "filecv": filecv,
            "fileportofolio": fileportofolio
        })

        let cekdata = {
            "namamahasiswa": namamahasiswa,
            "batchbeasiswa": batchbeasiswa,
            "dokproposalbsw": dokproposalbsw,
            "dokcv": dokcv,
            "dokportofolio": dokportofolio,
            "user_id": cookie.iduser,
            "fileproposalbsw": fileproposalbsw,
            "filecv": filecv,
            "fileportofolio": fileportofolio
        }

        let validation = ValidateInputForm(cekdata)

        if (validation.message === undefined) {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.pengajuanbeasiswa + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "namamahasiswa": namamahasiswa,
                    "batchbeasiswa": batchbeasiswa,
                    "dokproposalbsw": dokproposalbsw,
                    "dokcv": dokcv,
                    "dokportofolio": dokportofolio,
                    "user_id": cookie.iduser,
                    "fileproposalbsw": fileproposalbsw,
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
                setSubmitting(false)
                success("Sukses mengajukan proposal beasiswa.")
            } else {
                failed("Gagal mengajukan proposal beasiswa. Mungkin anda sudah terdaftar!")
            }
            return response
        } else {
            failed(validation.message)
        }
    }

    const DaftarPengajuanBeasiswaSaya = (props) => {
        const databeasiswa = props.data
        console.log(databeasiswa)

        // createTheme creates a new theme named kartunsdark that overrides the build in dark theme
        createTheme('kartunsdark', {
            text: {
                primary: '#94a3b8',
                secondary: '#64748b',
            },
            background: {
                default: '#334155',
            },
            context: {
                background: '#cb4b16',
                text: '#FFFFFF',
            },
            divider: {
                default: '#1e293b',
            },
            action: {
                button: 'rgba(0,0,0,.54)',
                hover: 'rgba(0,0,0,.08)',
                disabled: 'rgba(0,0,0,.12)',
            },
        }, 'dark');

        //  Internally, customStyles will deep merges your customStyles with the default styling.
        const customStyles = {
            headCells: {
                style: {
                    fontSize: '14px',
                    justifyContent: 'center',
                    backgroundColor: '#0f172a',
                },
            },
            cells: {
                style: {
                    justifyContent: 'center',
                }
            }
        };

        const columns = [
            {
                name: "Nama mahasiswa/i",
                selector: row => row.namamahasiswa,
            },
            {
                name: "Batch beasiswa",
                selector: row => row.batchbeasiswa,
            },
            {
                name: "File proposal",
                selector: row => {
                    return (
                        <button className="bg-green-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/berkasbeasiswa/" + row.dokproposalbsw)}>Unduh</button>
                    )
                },
            },
            {
                name: "File CV",
                selector: row => {
                    return (
                        <button className="bg-orange-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/berkasbeasiswa/" + row.dokcv)}>Unduh</button>
                    )
                },
            },
            {
                name: "File Portofolio",
                selector: row => {
                    return (
                        <button className="bg-sky-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/berkasbeasiswa/" + row.dokportofolio)}>Unduh</button>
                    )
                },
            },
            {
                name: "Hasil seleksi",
                selector: row => row.hasilseleksiakhir,
            },
            {
                name: "Created",
                selector: row => {
                    return (
                        <span>
                            {
                                Intl.DateTimeFormat("id-ID", {
                                    dateStyle: 'medium',
                                    timeStyle: 'long',
                                    timeZone: 'Asia/Jakarta',
                                }).format(new Date(row.created_at))
                            }
                        </span>
                    )
                }
            },
            {
                name: "Action",
                selector: row => {
                    return (
                        <div className="flex flex-row gap-2 text-white my-1">
                            <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => console.log(row.iduser)}>Remove</button>
                        </div>
                    )
                },
            },
        ]


        return (
            <>
                <div className="">
                    <h3 className='font-bold text-lg text-green-500'>Daftar Pengajuan Beasiswa Saya</h3>
                    <div className="mt-4 flex flex-col gap-2">
                        {databeasiswa && databeasiswa.pengajuanbeasiswa !== undefined && databeasiswa.pengajuanbeasiswa.length > 0 ?
                            <div className="rounded-lg">
                                <DataTable
                                    columns={columns}
                                    data={databeasiswa.pengajuanbeasiswa}
                                    theme="kartunsdark"
                                    pagination
                                    customStyles={customStyles}
                                />
                            </div>
                            :
                            "Belum ada datanya"
                        }
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        getPengajuanBsw(cookie.iduser)
            .then((isi) => {
                setPengajuanBsw(isi)
            })
            .catch((err) => console.log(err))
        console.log("Data beasiswa: ", pengajuanbsw)
    }, [])

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengajuan Beasiswa KartUNS</h3>
                <div className="text-slate-500 mb-10">
                    <form className="w-full" method="post">
                        <div className="flex flex-row pt-6 items-center gap-4 text-slate-500">
                            <label>Nama mahasiswa/i: </label>
                            <input className="grow rounded h-12" name="namamahasiswa" type={"text"} placeholder=" Isikan nama anda/mahasiswa" onChange={handleChange} />
                        </div>
                        <div className="flex flex-row pt-6 items-center gap-4 text-slate-500">
                            <label>Batch beasiswa: </label>
                            <input className="grow rounded h-12" name="batchbeasiswa" type={"text"} placeholder=" Isikan batch beasiswa" onChange={handleChange} />
                        </div>
                        <div className="text-slate-500 bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-slate-500 border-[1px]">
                            <div className='flex'>
                                <label className='text-sm mr-6'>Upload file/dokumen surat pengajuan beasiswa (PDF) (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="file1" accept="application/pdf" onChange={handleFileChange1} />
                            </div>
                        </div>
                        <input type="hidden" id="" name="dokproposalbsw" value={dokproposalbsw} ></input>
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
                            {submitting === false ? <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Ajukan Proposal</button> : <button className='bg-slate-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' disabled>Submitting...</button>}
                        </div>
                    </form>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <DaftarPengajuanBeasiswaSaya data={pengajuanbsw} />
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