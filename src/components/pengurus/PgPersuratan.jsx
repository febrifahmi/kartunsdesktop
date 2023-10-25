import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';

export const PgPersuratan = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const SuratMasuk = () => {
        return (
            <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Rekam Surat Masuk</h3>
                <div className='text-slate-500 mt-5 px-6'>
                    <form method='post'>
                        <div className="flex">
                            <input className="grow rounded h-12" name="suratmasuktitle" type={"text"} placeholder=" Judul surat masuk" />
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="suratmasuknr" type={"text"} placeholder=" Nomor surat masuk" />
                        </div>
                        <div className='pb-6'>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>Silahkan tuliskan deskripsi isi surat masuk di sini serta pihak pengirimnya.</p>"
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
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const BuatSurat = () => {
        return (
            <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Buat Surat Keluar</h3>
                <div className='text-slate-500 mt-5 px-6'>
                    <form method='post'>
                        <div className="flex">
                            <input className="grow rounded h-12" name="lettertitle" type={"text"} placeholder=" Judul surat keluar" />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="letternr" type={"text"} placeholder=" Nomor surat keluar" />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="letterdesc" type={"text"} placeholder=" Deskripsi isi surat keluar" />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="kepada" type={"text"} placeholder=" Tujuan/penerima surat" />
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="kota" type={"text"} placeholder=" Kota tujuan/penerima surat" />
                        </div>
                        <div className='pb-6'>

                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>Silahkan tuliskan isi surat keluar di sini.</p>"
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
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const [selected, setSelected] = useState()

    useEffect(() => {
        CreateStatusCookie("Pengelolaan Persuratan");
    }, [])

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengelolaan Persuratan</h3>
                <div className="flex flex-col gap-2 mt-5 pb-10">
                    <div className="flex flex-row justify-center bg-slate-700 gap-6 rounded-md py-6">
                        <button className={selected === "rekam" ? "bg-slate-600 outline outline-green-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"} onClick={() => setSelected("rekam")}>Rekam Surat Masuk</button>
                        <button className={selected === "buat" ? "bg-slate-600 outline outline-sky-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-md"} onClick={() => setSelected("buat")}>Buat Surat Baru</button>
                    </div>
                    {selected === "rekam" ? <SuratMasuk /> : <BuatSurat />}
                </div>
            </div>
        </>
    )
}