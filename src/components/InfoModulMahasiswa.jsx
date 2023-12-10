export const InfoModulMahasiswa = (props) => {
    const version = props.versi;
    return (
        <>
            <div>
                <p>Beberapa Modul/Fungsi yang berguna bagi Mahasiswa pada aplikasi KartUNS Desktop versi {version}, antara lain sebagai berikut:</p>
                <ol className="list-decimal px-8">
                    <li>
                        <p className="font-bold text-green-500">Profil Mahasiswa</p>
                        <p>Modul/Fungsi Profil berfungsi untuk manajemen informasi profil anda sebagai user aplikasi KartUNS Desktop.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Ikut Pelatihan</p>
                        <p>Modul/Fungsi Tambah Ilmu berguna untuk manajemen training/webinar/pelatihan yang anda ikuti yang dilaksanakan oleh KartUNS/pihak ketiga yang bekerjasama dengan KartUNS.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Mau Magang/Kerja</p>
                        <p>Modul/Fungsi Lowongan berguna untuk mencari penawaran lowongan magang dan lowongan pekerjaan baik part time maupun full time.</p>
                    </li>
                    <li>
                        <p className="font-bold text-green-500">Beasiswa KartUNS</p>
                        <p>Anda mahasiswa/i berprestasi dan perlu dukungan berupa beasiswa, anda dapat mengajukan permohonan beasiswa KartUNS di sini.</p>
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