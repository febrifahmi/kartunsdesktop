import { appversion } from "../config"
import { ReadCookie, ReadCookieLocal } from "../config/utils"
import { InfoModulAlumni } from "./InfoModulAlumni"
import { InfoModulPengurus } from "./InfoModulPengurus"
import { LogoKartUNS } from "./LogoKartUNS"
import { CopyrightModal } from "./CopyrightModal"

export const StartingPage = () => {
    return (
        <>
            <div className="px-28">
                <h3 className="font-bold text-center text-lg text-sky-500">Selamat Datang di KartUNS Desktop!</h3>
                <div className="flex flex-col mt-4 mb-16 text-slate-400">
                    <div className="flex justify-center">
                        <div className="w-1/6 my-6">
                            <LogoKartUNS />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-base text-sky-500">Tentang Aplikasi</h3>
                        <p>Aplikasi <span className="text-green-500 font-bold">KartUNS Desktop</span> versi {appversion} ini dikembangkan dengan maksud memudahkan proses bisnis organisasi KartUNS sekaligus menjadi sistem penggerak keberlanjutan program dan kegiatan KartUNS di masa mendatang.</p>
                        <p>Berbekal sistem informasi yang sederhana namun fungsional, KartUNS diharapkan dapat bertransformasi menjadi organisasi ikatan alumni yang dapat memberikan nilai tambah (<span className="italic">added value</span>) yang jauh lebih besar lagi bagi anggotanya, baik alumni, mahasiswa aktif, maupun <span className="italic">stakeholder</span> terkait lainnya.</p>
                        <h3 className="font-bold text-base text-sky-500">Panduan Singkat Penggunaan KartUNS Desktop</h3>
                        <h4 className="font-bold text-base text-slate-300">1. Memulai Aplikasi</h4>
                        <p>Pada saat awal memulai aplikasi anda akan masuk dalam halaman <span className="text-sky-500">Login</span>. Apabila anda belum terdaftar di dalam sistem, anda dapat klik link <span className="text-sky-500">Daftar</span> untuk menuju ke laman registrasi. Status pendaftaran anda akan dikonfirmasi kemudian oleh Admin sistem.</p>
                        <h4 className="font-bold text-base text-slate-300">2. Modul dalam Aplikasi</h4>
                        <div>
                            {ReadCookieLocal().isadmin === "true" ?
                                <div>

                                </div> : ""
                            }
                            {ReadCookieLocal().ispengurus === "true" ?
                                <div>
                                    <InfoModulPengurus versi={appversion} />
                                </div> : ""
                            }
                            {ReadCookieLocal().isalumni === "true" ?
                                <div>
                                    <InfoModulAlumni versi={appversion} />
                                </div> : ""
                            }
                        </div>
                    </div>
                </div>
                <CopyrightModal />
            </div>
        </>
    )
}