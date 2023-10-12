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
    const [articles, setArticles] = useState()

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

    getArticles().then((isi) => setArticles(isi)) // karena result dari getArticles masih berupa Promise, belum datanya, maka data perlu dibaca dan dimasukkan dulu ke useState

    return (
        <>
            <div className="w-full">
                <Breadcrumb />
                <div className="flex gap-4 justify-between px-4">
                    <div>
                        {articles ? articles.articles.map((item) => (
                            <div key={item.idarticle}>{item.articletitle}</div>
                        )) : ""}
                    </div>
                    <p className="text-white">Kembali ke Landing</p>
                    <button className="text-cyan-600 font-bold" onClick={landing} >Landing</button>
                </div>
            </div>
        </>
    )
}