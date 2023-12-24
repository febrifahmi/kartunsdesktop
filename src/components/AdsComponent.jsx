import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { truncate } from "../config/utils"

export const Ads = (props) => {
    const adsdetail = props.goto
    const [allads, setAllAds] = useState([])

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
            <button className="flex flex-row gap-8" onClick={adsdetail}>
                {allads.ads !== undefined && allads.ads.length > 0 ?
                    allads.ads.slice(0,10).map((item) => (
                        item.is_blocked == false ?
                            <div className="flex flex-row gap-2 h-16 w-40 px-2 items-center rounded-lg border-solid border-[1px] border-slate-700 hover:bg-black hover:text-sky-500">
                                <img className="rounded-lg object-cover h-[48px] w-[48px]" src={item.adimgurl !== undefined && item.adimgurl !== "" ? APIURLConfig.baseurl + "static/uploads/" + item.adimgurl : "static/img/noimage.png"}></img>
                                <div className="flex flex-wrap w-20">
                                    <div className="text-xs text-left">{truncate(item.adcampaigntitle, 36, 8)}</div>
                                </div>
                            </div>
                            :
                            ""
                    ))
                    :
                    ""
                }
            </button>
        </>
    )
}