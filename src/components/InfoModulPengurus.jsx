export const InfoModulPengurus = (props) => {
    const version = props.versi;
    return (
        <>
            <div>
                <p>Beberapa Modul/Fungsi yang berguna untuk menjalankan proses bisnis KartUNS disediakan bagi Pengurus pada aplikasi KartUNS Desktop versi {version}, antara lain sebagai berikut:</p>
                <ol className="list-decimal px-8">
                    <li>
                        <p className="font-bold text-green-500">Cover Story</p>
                        <p>Modul/Fungsi Cover Story berfungsi untuk manajemen informasi yang merupakan berita utama (<span className="italic">cover story</span>) Keluarga Alumni Arsitektur UNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Persuratan</p>
                        <p>Modul/Fungsi Persuratan berfungsi untuk manajemen penyimpanan file Surat Masuk yang diterima dan juga Surat Keluar yang dikeluarkan oleh KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Agenda</p>
                        <p>Modul/Fungsi Agenda berguna untuk manajemen informasi Agenda kegiatan yang akan dilaksanakan oleh KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Artikel</p>
                        <p>Modul/Fungsi Artikel digunakan untuk pengaturan informasi berupa Artikel secara umum yang dituliskan dan ditayangkan di dalam aplikasi KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Anggaran</p>
                        <p>Modul/Fungsi Anggaran meliputi dua submodul yaitu modul untuk pembuatan/pengaturan Rencana Anggaran Biaya (RAB) kegiatan KartUNS dan modul untuk pencatatan Arus Kas KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Pengumuman</p>
                        <p>Modul/Fungsi Pengumuman berguna untuk manajemen informasi berbagai pengumuman yang disampaikan oleh KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Kepengurusan</p>
                        <p>Modul/Fungsi Kepengurusan digunakan untuk pengaturan informasi pengurus KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Keanggotaan</p>
                        <p>Modul/Fungsi Keanggotaan digunakan untuk pengaturan informasi anggota KartUNS dan alumni KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Ads Approval</p>
                        <p>Modul/Fungsi Ads Approval berguna untuk pengaturan persetujuan iklan yang diajukan oleh pengguna layanan KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Job Offers</p>
                        <p>Modul/Fungsi Job Offers berguna untuk manajemen dan verifikasi informasi lowongan pekerjaan yang ditambahkan oleh pengguna layanan KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Training</p>
                        <p>Modul/Fungsi Training berfungsi untuk pengaturan/manajemen Training, Trainer dan Trainee.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Revenue Layanan</p>
                        <p>Modul/Fungsi Revenue Layanan merupakan dasbor informasi revenue layanan yang diberikan oleh KartUNS (hanya mencakup layanan yang terdapat dalam sistem otomatis KartUNS).</p>
                    </li>
                </ol>
            </div>
        </>
    )
}