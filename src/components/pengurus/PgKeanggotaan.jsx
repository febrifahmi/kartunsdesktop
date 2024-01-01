import { useEffect, useState, useRef } from "react";
import { APIURLConfig } from "../../config"
import { ReadCookieLocal, handleDownloadExcel, resizeImage } from "../../config/utils"
import DataTable, { createTheme } from 'react-data-table-component';
import { MdLockReset, MdDelete, MdEditSquare } from "react-icons/md";
import { ShowUsername } from "../GetUsername";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from '@tinymce/tinymce-react';

export const PgKeanggotaan = () => {
    let token = ReadCookieLocal().token;
    const [users, getUsers] = useState([])
    const [members, getMembers] = useState([])
    const [showedit, setShowEdit] = useState(-1)
    const [selecteduser, setSelectedUser] = useState({})
    const [userupdatestatus, setUserUpdateStatus] = useState(false)

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

    const getAllMembers = () => {
        const data = fetch(APIURLConfig.baseurl + APIURLConfig.membersendpoint + "all", {
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
        // console.log(users)
        getAllMembers().then((data) => getMembers(data));
        console.log(members)
        if(userupdatestatus === true){
            setUserUpdateStatus(false)
        }
    }, [userupdatestatus])

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
                        <span className="px-2 rounded-full bg-green-700 text-white text-xs font-bold">yes</span>
                    )
                } else {
                    return (
                        <span className="px-2 rounded-full bg-orange-700 text-white text-xs font-bold">no</span>
                    )
                }
            }
        },
        {
            name: "Pengurus",
            selector: row => {
                if (row.is_pengurus === true) {
                    return (
                        <span className="px-2 rounded-full bg-green-700 text-white text-xs font-bold">yes</span>
                    )
                } else {
                    return (
                        <span className="px-2 rounded-full bg-orange-700 text-white text-xs font-bold">no</span>
                    )
                }
            }
        },
        {
            name: "Mahasiswa",
            selector: row => {
                if (row.is_mhsarsuns === true) {
                    return (
                        <span className="px-2 rounded-full bg-green-700 text-white text-xs font-bold">yes</span>
                    )
                } else {
                    return (
                        <span className="px-2 rounded-full bg-orange-700 text-white text-xs font-bold">no</span>
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
                        <button className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg" onClick={() => setShowEdit(row.iduser)}><MdEditSquare /></button>
                        <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg" onClick={() => console.log(row.iduser)}><MdDelete /></button>
                        <button className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg" onClick={() => console.log(row.iduser)}><MdLockReset /></button>
                    </div>
                )
            },
        },
    ]

    const columnsmember = [
        {
            name: "Nama",
            selector: row => {
                return <ShowUsername userid={row.user_id} token={token} display="name" />
            },
        },
        {
            name: "Nomor Anggota",
            selector: row => row.nomoranggota,
        },
        {
            name: "Valid from",
            selector: row => row.validfrom,
        },
        {
            name: "Valid thru",
            selector: row => row.validthru,
        },
        {
            name: "Alamat",
            selector: row => row.alamat,
        },
        {
            name: "Telp",
            selector: row => row.notelp.toString(),
        },
        {
            name: "Pekerjaan",
            selector: row => row.pekerjaan,
        },
        {
            name: "Perusahaan",
            selector: row => row.perusahaan,
        },
        {
            name: "Kantor",
            selector: row => row.kantor,
        },
        {
            name: "Alamat Kantor",
            selector: row => row.alamatkantor,
        },
        {
            name: "Created",
            selector: row => 
            // row.created_at
            {
                return (
                    <span>
                        {
                            Intl.DateTimeFormat("id-ID", {
                                dateStyle: 'medium',
                                timeStyle: 'long',
                                timeZone: 'Asia/Jakarta',
                            }).format(row.created_at)
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
        handleDownloadExcel(data, "datauser", "Data_User_KartUNS")
    };

    const downloadExcelMember = (data) => {
        handleDownloadExcel(data, "datamember", "Data_Member_KartUNS")
    };


    // edit/update user data
    const EditUserData = (props) => {
        const userid = props.userid
        const userdata = props.data

        const setstatus = props.status
        const editorRef = useRef(null);
        const log = () => {
            if (editorRef.current) {
                console.log(editorRef.current.getContent());
            }
        };

        let cookie = ReadCookieLocal()

        const failed = (errmsg) => toast.error(errmsg);
        const success = (msg) => toast.success(msg);

        const [tentang, setTentang] = useState("")
        const [firstname, setFirstName] = useState("")
        const [lastname, setLastName] = useState("")
        const [email, setEmail] = useState("")
        const [newpass, setNewPass] = useState("")
        const [profpic, setProfpic] = useState("")
        const [image, setImage] = useState()
        const [ispengurus, setIsPengurus] = useState(0)
        // const [submitted, setSubmitted] = useState(false)

        var newFormData = new FormData();

        const handleChange = (e) => {
            // ... get data form
            newFormData[e.target.name] = e.target.value.trim()
            if (newFormData["first_name"] !== undefined) {
                setFirstName(newFormData["first_name"])
            }
            if (newFormData["last_name"] !== undefined) {
                setLastName(newFormData["last_name"])
            }
            if (newFormData["email"] !== undefined) {
                setEmail(newFormData["email"])
            }
            if (newFormData["ispengurus"] !== undefined) {
                setIsPengurus(newFormData["ispengurus"])
            }
            console.log({
                fist_name: firstname,
                last_name: lastname,
                email: email,
                profpic: profpic,
                tentang: tentang,
                is_pengurus: ispengurus,
                file: image,
            })
        }

        const handleImageChange = async (event) => {
            const file = event.target.files[0];
            const image = await resizeImage(file);
            // console.log(image);
            setProfpic(file.name);
            setImage(image);
        }

        const getSelectedUser = (id, users) => {
            users.forEach(element => {
                if (element.iduser === id) {
                    setSelectedUser(element)
                }
            });
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            // console.log(e.target);
            console.log({
                "first_name": firstname,
                "last_name": lastname,
                "email": email,
                "profpic": profpic,
                "tentang": tentang,
                "is_pengurus": ispengurus,
                "file": image,
            })

            // ... submit to RestAPI using fetch api
            const response = await fetch(APIURLConfig.baseurl + APIURLConfig.userendpoint + "update/" + userid, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                },
                body: JSON.stringify({
                    "first_name": firstname,
                    "last_name": lastname,
                    "email": email,
                    "profpic": profpic,
                    "tentang": tentang,
                    "is_pengurus": ispengurus,
                    "file": image,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return data
                })
                .catch((err) => console.log(err))
            if (response.code === "success") {
                success("Sukses melakukan pembaruan data pengguna.")
                // setSubmitted(true)
                // setstatus("submitted")
                setUserUpdateStatus(true)
            } else {
                failed("Gagal melakukan pembaruan data pengguna.")
            }
            return response
        }

        useEffect(() => {
            getSelectedUser(userid, users.users);
            console.log("Selected user: ", selecteduser)
            if(userupdatestatus === true){
                setShowEdit(-1)
            }
        }, [userupdatestatus])

        return (
            <>
                <div>
                    <hr className="border-slate-700 my-2 border-dotted" />
                    <h3 className="font-bold text-left text-base text-green-500 px-4">Update/Edit Data User</h3>
                    <div className="mt-5 px-5 gap-2 flex flex-col">
                        <form method="put">
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="first_name" type={"text"} placeholder={" Update nama depan anda di sini (" + userdata.first_name + ")"} onChange={handleChange} />
                            </div>
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="last_name" type={"text"} placeholder={" Update nama belakang anda di sini (" + userdata.last_name + ")"} onChange={handleChange} />
                            </div>
                            <div className="flex pt-6 items-center gap-4 text-slate-500">
                                <input className="grow rounded h-12" name="email" type={"text"} placeholder={" Update email anda di sini (" + userdata.email + ")"} onChange={handleChange} />
                            </div>
                            <div className="flex items-center py-6">
                                <label className="text-white mr-4">Set sebagai pengurus KartUNS?</label>
                                <select name="ispengurus" className="text-slate-600 h-10 rounded-md" onChange={handleChange} >
                                    <option value={1}>Ya</option>
                                    <option value={0}>Tidak</option>
                                </select>
                            </div>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={userdata && userdata.tentang !== null && userdata.tentang !== undefined && userdata.tentang !== "" ? userdata.tentang : "<p>Silahkan tuliskan tentang profil pengguna di sini, usaha pengguna, dan sebagainya.</p>"}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink',
                                        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                        'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={(newText) => setTentang(newText)}
                            />
                            <input type="hidden" id="tentang" name="tentang" value={tentang}></input>
                            <div className="text-white bg-gray-darker rounded-xl flex py-4 px-4 my-4 border-solid border-gray-darker border-[1px]">
                                <div className='flex'>
                                    <label className='mr-6'>Upload profile image baru (max. <span className='text-red'>500Kb</span>) <span className='text-red-500'>*)</span></label>
                                    <input type="file" name="imagefile" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4' onClick={handleSubmit}>Update Profil</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Data Keanggotaan Sistem KartUNS</h3>
                <div className="mt-5">
                    <div className="flex justify-between mb-4 px-4">
                        <h3 className="font-bold text-left text-base text-green-500 px-4">Data User</h3>
                        {
                            users && users.users !== undefined && users.users.length > 0 ?
                                <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelUser(users.users)}>Export User</button>
                                :
                                ""
                        }
                    </div>
                    {users && users.users !== undefined && users.users.length > 0 ?
                        <div className="px-4 rounded-lg">
                            <DataTable
                                columns={columns}
                                data={users.users.filter((item) => {
                                    if (item.is_admin === false) {
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
                <div className="mt-5 pb-10">
                    <div className="flex justify-between mb-4 px-4">
                        <h3 className="font-bold text-left text-base text-green-500 px-4">Data Member</h3>
                        {
                            members && members.members !== undefined && members.members.length > 0 ?
                                <button className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm" onClick={() => downloadExcelMember(members.members)}>Export Member</button>
                                :
                                ""
                        }
                    </div>
                    {members && members.members !== undefined && members.members.length > 0 ?
                        <div className="px-4 rounded-lg">
                            <DataTable
                                columns={columnsmember}
                                data={members.members}
                                theme="kartunsdark"
                                pagination
                                customStyles={customStyles}
                            />
                        </div>
                        :
                        ""
                    }
                </div>
                <div>
                    {showedit && showedit !== undefined && showedit !== -1 ?
                        <div>
                            <EditUserData userid={showedit} data={selecteduser} />
                        </div>
                        :
                        ""
                    }
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}