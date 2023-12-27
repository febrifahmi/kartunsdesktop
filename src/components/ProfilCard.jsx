import { ReadCookie, ReadCookieLocal, RemoveCookie, RemoveCookieLocal } from "../config/utils"
import { APIURLConfig } from "../config"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const ProfileCard = (props) => {
    const userid = props.userid
    const datastatus = props.datastatus
    const navigate = useNavigate();
    const landing = () => navigate("/");
    let re = /(www.gravatar.com)/;

    const cookie = ReadCookieLocal()

    const [profildata, setProfilData] = useState({})

    const handleLogout = async () => {
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.logoutendpoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                // console.log(response)
                if (response.ok === true) {
                    RemoveCookieLocal()
                    landing()
                }
            })
            .catch((err) => console.log(err))
    }

    const getProfilData = (user_id) => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.userendpoint + user_id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    useEffect(() => {
        getProfilData(userid)
            .then((isi) => {
                // console.log(isi);
                setProfilData(isi)
            })
            .catch((err) => console.log(err))
        console.log("Profil data: ", profildata.user)
    }, [datastatus])

    return (
        <>
            <div>
                {profildata.user !== undefined ?
                    <div className="flex items-center bg-slate-800 hover:bg-sky-800 p-4 rounded-md text-sm text-white gap-4">
                        <div>
                            {
                                profildata.user !== undefined && profildata.user.profpic !== "" && re.test(profildata.user.profpic) == false ?
                                    <img className='object-cover aspect-square rounded-full' src={APIURLConfig.baseurl + "static/profiles/" + profildata.user.profpic}></img>
                                    :
                                    <img className='object-cover aspect-square rounded-full' src={cookie.avatar}></img>
                            }
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <h3 className="text-green-500 text-xs">Profile</h3>
                                <button className="text-green-500 hover:text-orange-800 text-xs hover:bg-yellow-500 hover:px-2 hover:rounded-full" onClick={handleLogout}>Logout</button>
                            </div>
                            <p className="font-bold text-white text-base">{profildata.user.name}</p>
                            <p className="text-slate-400 text-xs">{profildata.user.email}</p>
                        </div>
                    </div>
                    : ""}
            </div>
        </>
    )
}