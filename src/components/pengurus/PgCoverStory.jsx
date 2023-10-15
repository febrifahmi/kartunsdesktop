import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie } from '../../config/utils';

export const PgCoverStory = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    CreateStatusCookie("Manage Cover Story")

    return (
        <>
            <div className="px-5 ">
                <h3 className="font-bold text-center text-lg text-green-500">Pengaturan Cover Story</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex py-1">
                                <input className="grow rounded h-12" name="covertitle" type={"text"} placeholder=" Judul cover story" />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="coverdesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi cover story" />
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
                        />
                        <button onClick={log}>Log editor content</button>
                    </form>
                </div>
            </div>
        </>
    )
}