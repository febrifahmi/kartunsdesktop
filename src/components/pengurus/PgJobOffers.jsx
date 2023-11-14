import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie, ReadCookie, resizeImage, getUserName, ReadCookieLocal } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';
import { ShowUsername } from '../GetUsername';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PgJobOffers = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookieLocal()

    const [lowongan, setLowongan] = useState([])
    const [judullowongan, setJudulLowongan] = useState("");
    const [desclowongan, setDescLowongan] = useState("");
    const [tipelowongan, setTipeLowongan] = useState("Magang");
    const [salaryrange, setSalaryRange] = useState("");
    const [lowongantext, setLowonganText] = useState("");
    const [offerimgurl, setOfferImgUrl] = useState("");
    const [image, setImage] = useState()
    const [submitted, setSubmitted] = useState(false)

    const DaftarJobOffers = (props) => {
        const data = props.data
        return (
            <>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar Penawaran Lowongan Kerja</h3>
                    <div className='py-4'>
                        {data !== undefined && data.length !== 0 ?
                            data.map((item) => (
                                <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-col gap-4 my-2 rounded-md' key={item.idoffer}>
                                    <div className='flex flex-row gap-4'>
                                        <div className='rounded-md text-red-600 flex justify-center items-center hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/12'>
                                            <div className='flex flex-col justify-center items-center gap-2'>
                                                <img className='object-fill rounded-md' src={item.companylogo !== undefined || item.companylogo !== null || item.companylogo !== "" ? APIURLConfig.baseurl + "static/uploads/" + item.companylogo : 'static/img/noimage.png'}></img>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 w-11/12'>
                                            <div className='text-sm font-bold'>
                                                {item.offertitle}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Deskripsi:</span> {item.offerdesc}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Tipe:</span> {item.offertype}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Author:</span> <ShowUsername userid={item.author_id} token={cookie.token} />
                                            </div>
                                            <div className='text-xs text-slate-500'>
                                                <p>Published: {item.created_at}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-center items-center gap-4'>
                                            <div className='flex flex-row'>
                                                <select name="approval" className="text-slate-600 rounded-md" onChange={""} >
                                                    <option value='approved'>Approve</option>
                                                    <option value='blocked'>Block</option>
                                                </select>
                                            </div>
                                            <button className='bg-sky-500 hover:bg-sky-700 rounded-md h-8 px-2'>Update</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            "Belum ada data penawaran lowongan kerja/magang di dalam sistem."
                        }
                    </div>
                </div>
            </>
        )
    }

    const getLowongan = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.joboffersendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value.trim()
        if (newFormData["offertitle"] !== undefined) {
            setJudulLowongan(newFormData["offertitle"])
        }
        if (newFormData["offerdesc"] !== undefined) {
            setDescLowongan(newFormData["offerdesc"])
        }
        if (newFormData["offertype"] !== undefined) {
            setTipeLowongan(newFormData["offertype"])
        }
        if (newFormData["salaryrange"] !== undefined) {
            setSalaryRange(newFormData["salaryrange"])
        }
        if (newFormData["offertext"] !== undefined) {
            setLowonganText(newFormData["offertext"])
        }
        console.log({
            offertitle: judullowongan,
            offerdesc: desclowongan,
            offertype: tipelowongan,
            salaryrange: salaryrange,
            offertext: lowongantext,
            offerimgurl: offerimgurl,
        })
    }

    useEffect(() => {
        CreateStatusCookie("Pengaturan Lowongan Kerja/Magang");
        getLowongan()
            .then((isi) => {
                // console.log(isi);
                setLowongan(isi)
            })
            .catch((err) => console.log(err))
        console.log(lowongan.offers)
    }, [submitted])

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeImage(file);
        // console.log(image);
        setOfferImgUrl(file.name);
        setImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "offertitle": judullowongan,
            "offerdesc": desclowongan,
            "offertype": tipelowongan,
            "salaryrange": salaryrange,
            "offertext": lowongantext,
            "companylogo": offerimgurl,
            "author_id": cookie.iduser,
            "file": image,
        })
        // ... submit to RestAPI using fetch api
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.joboffersendpoint + "create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
            body: JSON.stringify({
                "offertitle": judullowongan,
                "offerdesc": desclowongan,
                "offertype": tipelowongan,
                "salaryrange": salaryrange,
                "offertext": lowongantext,
                "companylogo": offerimgurl,
                "author_id": cookie.iduser,
                "file": image,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Penawaran Lowongan Kerja/Magang</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex">
                                <input className="grow rounded h-12" name="offertitle" type={"text"} placeholder=" Judul penawaran lowongan kerja/magang" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="offerdesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi penawaran lowongan" onChange={handleChange} />
                        </div>
                        <div className="flex items-center pb-6">
                            <label className="text-white mr-4">Tipe lowongan</label>
                            <select name="offertype" className="text-slate-600 h-10 rounded-md" onChange={handleChange} >
                                <option value='Magang'>Magang</option>
                                <option value='Kerja Part Time'>Kerja Part Time</option>
                                <option value='Kerja Full Time'>Kerja Full Time</option>
                            </select>
                        </div>
                        <div className="flex items-center pb-6">
                            <label className="text-white mr-4">Salary range</label>
                            <select name="salaryrange" className="text-slate-600 h-10 rounded-md" onChange={handleChange} >
                                <option value='< Rp 1.000.000'>&lt;1.000.000</option>
                                <option value='Rp 1.000.000 - Rp 2.500.000'>1.000.000-2.500.000</option>
                                <option value='Rp 2.500.000 - Rp 5.000.000'>2.500.000-5.000.000</option>
                                <option value='> Rp 5.000.000'>&gt;5.000.000</option>
                            </select>
                        </div>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>Silahkan tuliskan isi penawasan lowongan terbaru KartUNS di sini.</p>"
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
                            onEditorChange={(newText) => setLowonganText(newText)}
                        />
                        <input type="hidden" id="offertext" name="offertext" value={lowongantext}></input>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload gambar Logo perusahaan (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                        <input type="hidden" id="" name="companyimgurl" value={""}></input>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Create Lowongan Kerja/Magang</button>
                        </div>
                    </form>
                </div>
                <DaftarJobOffers data={lowongan.offers} />
            </div >
        </>
    )
}