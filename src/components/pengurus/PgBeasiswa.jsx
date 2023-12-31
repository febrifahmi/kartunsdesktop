import { useState, useEffect } from "react"
import { ReadCookieLocal, downloadPDF, handleDownloadExcel } from "../../config/utils"
import { APIURLConfig } from "../../config";
import DataTable, { createTheme } from 'react-data-table-component';

export const PgBeasiswa = () => {
    let cookie = ReadCookieLocal();

    const [pengajuanbsw, setPengajuanBsw] = useState([])

    const getPengajuanBsw = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.pengajuanbeasiswaendpoint + "all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
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
        getPengajuanBsw()
            .then((isi) => {
                setPengajuanBsw(isi)
            })
            .catch((err) => console.log(err))
        console.log("Data beasiswa: ", pengajuanbsw)
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
            name: "Nama mahasiswa/i",
            selector: row => row.namamahasiswa,
        },
        {
            name: "Batch beasiswa",
            selector: row => row.batchbeasiswa,
        },
        {
            name: "File proposal",
            selector: row => {
                return (
                    <button className="bg-green-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/berkasbeasiswa/" + row.dokproposalbsw)}>Unduh</button>
                )
            },
        },
        {
            name: "File CV",
            selector: row => {
                return (
                    <button className="bg-orange-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/berkasbeasiswa/" + row.dokcv)}>Unduh</button>
                )
            },
        },
        {
            name: "File Portofolio",
            selector: row => {
                return (
                    <button className="bg-sky-700 px-2 rounded-full text-xs font-bold text-white" onClick={() => downloadPDF(APIURLConfig.baseurl + "static/berkasbeasiswa/" + row.dokportofolio)}>Unduh</button>
                )
            },
        },
        {
            name: "Hasil seleksi",
            selector: row => row.hasilseleksiakhir,
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
                    <div className="flex flex-col gap-2 text-white my-1">
                        <button className="p-2 bg-green-500 hover:bg-green-600 rounded-lg" onClick={() => console.log(row.idpengajuan)}>Terima</button>
                        <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => console.log(row.idpengajuan)}>Tolak</button>
                    </div>
                )
            },
        },
    ]

    const downloadExcelBeasiswa = (data) => {
        handleDownloadExcel(data, "datapemohonbeasiswa", "Data_Pemohon_Beasiswa_KartUNS")
    };

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Penerimaan Beasiswa</h3>
                <div className="text-slate-500 mt-5">
                    <div className="flex justify-between mb-4 px-4">
                        <h3 className="font-bold text-left text-base text-green-500">Daftar Permohonan Beasiswa</h3>
                        {
                            pengajuanbsw && pengajuanbsw.pengajuanbeasiswas !== undefined && pengajuanbsw.pengajuanbeasiswas.length > 0 ?
                                <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelBeasiswa(pengajuanbsw.pengajuanbeasiswas)}>Export Data</button>
                                :
                                ""
                        }
                    </div>
                    {pengajuanbsw && pengajuanbsw.pengajuanbeasiswas !== undefined && pengajuanbsw.pengajuanbeasiswas.length > 0 ?
                        <div className="px-4 rounded-lg">
                            <DataTable
                                columns={columns}
                                data={pengajuanbsw.pengajuanbeasiswas}
                                theme="kartunsdark"
                                pagination
                                customStyles={customStyles}
                            />
                        </div>
                        :
                        "Belum ada datanya"
                    }
                </div>
            </div>
        </>
    )
}