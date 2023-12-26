import { useState } from "react"
import { ReadCookieLocal, getBase64 } from "../../config/utils"
import { APIURLConfig } from "../../config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidateInputForm } from "../../config/formvalidation";

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

    const cookie = ReadCookieLocal()

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

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