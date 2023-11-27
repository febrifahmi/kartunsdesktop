import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ReadCookieLocal, getTodayDate, getMembershipEndDate, getUserCategory, generateNomorAnggota } from "../config/utils"
import { ShowUsername } from "./GetUsername";
import { ValidateInputForm } from "../config/formvalidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";


export const MembershipDetail = () => {
    const [membership, setMembership] = useState({})
    const [nomoranggota, setNomorAnggota] = useState("")
    const [validfrom, setValidFrom] = useState("")
    const [validthru, setValidThru] = useState("")
    const [membercard, setMemberCard] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    let cookie = ReadCookieLocal()

    const today = getTodayDate()
    const duedate = getMembershipEndDate()

    const getMembership = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.membersendpoint + cookie.iduser, {
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

    const MemberCardCanvas = (props) => {
        const canvasRef = useRef(null)

        useEffect(() => {
            // draw canvas
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const cardbase = new Image();
            cardbase.src = "static/img/newmembercard.png"
            cardbase.onload = function () {
                context.drawImage(cardbase, 0, 0, props.width, props.height);
                context.font = "bold 18px sans-serif"
                context.fillStyle = "gold"
                context.fillText(cookie.name, 30, 120);
                context.fillStyle = "#3384da"
                let { width } = context.measureText(cookie.name);
                context.fillRect(30, 128, width + 10, 1);
                context.font = "bold 14px sans-serif"
                context.fillStyle = "white"
                context.fillText("Card No. " + nomoranggota, 30, 150);
                context.font = "bold 10px sans-serif"
                context.fillStyle = "#3384da"
                context.fillText("Valid Thru. " + validthru, 30, 165);
                setMemberCard(canvas.toDataURL())
            };
        }, [])

        return <canvas id="membercard" className="object-fill hover:outline hover:outline-offset-2 hover:outline-[1px] hover:outline-slate-700 rounded-2xl" ref={canvasRef} width={props.width} height={props.height} />
    }

    const DetailMembershipData = (props) => {
        const canvasRef = useRef(null);
        let data = props.data
        console.log("Data: ", data)

        const downloadMemberCard = (data) => {
            console.log("Canvas data: ", data)
            const downloadLink = document.createElement('a');
            const fileName = "KartUNS_member_card.png";
            downloadLink.href = data;
            downloadLink.download = fileName;
            console.log(downloadLink)
            downloadLink.click();
        }

        return (
            <>
                <div className="flex flex-row gap-10 w-full">
                    <div className="flex flex-col gap-4">
                        <div id="card">
                            <MemberCardCanvas width={326} height={206} />
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={() => downloadMemberCard(membercard)}>Download e-Card</button>
                        </div>
                    </div>
                    <div className="flex flex-col w-4/6 text-slate-500">
                        <div>Nomor Anggota: <span className="text-slate-400">{data.member.nomoranggota}</span></div>
                        <div>Nama: <span className="text-slate-400">{cookie.name}</span></div>
                        <div>Email: <span className="text-slate-400">{cookie.email}</span></div>
                        <div>No Telp: <span className="text-slate-400">{data.member.notelp}</span></div>
                        <div>Pekerjaan: <span className="text-slate-400">{data.member.pekerjaan}</span></div>
                        <div>Perusahaan: <span className="text-slate-400">{data.member.perusahaan}</span></div>
                        <div>Kantor: <span className="text-slate-400">{data.member.kantor}</span></div>
                        <div>Alamat Kantor: <span className="text-slate-400">{data.member.alamatkantor}</span></div>
                        <div>Mulai Bekerja: <span className="text-slate-400">{data.member.mulaibekerja}</span></div>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={""}>Edit Membership Data</button>
                        </div>
                    </div>
                </div>
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
        setNomorAnggota(generateNomorAnggota(getTodayDate().split('-').filter(Boolean).join(''), getUserCategory(), cookie.iduser))
        setValidFrom(getTodayDate())
        setValidThru(getMembershipEndDate())
        console.log(membership.member)
    }, [submitted])

    const AktifkanMembership = () => {
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
                validfrom: today,
                validthru: duedate,
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
                "validfrom": today,
                "validthru": duedate,
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
                "validfrom": today,
                "validthru": duedate,
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
                        "validfrom": today,
                        "validthru": duedate,
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
                    success("Sukses mengaktifkan keanggotaan/membership.")
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
                    <h3 className='font-bold text-center text-green-500'>Aktifkan Membership</h3>
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
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Aktifkan Membership</button>
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
                        membership.member !== undefined ?
                            <DetailMembershipData data={membership} />
                            :
                            <AktifkanMembership />
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