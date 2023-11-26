import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIURLConfig } from "../config";
import { ReadCookie, SaveCookie, ReadCookieLocal } from "../config/utils";
import { MdHomeFilled } from "react-icons/md";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProfileCard } from "../components/ProfilCard";
import { PengumumanCard } from "../components/PengumumanCard";
import { StartingPage } from "../components/StartingPage";
import { Ads } from "../components/Ads";
import { AdmNavbar } from "../components/admin/AdmNavbar";
import { AdmDashboard } from "../components/admin/AdmDashboard";
import { AdmUserMgmt } from "../components/admin/AdmUserMgmt";
import { AdmSettings } from "../components/admin/AdmSettings";
import { AdmLogs } from "../components/admin/AdmLogs";
import { PengurusNavbar } from "../components/pengurus/PengurusNavbar";
import { AlumniNavbar } from "../components/alumni/AlumNavbar";
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
import { AlumProfil } from "../components/alumni/AlumProfil";
import { AlumKeanggotaan } from "../components/alumni/AlumKeanggotaan";
import { AlumPasangIklan } from "../components/alumni/AlumPasangIklan";
import { AlumAgenda } from "../components/alumni/AlumAgenda";
import { AlumTraining } from "../components/alumni/AlumTraining";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlumDonasi } from "../components/alumni/AlumDonasi";
import { AlumLowongan } from "../components/alumni/AlumLowongan";
import { PgDonasi } from "../components/pengurus/PgDonasi";
import { AlumStore } from "../components/alumni/AlumStore";
import { PgStore } from "../components/pengurus/PgStore";

export const Home = () => {
    const navigate = useNavigate();
    const landing = () => navigate("/");
    const detail = () => navigate("/detail");

    let cookie = ReadCookieLocal()

    console.log("Cookie data:", cookie.ispengurus)

    if (cookie.token === "" || cookie.token === undefined) {
        landing()
    }

    const [articles, setArticles] = useState();
    const [activemenu, setActiveMenu] = useState();
    const [submitstatus, setSubmitStatus] = useState(false)
    const [pengsubmitstatus, setPengumumanSubmitStatus] = useState(false)

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

    const getSubmitStatus = (status) => {
        setSubmitStatus(status)
    }

    const getPengumumanSubmitStatus = (status) => {
        setPengumumanSubmitStatus(status)
    }

    useEffect(() => {
        getArticles()
            .then((isi) => setArticles(isi))   // karena result dari getArticles masih berupa Promise, belum datanya, maka data perlu dibaca dan dimasukkan dulu ke useState
            .catch((err) => console.log(err.message))
    }, [submitstatus])

    const getSelection = (selectiondata) => {
        setActiveMenu(selectiondata);
    }


    const ArtikelComponent = (props) => {
        const data = props.data
        return (
            <>
                {data ? data.articles.slice(0, 10).map((item) => (
                    <div className="flex-none justify-start p-5 bg-slate-900 hover:bg-black hover:text-sky-600 hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md w-1/6 mb-2" key={item.idarticle} onClick={detail}>
                        <hr className="border-slate-700 py-2 border-dotted" />
                        <div className="text-sm">{item.articletitle}</div>
                        <div className="text-xs text-slate-700 mt-2">{item.created_at}</div>
                    </div>
                )) : ""}
                {data !== undefined && data.articles.length !== 0 ?
                    <div className="flex-none justify-center align-middle p-5 bg-slate-900 hover:bg-black hover:text-sky-600 hover:border-t-[1px] hover:border-t-solid hover:border-green-500 rounded-md w-1/6 mb-2">
                        <hr className="border-slate-700 py-2 border-dotted" />
                        <button className="text-sm" onClick={detail}>Load More</button>
                    </div>
                    :
                    ""
                }
            </>
        )
    }

    return (
        <>
            <div className="w-full bg-slate-900">
                <Breadcrumb />
                <div className="py-5 px-4 bg-slate-800 rounded-md m-2">
                    <div className="flex flex-nowrap overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thumb-slate-600">
                        <ArtikelComponent data={articles} />
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-2 gap-x-2 h-full">
                    <div className="flex flex-col gap-1 bg-slate-800 rounded-md w-5/6 text-white mb-2">
                        <div className="flex gap-2 items-center ml-4">
                            {cookie.isadmin === "true" ?
                                <div>
                                    <AdmNavbar getSelection={getSelection} />
                                </div> : ""
                            }
                            {cookie.ispengurus === "true" ?
                                <div>
                                    <PengurusNavbar getSelection={getSelection} />
                                </div>
                                : ""
                            }
                            {cookie.isalumni === "true" && cookie.ispengurus === "false" ?
                                <div>
                                    <AlumniNavbar getSelection={getSelection} />
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
                                    <PgArtikel status={getSubmitStatus} submit={submitstatus} />
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
                                    <PgPengumuman status={getPengumumanSubmitStatus} submit={pengsubmitstatus} />
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
                            {activemenu === "Donasi Masuk" ?
                                <div>
                                    <PgDonasi />
                                </div>
                                :
                                ""}
                            {activemenu === "Manage Store" ?
                                <div>
                                    <PgStore />
                                </div>
                                :
                                ""}
                            {activemenu === "" || activemenu === undefined ?
                                <StartingPage />
                                :
                                ""}
                            {/* Active Menu for Alumni */}
                            {activemenu === "Profil" ?
                                <div>
                                    <AlumProfil />
                                </div>
                                :
                                ""}
                            {activemenu === "Membership" ?
                                <div>
                                    <AlumKeanggotaan />
                                </div>
                                :
                                ""}
                            {activemenu === "Tambah Ilmu" ?
                                <div>
                                    <AlumTraining />
                                </div>
                                :
                                ""}
                            {activemenu === "Pasang Iklan" ?
                                <div>
                                    <AlumPasangIklan />
                                </div>
                                :
                                ""}
                            {activemenu === "Lowongan" ?
                                <div>
                                    <AlumLowongan />
                                </div>
                                :
                                ""}
                            {activemenu === "Donasi" ?
                                <div>
                                    <AlumDonasi />
                                </div>
                                :
                                ""}
                            {activemenu === "Store" ?
                                <div>
                                    <AlumStore />
                                </div>
                                :
                                ""}
                        </div>
                        {ReadCookieLocal().isalumni === "true" && ReadCookieLocal().ispengurus === "false" ?
                            <div className="px-5">
                                <AlumAgenda />
                            </div> : ""
                        }
                    </div>
                    <div className="rounded-md w-1/6 flex flex-col gap-2">
                        <ProfileCard />
                        <PengumumanCard />
                    </div>
                </div>
            </div>
        </>
    )
}