import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookieLocal, ReadCookie, ReadCookieLocal, resizeImage, ImageExist } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';
import { ShowUsername } from '../GetUsername';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PgPengumuman = (props) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const status = props.status

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    let cookie = ReadCookieLocal()

    const [pengumuman, setPengumuman] = useState([]);
    const [judulpengumuman, setJudulPengumuman] = useState("");
    const [descpengumuman, setDescPengumuman] = useState("");
    const [pengumumantext, setPengumumanText] = useState("");
    const [pengumumanimgurl, setPengumumanImgUrl] = useState("");
    const [image, setImage] = useState()
    const [submitted, setSubmitted] = useState(false)

    // initialization of form submission status
    status(submitted);

    const getPengumuman = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.pengumumanendpoint + "all", {
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
        if (newFormData["judul"] !== undefined) {
            setJudulPengumuman(newFormData["judul"])
        }
        if (newFormData["pengumumandesc"] !== undefined) {
            setDescPengumuman(newFormData["pengumumandesc"])
        }
        console.log({
            judul: judulpengumuman,
            pengumumandesc: descpengumuman,
            pengumumantext: pengumumantext,
            pengumumanimgurl: pengumumanimgurl,
            author_id: cookie.iduser,
        })
    }

    useEffect(() => {
        CreateStatusCookieLocal("Pengelolaan Pengumuman KartUNS");
        getPengumuman()
            .then((isi) => {
                // console.log(isi);
                setPengumuman(isi)
            })
            .catch((err) => console.log(err))
        // console.log(pengumuman.pengumumans)
    }, [submitted])

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeImage(file);
        // console.log(image);
        setPengumumanImgUrl(file.name);
        setImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "judul": judulpengumuman,
            "pengumumandesc": descpengumuman,
            "pengumumantext": pengumumantext,
            "pengumumanimgurl": pengumumanimgurl,
            "file": image,
            "author_id": cookie.iduser,
        })

        let cekdata = {
            "judul": judulpengumuman,
            "pengumumandesc": descpengumuman,
            "pengumumantext": pengumumantext,
            "pengumumanimgurl": pengumumanimgurl,
            "file": image,
            "author_id": cookie.iduser,
        }

        const validation = ValidateInputForm(cekdata)

        if (validation.message === undefined) {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.pengumumanendpoint + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "judul": judulpengumuman,
                    "pengumumanimgurl": pengumumanimgurl,
                    "pengumumandesc": descpengumuman,
                    "pengumumantext": pengumumantext,
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
                success("Sukses menambah pengumuman baru.")
                setSubmitted(true)
                status(submitted)
            }
            return response
        } else {
            failed(validation.message)
        }
    }

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengaturan Pengumuman</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex">
                                <input className="grow rounded h-12" name="judul" type={"text"} placeholder=" Judul pengumuman" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="pengumumandesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi pengumuman" onChange={handleChange} />
                        </div>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>Silahkan tuliskan isi pengumuman terbaru KartUNS di sini.</p>"
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
                            onEditorChange={(newText) => setPengumumanText(newText)}
                        />
                        <input type="hidden" id="pengumumantext" name="pengumumantext" value={pengumumantext}></input>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload gambar pengumuman (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                        <input type="hidden" id="" name="pengumumanimgurl" value={pengumumanimgurl}></input>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Create Pengumuman</button>
                        </div>
                    </form>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Pengumuman KartUNS</h3>
                    <div className='py-4'>
                        {pengumuman.pengumumans !== undefined && pengumuman.pengumumans.length !== 0 ? pengumuman.pengumumans.map((item) => (
                            <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-row gap-4 my-2 rounded-md' key={item.idpengumuman}>
                                <div className='rounded-md flex hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/6'>
                                    <img className='object-fill rounded-md' src={item.pengumumanimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.pengumumanimgurl) ? APIURLConfig.baseurl + "static/uploads/" + item.pengumumanimgurl : 'static/img/noimage.png'}></img>
                                </div>
                                <div className='flex flex-col gap-2 w-5/6'>
                                    <div className='text-sm font-bold'>
                                        {item.judul}
                                    </div>
                                    <div className='text-xs text-slate-400'>
                                        {item.pengumumandesc}
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
                            <div className=''>Belum ada pengumuman di dalam database.</div>}
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