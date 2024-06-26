import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookieLocal, ReadCookie, ReadCookieLocal, getB64Pdf, downloadPDF, handleDownloadExcel } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';
import { MdPictureAsPdf } from "react-icons/md";
import { ShowUsername } from '../GetUsername';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable, { createTheme } from 'react-data-table-component';

export const PgPersuratan = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const failed = (errmsg) => toast.error(errmsg);
    const success = (msg) => toast.success(msg);

    const [sksubmitted, setSKSubmitted] = useState(false)
    const [smsubmitted, setSMSubmitted] = useState(false)

    let cookie = ReadCookieLocal()

    const SuratMasuk = () => {
        const [judulsurat, setJudulSurat] = useState("");
        const [nosurat, setNoSurat] = useState("");
        const [descsurat, setDescSurat] = useState("");
        const [pengirim, setPengirim] = useState("");
        const [filesuraturi, setFileSuratUri] = useState("");
        const [filesurat, setFileSurat] = useState()

        var newFormData = new FormData();

        const handleChangeSrtMsk = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["suratmasuktitle"] !== undefined) {
                setJudulSurat(newFormData["suratmasuktitle"])
            }
            if (newFormData["suratmasuknr"] !== undefined) {
                setNoSurat(newFormData["suratmasuknr"])
            }
            if (newFormData["suratmasukdesc"] !== undefined) {
                setDescSurat(newFormData["suratmasukdesc"])
            }
            if (newFormData["pengirim"] !== undefined) {
                setPengirim(newFormData["pengirim"])
            }
            console.log({
                suratmasuktitle: judulsurat,
                suratmasuknr: nosurat,
                suratmasukdesc: descsurat,
                pengirim: pengirim,
                filesuraturi: filesuraturi,
                file: filesurat,
                author_id: cookie.iduser,
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
            setFileSuratUri(file.name);
            // Convert data to base64
            let pdf = await getBase64(file)
            console.log("PDF file: ", pdf)
            setFileSurat(pdf);
        }

        const handleSubmitSuratMasuk = async (e) => {
            e.preventDefault()
            console.log({
                "suratmasuktitle": judulsurat,
                "suratmasuknr": nosurat,
                "suratmasukdesc": descsurat,
                "pengirim": pengirim,
                "filesuraturi": filesuraturi,
                "file": filesurat,
                "author_id": cookie.iduser,
            })

            let cekdata = {
                "suratmasuktitle": judulsurat,
                "suratmasuknr": nosurat,
                "suratmasukdesc": descsurat,
                "pengirim": pengirim,
                "filesuraturi": filesuraturi,
                "file": filesurat,
                "author_id": cookie.iduser,
            }

            let validation = ValidateInputForm(cekdata)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.suratmasukendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "suratmasuktitle": judulsurat,
                        "suratmasuknr": nosurat,
                        "suratmasukdesc": descsurat,
                        "pengirim": pengirim,
                        "filesuraturi": filesuraturi,
                        "file": filesurat,
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
                    success("Sukses menambah data surat masuk.")
                    setSMSubmitted(true)
                }
                return response
            } else {
                failed(validation.message)
            }
        }

        return (
            <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Rekam Surat Masuk</h3>
                <div className='text-slate-500 mt-5 px-6'>
                    <form method='post'>
                        <div className="flex">
                            <input className="grow rounded h-12" name="suratmasuktitle" type={"text"} placeholder=" Judul surat masuk" onChange={handleChangeSrtMsk} />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="suratmasuknr" type={"text"} placeholder=" Nomor surat masuk" onChange={handleChangeSrtMsk} />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="suratmasukdesc" type={"text"} placeholder=" Deskripsi pendek isi surat masuk" onChange={handleChangeSrtMsk} />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="pengirim" type={"text"} placeholder=" Pengirim" onChange={handleChangeSrtMsk} />
                        </div>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload file pdf surat masuk (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="file" accept="application/pdf" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmitSuratMasuk}>Rekam Surat Masuk</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }

    const DaftarSuratMasuk = (props) => {
        const data = props.data
        const [showpdf, setShowPdf] = useState(0)

        // createTheme creates a new theme named kartunsdark that overrides the build in dark theme
        createTheme('kartunsdark', {
            text: {
                primary: '#94a3b8',
                secondary: '#64748b',
            },
            background: {
                default: '#334155',
            },
            context: {
                background: '#cb4b16',
                text: '#FFFFFF',
            },
            divider: {
                default: '#1e293b',
            },
            action: {
                button: 'rgba(0,0,0,.54)',
                hover: 'rgba(0,0,0,.08)',
                disabled: 'rgba(0,0,0,.12)',
            },
        }, 'dark');

        //  Internally, customStyles will deep merges your customStyles with the default styling.
        const customStyles = {
            headCells: {
                style: {
                    fontSize: '14px',
                    justifyContent: 'center',
                    backgroundColor: '#0f172a',
                },
            },
            cells: {
                style: {
                    justifyContent: 'center',
                }
            }
        };

        const columns = [
            {
                name: "Judul surat",
                selector: row => row.suratmasuktitle,
            },
            {
                name: "No surat",
                selector: row => row.suratmasuknr,
            },
            {
                name: "Pengirim",
                selector: row => row.pengirim,
            },
            {
                name: "Deskripsi",
                selector: row => row.suratmasukdesc,
            },
            {
                name: "Author",
                selector: row => {
                    return <ShowUsername userid={row.author_id} token={cookie.token} display="name" />
                },
            },
            {
                name: "File surat",
                selector: row => {
                    return (
                        <button className="bg-green-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/surat/masuk/" + row.filesuraturi)}>Unduh</button>
                    )
                },
            },
            {
                name: "Created",
                selector: row => {
                    return (
                        <span>
                            {
                                Intl.DateTimeFormat("id-ID", {
                                    dateStyle: 'medium',
                                    timeStyle: 'long',
                                    timeZone: 'Asia/Jakarta',
                                }).format(new Date(row.created_at))
                            }
                        </span>
                    )
                }
            },
            {
                name: "Action",
                selector: row => {
                    return (
                        <div className="flex flex-col gap-2 text-white my-1">
                            <button className="p-2 bg-green-500 hover:bg-green-600 rounded-lg" onClick={() => console.log(row.idsuratmasuk)}>Edit</button>
                            <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => console.log(row.idsuratmasuk)}>Hapus</button>
                        </div>
                    )
                },
            },
        ]

        const downloadExcelSuratMasuk = (data) => {
            handleDownloadExcel(data, "datasuratmasuk", "Data_Surat_Masuk_KartUNS")
        };

        return (
            <>
                <hr className="border-slate-700 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar Surat Masuk KartUNS</h3>
                    <div className='py-4'>
                        <div className="flex justify-end mb-4 px-4">
                            {
                                data && data !== undefined && data.length > 0 ?
                                    <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelSuratMasuk(data)}>Export Data</button>
                                    :
                                    ""
                            }
                        </div>
                        {data !== undefined && data.length !== 0 ?
                            <div className="rounded-lg">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    theme="kartunsdark"
                                    pagination
                                    customStyles={customStyles}
                                />
                            </div>
                            :
                            "Belum ada data surat masuk di dalam sistem."
                        }
                    </div>
                </div>
            </>
        )
    }

    const SuratKeluar = () => {
        const [judulsuratkeluar, setJudulSuratKeluar] = useState("");
        const [nosuratkeluar, setNoSuratKeluar] = useState("");
        const [descsuratkeluar, setDescSuratKeluar] = useState("");
        const [kepada, setKepada] = useState("");
        const [filesuratkeluaruri, setFileSuratKeluarUri] = useState("");
        const [filesuratkeluar, setFileSuratKeluar] = useState()

        var newFormData = new FormData();

        const handleChangeSrtKlr = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["suratkeluartitle"] !== undefined) {
                setJudulSuratKeluar(newFormData["suratkeluartitle"])
            }
            if (newFormData["suratkeluarnr"] !== undefined) {
                setNoSuratKeluar(newFormData["suratkeluarnr"])
            }
            if (newFormData["suratkeluardesc"] !== undefined) {
                setDescSuratKeluar(newFormData["suratkeluardesc"])
            }
            if (newFormData["kepada"] !== undefined) {
                setKepada(newFormData["kepada"])
            }
            console.log({
                suratkeluartitle: judulsuratkeluar,
                suratkeluarnr: nosuratkeluar,
                suratkeluardesc: descsuratkeluar,
                kepada: kepada,
                filesuratkeluaruri: filesuratkeluaruri,
                file: filesuratkeluar,
                author_id: cookie.iduser,
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
            setFileSuratKeluarUri(file.name);
            // Convert data to base64
            let pdf = await getBase64(file)
            console.log("PDF file: ", pdf)
            setFileSuratKeluar(pdf);
        }

        const handleSubmitSuratKeluar = async (e) => {
            e.preventDefault()
            console.log({
                "suratkeluartitle": judulsuratkeluar,
                "suratkeluarnr": nosuratkeluar,
                "suratkeluardesc": descsuratkeluar,
                "kepada": kepada,
                "filesuratkeluaruri": filesuratkeluaruri,
                "file": filesuratkeluar,
                "author_id": cookie.iduser,
            })

            let cekdata = {
                "suratkeluartitle": judulsuratkeluar,
                "suratkeluarnr": nosuratkeluar,
                "suratkeluardesc": descsuratkeluar,
                "kepada": kepada,
                "filesuratkeluaruri": filesuratkeluaruri,
                "file": filesuratkeluar,
                "author_id": cookie.iduser,
            }

            let validation = ValidateInputForm(cekdata)

            if (validation.message === undefined) {
                // ... submit to RestAPI using fetch api
                const response = await fetch(APIURLConfig.baseurl + APIURLConfig.letterendpoint + "create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie.token}`
                    },
                    body: JSON.stringify({
                        "suratkeluartitle": judulsuratkeluar,
                        "suratkeluarnr": nosuratkeluar,
                        "suratkeluardesc": descsuratkeluar,
                        "kepada": kepada,
                        "filesuratkeluaruri": filesuratkeluaruri,
                        "file": filesuratkeluar,
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
                    success("Sukses menambah data surat keluar.")
                    setSKSubmitted(true)
                }
                return response
            } else {
                failed(validation.message)
            }

        }

        return (
            <div className='flex flex-col bg-slate-700 rounded-md p-2'>
                <h3 className='font-bold text-lg text-green-500 px-6 pt-6'>Rekam Surat Keluar</h3>
                <div className='text-slate-500 mt-5 px-6'>
                    <form method='post'>
                        <div className="flex">
                            <input className="grow rounded h-12" name="suratkeluartitle" type={"text"} placeholder=" Judul surat keluar" onChange={handleChangeSrtKlr} />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="suratkeluarnr" type={"text"} placeholder=" Nomor surat keluar" onChange={handleChangeSrtKlr} />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="suratkeluardesc" type={"text"} placeholder=" Deskripsi pendek isi surat keluar" onChange={handleChangeSrtKlr} />
                        </div>
                        <div className="flex pt-6">
                            <input className="grow rounded h-12" name="kepada" type={"text"} placeholder=" Kepada" onChange={handleChangeSrtKlr} />
                        </div>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload file pdf surat keluar (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="file" accept="application/pdf" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmitSuratKeluar}>Rekam Surat Keluar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const DaftarSuratKeluar = (props) => {
        const data = props.data
        console.log("Data in child: ", data)
        const [showpdf, setShowPdf] = useState(0)

        // createTheme creates a new theme named kartunsdark that overrides the build in dark theme
        createTheme('kartunsdark', {
            text: {
                primary: '#94a3b8',
                secondary: '#64748b',
            },
            background: {
                default: '#334155',
            },
            context: {
                background: '#cb4b16',
                text: '#FFFFFF',
            },
            divider: {
                default: '#1e293b',
            },
            action: {
                button: 'rgba(0,0,0,.54)',
                hover: 'rgba(0,0,0,.08)',
                disabled: 'rgba(0,0,0,.12)',
            },
        }, 'dark');

        //  Internally, customStyles will deep merges your customStyles with the default styling.
        const customStyles = {
            headCells: {
                style: {
                    fontSize: '14px',
                    justifyContent: 'center',
                    backgroundColor: '#0f172a',
                },
            },
            cells: {
                style: {
                    justifyContent: 'center',
                }
            }
        };

        const columns = [
            {
                name: "Judul surat",
                selector: row => row.suratkeluartitle,
            },
            {
                name: "No surat",
                selector: row => row.suratkeluarnr,
            },
            {
                name: "Kepada",
                selector: row => row.kepada,
            },
            {
                name: "Deskripsi",
                selector: row => row.suratkeluardesc,
            },
            {
                name: "Author",
                selector: row => {
                    return <ShowUsername userid={row.author_id} token={cookie.token} display="name" />
                },
            },
            {
                name: "File surat",
                selector: row => {
                    return (
                        <button className="bg-green-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/surat/keluar/" + row.filesuratkeluaruri)}>Unduh</button>
                    )
                },
            },
            {
                name: "Created",
                selector: row => {
                    return (
                        <span>
                            {
                                Intl.DateTimeFormat("id-ID", {
                                    dateStyle: 'medium',
                                    timeStyle: 'long',
                                    timeZone: 'Asia/Jakarta',
                                }).format(new Date(row.created_at))
                            }
                        </span>
                    )
                }
            },
            {
                name: "Action",
                selector: row => {
                    return (
                        <div className="flex flex-col gap-2 text-white my-1">
                            <button className="p-2 bg-green-500 hover:bg-green-600 rounded-lg" onClick={() => console.log(row.idsuratkeluar)}>Edit</button>
                            <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => console.log(row.idsuratkeluar)}>Hapus</button>
                        </div>
                    )
                },
            },
        ]

        const downloadExcelSuratKeluar = (data) => {
            handleDownloadExcel(data, "datasuratkeluar", "Data_Surat_Keluar_KartUNS")
        };

        return (
            <>
                <hr className="border-slate-700 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Daftar Surat Kaluar KartUNS</h3>
                    <div className='py-4'>
                        <div className="flex justify-end mb-4 px-4">
                            {
                                data && data !== undefined && data.length > 0 ?
                                    <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelSuratKeluar(data)}>Export Data</button>
                                    :
                                    ""
                            }
                        </div>
                        {data !== undefined && data.length !== 0 ?
                            <div className="rounded-lg">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    theme="kartunsdark"
                                    pagination
                                    customStyles={customStyles}
                                />
                            </div>
                            :
                            "Belum ada data surat keluar di dalam sistem."
                        }
                    </div>
                </div >
            </>
        )
    }

    const [selected, setSelected] = useState("buat")
    const [suratmasuk, setSuratMasuk] = useState([]);
    const [suratkeluar, setSuratKeluar] = useState([]);

    const getSuratMasuk = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.suratmasukendpoint + "all", {
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

    const getSuratKeluar = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.letterendpoint + "all", {
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
        CreateStatusCookieLocal("Pengelolaan Persuratan KartUNS");
        getSuratMasuk()
            .then((isi) => {
                // console.log(isi);
                setSuratMasuk(isi)
            })
            .catch((err) => console.log(err))
        getSuratKeluar()
            .then((isi) => {
                // console.log(isi);
                setSuratKeluar(isi)
            })
            .catch((err) => console.log(err))
        console.log("Surat Masuk:", suratmasuk.suratmasuks)
        console.log("Surat Keluar: ", suratkeluar.letters)
    }, [sksubmitted, smsubmitted])

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengelolaan Persuratan</h3>
                <div className="flex flex-col gap-2 mt-5 pb-10">
                    <div className="flex flex-row justify-center bg-slate-700 gap-6 rounded-md py-6">
                        <button className={selected === "rekam" ? "bg-slate-600 outline outline-green-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"} onClick={() => setSelected("rekam")}>Rekam Surat Masuk</button>
                        <button className={selected === "buat" ? "bg-slate-600 outline outline-sky-500 outline-[1px] px-6 py-2 rounded-md font-bold" : "bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-md"} onClick={() => setSelected("buat")}>Rekam Surat Keluar</button>
                    </div>
                    {selected === "rekam" ?
                        <SuratMasuk />
                        :
                        <SuratKeluar />}
                </div>
                {selected === "rekam" ? <DaftarSuratMasuk data={suratmasuk.suratmasuks} /> : <DaftarSuratKeluar data={suratkeluar.letters} />}
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