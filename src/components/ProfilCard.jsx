import { ReadCookie, RemoveCookie } from "../config/utils"
import { APIURLConfig } from "../config"
import { useNavigate } from "react-router-dom";

export const ProfileCard = () => {
    const navigate = useNavigate();
    const landing = () => navigate("/");
    const userdata = ReadCookie()
    const handleLogout = async () => {
        const response = await fetch(APIURLConfig.baseurl + APIURLConfig.logoutendpoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response)
                if (response.ok === true) {
                    RemoveCookie()
                    landing()
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div>
                {userdata ?
                    <div className="flex items-center bg-slate-800 hover:bg-sky-800 p-4 rounded-md text-sm text-white gap-4">
                        <div>
                            <img className="rounded-full" width={64} src={userdata.avatar} alt=""></img>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <h3 className="text-green-500 text-xs">Profile</h3>
                                <button className="text-green-500 hover:text-orange-800 text-xs hover:bg-yellow-500 hover:px-2 hover:rounded-full" onClick={handleLogout}>Logout</button>
                            </div>
                            <p className="font-bold text-white text-base">{userdata.name}</p>
                            <p className="text-slate-400 text-xs">{userdata.email}</p>
                        </div>
                    </div>
                    : ""}
            </div>
        </>
    )
}