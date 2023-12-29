import { useEffect, useState } from "react";
import { APIURLConfig } from "../../config"
import { ReadCookieLocal, handleDownloadExcel } from "../../config/utils"
import DataTable, { createTheme } from 'react-data-table-component';
import { MdLockReset, MdDelete, MdEditSquare } from "react-icons/md";
import { ShowUsername } from "../GetUsername";

export const PgKepengurusan = () => {
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
            .then((data) => { return data })
            .catch((e) => console.log(e))
        return data
    }

    useEffect(() => {
        getAllUsers().then((data) => getUsers(data));
    }, [])

    // createTheme creates a new theme named kartunsdark that overrides the build in dark theme
    createTheme('kartunsdark', {
        text: {
            primary: '#94a3b8',
            secondary: '#64748b',
        },
        background: {
            default: '#334155',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#1e293b',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

    //  Internally, customStyles will deep merges your customStyles with the default styling.
    const customStyles = {
        headCells: {
            style: {
                fontSize: '14px',
                justifyContent: 'center',
                backgroundColor: '#0f172a',
            },
        },
        cells: {
            style: {
                justifyContent: 'center',
            }
        }
    };

    const columns = [
        {
            name: "Avatar",
            selector: row => row.profpic,
        },
        {
            name: "Username",
            selector: row => row.username,
        },
        {
            name: "Nama",
            selector: row => row.first_name + " " + row.last_name,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Alumni",
            selector: row => {
                if (row.is_alumni === true) {
                    return (
                        <spav className="px-2 rounded-full bg-green-700 text-white text-xs font-bold">yes</spav>
                    )
                } else {
                    return (
                        <spav className="px-2 rounded-full bg-orange-700 text-white text-xs font-bold">no</spav>
                    )
                }
            }
        },
        {
            name: "Pengurus",
            selector: row => {
                if (row.is_pengurus === true) {
                    return (
                        <spav className="px-2 rounded-full bg-green-700 text-white text-xs font-bold">yes</spav>
                    )
                } else {
                    return (
                        <spav className="px-2 rounded-full bg-orange-700 text-white text-xs font-bold">no</spav>
                    )
                }
            }
        },
        {
            name: "Mahasiswa",
            selector: row => {
                if (row.is_mhsarsuns === true) {
                    return (
                        <spav className="px-2 rounded-full bg-green-700 text-white text-xs font-bold">yes</spav>
                    )
                } else {
                    return (
                        <spav className="px-2 rounded-full bg-orange-700 text-white text-xs font-bold">no</spav>
                    )
                }
            }
        },
        {
            name: "Created",
            selector: row => {
                return (
                    <span>
                        {
                            Intl.DateTimeFormat("id-ID", {
                                dateStyle: 'medium',
                                timeStyle: 'long',
                                timeZone: 'Asia/Jakarta',
                            }).format(new Date(row.created_at))
                        }
                    </span>
                )
            }
        },
        {
            name: "Action",
            selector: row => {
                return (
                    <div className="flex flex-row gap-2 text-white my-1">
                        <button className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg" onClick={() => console.log(row.iduser)}><MdEditSquare /></button>
                        <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => console.log(row.iduser)}><MdDelete /></button>
                        <button className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg" onClick={() => console.log(row.iduser)}><MdLockReset /></button>
                    </div>
                )
            },
        },
    ]

    const downloadExcelUser = (data) => {
        handleDownloadExcel(data, "datapengurus", "Data_Pengurus_KartUNS")
    };

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Data Kepengurusan</h3>
                <div className="mt-5 pb-10">
                <div className="flex justify-between mb-4 px-4">
                        <h3 className="font-bold text-left text-base text-green-500 px-4">Data Pengurus</h3>
                        {
                            users && users.users !== undefined && users.users.length > 0 ?
                                <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelUser(users.users)}>Export Data Pengurus</button>
                                :
                                ""
                        }
                    </div>
                    {users && users.users !== undefined && users.users.length > 0 ?
                        <div className="px-4 rounded-lg">
                            <DataTable
                                columns={columns}
                                data={users.users.filter((item) => {
                                    if(item.is_pengurus === true && item.is_admin === false){
                                        return item
                                    }
                                })}
                                theme="kartunsdark"
                                pagination
                                customStyles={customStyles}
                            />
                        </div>
                        :
                        ""
                    }
                </div>
            </div>
        </>
    )
}