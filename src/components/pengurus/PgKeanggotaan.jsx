import { useEffect, useState } from "react";
import { APIURLConfig } from "../../config"
import { ReadCookie, ReadCookieLocal } from "../../config/utils"

export const PgKeanggotaan = () => {
    let token = ReadCookieLocal().token;
    const [users, getUsers] = useState()

    const getAllUsers = () => {
        const data = fetch(APIURLConfig.baseurl + APIURLConfig.userendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
        return data
    }

    useEffect(() => {
        getAllUsers().then((data) => getUsers(data));
    }, [])

    let countalumni = 0
    let countnonalumni = 0

    return (
        <>
            <div className="px-5">
            <h3 className="font-bold text-center text-lg text-green-500">Data Keanggotaan Sistem KartUNS</h3>
                <div className="mt-5 pb-10">
                    <h3 className="font-bold text-center text-base text-green-500 my-6">Data Alumni</h3>
                    <table class="table-auto border-y-[1px] border-slate-500 w-full text-sm">
                        <thead className="text-center">
                            <tr className="text-slate-500">
                                <th>No</th>
                                <th>Profile</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Alumni</th>
                                <th>Pengurus</th>
                                <th>Admin</th>
                                <th>AdmVerified</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users !== undefined ? users.users.map((item) => {
                                if (item.is_alumni === true && item.is_admin === false) {
                                    countalumni = countalumni+1
                                    return (
                                        <tr className="border-slate-500 border-y-[1px] border-dotted" key={item.iduser}>
                                            <td>{countalumni}</td>
                                            <td className="rounded-full flex justify-center">
                                                <img className="rounded-full" width={16} src={item.profpic} alt=""></img>
                                            </td>
                                            <td>{item.username}</td>
                                            <td>{item.first_name} {item.last_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.is_alumni ? "true" : "false"}</td>
                                            <td>{item.is_pengurus ? "true" : "false"}</td>
                                            <td>{item.is_admin ? "true" : "false"}</td>
                                            <td>{item.admin_verified ? "true" : "false"}</td>
                                            <td>{item.created_at}</td>
                                            <td className="flex gap-1 justify-center">
                                                <button className="rounded-full bg-green-800 hover:bg-green-600 px-2">Edit</button>
                                                <button className="rounded-full bg-red-800 px-2 hover:bg-red-600">Remove</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            }) : ""}
                        </tbody>
                    </table>
                    <hr className="border-slate-700 mt-8 border-dotted" />
                    <h3 className="font-bold text-center text-base text-green-500 my-6">Data User Non Alumni</h3>
                    <table class="table-auto border-y-[1px] border-slate-500 w-full text-sm">
                        <thead className="text-center">
                            <tr className="text-slate-500">
                                <th>No</th>
                                <th>Profile</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Alumni</th>
                                <th>Pengurus</th>
                                <th>Admin</th>
                                <th>AdmVerified</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users !== undefined ? users.users.map((item) => {
                                if (item.is_alumni === false && item.is_admin === false) {
                                    countnonalumni++;
                                    return (
                                        <tr className="border-slate-500 border-y-[1px] border-dotted" key={item.iduser}>
                                            <td>{countnonalumni}</td>
                                            <td className="rounded-full flex justify-center">
                                                <img className="rounded-full" width={16} src={item.profpic} alt=""></img>
                                            </td>
                                            <td>{item.username}</td>
                                            <td>{item.first_name} {item.last_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.is_alumni ? "true" : "false"}</td>
                                            <td>{item.is_pengurus ? "true" : "false"}</td>
                                            <td>{item.is_admin ? "true" : "false"}</td>
                                            <td>{item.admin_verified ? "true" : "false"}</td>
                                            <td>{item.created_at}</td>
                                            <td className="flex gap-1 justify-center">
                                                <button className="rounded-full bg-green-800 hover:bg-green-600 px-2">Edit</button>
                                                <button className="rounded-full bg-red-800 px-2 hover:bg-red-600">Remove</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            }) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}