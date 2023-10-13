import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIURLConfig } from "../config";
import { SaveCookie } from "../config/utils";
import { MdChevronRight } from "react-icons/md";
import { Breadcrumb } from "../components/Breadcrumb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
    const navigate = useNavigate();
    const landing = () => navigate("/");
    const [articles, setArticles] = useState();

    const getArticles = () => {
        const data = fetch(APIURLConfig.baseurl + APIURLConfig.articleendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                return data
            })
            .catch(error => console.error(error.message))
        return data
    }

    useEffect(() => {
        getArticles()
            .then((isi) => setArticles(isi))   // karena result dari getArticles masih berupa Promise, belum datanya, maka data perlu dibaca dan dimasukkan dulu ke useState
            .catch((err) => console.log(err.message))
    }, [])


    return (
        <>
            <div className="w-full">
                <Breadcrumb />
                <div className="flex gap-4 justify-between px-4">
                    <div className="py-10 flex gap-4">
                        {articles ? articles.articles.map((item) => (
                            <div className="flex flex-col justify-start p-5 bg-slate-900 hover:bg-black rounded-md w-1/6" key={item.idarticle}>
                                <hr className="border-slate-700 py-2 border-dotted" />
                                <div>{item.articletitle}</div>
                                <div className="text-xs text-slate-700 mt-2">{item.created_at}</div>
                            </div>
                        )) : ""}
                    </div>
                </div>
                <div className="flex justify-between px-5">
                    <p className="text-white">Kembali ke Landing</p>
                    <button className="text-cyan-600 font-bold" onClick={landing} >Landing</button>
                </div>
            </div>
        </>
    )
}