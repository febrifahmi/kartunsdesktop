import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';

export const PgArtikel = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const [artikel, setArtikel] = useState([]);

    const getArticles = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.articleendpoint + "all", {
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

    useEffect(() => {
        CreateStatusCookie("Manage Articles");
        getArticles()
            .then((isi) => {
                // console.log(isi);
                setArtikel(isi)
            })
            .catch((err) => console.log(err))
        console.log(artikel.articles)
    }, [])

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengaturan Artikel</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex">
                                <input className="grow rounded h-12" name="articletitle" type={"text"} placeholder=" Judul artikel" />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="articledesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi artikel" />
                        </div>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>Silahkan tuliskan isi artikel terbaru KartUNS di sini.</p>"
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
                        />
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={""}>Create Article</button>
                        </div>
                    </form>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Artikel KartUNS</h3>
                    <div className='py-4'>
                        {artikel.articles !== undefined && artikel.articles.length !== 0 ? artikel.articles.map((item) => (
                            <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-row gap-4 my-2 rounded-md' key={item.idarticle}>
                                <div>
                                    <img width={100} src={item.articleimgurl !== undefined || item.articleimgurl !== null ? item.articleimgurl:'static/img/noimage.png'}></img>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-sm font-bold'>
                                        {item.articletitle}
                                    </div>
                                    <div className='text-xs text-slate-400'>
                                        {item.articledesc}
                                    </div>
                                    <div className='text-xs text-slate-500'>
                                        <p>Published: {item.created_at}</p>
                                    </div>
                                </div>

                            </div>
                        ))
                            :
                            <div className=''>Belum ada artikel di dalam database.</div>}
                    </div>
                </div>
            </div>
        </>
    )
}