import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ReadCookieLocal, getTodayDate } from "../config/utils"
import { ShowUsername } from "./GetUsername";
import { ValidateInputForm } from "../config/formvalidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const MembershipDetail = () => {
    const [membership, setMembership] = useState()
    const [nomoranggota, setNomorAnggota] = useState("")
    const [validfrom, setValidFrom] = useState("")
    const [validthru, setValidThru] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    let cookie = ReadCookieLocal()

    const getMembership = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.webinarsendpoint + cookie.iduser, {
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

    const DetailMembershipData = () => {
        return (
            <>
                Detail membership data
            </>
        )
    }

    useEffect(() => {
        getMembership()
            .then((isi) => {
                // console.log(isi);
                setMembership(isi)
            })
            .catch((err) => console.log(err))
        console.log(membership)
    }, [submitted])

    const UpdateMembershipData = () => {
        const [alamat, setAlamat] = useState("")
        const [notelp, setNoTelp] = useState("")
        const [pekerjaan, setPekerjaan] = useState("Arsitek")
        const [perusahaan, setPerusahaan] = useState("")
        const [kantor, setKantor] = useState("")
        const [alamatkantor, setAlamatKantor] = useState("")
        const [mulaibekerja, setMulaiBekerja] = useState("")

        var newFormData = new FormData();

        const handleChange = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["alamat"] !== undefined) {
                setAlamat(newFormData["alamat"])
            }
            if (newFormData["notelp"] !== undefined) {
                setNoTelp(newFormData["notelp"])
            }
            if (newFormData["pekerjaan"] !== undefined) {
                setPekerjaan(newFormData["pekerjaan"])
            }
            if (newFormData["perusahaan"] !== undefined) {
                setPerusahaan(newFormData["perusahaan"])
            }
            if (newFormData["kantor"] !== undefined) {
                setKantor(newFormData["kantor"])
            }
            if (newFormData["alamatkantor"] !== undefined) {
                setAlamatKantor(newFormData["alamatkantor"])
            }
            if (newFormData["mulaibekerja"] !== undefined) {
                setMulaiBekerja(newFormData["mulaibekerja"])
            }
            console.log({
                nomoranggota: nomoranggota,
                validfrom: validfrom,
                validthru: validthru,
                alamat: alamat,
                notelp: notelp,
                pekerjaan: pekerjaan,
                perusahaan: perusahaan,
                kantor: kantor,
                alamatkantor: alamatkantor,
                mulaibekerja: mulaibekerja,
            })
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            // console.log(e.target);
            console.log({
                "nomoranggota": nomoranggota,
                "validfrom": getTodayDate(),
                "validthru": validthru,
                "alamat": alamat,
                "notelp": notelp,
                "pekerjaan": pekerjaan,
                "perusahaan": perusahaan,
                "kantor": kantor,
                "alamatkantor": alamatkantor,
                "mulaibekerja": mulaibekerja,
                "user_id": cookie.iduser,
            })

            let cekdata = {
                "nomoranggota": nomoranggota,
                "validfrom": validfrom,
                "validthru": validthru,
                "alamat": alamat,
                "notelp": notelp,
                "pekerjaan": pekerjaan,
                "perusahaan": perusahaan,
                "kantor": kantor,
                "alamatkantor": alamatkantor,
                "mulaibekerja": mulaibekerja,
                "user_id": cookie.iduser,
            }

            const validation = ValidateInputForm(cekdata)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.membersendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "nomoranggota": nomoranggota,
                        "validfrom": validfrom,
                        "validthru": validthru,
                        "alamat": alamat,
                        "notelp": notelp,
                        "pekerjaan": pekerjaan,
                        "perusahaan": perusahaan,
                        "kantor": kantor,
                        "alamatkantor": alamatkantor,
                        "mulaibekerja": mulaibekerja,
                        "user_id": cookie.iduser,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        return data
                    })
                    .catch((err) => console.log(err))
                if (response.code === "success") {
                    success("Sukses menambah agenda.")
                    setSubmitted(true)
                }
                return response
            } else {
                failed(validation.message)
            }
        }

        return (
            <>
                <div className="w-full">
                    <h3 className='font-bold text-center text-green-500'>Update Data Membership</h3>
                    <div className="gap-2 flex flex-col">
                        <form method="post">
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="alamat" type={"text"} placeholder={" Isikan alamat Anda saat ini"} onChange={handleChange} />
                            </div>
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="notelp" type={"text"} placeholder={" Isikan nomor telepon/WA anda saat ini"} onChange={handleChange} />
                            </div>
                            <div className="flex items-center pt-6">
                                <label className="text-white mr-4">Pekerjaan</label>
                                <select name="pekerjaan" className="text-slate-600 h-10 rounded-md" onChange={handleChange} >
                                    <option value='Arsitek'>Arsitek</option>
                                    <option value='ASN'>Aparatur Sipil Negara (PNS/PPPK)</option>
                                    <option value='Pegawai Swasta'>Pegawai Swasta</option>
                                    <option value='Pengusaha'>Pengusaha</option>
                                    <option value='Direktur Perusahaan'>Direktur Perusahaan</option>
                                    <option value='CEO'>CEO</option>
                                    <option value='Wiraswasta'>Wiraswasta</option>
                                    <option value='Akademisi'>Akademisi</option>
                                    <option value='Freelancer'>Freelancer</option>
                                    <option value='Influencer'>Influencer</option>
                                    <option value='Mahasiswa'>Mahasiswa</option>
                                    <option value='Lainnya'>Lainnya</option>
                                </select>
                            </div>
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="perusahaan" type={"text"} placeholder={" Nama perusahaan anda saat ini (isi dengan nama perusahaan/usaha/studio anda)"} onChange={handleChange} />
                            </div>
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="kantor" type={"text"} placeholder={" Nama kantor anda saat ini (isi dengan tanda - jika anda tidak bekerja di kantor pemerintah/swasta)"} onChange={handleChange} />
                            </div>
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="alamatkantor" type={"text"} placeholder={" Alamat kantor/perusahaan/studio/alamat lokasi kerja anda saat ini"} onChange={handleChange} />
                            </div>
                            <div className="flex pt-6 items-center">
                                <label className='text-white mr-4'>Tanggal mulai bekerja pertama kali</label>
                                <input className="grow rounded h-12 text-slate-500" name="mulaibekerja" type={"date"} onChange={handleChange} />
                            </div>
                            <div className='flex justify-center pt-5'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Update Membership Data</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mb-10">
                <h3 className="text-sky-500 font-bold">Data Keanggotaan/<span className="italic">Membership</span> Anda</h3>
                <div className="flex flex-row flex-nowrap gap-4 p-4 bg-slate-800 border-solid border-[1px] border-slate-700 rounded-lg my-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-slate-600 overflow-x-auto">
                    {
                        membership !== undefined && membership.length > 0 ?
                            <DetailMembershipData />
                            :
                            <UpdateMembershipData />
                    }
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