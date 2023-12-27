import { useState, useEffect, useMemo } from "react"
import { APIURLConfig } from "../../config"
import { ReadCookieLocal } from "../../config/utils"
import DataTable from 'react-data-table-component';

export const PgRevenue = () => {
    let cookie = ReadCookieLocal();

    const [iuranmembers, setIuranMembers] = useState([])

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

    useEffect(() => {
        getDataIuranMembers()
            .then((isi) => {
                // console.log(isi);
                setIuranMembers(isi)
            })
            .catch((err) => console.log(err))
        console.log(iuranmembers.iuranmembers)
    }, [])

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

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Revenue Layanan</h3>
                <div className="text-slate-500 mt-5 rounded-lg">
                    {iuranmembers.iuranmembers !== undefined && iuranmembers.iuranmembers.length > 0 ?
                        <DataTable
                            columns={columns}
                            data={iuranmembers.iuranmembers}
                            theme="light"
                        />
                        :
                        ""
                    }
                </div>
            </div>
        </>
    )
}