import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';

export const PgAnggaran = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const [selected, setSelected] = useState()

    const AnggaranBiaya = () => {
        return (
            <>
                <div className='flex flex-col bg-slate-700 rounded-md p-2 pb-10'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Anggaran Biaya</h3>
                    <div className='text-slate-500 mt-5 px-6'>
                        <p>Under Development</p>
                    </div>
                </div>
            </>
        )
    }

    const ArusKas = () => {
        return (
            <>
                <div className='flex flex-col bg-slate-700 rounded-md p-2 pb-10'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Arus Kas</h3>
                    <div className='text-slate-500 mt-5 px-6'>
                        <p>Under Development</p>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        CreateStatusCookie("Pengelolaan Anggaran");
    }, [])

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Manajemen Anggaran dan Arus Kas</h3>
                <div className="flex flex-col gap-2 mt-5 pb-10">
                    <div className="flex flex-row justify-center bg-slate-700 gap-6 rounded-md py-6">
                        <button className={selected === "rab" ? "bg-slate-600 outline outline-green-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"} onClick={() => setSelected("rab")}>Anggaran Biaya</button>
                        <button className={selected === "kas" ? "bg-slate-600 outline outline-sky-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-md"} onClick={() => setSelected("kas")}>Arus Kas</button>
                    </div>
                    {selected === "rab" ? <AnggaranBiaya /> : <ArusKas />}
                </div>
            </div>
        </>
    )
}