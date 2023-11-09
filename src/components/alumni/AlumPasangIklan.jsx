import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ReadCookie } from '../../config/utils';

export const AlumPasangIklan = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookie()

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pasang Iklan</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex">
                                <input className="grow rounded h-12" name="adcampaigntitle" type={"text"} placeholder=" Judul kampanye iklan (ads campaign)" onChange={""} />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="adcampaigndesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi iklan" onChange={""} />
                        </div>
                        <div className="flex items-center pb-6">
                            <label className="text-white mr-4">Durasi iklan</label>
                            <select name="nrdaysserved" className="text-slate-600 h-10 rounded-md" onChange={""} >
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
                            onEditorChange={(newText) => (newText)}
                        />
                        <input type="hidden" id="adcampaigntext" name="adcampaigntext" value={""}></input>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload logo perusahaan (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="imagefile" accept="image/*" onChange={""} />
                            </div>
                        </div>
                        <input type="hidden" id="" name="adimgurl" value={""}></input>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={""}>Pasang Iklan</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}