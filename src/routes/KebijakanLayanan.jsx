import { Purify } from "../config/utils";
import { useNavigate } from "react-router-dom";
import { CreateStatusCookie } from "../config/utils";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";

export const KebijakanLayanan = () => {
    const navigate = useNavigate()
    const landing = () => navigate("/")
    const kebijakan = () => navigate("/kebijakan")

    CreateStatusCookie("Kebijakan Layanan")


    return (
        <>
            <div className="bg-slate-900 flex flex-col">
                <Breadcrumb />
                <div className="bg-slate-800 px-40 pt-20 m-2 rounded-md">
                    <h3 className="font-bold text-center text-xl text-green-500">Kebijakan Layanan</h3>
                    <div className="mt-10 w-full">
                        <p className="mb-8">Selamat datang di aplikasi KartUNS Desktop, sebuah aplikasi yang memungkinkan Anda untuk berinteraksi dengan keluarga alumni arsitektur Universitas Sebelas Maret (UNS). Aplikasi ini disediakan oleh Keluarga Alumni Arsitektur UNS (KartUNS), sebuah organisasi nirlaba yang untuk penguatan peran alumni Arsitektur UNS terhadap seluruh pihak terkait baik secara internal (alumni, mahasiswa, dan kampus) maupun eksternal (masyarakat). Dengan mengunduh, menginstal, atau menggunakan aplikasi ini, Anda setuju untuk terikat oleh Kebijakan Layanan ini. Jika Anda tidak setuju dengan Kebijakan Layanan ini, Anda tidak diperbolehkan untuk menggunakan aplikasi ini.</p>
                        <h4 className="text-xl font-bold mb-8 ">1. Deskripsi Layanan</h4>
                        <p className="mb-8">
                            Aplikasi KartUNS Desktop adalah aplikasi yang dapat dijalankan di komputer atau laptop Anda. Aplikasi ini mengakses aplikasi <span className="italic">backend</span> KartUNS yang merupakan bagian tidak terpisahkan dari aplikasi KartUNS Desktop, yang terdapat di server pihak ketiga yang ditunjuk oleh KartUNS sebagai penyedia layanan hosting aplikasi. Aplikasi ini memungkinkan Anda untuk:
                            <ul className="pl-4 list-disc">
                                <li>Mengakses informasi terkini tentang kegiatan, program, dan berita dari KartUNS dan UNS</li>
                                <li>Berkomunikasi dengan anggota KartUNS lainnya melalui fitur yang terdapat di dalam aplikasi</li>
                                <li>Berbagi pengalaman, pengetahuan, dan karya Anda dengan anggota KartUNS lainnya</li>
                                <li>Mengikuti webinar, workshop, dan pelatihan yang diselenggarakan oleh KartUNS dan UNS</li>
                                <li>Mendapatkan manfaat dan fasilitas eksklusif dari KartUNS dan UNS, seperti diskon, beasiswa, dan sertifikat</li>
                            </ul>
                        </p>
                        <p className="mb-8">Untuk menggunakan aplikasi ini, Anda harus mendaftar sebagai anggota KartUNS dengan mengisi formulir pendaftaran yang tersedia di aplikasi. Anda harus memberikan informasi yang benar, akurat, dan lengkap tentang diri Anda. Anda juga harus menjaga kerahasiaan kata sandi dan akun Anda. Anda bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda. Anda harus segera memberi tahu KartUNS jika Anda mengetahui atau menduga adanya penggunaan tidak sah atau pelanggaran keamanan akun Anda.</p>
                        <h4 className="text-xl font-bold mb-8 ">2. Syarat dan Ketentuan Penggunaan Layanan</h4>
                        <p className="mb-8">Dengan menggunakan aplikasi ini, Anda setuju untuk mematuhi syarat dan ketentuan penggunaan layanan berikut:
                            <ul className="list-disc pl-4">
                                <li>Anda hanya dapat menggunakan aplikasi ini untuk tujuan yang sah dan sesuai dengan Kebijakan Layanan ini</li>
                                <li>Anda tidak boleh menggunakan aplikasi ini untuk melakukan tindakan yang melanggar hukum, hak, atau kepentingan KartUNS, UNS, anggota KartUNS lainnya, atau pihak ketiga mana pun</li>
                                <li>Anda tidak boleh menggunakan aplikasi ini untuk mengirim, menyimpan, atau membagikan konten yang melanggar hukum, mengandung unsur SARA, pornografi, kekerasan, ancaman, pelecehan, pencemaran nama baik, atau melanggar hak kekayaan intelektual, privasi, atau publisitas pihak lain</li>
                                <li>Anda tidak boleh menggunakan aplikasi ini untuk mengganggu, merusak, atau mengakses tanpa izin sistem, jaringan, atau data KartUNS, UNS, anggota KartUNS lainnya, atau pihak ketiga mana pun</li>
                                <li>Anda tidak boleh menggunakan aplikasi ini untuk meniru, menipu, atau menyamar sebagai orang atau entitas lain</li>
                                <li>Anda tidak boleh menggunakan aplikasi ini untuk melakukan spam, phishing, atau aktivitas merugikan lainnya</li>
                                <li>Anda tidak boleh menggunakan aplikasi ini untuk mengubah, memodifikasi, mengadaptasi, menerjemahkan, menyalin, mereproduksi, mendistribusikan, menjual, menyewakan, atau mengeksploitasi aplikasi atau konten yang ada di dalamnya tanpa izin tertulis dari KartUNS</li>
                                <li>Anda tidak boleh menggunakan aplikasi ini untuk menciptakan aplikasi turunan atau bersaing dengan aplikasi ini</li>
                            </ul>
                        </p>
                        <p className="mb-8">KartUNS berhak untuk meninjau, mengedit, menghapus, atau menonaktifkan konten atau akun Anda jika dianggap melanggar syarat dan ketentuan penggunaan layanan ini. KartUNS juga berhak untuk menghentikan, menangguhkan, atau membatasi akses Anda ke aplikasi ini jika dianggap perlu untuk alasan hukum, teknis, atau operasional.</p>
                        <h4 className="text-xl font-bold mb-8 ">3. Hak Kekayaan Intelektual</h4>
                        <p className="mb-8">Aplikasi KartUNS Desktop dan semua konten, fitur, fungsi, desain, grafik, logo, nama, dan merek dagang yang ada di dalamnya adalah milik KartUNS atau pemberi lisensi mereka/pemegang lisensi masing-masing. Anda tidak memperoleh hak atau lisensi apa pun atas aplikasi atau konten tersebut, kecuali hak terbatas untuk menggunakan aplikasi sesuai dengan Kebijakan Layanan ini. Anda setuju untuk menghormati semua hak kekayaan intelektual yang terkait dengan aplikasi dan konten tersebut.</p>
                        <p className="mb-8">Anda tetap memiliki hak kekayaan intelektual atas konten yang Anda kirim, simpan, atau bagikan melalui aplikasi ini, seperti foto, video, teks, atau karya lainnya. Namun, dengan mengirim, menyimpan, atau membagikan konten tersebut, Anda memberikan KartUNS lisensi non-eksklusif, bebas royalti, dapat dialihkan, dan dapat disublisensikan untuk menggunakan, menyalin, memodifikasi, menampilkan, mendistribusikan, dan membuat karya turunan dari konten tersebut untuk tujuan operasional, promosi, atau peningkatan aplikasi. Anda juga memberikan anggota KartUNS lainnya hak untuk mengakses, melihat, dan menggunakan konten tersebut sesuai dengan pengaturan privasi yang Anda pilih.</p>
                        <p className="mb-8">Anda menyatakan dan menjamin bahwa Anda memiliki hak untuk mengirim, menyimpan, atau membagikan konten yang Anda kirim, simpan, atau bagikan melalui aplikasi ini, dan bahwa konten tersebut tidak melanggar hak kekayaan intelektual, privasi, atau publisitas pihak lain.</p>
                        <h4 className="text-xl font-bold mb-8 ">4. Tanggung Jawab dan Pembatasan Tanggung Jawab</h4>
                        <p className="mb-8">Aplikasi KartUNS Desktop disediakan "apa adanya" dan "sebagaimana tersedia" tanpa jaminan atau garansi apa pun, baik tersurat maupun tersirat, termasuk tapi tidak terbatas pada jaminan atau garansi mengenai ketersediaan, keakuratan, kelengkapan, keandalan, kemanfaatan, keamanan, kelayakan, atau bebas dari kesalahan aplikasi atau konten yang ada di dalamnya.</p>
                        <p className="mb-8">KartUNS, UNS, dan pihak terkait lainnya tidak bertanggung jawab atas kerugian, kerusakan, biaya, atau tuntutan hukum apa pun yang timbul atau berkaitan dengan penggunaan atau ketidakmampuan Anda menggunakan aplikasi ini, termasuk tapi tidak terbatas pada kerugian, kerusakan, biaya, atau tuntutan hukum yang disebabkan oleh:
                            <ul className="list-disc pl-4">
                                <li>Kesalahan, kelalaian, ketidakakuratan, atau ketidaktepatan aplikasi atau konten yang ada di dalamnya</li>
                                <li>Gangguan, penundaan, atau kegagalan dalam penyediaan atau pengoperasian aplikasi</li>
                                <li>Virus, malware, atau kode berbahaya lainnya yang dapat menginfeksi atau merusak perangkat Anda</li>
                                <li>Tindakan, konten, atau perilaku pihak ketiga, termasuk anggota KartUNS lainnya, yang menggunakan atau terhubung dengan aplikasi ini</li>
                                <li>Pelanggaran atau klaim yang berkaitan dengan hak kekayaan intelektual, privasi, atau publisitas pihak lain</li>
                                <li>Keputusan, tindakan, atau kelalaian Anda atau pihak ketiga yang berdasarkan atau dipengaruhi oleh aplikasi atau konten yang ada di dalamnya</li>
                            </ul>
                        </p>
                        <p className="mb-8">Batasan tanggung jawab ini berlaku sejauh diizinkan oleh hukum yang berlaku. Dalam hal apapun, tanggung jawab KartUNS, UNS, dan pihak terkait lainnya tidak akan melebihi jumlah yang Anda bayarkan untuk menggunakan aplikasi ini, jika ada.</p>
                        <h4 className="text-xl font-bold mb-8 ">5. Kebijakan Privasi dan Perlindungan Data Pribadi</h4>
                        <p className="mb-8">KartUNS menghargai dan melindungi privasi dan data pribadi Anda. KartUNS mengumpulkan, menyimpan, menggunakan, dan membagikan data pribadi Anda sesuai dengan Kebijakan Privasi yang dapat Anda akses di <span className="text-sky-500"><button onClick={kebijakan}>sini</button></span>. Dengan menggunakan aplikasi ini, Anda setuju dengan Kebijakan Privasi tersebut dan memberikan persetujuan Anda untuk pengolahan data pribadi Anda oleh KartUNS.</p>
                        <h4 className="text-xl font-bold mb-8 ">6. Cara Menghubungi KartUNS dan Menyelesaikan Sengketa</h4>
                        <p className="mb-8">Jika Anda memiliki pertanyaan, saran, keluhan, atau masukan tentang aplikasi ini, Anda dapat menghubungi KartUNS melalui email atau telepon kontak person yang terdapat di dalam aplikasi. KartUNS akan berusaha untuk merespons dan menyelesaikan masalah Anda sesegera mungkin.</p>
                        <p className="mb-8">Jika terjadi sengketa antara Anda dan KartUNS yang berkaitan dengan penggunaan aplikasi ini, Anda dan KartUNS setuju untuk menyelesaikannya secara damai dengan musyawarah mufakat secara kekeluargaan sebagai upaya final penyelesaian sengketa.</p>
                        <h4 className="text-xl font-bold mb-8 ">7. Perubahan Kebijakan Layanan</h4>
                        <p className="mb-8">KartUNS berhak untuk mengubah, memodifikasi, menambah, atau menghapus bagian mana pun dari Kebijakan Layanan ini sewaktu-waktu dan tanpa pemberitahuan sebelumnya. Perubahan Kebijakan Layanan ini akan berlaku segera setelah dipublikasikan di aplikasi ini. Dengan terus menggunakan aplikasi ini setelah perubahan tersebut, Anda setuju untuk terikat oleh Kebijakan Layanan yang telah diubah. Anda disarankan untuk meninjau Kebijakan Layanan ini secara berkala untuk mengetahui perubahan apa pun.</p>
                        <h4 className="text-xl font-bold mb-8 ">8. Hukum yang Berlaku dan Yurisdiksi</h4>
                        <p className="mb-8">Kebijakan Layanan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Anda dan KartUNS setuju untuk tunduk pada yurisdiksi eksklusif pengadilan negeri Surakarta untuk menyelesaikan segala sengketa yang timbul atau berkaitan dengan Kebijakan Layanan ini.</p>
                        <p className="mb-8">Terima kasih telah membaca Kebijakan Layanan ini. Kami harap Anda menikmati pengalaman menggunakan aplikasi KartUNS Desktop.</p>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md mb-8 text-white" onClick={landing}>Back</button>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}