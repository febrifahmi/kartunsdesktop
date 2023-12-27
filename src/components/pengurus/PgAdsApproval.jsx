import { useState, useRef, useEffect } from "react"
import { ReadCookieLocal, resizeImage, ImageExist } from "../../config/utils";
import { APIURLConfig } from "../../config";
import { Editor } from '@tinymce/tinymce-react';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShowUsername } from "../GetUsername";

export const PgAdsApproval = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const [allads, setAllAds] = useState([])
    const [selected, setSelected] = useState("buatapproveiklan");

    const getAllAds = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.adsendpoint + "all", {
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

    let cookie = ReadCookieLocal()

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    const [adsdata, setAdsData] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [approved, setApproved] = useState(false)
    const [showadrule, setAdRule] = useState(false)

    const [judulcampaign, setJudulCampaign] = useState("")
    const [desccampaign, setDescCampaign] = useState("")
    const [campaignduration, setCampaignDuration] = useState(0)
    const [campaigntext, setCampaignText] = useState("")
    const [campaignimgurl, setCampaignImgUrl] = useState("")
    const [image, setImage] = useState()

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value.trim()
        if (newFormData["adcampaigntitle"] !== undefined) {
            setJudulCampaign(newFormData["adcampaigntitle"])
        }
        if (newFormData["adcampaigndesc"] !== undefined) {
            setDescCampaign(newFormData["adcampaigndesc"])
        }
        if (newFormData["nrdaysserved"] !== undefined) {
            setCampaignDuration(newFormData["nrdaysserved"])
        }
        if (newFormData["adcampaigntext"] !== undefined) {
            setCampaignText(newFormData["adcampaigntext"])
        }
        console.log({
            adcampaigntitle: judulcampaign,
            adcampaigndesc: desccampaign,
            adcampaigntext: campaigntext,
            adimgurl: campaignimgurl,
            nrdaysserved: campaignduration,
            advertiser_id: cookie.iduser
        })
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeImage(file);
        // console.log(image);
        setCampaignImgUrl(file.name);
        setImage(image);
    }

    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + (currentMonth + 1) + currentYear;

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "adcampaigntitle": judulcampaign,
            "adcampaigndesc": desccampaign,
            "adcampaigntext": campaigntext,
            "adimgurl": campaignimgurl,
            "nrdaysserved": campaignduration,
            "advertiser_id": cookie.iduser,
            "kodetagihan": "order_" + cookie.username + "_" + dateString,
            "file": image,
        })

        let cekdata = {
            "adcampaigntitle": judulcampaign,
            "adcampaigndesc": desccampaign,
            "adcampaigntext": campaigntext,
            "adimgurl": campaignimgurl,
            "nrdaysserved": campaignduration,
            "advertiser_id": cookie.iduser,
            "kodetagihan": "order_" + cookie.username + "_" + dateString,
            "file": image,
        }

        const validation = ValidateInputForm(cekdata)

        if (validation.message === undefined) {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.adsendpoint + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "adcampaigntitle": judulcampaign,
                    "adcampaigndesc": desccampaign,
                    "adcampaigntext": campaigntext,
                    "adimgurl": campaignimgurl,
                    "nrdaysserved": campaignduration,
                    "advertiser_id": cookie.iduser,
                    "kodetagihan": "order_" + cookie.username + "_" + dateString,
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
                success("Sukses menambahkan pemasangan iklan.")
                setSubmitted(true)
            }
            return response
        } else {
            failed(validation.message)
        }
    }

    const handleApproveAd = async (adsid) => {
        // ... submit to RestAPI using fetch api
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.adsendpoint + "update/" + adsid, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
            body: JSON.stringify({
                "is_blocked": false,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        if (response.code !== undefined && response.code === "success") {
            success("Sukses menyetujui unit iklan.")
            setApproved(true)
        }
        return response
    }

    useEffect(() => {
        getAllAds()
            .then((isi) => {
                // console.log(isi);
                setAllAds(isi)
            })
            .catch((err) => console.log(err))
        console.log("All ads: ", allads)
    }, [submitted, approved])

    return (
        <>
            <div className="px-5">
                <h3 className='font-bold text-center text-lg text-green-500'>Buat Iklan dan Persetujuan Iklan</h3>
                <div className="flex flex-col gap-2 mt-5 pb-10">
                    <div className="flex flex-row justify-center bg-slate-700 gap-6 rounded-md py-6">
                        <button className={selected === "buatapproveiklan" ? "bg-slate-600 outline outline-green-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"} onClick={() => setSelected("buatapproveiklan")}>Buat & Approve Iklan</button>
                        <button className={selected === "buattarifiklan" ? "bg-slate-600 outline outline-sky-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-md"} onClick={() => setSelected("buattarifiklan")}>Tarif Iklan</button>
                    </div>
                    {selected === "buatapproveiklan" ? "" : ""}
                    {selected === "buattarifiklan" ? "" : ""}
                </div>
                <div className='py-4'>
                    <div className="text-slate-900 mt-5">

                        <form method='post'>
                            <div>
                                <div className="flex">
                                    <input className="grow rounded h-12" name="adcampaigntitle" type={"text"} placeholder=" Judul kampanye iklan (ads campaign)" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex py-6">
                                <input className="grow rounded h-12" name="adcampaigndesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi iklan" onChange={handleChange} />
                            </div>
                            <div className="flex items-center pb-6">
                                <label className="text-white mr-4">Durasi iklan</label>
                                <select name="nrdaysserved" className="text-slate-600 h-10 rounded-md" onChange={handleChange} >
                                    <option value={7}>7 hari</option>
                                    <option value={14}>14 hari</option>
                                    <option value={30}>1 bulan</option>
                                    <option value={60}>2 bulan</option>
                                    <option value={90}>3 bulan</option>
                                    <option value={180}>6 bulan</option>
                                    <option value={360}>12 bulan</option>
                                    <option value={720}>24 bulan</option>
                                </select>
                            </div>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>Silahkan tuliskan isi/muatan iklan anda di sini. Perhatikan ketentuan yang berlaku.</p>"
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink',
                                        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                        'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={(newText) => setCampaignText(newText)}
                            />
                            <input type="hidden" id="adcampaigntext" name="adcampaigntext" value={campaigntext}></input>
                            <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                                <div className='flex'>
                                    <label className='mr-6'>Upload logo perusahaan/gambar iklan (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                    <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </div>
                            <input type="hidden" id="" name="adimgurl" value={image}></input>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm mt-4 mb-8' onClick={handleSubmit}>Pasang Iklan</button>
                            </div>
                        </form>
                        <div className='text-xs text-slate-500 italic'>*) Pengajuan iklan sesuai dengan <span className='font-bold underline text-sky-500' onClick={() => {
                            if (showadrule === false) {
                                setAdRule(true)
                            } else {
                                setAdRule(false)
                            }
                        }
                        }>persyaratan, peraturan, dan ketentuan yang berlaku</span>. Isi iklan sepenuhnya merupakan taggungjawab pembuat iklan.</div>
                        {showadrule ?
                            <div className='my-4 text-xs text-slate-400 border-[1px] border-slate-500 p-6 rounded-lg bg-slate-700'>
                                <h4 className='text-xs'>Ketentuan pemasangan iklan di dalam aplikasi KartUNS:</h4>
                                <ol className='list-decimal pl-4'>
                                    <li>Iklan tidak boleh mengandung unsur ujaran kebencian terhadap SARA.</li>
                                    <li>Iklan tidak boleh mengandung unsur pornografi.</li>
                                    <li>Iklan tidak boleh mengandung unsur politik.</li>
                                    <li>Iklan tidak boleh mengandung unsur lainnya yang bertentangan dengan hukum yang berlaku di wilayah Republik Indonesia.</li>
                                    <li>Waktu mulai penayangan iklan dihitung otomatis sejak unit iklan yang diajukan disetujui.</li>
                                    <li>Keputusan menyetujui atau menolak pemasangan iklan sepenuhnya dipegang oleh pengelola KartUNS.</li>
                                    <li>Pengembalian dana pemasangan iklan untuk pengajuan iklan yang ditolak mengikuti ketentuan yang ditetapkan oleh pengelola KartUNS.</li>
                                </ol>
                            </div>
                            :
                            ""}
                    </div>
                    <hr className="border-slate-700 mt-8 border-dotted" />
                    <div className="my-4">
                        <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Persetujuan Iklan yang Diajukan User KartUNS</h3>
                        <div className='py-4'>
                            {
                                allads.ads !== undefined && allads.ads.length > 0 ?
                                    allads.ads.map((item) => (
                                        <form method="put">
                                            <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-row gap-4 my-2 rounded-md' key={item.idad}>
                                                <div className='w-5/6 flex flex-row gap-4'>
                                                    <div className='rounded-md flex hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/6'>
                                                        <img className='object-fill rounded-md' src={item.adimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.adimgurl) ? APIURLConfig.baseurl + "static/uploads/" + item.adimgurl : APIURLConfig.baseurl + 'static/img/noimage.png'}></img>
                                                    </div>
                                                    <div className='flex flex-col gap-2 w-5/6'>
                                                        <div className='text-sm font-bold'>
                                                            {item.adcampaigntitle}
                                                        </div>
                                                        <div className='text-xs text-slate-400'>
                                                            {item.adcampaigndesc}
                                                        </div>
                                                        <div className='text-xs text-slate-400'>
                                                            <span className='font-bold'>Author:</span> <ShowUsername userid={item.advertiser_id} token={cookie.token} />
                                                        </div>
                                                        <div className='text-xs text-slate-500'>
                                                            <p>Published: {item.created_at}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-1/6 flex flex-col gap-4 justify-center items-center align-middle'>
                                                    {
                                                        item.is_paid ?
                                                            <div className='flex flex-col gap-2'>
                                                                <div className='bg-green-600 px-2 rounded font-bold text-sm'>Lunas</div>
                                                            </div>
                                                            :
                                                            <div className='flex flex-col gap-2'>
                                                                <button className='bg-orange-500 hover:bg-orange-600 px-2 rounded font-bold text-sm'>Belum Lunas</button>
                                                            </div>
                                                    }
                                                    {
                                                        item.is_blocked === true && item.is_paid === true ?
                                                            <div className='flex flex-col gap-2'>
                                                                <button className='bg-green-600 px-2 rounded font-bold text-sm' onClick={() => handleApproveAd(item.idad)}>Approve</button>
                                                            </div>
                                                            :
                                                            item.is_blocked === true && item.advertiser_id != cookie.iduser ?
                                                                <div className='flex flex-col gap-2'>
                                                                    <button className='bg-slate-600 px-2 rounded font-bold text-sm' disabled>Approve</button>
                                                                </div>
                                                                :
                                                                item.is_blocked !== false ?
                                                                    <div className='flex flex-col gap-2'>
                                                                        <button className='bg-green-600 px-2 rounded font-bold text-sm' onClick={() => handleApproveAd(item.idad)}>Approve</button>
                                                                    </div>
                                                                    :
                                                                    <div className="text-xs border-[1px] border-sky-500 border-solid px-2 rounded-full text-sky-500">Sudah tayang</div>
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    ))
                                    :
                                    "Belum ada data ads"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}