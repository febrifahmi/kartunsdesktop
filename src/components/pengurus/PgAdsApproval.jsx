import { useState, useRef, useEffect } from "react"
import { ReadCookieLocal, resizeImage, ImageExist, calcHargaIklan } from "../../config/utils";
import { APIURLConfig } from "../../config";
import { Editor } from '@tinymce/tinymce-react';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShowUsername } from "../GetUsername";
import DataTable, { createTheme } from 'react-data-table-component';
import { MdDelete, MdEditSquare } from "react-icons/md";

export const PgAdsApproval = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const [allads, setAllAds] = useState([])
    const [selected, setSelected] = useState("buatiklan");

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
    const [activated, setActivated] = useState(false)

    useEffect(() => {
        getAllAds()
            .then((isi) => {
                // console.log(isi);
                setAllAds(isi)
            })
            .catch((err) => console.log(err))
        console.log("All ads: ", allads)
    }, [submitted, approved])

    const FormBuatIklan = () => {
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();

        const dateString = currentDayOfMonth + (currentMonth + 1) + currentYear;

        const [showadrule, setAdRule] = useState(false)

        const [judulcampaign, setJudulCampaign] = useState("")
        const [desccampaign, setDescCampaign] = useState("")
        const [campaignduration, setCampaignDuration] = useState(0)
        const [campaigntext, setCampaignText] = useState("")
        const [campaignimgurl, setCampaignImgUrl] = useState("")
        const [adrate, setAdrate] = useState()
        const [price, setPrice] = useState(0)
        const [image, setImage] = useState()

        const getAdRates = () => {
            const response = fetch(APIURLConfig.baseurl + APIURLConfig.adratesendpoint + "all", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`,
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
                totalprice: calcHargaIklan(campaignduration, adrate),
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

        const handleSubmit = async (e) => {
            e.preventDefault()
            // console.log(e.target);
            console.log({
                "adcampaigntitle": judulcampaign,
                "adcampaigndesc": desccampaign,
                "adcampaigntext": campaigntext,
                "adimgurl": campaignimgurl,
                "nrdaysserved": campaignduration,
                "totalprice": calcHargaIklan(campaignduration, adrate),
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
                "totalprice": calcHargaIklan(campaignduration, adrate),
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
                        "totalprice": calcHargaIklan(campaignduration, adrate),
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

        useEffect(() => {
            getAdRates()
                .then((isi) => {
                    // console.log("Isi: ", isi.adrates);
                    isi.adrates.forEach(element => {
                        if (element.is_active === true) {
                            setAdrate(element)
                            console.log("Ad rate: ", element)
                        }
                    });
                    // setAdrate(isi)
                })
                .catch((err) => console.log(err))
            // console.log("Ad rate: ", adrate)
        }, [activated])

        return (
            <>
                <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Buat Unit Iklan</h3>
                    <div className='text-slate-500 mt-5 px-6'>
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
                                <div className='text-white pb-6'>
                                    <div>Perkiraan harga iklan anda: {adrate && adrate !== undefined ?
                                        <span>{parseInt(campaignduration) <= 31 && parseInt(campaignduration) >= 1 ? <span className="text-sky-500 font-bold">{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(campaignduration) * adrate.adrateperhariharian)}</span> : parseInt(campaignduration) > 31 && parseInt(campaignduration) <= 365 ? <span className="text-sky-500 font-bold">{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(campaignduration) * adrate.adrateperharibulanan)}</span> : <span className="text-sky-500 font-bold">{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(campaignduration) * adrate.adrateperharitahunan)}</span>}</span>
                                        :
                                        <span className='bg-red-500 px-2 rounded-full text-xs italic'>Belum ada rates iklan/rate belum aktif. Buat ad rates/aktifkan rate dahulu sebelum buat unit iklan!</span>}
                                    </div>
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
                    </div>
                </div>
            </>
        )
    }

    const FormAdsApproval = () => {
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

        return (
            <>
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
                                                        <span>Biaya iklan: {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.totalprice)}</span>
                                                    </div>
                                                    <div className='text-xs text-slate-400'>
                                                        <span className='font-bold'>Author:</span> <ShowUsername userid={item.advertiser_id} token={cookie.token} />
                                                    </div>
                                                    <div className='text-xs text-slate-500'>
                                                        <p>Published: {Intl.DateTimeFormat("id-ID", {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'long',
                                                            timeZone: 'Asia/Jakarta',
                                                        }).format(new Date(item.created_at))}</p>
                                                    </div>
                                                    <div className='text-xs text-slate-500'>
                                                        <p>Updated: {Intl.DateTimeFormat("id-ID", {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'long',
                                                            timeZone: 'Asia/Jakarta',
                                                        }).format(new Date(item.updated_at))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-1/6 flex flex-col gap-2 justify-center items-center align-middle'>
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
                                                {
                                                    item.is_blocked === false ?
                                                        <div className='flex flex-col gap-2'>
                                                            <button className='bg-red-500 px-2 rounded font-bold text-sm' onClick={() => console.log(item.idad)}>Unpublish</button>
                                                        </div>
                                                        :
                                                        ""
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
            </>
        )
    }

    const FormTarifIklan = () => {
        const [adratetitle, setAdRateTitle] = useState("")
        const [adrateharian, setAdRateHarian] = useState("")
        const [adratebulanan, setAdRateBulanan] = useState("")
        const [adratetahunan, setAdRateTahunan] = useState("")
        const [adrate, setAdrate] = useState([])

        const getAdRates = () => {
            const response = fetch(APIURLConfig.baseurl + APIURLConfig.adratesendpoint + "all", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`,
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
            if (newFormData["adratetitle"] !== undefined) {
                setAdRateTitle(newFormData["adratetitle"])
            }
            if (newFormData["adrateharian"] !== undefined) {
                setAdRateHarian(newFormData["adrateharian"])
            }
            if (newFormData["adratebulanan"] !== undefined) {
                setAdRateBulanan(newFormData["adratebulanan"])
            }
            if (newFormData["adratetahunan"] !== undefined) {
                setAdRateTahunan(newFormData["adratetahunan"])
            }
            console.log({
                adratetitle: adratetitle,
                adrateperhariharian: adrateharian,
                adrateperharibulanan: adratebulanan,
                adrateperharitahunan: adratetahunan,
                manager_id: cookie.iduser
            })
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            // console.log(e.target);
            console.log({
                "adratetitle": adratetitle,
                "adrateperhariharian": adrateharian,
                "adrateperharibulanan": adratebulanan,
                "adrateperharitahunan": adratetahunan,
                "manager_id": cookie.iduser,
            })

            let cekdata = {
                "adratetitle": adratetitle,
                "adrateperhariharian": adrateharian,
                "adrateperharibulanan": adratebulanan,
                "adrateperharitahunan": adratetahunan,
                "manager_id": cookie.iduser,
            }

            const validation = ValidateInputForm(cekdata)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.adratesendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "adratetitle": adratetitle,
                        "adrateperhariharian": adrateharian,
                        "adrateperharibulanan": adratebulanan,
                        "adrateperharitahunan": adratetahunan,
                        "manager_id": cookie.iduser,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        return data
                    })
                    .catch((err) => console.log(err))
                if (response.code !== undefined && response.code === "success") {
                    success("Sukses menambahkan tarif iklan.")
                    setSubmitted(true)
                }
                return response
            } else {
                failed(validation.message)
            }
        }

        useEffect(() => {
            getAdRates()
                .then((isi) => {
                    // console.log("Isi: ", isi.adrates);
                    // isi.adrates.forEach(element => {
                    //     if(element.is_active === true){
                    //         setAdrate(element)
                    //         console.log("Ad rate: ", adrate)
                    //     }
                    // });
                    setAdrate(isi)
                })
                .catch((err) => console.log(err))
            console.log("Ad rate: ", adrate)
        }, [activated])

        const handleActivateAdRate = async (adrateid) => {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.adratesendpoint + "update/" + adrateid, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "is_active": true,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    return data
                })
                .catch((err) => console.log(err))
            if (response && response.code !== undefined && response.code === "success") {
                success("Sukses aktivasi tarif iklan.")
                setActivated(true)
            }
            return response
        }

        const handleDeActivateAdRate = async (adrateid) => {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.adratesendpoint + "update/" + adrateid, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "is_active": false,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    return data
                })
                .catch((err) => console.log(err))
            if (response && response.code !== undefined && response.code === "success") {
                success("Sukses deaktivasi tarif iklan.")
                setActivated(true)
            }
            return response
        }

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
                    justifyContent: 'center',
                    backgroundColor: '#0f172a',
                },
            },
            cells: {
                style: {
                    justifyContent: 'center',
                }
            },
        };

        const columns = [
            {
                name: "Judul tarif",
                selector: row => row.adratetitle,
            },
            {
                name: "Tarif/hari harian",
                selector: row => Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.adrateperhariharian),
            },
            {
                name: "Tarif/hari bulanan",
                selector: row => Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.adrateperharibulanan),
            },
            {
                name: "Tarif/hari tahunan",
                selector: row => Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.adrateperharitahunan)
            },
            {
                name: "Status aktivasi",
                selector: row => {
                    if (row.is_active === true) {
                        return (
                            <spav className="px-2 rounded-full bg-green-700 text-white text-xs font-bold">aktif</spav>
                        )
                    } else {
                        return (
                            <spav className="px-2 rounded-full bg-orange-700 text-white text-xs font-bold">nonaktif</spav>
                        )
                    }
                },
            },
            {
                name: "Created",
                selector: row => row.created_at,
            },
            {
                name: "Action",
                selector: row => {
                    return (
                        <div className="flex flex-col gap-2 text-white my-1">
                            {row.is_active === false ? <button className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg" onClick={() => handleActivateAdRate(row.idadrate)}>Aktifkan</button> : <button className="p-2 bg-slate-500 rounded-lg" onClick={() => console.log(row.idadrate)} disabled>Aktifkan</button>}
                            {row.is_active === true ? <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => handleDeActivateAdRate(row.idadrate)}>Non-aktifkan</button> : <button className="p-2 bg-slate-500 rounded-lg" onClick={() => console.log(row.idadrate)} disabled>Non-aktifkan</button>}
                        </div>
                    )
                },
            },
        ]

        return (
            <>
                <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Tentukan Tarif Iklan</h3>
                    <div className='text-slate-500 mt-5 px-6'>
                        <form method='post'>
                            <div className="flex pb-6">
                                <input className="grow rounded h-12" name="adratetitle" type={"text"} placeholder=" Judul tarif iklan (buat judul yang memudahkan mengenali tarif iklan)" onChange={handleChange} />
                            </div>
                            <div className="flex pb-6">
                                <input className="grow rounded h-12" name="adrateharian" type={"text"} placeholder=" Tarif iklan (Rp) per hari untuk iklan harian (<= 31 hari tayang)" onChange={handleChange} />
                            </div>
                            <div className="flex pb-6">
                                <input className="grow rounded h-12" name="adratebulanan" type={"text"} placeholder=" Tarif iklan (Rp) per hari untuk iklan > 31 hari tayang s.d 365 hari tayang" onChange={handleChange} />
                            </div>
                            <div className="flex pb-6">
                                <input className="grow rounded h-12" name="adratetahunan" type={"text"} placeholder=" Tarif iklan (Rp) per hari untuk iklan > 365 hari tayang" onChange={handleChange} />
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm mt-4 mb-8' onClick={handleSubmit}>Buat Tarif Iklan</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div>
                    <h3 className='font-bold text-lg text-green-500 pt-6'>Aktifkan Tarif Iklan</h3>
                    {adrate && adrate.adrates !== undefined && adrate.adrates.length > 0 ?
                        <div className="py-4 rounded-lg">
                            <DataTable
                                columns={columns}
                                data={adrate.adrates}
                                theme="kartunsdark"
                                pagination
                                customStyles={customStyles}
                            />
                        </div>
                        :
                        ""
                    }
                </div>
            </>
        )
    }

    return (
        <>
            <div className="px-5">
                <h3 className='font-bold text-center text-lg text-green-500'>Buat Iklan dan Persetujuan Iklan</h3>
                <div className="flex flex-col gap-2 mt-5 pb-10">
                    <div className="flex flex-row justify-center bg-slate-700 gap-6 rounded-md py-6">
                        <button className={selected === "buatiklan" ? "bg-slate-600 outline outline-green-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"} onClick={() => setSelected("buatiklan")}>Buat Iklan</button>
                        <button className={selected === "approveiklan" ? "bg-slate-600 outline outline-sky-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-md"} onClick={() => setSelected("approveiklan")}>Tinjau & Setujui Iklan</button>
                        <button className={selected === "buattarifiklan" ? "bg-slate-600 outline outline-orange-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-md"} onClick={() => setSelected("buattarifiklan")}>Tarif Iklan</button>
                    </div>
                    {selected === "buatiklan" ? <FormBuatIklan /> : ""}
                    {selected === "approveiklan" ? <FormAdsApproval /> : ""}
                    {selected === "buattarifiklan" ? <FormTarifIklan /> : ""}
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