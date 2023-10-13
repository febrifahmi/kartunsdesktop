import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIURLConfig } from "../config";
import { ReadCookie, SaveCookie } from "../config/utils";
import { MdHomeFilled } from "react-icons/md";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProfileCard } from "../components/ProfilCard";
import { AdmNavbar } from "../components/admin/AdmNavbar";
import { PengurusNavbar } from "../components/pengurus/PengurusNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
    const navigate = useNavigate();
    const landing = () => navigate("/");

    if (ReadCookie().token === "" || ReadCookie().token === undefined) {
        landing()
    }

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
            <div className="w-full bg-slate-900">
                <Breadcrumb />
                <div className="flex gap-4 justify-between px-4 bg-slate-800 rounded-md m-2 overflow-auto">
                    <div className="py-5 flex gap-4">
                        {articles ? articles.articles.map((item) => (
                            <div className="flex flex-col justify-start p-5 bg-slate-900 hover:bg-black rounded-md w-1/6" key={item.idarticle}>
                                <hr className="border-slate-700 py-2 border-dotted" />
                                <div className="text-sm">{item.articletitle}</div>
                                <div className="text-xs text-slate-700 mt-2">{item.created_at}</div>
                            </div>
                        )) : ""}
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-2 gap-x-2 h-full">
                    <div className="bg-slate-800 rounded-md w-5/6 text-white">
                        <div className="flex gap-2 items-center ml-4">
                            {ReadCookie().isadmin === true ?
                                <div>
                                    <AdmNavbar />
                                </div> : ""
                            }
                            {ReadCookie().ispengurus === true ?
                                <div>
                                    <PengurusNavbar />
                                </div> : ""
                            }
                        </div>
                        <hr className="border-slate-700 my-2 border-dotted" />
                    </div>
                    <div className="rounded-md w-1/6">
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </>
    )
}