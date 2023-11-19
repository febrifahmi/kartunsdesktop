import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateStatusCookie } from "../config/utils";
import { Breadcrumb } from "../components/Breadcrumb";
import { ArtikelDetail } from "../components/ArtikelDetail";
import { APIURLConfig } from "../config";
import { ArtikelComponent } from "../components/ArticleComponent";
import { ShowUsername } from "../components/GetUsername";
import { ReadCookieLocal, ImageExist } from "../config/utils";

export const ArtikelDetailPage = ({ params }) => {
    const navigate = useNavigate();
    const home = () => navigate("/home");

    const [artikel, setArtikel] = useState([]);
    const [activearticle, setActiveArticle] = useState(0)

    let cookie = ReadCookieLocal();

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

    const getSelection = (selectiondata) => {
        setActiveArticle(selectiondata);
        console.log(selectiondata);
    }

    useEffect(() => {
        CreateStatusCookie("Article Detail Page");
        getArticles()
            .then((isi) => {
                // console.log("Isi artikel: ",isi.articles);
                setArtikel(isi.articles)
            })
            .catch((err) => console.log(err))
        console.log("Setelah diisi baru", artikel)
    }, [])

    return (
        <>
            <div className="bg-slate-900 flex flex-col">
                <Breadcrumb />
                <div className="bg-slate-800 px-5 py-5 m-2 rounded-md flex flex-row gap-10">
                    <div className="flex flex-col w-2/6">
                        <ArtikelComponent data={artikel} getSelection={getSelection} />
                    </div>
                    <div className="w-4/6">
                        {
                            activearticle !== "" || activearticle !== undefined ?
                                artikel.map((item) => {
                                    if (item.idarticle === activearticle) {
                                        return (
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-bold text-sky-500 mb-4">{item.articletitle}</h3>
                                                <div className="flex flex-col">
                                                    <div className="flex flex-row justify-between mb-6">
                                                        <div className="text-sm text-slate-500"><span className="font-bold">Author: </span><span><ShowUsername userid={parseInt(item.author_id)} token={cookie.token} /></span> </div>
                                                        <div className="text-sm text-slate-500 italic">Published: {item.created_at}</div>
                                                    </div>
                                                    <div className="w-full h-96">
                                                        <img className="object-cover rounded-lg w-full h-96" src={item.articleimgurl && ImageExist(APIURLConfig.baseurl + "static/uploads/" + item.articleimgurl) ? APIURLConfig.baseurl + "static/uploads/" + item.articleimgurl : APIURLConfig.baseurl + "static/img/noimage.png"}></img>
                                                    </div>
                                                    <div className="text-base mt-8" dangerouslySetInnerHTML={{ __html: item.articletext }}>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                :
                                ""
                        }
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md mb-8 text-white w-1/12 " onClick={home}>Back</button>
                </div>
            </div>
        </>
    )
}