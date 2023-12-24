import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateStatusCookie, truncate } from "../config/utils";
import { Breadcrumb } from "../components/Breadcrumb";
import { APIURLConfig } from "../config";
import { Ads } from "../components/AdsComponent";
import { ShowUsername } from "../components/GetUsername";
import { ReadCookieLocal, ImageExist, Purify } from "../config/utils";
import { Footer } from "../components/Footer";

export const AdsDetailPage = () => {
    const navigate = useNavigate();
    const home = () => navigate("/home");

    const [allads, setAllAds] = useState([])
    const [selected, setSelected] = useState(-1)

    const getAllAds = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.adsendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    useEffect(() => {
        getAllAds()
            .then((isi) => {
                // console.log(isi);
                setAllAds(isi)
            })
            .catch((err) => console.log(err))
        console.log("All ads: ", allads)
    }, [])

    return (
        <>
            <div className="bg-slate-900 flex flex-col">
                <Breadcrumb />
                <div className="bg-slate-800 px-5 py-5 m-2 rounded-md flex flex-col gap-10">
                    <div className="flex flex-row gap-10">
                        <div className="flex flex-col w-2/6">
                            <div className="flex flex-col gap-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thumb-slate-600 overflow-auto h-full">
                                {allads.ads !== undefined && allads.ads.length > 0 ?
                                    allads.ads.slice(0, 10).map((item) => (
                                        item.is_blocked == false ?
                                            <button className="flex flex-row gap-8" onClick={() => setSelected(item.idad)}>
                                                <div className={selected === item.idad ? "flex flex-row gap-4 h-16 w-60 px-2 items-center rounded-lg border-solid border-[1px] border-slate-800 bg-black hover:bg-black hover:text-sky-500" : "flex flex-row gap-4 h-16 w-60 px-2 items-center rounded-lg border-solid border-[1px] border-slate-800 bg-slate-900 hover:bg-black hover:text-sky-500"}>
                                                    <img className="rounded-lg object-cover h-[48px] w-[48px]" src={item.adimgurl !== undefined && item.adimgurl !== "" ? APIURLConfig.baseurl + "static/uploads/" + item.adimgurl : "static/img/noimage.png"}></img>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="text-xs text-left grow">{truncate(item.adcampaigntitle, 36, 8)}</div>
                                                    </div>
                                                </div>
                                            </button>
                                            :
                                            ""
                                    ))
                                    :
                                    ""
                                }
                            </div>
                        </div>
                        <div className="w-4/6">
                            {
                                selected > 0 ?
                                    allads.ads.map((item) => (
                                        item.idad == selected ?
                                            <div className="flex flex-col gap-6">
                                                <h3 className="text-xl font-bold text-sky-500">{item.adcampaigntitle}</h3>
                                                <div>
                                                    <img className="w-48 h-48 object-cover rounded-lg" src={item.adimgurl !== undefined && item.adimgurl !== "" ? APIURLConfig.baseurl + "static/uploads/" + item.adimgurl : "static/img/noimage.png"}></img>
                                                </div>
                                                <div className="text-sm text-slate-500">{item.adcampaigndesc}</div>
                                                <div dangerouslySetInnerHTML={{ __html: item.adcampaigntext ? Purify(item.adcampaigntext) : "" }}></div>
                                            </div>
                                            :
                                            ""
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="flex justify-center w-full mb-4">
                        <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white w-1/12 " onClick={home}>Back</button>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}