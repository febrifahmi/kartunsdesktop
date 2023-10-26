import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie, ReadCookie, resizeImage } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';

export const PgAgenda = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookie()

    const [agenda, setAgenda] = useState([]);
    const [judulagenda, setJudulAgenda] = useState("");
    const [descagenda, setDescAgenda] = useState("");
    const [agendatext, setAgendaText] = useState("");
    const [agendaimgurl, setAgendaImgUrl] = useState("");
    const [image, setImage] = useState()

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




    useEffect(() => {
        CreateStatusCookie("Manage Agenda KartUNS");
        getAgenda()
            .then((isi) => {
                // console.log(isi);
                setAgenda(isi)
            })
            .catch((err) => console.log(err))
        console.log(agenda.agendas)
    }, [])

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengaturan Agenda KartUNS</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex">
                                <input className="grow rounded h-12" name="judul" type={"text"} placeholder=" Judul agenda" />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="agendadesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi agenda" />
                        </div>
                        <div className="flex pb-6 items-center">
                            <label className='text-white mr-4'>Tanggal mulai</label>
                            <input className="grow rounded h-12" name="tanggalmulai" type={"date"} />
                        </div>
                        <div className="flex pb-6 items-center">
                            <label className='text-white mr-4'>Tanggal selesai</label>
                            <input className="grow rounded h-12" name="tanggalselesai" type={"date"} />
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
                        />
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={""}>Create Agenda</button>
                        </div>
                    </form>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Agenda KartUNS</h3>
                    <div className='py-4'>
                        {agenda.agendas !== undefined && agenda.agendas.length !== 0 ? agenda.agendas.map((item) => (
                            <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-row gap-4 my-2 rounded-md' key={item.idagenda}>
                                <div>
                                    <img className='object-fill rounded-md' src={item.agendaimgurl !== undefined || item.agendaimgurl !== null ? item.agendaimgurl : 'static/img/noimage.png'}></img>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-sm font-bold'>
                                        {item.judul}
                                    </div>
                                    <div className='text-xs text-slate-400'>
                                        {item.agendadesc}
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
        </>
    )
}