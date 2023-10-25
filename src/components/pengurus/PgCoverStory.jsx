import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie, ReadCookie, resizeImage } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';

export const PgCoverStory = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookie()

    const [coverstories, setCoverStories] = useState([]);
    const [covertext, setCoverText] = useState("");
    const [coverimgurl, setCoverImgUrl] = useState("");
    const [image, setImage] = useState()

    const getCoverStories = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.coverstoryendpoint + "all", {
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
        return response
    }

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value
        newFormData["covertext"] = covertext
        newFormData["coverimgurl"] = coverimgurl
        console.log(newFormData["covertitle"], newFormData["coverdesc"], newFormData["covertext"], newFormData["coverimgurl"])
    }

    useEffect(() => {
        CreateStatusCookie("Manage Cover Story");
        getCoverStories()
            .then((isi) => {
                // console.log(isi);
                setCoverStories(isi)
            })
            .catch((err) => console.log(err))
        console.log(coverstories.covers)
    }, [])

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeImage(file);
        console.log(image);
        setCoverImgUrl(file.name);
        setImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "covertitle": newFormData["covertitle"],
            "coverdesc": newFormData["coverdesc"],
            "covertext": covertext,
            "coverimgurl": coverimgurl,
            "file": image,
        })
        // ... submit to RestAPI using fetch api
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.coverstoryendpoint + "create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
            body: JSON.stringify({
                "covertitle": newFormData["covertitle"],
                "coverdesc": newFormData["coverdesc"],
                "covertext": covertext,
                "coverimgurl": coverimgurl,
                "file": image
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
            <div className="px-5 ">
                <h3 className="font-bold text-center text-lg text-green-500">Pengaturan Cover Story</h3>
                <div className="text-slate-900 mt-5">
                    <form id='form' method='post' encType='multipart/form-data'>
                        <div className="flex">
                            <input className="grow rounded h-12" name="covertitle" type={"text"} placeholder=" Judul cover story" onChange={handleChange} />
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="coverdesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi cover story" onChange={handleChange} />
                        </div>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>Silahkan tuliskan isi <i>cover story</i> terbaru KartUNS di sini.</p>"
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
                            onEditorChange={(newText) => setCoverText(newText)}
                        />
                        <input type="hidden" id="" name="covertext" value={covertext}></input>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload gambar cover (max. <span className='text-red'>500Kb</span>)</label>
                                <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                        <input type="hidden" id="" name="coverimgurl" value={coverimgurl}></input>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Create Cover Story</button>
                        </div>
                    </form>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>KartUNS Cover Stories</h3>
                    <div className='py-4'>
                        {coverstories.covers !== undefined && coverstories.covers.length !== 0 ? coverstories.covers.map((item) => (
                            <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-row gap-4 my-2 rounded-md' key={item.idcover}>
                                <div>
                                    <img width={100} src={item.file !== undefined || item.file !== null || item.file !== "" ? item.file : 'static/img/noimage.png'} alt=''></img>
                                    {/* {item.file ? item.file : ""} */}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-sm font-bold'>
                                        {item.covertitle}
                                    </div>
                                    <div className='text-xs text-slate-400'>
                                        {item.coverdesc}
                                    </div>
                                    <div className='text-xs text-slate-500'>
                                        <p>Published: {item.created_at}</p>
                                    </div>
                                </div>

                            </div>
                        ))
                            :
                            <div className=''>Belum ada cover story di dalam database.</div>}
                    </div>
                </div>
            </div>
        </>
    )
}