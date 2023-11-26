export const InfoModulAlumni = (props) => {
    const version = props.versi;
    return (
        <>
            <div>
                <p>Beberapa Modul/Fungsi yang berguna bagi Alumni pada aplikasi KartUNS Desktop versi {version}, antara lain sebagai berikut:</p>
                <ol className="list-decimal px-8">
                    <li>
                        <p className="font-bold text-green-500">Profil</p>
                        <p>Modul/Fungsi Profil berfungsi untuk manajemen informasi profil anda sebagai Alumni.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Membership</p>
                        <p>Modul/Fungsi Membership berfungsi untuk pengaturan keanggotaan/membership anda dalam KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Tambah Ilmu</p>
                        <p>Modul/Fungsi Tambah Ilmu berguna untuk manajemen training/webinar/pelatihan yang anda ikuti yang dilaksanakan oleh KartUNS/pihak ketiga yang bekerjasama dengan KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Pasang Iklan</p>
                        <p>Kenalkan usaha anda kepada seluruh alumni, dosen dan mahasiswa Arsitektur UNS serta pengguna aplikasi KartUNS lainnya.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Lowongan</p>
                        <p>Modul/Fungsi Lowongan berguna untuk mencari penawaran lowongan pekerjaan baik part time dan full time serta lowongan magang.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Donasi</p>
                        <p>Mulai berpartisipasi untuk memberikan nilai manfaat lebih untuk seluruh alumni dan mahasiswa Arsitektur UNS serta masyarakat pada umumnya.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Store</p>
                        <p>Dukung keberlanjutan organisasi Keluarga Alumni Arsitektur UNS dengan berbelanja produk-produk unik yang selalu ngarsiteki.</p>
                    </li>
                </ol>
            </div>
        </>
    )
}