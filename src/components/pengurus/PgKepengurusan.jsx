import { useEffect, useState } from "react";
import { APIURLConfig } from "../../config"
import { ReadCookie } from "../../config/utils"

export const PgKepengurusan = () => {
    let token = ReadCookie().token;
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

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Data Kepengurusan</h3>
                <div className="mt-5 pb-10">
                    <div className="flex justify-end">
                        <button className="rounded-full bg-green-800 hover:bg-green-600 px-2 font-bold text-sm mb-2">Add User</button>
                    </div>
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
                                let count = 0;
                                if (item.is_pengurus === true) {
                                    count++;
                                    return (
                                        <tr className="border-slate-500 border-y-[1px] border-dotted" key={item.iduser}>
                                            <td>{count}</td>
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