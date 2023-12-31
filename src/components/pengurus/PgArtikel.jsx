import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { CreateStatusCookieLocal, ReadCookie, ReadCookieLocal, resizeImage, ImageExist, truncate, Purify } from '../../config/utils';
import { APIURLConfig } from '../../config';
import { useEffect } from 'react';
import { ShowUsername } from '../GetUsername';
import { ValidateInputForm } from '../../config/formvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable, { createTheme } from 'react-data-table-component';
import { MdLockReset, MdDelete, MdEditSquare } from "react-icons/md";
import { ArtikelDetail } from '../ArtikelDetail';

export const PgArtikel = (props) => {
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

    const [artikel, setArtikel] = useState([]);
    const [judulartikel, setJudulArtikel] = useState("");
    const [descartikel, setDescArtikel] = useState("");
    const [artikeltext, setArtikelText] = useState("");
    const [artikelimgurl, setArtikelImgUrl] = useState("");
    const [image, setImage] = useState()
    const [submitted, setSubmitted] = useState(false)
    const [selectedartikelid, setSelectedArtikelId] = useState(-1)
    const [selartikel, setSelArtikel] = useState()

    // initialization of form submission status
    status(submitted);

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

    const getSelectedArticle = (id, articles) => {
        articles.forEach(element => {
            if (element.idarticle === id) {
                setSelArtikel(element)
            }
        });
    }

    var newFormData = new FormData();

    const handleChange = (e) => {
        // ... get data form
        newFormData[e.target.name] = e.target.value.trim()
        if (newFormData["articletitle"] !== undefined) {
            setJudulArtikel(newFormData["articletitle"])
        }
        if (newFormData["articledesc"] !== undefined) {
            setDescArtikel(newFormData["articledesc"])
        }
        // console.log({
        //     articletitle: judulartikel,
        //     articledesc: descartikel,
        //     articletext: artikeltext,
        //     articleimgurl: artikelimgurl
        // })
    }

    useEffect(() => {
        CreateStatusCookieLocal("Pengelolaan Artikel KartUNS");
        getArticles()
            .then((isi) => {
                // console.log("Isi artikel: ",isi.articles);
                setArtikel(isi.articles)
            })
            .catch((err) => console.log(err))
        getSelectedArticle(selectedartikelid, artikel)
        console.log("Setelah diisi baru", artikel)
    }, [submitted, selectedartikelid])

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeImage(file);
        // console.log(image);
        setArtikelImgUrl(file.name);
        // // Convert data to base64
        // let img = await getBase64(image)
        setImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        console.log({
            "articletitle": judulartikel,
            "articledesc": descartikel,
            "articletext": artikeltext,
            "articleimgurl": artikelimgurl,
            "author_id": cookie.iduser,
            "file": image,
        })

        let cekdata = {
            "articletitle": judulartikel,
            "articledesc": descartikel,
            "articletext": artikeltext,
            "articleimgurl": artikelimgurl,
            "author_id": cookie.iduser,
            "file": image,
        }

        // const validation = ValidateArtikel(judulartikel, descartikel, artikeltext, artikelimgurl, ReadCookie().iduser, image);
        const validation = ValidateInputForm(cekdata)

        if (validation.message === undefined) {
            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.articleendpoint + "create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "articletitle": judulartikel,
                    "articledesc": descartikel,
                    "articletext": artikeltext,
                    "articleimgurl": artikelimgurl,
                    "author_id": cookie.iduser,
                    "file": image
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return data
                })
                .catch((err) => console.log(err))

            if (response.code === "success") {
                success("Sukses menambah artikel.")
                setSubmitted(true)
                status(submitted)
            }
            return response
        } else {
            failed(validation.message)
        }
    }

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
                justifyContent: 'justify',
            }
        }
    };

    const columns = [
        {
            name: "Gambar cover",
            selector: row => {
                return (
                    <div>
                        <img className='w-[100px] h-[100px] rounded-lg my-1' src={row.articleimgurl && row.articleimgurl !== undefined && ImageExist(APIURLConfig.baseurl + "static/uploads/" + row.articleimgurl) ? APIURLConfig.baseurl + "static/uploads/" + row.articleimgurl : APIURLConfig.baseurl + "static/img/noimage.png"}></img>
                    </div>
                )
            },
            width: "140px",
        },
        {
            name: "Judul artikel",
            selector: row => row.articletitle,
            width: "300px",
        },
        {
            name: "Deskripsi pendek",
            selector: row => row.articledesc,
            width: "300px",
        },
        {
            name: "Isi artikel",
            selector: row => row.articletext,
            width: "500px",
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
            },
            width: "150px",
        },
        {
            name: "Action",
            selector: row => {
                return (
                    <div className="flex flex-col gap-2 text-white my-1">
                        <button className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg" onClick={() => setSelectedArtikelId(row.idarticle)}>View</button>
                        <button className="p-2 bg-green-500 hover:bg-green-600 rounded-lg" onClick={() => console.log(row.idarticle)}>Edit</button>
                        <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => console.log(row.idarticle)}>Remove</button>
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Pengaturan Artikel</h3>
                <div className="text-slate-900 mt-5">
                    <form method='post'>
                        <div>
                            <div className="flex">
                                <input className="grow rounded h-12" name="articletitle" type={"text"} placeholder=" Judul artikel" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex py-6">
                            <input className="grow rounded h-12" name="articledesc" type={"text"} placeholder=" Deskripsi pendek mengenai isi artikel" onChange={handleChange} />
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
                            onEditorChange={(newText) => setArtikelText(newText)}
                        />
                        <input type="hidden" id="articletext" name="articletext" value={artikeltext} ></input>
                        <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                            <div className='flex'>
                                <label className='mr-6'>Upload gambar artikel (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                        <input type="hidden" id="" name="articleimgurl" value={artikelimgurl} ></input>
                        <div className='flex justify-center'>
                            <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Create Article</button>
                        </div>
                    </form>
                </div>
                <hr className="border-slate-700 mt-8 border-dotted" />
                <div className="my-4">
                    <h3 className='font-bold text-lg flex justify-start text-green-500 mb-2'>Artikel KartUNS</h3>
                    <div className='py-4'>
                        {artikel !== undefined && artikel.length !== 0 ?
                            <div className="rounded-lg">
                                <DataTable
                                    columns={columns}
                                    data={artikel}
                                    theme="kartunsdark"
                                    pagination
                                    customStyles={customStyles}
                                />
                            </div>
                            :
                            <div className=''>Belum ada artikel di dalam database.</div>}
                    </div>
                </div>
            </div>
            <hr className="border-slate-700 mt-8 mb-4 border-dotted" />
            <div className='px-5'>
                {selartikel && selartikel !== undefined ?
                    <div className='p-10 bg-slate-900 rounded-lg'>
                        <h3 className='text-lg font-bold text-sky-500'>{selartikel.articletitle}</h3>
                        <img className='w-full rounded-lg my-4' src={selartikel && selartikel.articleimgurl !== undefined && selartikel.articleimgurl !== "" && selartikel.articleimgurl !== null && ImageExist(APIURLConfig.baseurl + "static/uploads/" + selartikel.articleimgurl) ?
                            selartikel.articleimgurl
                            :
                            APIURLConfig.baseurl + "static/img/noimage.png"
                        }>
                        </img>
                        <div className='text-sm text-slate-500 italic mb-4'>
                            {selartikel.articledesc}
                        </div>
                        <div className='text-sm text-slate-500 italic mb-4'>
                            <span>Published: </span>{selartikel.created_at}
                        </div>
                        <div className='text-slate-500 text-base' dangerouslySetInnerHTML={{ __html: Purify(selartikel.articletext) }}>
                        </div>
                    </div>
                    :
                    ""
                }
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