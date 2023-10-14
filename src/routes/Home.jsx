import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIURLConfig } from "../config";
import { ReadCookie, SaveCookie } from "../config/utils";
import { MdHomeFilled } from "react-icons/md";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProfileCard } from "../components/ProfilCard";
import { AdmNavbar } from "../components/admin/AdmNavbar";
import { AdmDashboard } from "../components/admin/AdmDashboard";
import { AdmUserMgmt } from "../components/admin/AdmUserMgmt";
import { AdmSettings } from "../components/admin/AdmSettings";
import { AdmLogs } from "../components/admin/AdmLogs";
import { PengurusNavbar } from "../components/pengurus/PengurusNavbar";
import { PgCoverStory } from "../components/pengurus/PgCoverStory";
import { PgPersuratan } from "../components/pengurus/PgPersuratan";
import { PgAgenda } from "../components/pengurus/PgAgenda";
import { PgArtikel } from "../components/pengurus/PgArtikel";
import { PgAnggaran } from "../components/pengurus/PgAnggaran";
import { PgPengumuman } from "../components/pengurus/PgPengumuman";
import { PgKepengurusan } from "../components/pengurus/PgKepengurusan";
import { PgKeanggotaan } from "../components/pengurus/PgKeanggotaan";
import { PgAdsApproval } from "../components/pengurus/PgAdsApproval";
import { PgJobOffers } from "../components/pengurus/PgJobOffers";
import { PgTraining } from "../components/pengurus/PgTraining";
import { PgRevenue } from "../components/pengurus/PgRevenue";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
    const navigate = useNavigate();
    const landing = () => navigate("/");

    if (ReadCookie().token === "" || ReadCookie().token === undefined) {
        landing()
    }

    const [articles, setArticles] = useState();
    const [activemenu, setActiveMenu] = useState();

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

    const getSelection = (selectiondata) => {
        setActiveMenu(selectiondata);
    }


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
                    <div className="flex flex-col gap-1 bg-slate-800 rounded-md w-5/6 text-white mb-2">
                        <div className="flex gap-2 items-center ml-4">
                            {ReadCookie().isadmin === true ?
                                <div>
                                    <AdmNavbar getSelection={getSelection} />
                                </div> : ""
                            }
                            {ReadCookie().ispengurus === true ?
                                <div>
                                    <PengurusNavbar getSelection={getSelection} />
                                </div> : ""
                            }
                        </div>
                        <hr className="border-slate-700 my-2 border-dotted" />
                        <div className="text-white">
                            {/* Active Menu for Admin */}
                            {activemenu === "Dashboard" ?
                                <div>
                                    <AdmDashboard />
                                </div>
                                :
                                ""}
                            {activemenu === "User Management" ?
                                <div>
                                    <AdmUserMgmt />
                                </div>
                                :
                                ""}
                            {activemenu === "Settings" ?
                                <div>
                                    <AdmSettings />
                                </div>
                                :
                                ""}
                            {activemenu === "Logs" ?
                                <div>
                                    <AdmLogs />
                                </div>
                                :
                                ""}
                            {/* Active Menu for Pengurus */}
                            {activemenu === "Cover Story" ?
                                <div>
                                    <PgCoverStory />
                                </div>
                                :
                                ""}
                            {activemenu === "Persuratan" ?
                                <div>
                                    <PgPersuratan />
                                </div>
                                :
                                ""}
                            {activemenu === "Agenda" ?
                                <div>
                                    <PgAgenda />
                                </div>
                                :
                                ""}
                            {activemenu === "Artikel" ?
                                <div>
                                    <PgArtikel />
                                </div>
                                :
                                ""}
                            {activemenu === "Anggaran" ?
                                <div>
                                    <PgAnggaran />
                                </div>
                                :
                                ""}
                            {activemenu === "Pengumuman" ?
                                <div>
                                    <PgPengumuman />
                                </div>
                                :
                                ""}
                            {activemenu === "Kepengurusan" ?
                                <div>
                                    <PgKepengurusan />
                                </div>
                                :
                                ""}
                            {activemenu === "Keanggotaan" ?
                                <div>
                                    <PgKeanggotaan />
                                </div>
                                :
                                ""}
                            {activemenu === "Ads Approval" ?
                                <div>
                                    <PgAdsApproval />
                                </div>
                                :
                                ""}
                            {activemenu === "Job Offers" ?
                                <div>
                                    <PgJobOffers />
                                </div>
                                :
                                ""}
                            {activemenu === "Training" ?
                                <div>
                                    <PgTraining />
                                </div>
                                :
                                ""}
                            {activemenu === "Revenue Layanan" ?
                                <div>
                                    <PgRevenue />
                                </div>
                                :
                                ""}
                        </div>
                    </div>
                    <div className="rounded-md w-1/6">
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </>
    )
}