import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie, ReadCookie, ReadCookieLocal, resizeImage, ImageExist } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';
import { ShowUsername } from '../GetUsername';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PgAgenda = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    let cookie = ReadCookieLocal()

    const [agenda, setAgenda] = useState([]);
    const [judulagenda, setJudulAgenda] = useState("");
    const [descagenda, setDescAgenda] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [agendatext, setAgendaText] = useState("");
    const [agendaimgurl, setAgendaImgUrl] = useState("");
    const [image, setImage] = useState()
    const [submitted, setSubmitted] = useState(false)

    const getAgenda = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.agendaendpoint + "all", {
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

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value.trim()
        if (newFormData["judul"] !== undefined) {
            setJudulAgenda(newFormData["judul"])
        }
        if (newFormData["agendadesc"] !== undefined) {
            setDescAgenda(newFormData["agendadesc"])
        }
        if (newFormData["tanggalmulai"] !== undefined) {
            setStartDate(newFormData["tanggalmulai"])
        }
        if (newFormData["tanggalselesai"] !== undefined) {
            setEndDate(newFormData["tanggalselesai"])
        }
        console.log({
            judul: judulagenda,
            agendadesc: descagenda,
            tanggalmulai: startdate,
            tanggalselesai: enddate,
            agendatext: agendatext,
            agendaimgurl: agendaimgurl,
            author_id: cookie.iduser,
        })
    }

    useEffect(() => {
        CreateStatusCookie("Manage Agenda KartUNS");
        getAgenda()
            .then((isi) => {
                // console.log(isi);
                setAgenda(isi)
            })
            .catch((err) => console.log(err))
        console.log(agenda.agendas)
    }, [submitted])

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeImage(file);
        // console.log(image);
        setAgendaImgUrl(file.name);
        setImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "judul": judulagenda,
            "agendadesc": descagenda,
            "tanggalmulai": startdate,
            "tanggalselesai": enddate,
            "agendatext": agendatext,
            "agendaimgurl": agendaimgurl,
            "file": image,
            "author_id": cookie.iduser,
        })

        let cekdata = {
            "judul": judulagenda,
            "agendadesc": descagenda,
            "tanggalmulai": startdate,
            "tanggalselesai": enddate,
            "agendatext": agendatext,
            "agendaimgurl": agendaimgurl,
            "file": image,
            "author_id": cookie.iduser,
        }

        const validation = ValidateInputForm(cekdata)

        if (validation.message === undefined) {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.agendaendpoint + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "judul": judulagenda,
                    "agendadesc": descagenda,
                    "tanggalmulai": startdate,
                    "tanggalselesai": enddate,
                    "agendatext": agendatext,
                    "agendaimgurl": agendaimgurl,
                    "file": image,
                    "author_id": cookie.iduser,
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
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengaturan Agenda KartUNS</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex">
                                <input className="grow rounded h-12" name="judul" type={"text"} placeholder=" Judul agenda" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="agendadesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi agenda" onChange={handleChange} />
                        </div>
                        <div className="flex pb-6 items-center">
                            <label className='text-white mr-4'>Tanggal mulai</label>
                            <input className="grow rounded h-12" name="tanggalmulai" type={"date"} onChange={handleChange} />
                        </div>
                        <div className="flex pb-6 items-center">
                            <label className='text-white mr-4'>Tanggal selesai</label>
                            <input className="grow rounded h-12" name="tanggalselesai" type={"date"} onChange={handleChange} />
                        </div>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>Silahkan tuliskan isi agenda terbaru KartUNS di sini.</p>"
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
                            onEditorChange={(newText) => setAgendaText(newText)}
                        />
                        <input type="hidden" id="agendatext" name="agendatext" value={agendatext}></input>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload gambar agenda (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                        <input type="hidden" id="" name="agendaimgurl" value={agendaimgurl}></input>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Create Agenda</button>
                        </div>
                    </form>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Agenda KartUNS</h3>
                    <div className='py-4'>
                        {agenda.agendas !== undefined && agenda.agendas.length !== 0 ? agenda.agendas.slice(0, 10).map((item) => (
                            <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-row gap-4 my-2 rounded-md' key={item.idagenda}>
                                <div className='rounded-md flex hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/6'>
                                    <img className='object-fill rounded-md' src={item.agendaimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.agendaimgurl) ? APIURLConfig.baseurl + "static/uploads/" + item.agendaimgurl : 'static/img/noimage.png'}></img>
                                </div>
                                <div className='flex flex-col gap-2 w-5/6'>
                                    <div className='text-sm font-bold'>
                                        {item.judul}
                                    </div>
                                    <div className='text-xs text-slate-400'>
                                        {item.agendadesc}
                                    </div>
                                    <div className='text-xs text-slate-400'>
                                        <span className='font-bold'>Waktu pelaksanaan: </span>{item.tanggalmulai} s.d {item.tanggalselesai}
                                    </div>
                                    <div className='text-xs text-slate-400'>
                                        <span className='font-bold'>Author:</span> <ShowUsername userid={item.author_id} token={cookie.token} />
                                    </div>
                                    <div className='text-xs text-slate-500'>
                                        <p>Published: {item.created_at}</p>
                                    </div>
                                </div>

                            </div>
                        ))
                            :
                            <div className=''>Belum ada agenda yang tercatat di dalam database.</div>}
                    </div>
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