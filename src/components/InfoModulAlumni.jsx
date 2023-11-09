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
                        <p>Modul/Fungsi Pasang Iklan digunakan untuk pengaturan informasi berupa iklan secara umum yang dituliskan dan ditayangkan di dalam aplikasi KartUNS. Pengajuan iklan sesuai dengan peraturan dan ketentuan yang berlaku. Isi iklan sepenuhnya merupakan taggungjawab pembuat iklan.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Lowongan</p>
                        <p>Modul/Fungsi Lowongan berguna untuk mencari penawaran lowongan pekerjaan baik part time dan full time serta lowongan magang.</p>
                    </li>
                </ol>
            </div>
        </>
    )
}