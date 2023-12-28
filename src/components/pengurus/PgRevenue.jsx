import { useState, useEffect, useMemo } from "react"
import { APIURLConfig } from "../../config"
import { ReadCookieLocal, handleDownloadExcel } from "../../config/utils"
import DataTable, { createTheme } from 'react-data-table-component';
import { ShowUsername } from "../GetUsername";


export const PgRevenue = () => {
    let cookie = ReadCookieLocal();

    const [iuranmembers, setIuranMembers] = useState([])
    const [donasimembers, setDonasiMembers] = useState([])

    const getDataIuranMembers = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.iuranmembersendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    const getDataDonasiMembers = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.donasiendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((err) => console.log(err))
        return response
    }

    useEffect(() => {
        getDataIuranMembers()
            .then((isi) => {
                // console.log(isi);
                setIuranMembers(isi)
            })
            .catch((err) => console.log(err))
        getDataDonasiMembers()
            .then((isi) => {
                // console.log(isi);
                setDonasiMembers(isi)
            })
            .catch((err) => console.log(err))
        console.log(iuranmembers.iuranmembers)
        console.log(donasimembers.donations)
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
                justifyContent: 'center',
                backgroundColor: '#0f172a',
            },
        },
    };

    const columns = [
        {
            name: "Nama anggota",
            selector: row => row.namaanggota,
        },
        {
            name: "Nomor anggota",
            selector: row => row.nomoranggota,
        },
        {
            name: "Tahun keanggotaan",
            selector: row => row.tahun,
        },
        {
            name: "Jumlah iuran",
            selector: row => Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.jumlahiuran)
        },
        {
            name: "Bank pengirim",
            selector: row => row.bankpengirim,
        },
        {
            name: "Bukti transfer",
            selector: row => row.iuranimgurl,
        },
        {
            name: "Created",
            selector: row => row.created_at,
        },
    ]

    const columndonations = [
        {
            name: "Nama donatur",
            selector: row => {
                return <ShowUsername userid={row.donatur_id} token={cookie.token} display="name" />
            },
        },
        {
            name: "Bank pengirim",
            selector: row => row.bankpengirim,
        },
        {
            name: "Jumlah donasi",
            selector: row => Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.jumlahdonasi),
        },
        {
            name: "Rekening tujuan",
            selector: row => row.rektujuan
        },
        {
            name: "Bukti transfer",
            selector: row => row.donasiimgurl,
        },
        {
            name: "Created",
            selector: row => row.created_at,
        },
    ]

    const downloadExcelIuranMember = (data) => {
        handleDownloadExcel(data, "iuranmember", "Iuran_Member_KartUNS")
    };

    const downloadExcelDonasiMember = (data) => {
        handleDownloadExcel(data, "donasimember", "Donasi_Member_KartUNS")
    };

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Revenue Layanan</h3>
                <div className="text-slate-500 mt-5">
                    <div className="flex justify-between mb-4 px-4">
                        <h3 className="font-bold text-left text-base text-green-500">Data Iuran Member</h3>
                        {
                            iuranmembers && iuranmembers.iuranmembers !== undefined && iuranmembers.iuranmembers.length > 0 ?
                                <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelIuranMember(iuranmembers.iuranmembers)}>Export Data Iuran</button>
                                :
                                ""
                        }
                    </div>
                    {iuranmembers && iuranmembers.iuranmembers !== undefined && iuranmembers.iuranmembers.length > 0 ?
                        <div className="px-4 rounded-lg">
                            <DataTable
                                columns={columns}
                                data={iuranmembers.iuranmembers}
                                theme="kartunsdark"
                                pagination
                                customStyles={customStyles}
                            />
                        </div>
                        :
                        <div className="px-4 text-slate-500">Belum ada data iuran member.</div>
                    }
                </div>
                <div className="mt-5 pb-10">
                    <div className="flex justify-between mb-4 px-4">
                        <h3 className="font-bold text-left text-base text-green-500">Data Donasi Alumni dan Mahasiswa</h3>
                        {
                            donasimembers && donasimembers.donations !== undefined && donasimembers.donations.length > 0 ?
                                <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelDonasiMember(donasimembers.donations)}>Export Data Donasi</button>
                                :
                                ""
                        }
                    </div>
                    {
                        donasimembers && donasimembers.donations !== undefined && donasimembers.donations.length > 0 ?
                            <div className="px-4 rounded-lg">
                                <DataTable
                                    columns={columndonations}
                                    data={donasimembers.donations}
                                    theme="kartunsdark"
                                    pagination
                                    customStyles={customStyles}
                                />
                            </div>
                            :
                            <div className="px-4 text-slate-500">Belum ada data donasi member.</div>
                    }

                </div>
            </div>
        </>
    )
}