import { useEffect, useState } from "react"
import { ProfilDetail } from "../ProfilDetail"
import { ProfilEdit } from "../ProfilEdit"
import { UbahPassword } from "../ProfilUbahPassword"

export const AdmProfil = (props) => {
    const getstatus = props.getstatus
    const [update, setUpdate] = useState(false)
    const [changepass, setChangePass] = useState(false)
    const [datastatus, setDataStatus] = useState(false)
    const [passupdated, setPassUpdated] = useState(false)

    const getProfilEditStatus = (status) => {
        if (status === "submitted") {
            setDataStatus(true)
            return true
        } else {
            setDataStatus(false)
            return false
        }
    }

    const getPassUpdateStatus = (status) => {
        if (status === "submitted") {
            setPassUpdated(true)
            return true
        } else {
            setPassUpdated(false)
            return false
        }
    }

    useEffect(() => {
        getstatus(datastatus);
        setDataStatus(false);
        setChangePass(false);
        setPassUpdated(false);
    }, [passupdated])

    console.log(update)
    return (
        <>
            <div className="px-5">
                <h3 className="font-bold text-center text-lg text-green-500">Detail Profil</h3>
                <div className="flex flex-col pb-10 gap-4">
                    {
                        update === false ?
                            <ProfilDetail readstatus={datastatus} />
                            :
                            <ProfilEdit status={getProfilEditStatus} />
                    }
                    {
                        changepass === true ?
                            <UbahPassword status={getPassUpdateStatus} />
                            :
                            ""
                    }
                    <div className="flex gap-4 justify-center">
                        {
                            update === false ?
                                <button className="w-28 bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4" onClick={() => setUpdate(true)}>Edit Profil</button>
                                :
                                <button className="w-28 bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4" onClick={() => setUpdate(false)}>Cancel</button>
                        }
                        {
                            changepass === false && passupdated === false ?
                                <button className="w-36 bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4" onClick={() => setChangePass(true)}>Ubah Password</button>
                                :
                                <button className="w-28 bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md text-white font-bold text-sm my-4" onClick={() => setChangePass(false)}>Cancel</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}