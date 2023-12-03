import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { ReadCookieLocal, getTodayDate, getMembershipEndDate, getUserCategory, generateNomorAnggota, resizeImage } from "../config/utils"
import { ShowUsername } from "./GetUsername";
import { ValidateInputForm } from "../config/formvalidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import { EditMemberData } from "./MembershipEdit";
import QRCode from 'qrcode'
import { MdReceiptLong } from "react-icons/md";


export const MembershipDetail = () => {
    const [membership, setMembership] = useState({})
    const [iuran, setIuran] = useState({})
    const [nomoranggota, setNomorAnggota] = useState("")
    const [validfrom, setValidFrom] = useState("")
    const [validthru, setValidThru] = useState("")
    const [membercard, setMemberCard] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [editmember, setEditMember] = useState(false)

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
                // console.log(data);
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
            const qrcode = new Image();
            QRCode.toDataURL(nomoranggota)
                .then(url => {
                    qrcode.src = url
                })
                .catch(err => {
                    console.error(err)
                })
            const cardbase = new Image();
            cardbase.src = "static/img/newmembercard.png"
            cardbase.onload = function () {
                context.drawImage(cardbase, 0, 0, props.width, props.height);
                context.font = "bold 22px sans-serif"
                context.fillStyle = "gold"
                context.fillText(cookie.name, 40, 170);
                context.fillStyle = "#3384da"
                let { width } = context.measureText(cookie.name);
                context.fillRect(40, 180, width + 10, 1);
                context.font = "bold 16px sans-serif"
                context.fillStyle = "white"
                context.fillText("Card No. " + nomoranggota, 40, 203);
                context.font = "bold 12px sans-serif"
                context.fillStyle = "#3384da"
                context.fillText("Valid Thru. " + validthru, 40, 220);
                context.drawImage(qrcode, 290, 140, 96, 96)
                setMemberCard(canvas.toDataURL())
            };
        }, [])

        return <canvas id="membercard" className="object-fill hover:outline hover:outline-offset-2 hover:outline-[1px] hover:outline-slate-700 rounded-2xl" ref={canvasRef} width={props.width} height={props.height} />
    }

    const DetailMembershipData = (props) => {
        const canvasRef = useRef(null);
        let data = props.data
        // console.log("Data: ", data)

        const downloadMemberCard = (data) => {
            // console.log("Canvas data: ", data)
            const downloadLink = document.createElement('a');
            const fileName = "KartUNS_member_card.png";
            downloadLink.href = data;
            downloadLink.download = fileName;
            // console.log(downloadLink)
            downloadLink.click();
        }

        return (
            <>
                <div className="flex flex-row gap-10 w-full">
                    <div className="flex flex-col gap-4">
                        <div id="card">
                            <MemberCardCanvas width={432} height={273} />
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={() => downloadMemberCard(membercard)}>Download e-Card</button>
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
        if (nomoranggota === undefined || nomoranggota === "") {
            setNomorAnggota(generateNomorAnggota(getTodayDate().split('-').filter(Boolean).join(''), getUserCategory(), cookie.iduser))
            setValidFrom(getTodayDate())
            setValidThru(getMembershipEndDate())
        } else if (nomoranggota !== undefined && nomoranggota !== "") {
            if (membership.member.hasOwnProperty("nomoranggota") && membership.member.hasOwnProperty("validfrom") && membership.member.hasOwnProperty("validthru")) {
                setNomorAnggota(membership.member.nomoranggota)
                setValidFrom(membership.member.validfrom)
                setValidThru(membership.member.validthru)
            }
        }
        getIuran()
            .then((isi) => {
                // console.log("Data Iuran res: ",isi);
                setIuran(isi)
            })
            .catch((err) => console.log(err))
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
                        // console.log(data);
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

    const LogoBankJateng = () => {
        return (
            <>
                <img className="bg-slate-200 px-2" width={150} src={APIURLConfig.baseurl + "static/img/" + "Bank_Jateng_logo.png"}></img>
            </>
        )
    }

    const FormKonfirmasiTransfer = () => {
        const [nomoranggota, setNomorAnggota] = useState("")
        const [namaanggota, setNamaAnggota] = useState("")
        const [tahun, setTahun] = useState("")
        const [jumlahiuran, setJumlahIuran] = useState(0)
        const [bankpengirim, setBankPengirim] = useState("")
        const [iuranimgurl, setIuranImgUrl] = useState("")
        const [image, setImage] = useState(null)

        var newFormData = new FormData();

        const handleChange = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["nomoranggota"] !== undefined) {
                setNomorAnggota(newFormData["nomoranggota"])
            }
            if (newFormData["namaanggota"] !== undefined) {
                setNamaAnggota(newFormData["namaanggota"])
            }
            if (newFormData["tahun"] !== undefined) {
                setTahun(newFormData["tahun"])
            }
            if (newFormData["jumlahiuran"] !== undefined) {
                setJumlahIuran(newFormData["jumlahiuran"])
            }
            if (newFormData["bankpengirim"] !== undefined) {
                setBankPengirim(newFormData["bankpengirim"])
            }
            if (newFormData["iuranimgurl"] !== undefined) {
                setIuranImgUrl(newFormData["iuranimgurl"])
            }
            console.log({
                nomoranggota: nomoranggota,
                namaanggota: namaanggota,
                tahun: tahun,
                jumlahiuran: jumlahiuran,
                bankpengirim: bankpengirim,
                iuranimgurl: iuranimgurl,
                member_id: membership.member.idmember,
                user_id: cookie.iduser,
            })
        }

        const handleImageChange = async (event) => {
            const file = event.target.files[0];
            const image = await resizeImage(file);
            // console.log(image);
            setIuranImgUrl(file.name);
            // console.log("Image: ", iuranimgurl)
            setImage(image);
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            // console.log(e.target);
            console.log({
                "nomoranggota": nomoranggota,
                "namaanggota": namaanggota,
                "tahun": tahun,
                "jumlahiuran": parseInt(jumlahiuran),
                "bankpengirim": bankpengirim,
                "iuranimgurl": iuranimgurl,
                "member_id": membership.member.idmember,
                "user_id": cookie.iduser,
                "file": image,
            })

            let cekdata = {
                "nomoranggota": nomoranggota,
                "namaanggota": namaanggota,
                "tahun": tahun,
                "jumlahiuran": parseInt(jumlahiuran),
                "bankpengirim": bankpengirim,
                "iuranimgurl": iuranimgurl,
                "member_id": membership.member.idmember,
                "user_id": cookie.iduser,
                "file": image,
            }

            const validation = ValidateInputForm(cekdata)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.iuranmembersendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "nomoranggota": nomoranggota,
                        "namaanggota": namaanggota,
                        "tahun": tahun,
                        "jumlahiuran": parseInt(jumlahiuran),
                        "bankpengirim": bankpengirim,
                        "iuranimgurl": iuranimgurl,
                        "member_id": membership.member.idmember,
                        "user_id": cookie.iduser,
                        "file": image,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log(data);
                        return data
                    })
                    .catch((err) => console.log(err))
                if (response.code !== undefined && response.code === "success") {
                    success("Sukses mengonfirmasi bukti transfer iuran anggota.")
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
                        <h3 className="font-bold text-center text-lg text-green-500 my-10">Konfirmasi Transfer Iuran Anggota</h3>
                        <form method='post'>
                            <div>
                                <div className="flex">
                                    <input className="grow rounded h-12" name="nomoranggota" type={"text"} placeholder=" Nomor anggota" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="namaanggota" type={"text"} placeholder=" Nama anggota" onChange={handleChange} />
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="tahun" type={"text"} placeholder=" Tahun keanggotaan" onChange={handleChange} />
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="jumlahiuran" type={"text"} placeholder={jumlahiuran > 0 ? jumlahiuran : " Jumlah iuran (dalam Rp., tanpa tanda titik/koma ribuan)"} onChange={handleChange} />
                            </div>
                            <div className="flex items-center pt-6">
                                <label className="text-white mr-4">Bank pengirim:</label>
                                <select name="bankpengirim" className="text-slate-600 h-10 rounded-md" onChange={handleChange} >
                                    <option value='Bank Jateng'>Bank Jateng</option>
                                    <option value='Mandiri'>Bank Mandiri</option>
                                    <option value='Bank Permata'>Bank Permata</option>
                                    <option value='BCA'>BCA</option>
                                    <option value='BNI'>BNI</option>
                                    <option value='BRI'>BRI</option>
                                    <option value='BSI'>BSI</option>
                                    <option value='BTN'>BTN</option>
                                    <option value='Lainnya'>Lainnya</option>
                                </select>
                            </div>
                            <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                                <div className='flex'>
                                    <label className='mr-6'>Upload image bukti transfer (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                    <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </div>
                            <input type="hidden" id="" name="iuranimgurl" value={iuranimgurl} ></input>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Kirim Bukti Tranfer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const getIuran = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.iuranmembersendpoint + cookie.iduser, {
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
        // console.log("Data Iuran: ", response)
        return response
    }

    const DaftarIuranSaya = (props) => {
        const data = props.data
        console.log("Props: ", data.iuranmember)
        const [showImg, setShowImg] = useState(0)
        return (
            <>
                <hr className="border-slate-700 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar Iuran Keanggotaan Saya</h3>
                    <div className='py-4'>
                        {data.iuranmember && data.iuranmember.length !== 0 ?
                            data.iuranmember.map((item) => {
                                if (membership.member.idmember !== undefined && item.member_id == membership.member.idmember) {
                                    return (
                                        <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-col gap-4 my-2 rounded-md' key={item.iddonation}>
                                            <div className='flex flex-row gap-4'>
                                                <div className='rounded-md text-green-600 flex justify-center items-center hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/12'>
                                                    <div className='flex flex-col justify-center items-center gap-2'>
                                                        <MdReceiptLong size={48} />
                                                        <button className='text-xs text-white bg-green-700 px-2 rounded-md' onClick={() => setShowImg(item.idiuran)}>Show</button>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-2 w-11/12'>
                                                    <div className='text-sm font-bold'>
                                                        {item.nama}
                                                    </div>
                                                    <div className='text-xs text-slate-400'>
                                                        <span className='font-bold'>Bank pengirim:</span> {item.bankpengirim}
                                                    </div>
                                                    <div className='text-xs text-slate-400'>
                                                        <span className='font-bold'>Jumlah iuran:</span> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                                                            item.jumlahiuran,
                                                        )}
                                                    </div>
                                                    <div className='text-xs text-slate-400'>
                                                        <span className='font-bold'>Anggota:</span> <ShowUsername userid={item.member_id} token={cookie.token} />
                                                    </div>
                                                    <div className='text-xs text-slate-500'>
                                                        <p>Published: {item.created_at}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="buktitransfer" className="flex justify-center">
                                                {showImg === item.idiuran ?
                                                    <img width={200} src={APIURLConfig.baseurl + "static/iuranmember/" + item.iuranimgurl}></img>
                                                    :
                                                    ""}
                                            </div>
                                        </div>

                                    )
                                }
                            })
                            :
                            <div className="text-slate-500">Belum ada data iuran keanggotaan saya di dalam sistem.</div>
                        }
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
                        membership.member !== undefined && editmember === false ?
                            <DetailMembershipData data={membership} />
                            :
                            ""
                    }
                    {
                        membership.member !== undefined && editmember === true ?
                            <EditMemberData />
                            :
                            ""
                    }
                    {
                        membership.member === undefined ?
                            <AktifkanMembership />
                            :
                            ""
                    }
                </div>
                <div className='flex justify-center'>
                    <button className='bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={() => {
                        if (editmember === false) {
                            setEditMember(true)
                        } else {
                            setEditMember(false)
                        }
                    }}>{editmember === true ? <span>Cancel</span> : <span>Edit Membership Data</span>}</button>
                </div>
            </div>
            <h3 className="text-sky-500 font-bold">Iuran Keanggotaan/<span className="italic">Membership</span> Anda</h3>
            <div className="px-5 flex flex-col gap-10 my-10">
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
                    {
                        membership.member !== undefined && membership.member.idmember !== "" ?
                            <FormKonfirmasiTransfer />
                            :
                            ""
                    }
                </div>
            </div>
            {
                iuran && iuran.iuranmember !== undefined ?
                    <DaftarIuranSaya data={iuran} />
                    :
                    ""
            }
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