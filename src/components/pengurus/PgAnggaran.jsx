import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookie, ReadCookie } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';
import { MdTableView } from "react-icons/md";

export const PgAnggaran = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    let cookie = ReadCookie()

    const [selected, setSelected] = useState();
    const [anggaranrab, setAnggaranRAB] = useState([]);
    const [aruskas, setArusKas] = useState([]);

    const AnggaranBiaya = () => {
        const [judulrab, setJudulRab] = useState("");
        const [descrab, setDescRab] = useState("");
        const [tahun, setTahun] = useState("");
        const [fileraburi, setFileRabUri] = useState("");
        const [filerab, setFileRab] = useState()

        var newFormData = new FormData();

        const handleChangeRAB = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["rabtitle"] !== undefined) {
                setJudulRab(newFormData["rabtitle"])
            }
            if (newFormData["rabdesc"] !== undefined) {
                setDescRab(newFormData["rabdesc"])
            }
            if (newFormData["tahun"] !== undefined) {
                setTahun(newFormData["tahun"])
            }
            console.log({
                rabtitle: judulrab,
                rabdesc: descrab,
                tahun: tahun,
                fileraburi: fileraburi,
                file: filerab,
            })
        }

        const getBase64 = async (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const handleFileChange = async (event) => {
            const file = await event.target.files[0];
            // console.log(file);
            setFileRabUri(file.name);
            // Convert data to base64
            let xls = await getBase64(file)
            console.log("XLS file: ", xls)
            setFileRab(xls);
        }

        const handleSubmitRAB = async (e) => {
            e.preventDefault()
            console.log({
                "rabtitle": judulrab,
                "rabdesc": descrab,
                "rabyear": tahun,
                "fileraburi": fileraburi,
                "file": filerab,
            })
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.anggaranrabendpoint + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "rabtitle": judulrab,
                    "rabdesc": descrab,
                    "rabyear": tahun,
                    "fileraburi": fileraburi,
                    "file": filerab,
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
                <div className='flex flex-col bg-slate-700 rounded-md p-2 pb-10'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Rencana Anggaran Biaya</h3>
                    <div className='text-slate-500 mt-5 px-6'>
                        <form method='post'>
                            <div className="flex">
                                <input className="grow rounded h-12" name="rabtitle" type={"text"} placeholder=" Judul RAB" onChange={handleChangeRAB} />
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="rabdesc" type={"text"} placeholder=" Deskripsi singkat kegiatan/RAB" onChange={handleChangeRAB} />
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="rabyear" type={"text"} placeholder=" Tahun kegiatan" onChange={handleChangeRAB} />
                            </div>
                            <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                                <div className='flex'>
                                    <label className='mr-6'>Upload file excel RAB (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                    <input type="file" name="file" accept=".xls,.xlsx" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmitRAB}>Rekam RAB</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const DaftarRAB = (props) => {
        const data = props.data
        // const [showxls, setShowXls] = useState(0)
        return (
            <>
                <hr className="border-slate-700 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar RAB KartUNS</h3>
                    <div className='py-4'>
                        {data !== undefined && data.length !== 0 ?
                            data.anggaranrab.map((item) => (
                                <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-col gap-4 my-2 rounded-md' key={item.idrab}>
                                    <div className='flex flex-row gap-4'>
                                        <div className='rounded-md text-green-600 flex justify-center items-center hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/12'>
                                            <a href={APIURLConfig.baseurl + "static/anggaran/rab/" + item.fileraburi}>
                                                <div className='flex flex-col justify-center items-center gap-2'>
                                                    <MdTableView size={48} />
                                                    <button className='text-xs text-white bg-green-700 px-2 rounded-md'>Download</button>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='flex flex-col gap-2 w-11/12'>
                                            <div className='text-sm font-bold'>
                                                {item.rabtitle}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Deskripsi:</span> {item.rabdesc}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Tahun:</span> {item.rabyear}
                                            </div>
                                            <div className='text-xs text-slate-500'>
                                                <p>Published: {item.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            "Belum ada data RAB di dalam sistem."
                        }
                    </div>
                </div>
            </>
        )
    }

    const ArusKas = () => {
        const [judularuskas, setJudulArusKas] = useState("");
        const [descaruskas, setDescArusKas] = useState("");
        const [bulan, setBulan] = useState("");
        const [tahun, setTahun] = useState("");
        const [filekasuri, setFileKasUri] = useState("");
        const [filekas, setFileKas] = useState()

        var newFormData = new FormData();

        const handleChangeArusKas = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["aruskastitle"] !== undefined) {
                setJudulArusKas(newFormData["aruskastitle"])
            }
            if (newFormData["aruskasdesc"] !== undefined) {
                setDescArusKas(newFormData["aruskasdesc"])
            }
            if (newFormData["aruskasmonth"] !== undefined) {
                setBulan(newFormData["aruskasmonth"])
            }
            if (newFormData["aruskasyear"] !== undefined) {
                setTahun(newFormData["aruskasyear"])
            }
            console.log({
                aruskastitle: judularuskas,
                aruskasdesc: descaruskas,
                aruskasmonth: bulan,
                aruskasyear: tahun,
                filekasuri: filekasuri,
                file: filekas,
            })
        }

        const getBase64 = async (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const handleFileChange = async (event) => {
            const file = await event.target.files[0];
            // console.log(file);
            setFileKasUri(file.name);
            // Convert data to base64
            let xls = await getBase64(file)
            console.log("XLS file: ", xls)
            setFileKas(xls);
        }

        const handleSubmitKas = async (e) => {
            e.preventDefault()
            console.log({
                "aruskastitle": judularuskas,
                "aruskasdesc": descaruskas,
                "aruskasmonth": bulan,
                "aruskasyear": tahun,
                "filekasuri": filekasuri,
                "file": filekas,
            })
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.anggarankasendpoint + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "aruskastitle": judularuskas,
                    "aruskasdesc": descaruskas,
                    "aruskasmonth": bulan,
                    "aruskasyear": tahun,
                    "filekasuri": filekasuri,
                    "file": filekas,
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
                <div className='flex flex-col bg-slate-700 rounded-md p-2 pb-10'>
                    <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Laporan Arus Kas</h3>
                    <div className='text-slate-500 mt-5 px-6'>
                        <form method='post'>
                            <div className="flex">
                                <input className="grow rounded h-12" name="aruskastitle" type={"text"} placeholder=" Judul Laporan Arus Kas (e.g.: nama bulan arus kas aktif)" onChange={handleChangeArusKas} />
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="aruskasdesc" type={"text"} placeholder=" Deskripsi singkat dominasi arus kas" onChange={handleChangeArusKas} />
                            </div>
                            <div className="flex items-center pt-6">
                                <label className="text-white mr-4">Bulan kas aktif</label>
                                <select name="aruskasmonth" className="text-slate-600 h-10 rounded-md" onChange={handleChangeArusKas} >
                                    <option name="aruskasmonth" value='Januari' >Januari</option>
                                    <option name="aruskasmonth" value='Februari'>Februari</option>
                                    <option name="aruskasmonth" value='Maret'>Maret</option>
                                    <option name="aruskasmonth" value='April'>April</option>
                                    <option name="aruskasmonth" value='Mei'>Mei</option>
                                    <option name="aruskasmonth" value='Juni'>Juni</option>
                                    <option name="aruskasmonth" value='Juli'>Juli</option>
                                    <option name="aruskasmonth" value='Agustus'>Agustus</option>
                                    <option name="aruskasmonth" value='September'>September</option>
                                    <option name="aruskasmonth" value='Oktober'>Oktober</option>
                                    <option name="aruskasmonth" value='November'>November</option>
                                    <option name="aruskasmonth" value='Desember'>Desember</option>
                                </select>
                            </div>
                            <div className="flex pt-6">
                                <input className="grow rounded h-12" name="aruskasyear" type={"text"} placeholder=" Tahun Arus Kas aktif" onChange={handleChangeArusKas} />
                            </div>
                            <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                                <div className='flex'>
                                    <label className='mr-6'>Upload file excel RAB (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                    <input type="file" name="file" accept=".xls,.xlsx" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmitKas}>Rekam Laporan Arus Kas</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    const DaftarArusKas = (props) => {
        const data = props.data
        return (
            <>
                <hr className="border-slate-700 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar Arus Kas KartUNS</h3>
                    <div className='py-4'>
                        {data !== undefined && data.length !== 0 ?
                            data.map((item) => (
                                <div className='border-t-[1px] border-slate-500 border-dotted px-4 py-2 bg-slate-900 flex flex-col gap-4 my-2 rounded-md' key={item.idaruskas}>
                                    <div className='flex flex-row gap-4'>
                                        <div className='rounded-md text-green-600 flex justify-center items-center hover:outline hover:outline-[1px] hover:outline-slate-600 w-1/12'>
                                            <a href={APIURLConfig.baseurl + "static/anggaran/kas/" + item.filekasuri}>
                                                <div className='flex flex-col justify-center items-center gap-2'>
                                                    <MdTableView size={48} />
                                                    <button className='text-xs text-white bg-green-700 px-2 rounded-md'>Download</button>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='flex flex-col gap-2 w-11/12'>
                                            <div className='text-sm font-bold'>
                                                {item.aruskastitle}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Deskripsi:</span> {item.aruskasdesc}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Bulan:</span> {item.aruskasmonth}
                                            </div>
                                            <div className='text-xs text-slate-400'>
                                                <span className='font-bold'>Tahun:</span> {item.aruskasyear}
                                            </div>
                                            <div className='text-xs text-slate-500'>
                                                <p>Published: {item.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            "Belum ada data RAB di dalam sistem."
                        }
                    </div>
                </div>
            </>
        )
    }

    const getAnggaranRAB = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.anggaranrabendpoint + "all", {
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

    const getAnggaranKas = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.anggarankasendpoint + "all", {
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

    useEffect(() => {
        CreateStatusCookie("Pengelolaan Anggaran");
        getAnggaranRAB()
            .then((isi) => {
                console.log("Isi promise: ", isi);
                setAnggaranRAB(isi)
            })
            .catch((err) => console.log(err))
        getAnggaranKas()
            .then((isi) => {
                console.log("Isi promise: ", isi);
                setArusKas(isi)
            })
            .catch((err) => console.log(err))
        console.log("RAB: ", anggaranrab)
        console.log("Kas: ", aruskas)
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
                {selected === "rab" ? <DaftarRAB data={anggaranrab} /> : <DaftarArusKas data={aruskas.anggarankas} />}
            </div>
        </>
    )
}