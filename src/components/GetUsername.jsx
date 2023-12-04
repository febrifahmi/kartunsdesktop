import { useState, useEffect } from "react"
import { APIURLConfig } from "../config";

export const ShowUsername = (props) => {
    const userid = props.userid
    const token = props.token

    const [username, setUsername] = useState("");

    const getUserName = () => {
        const response = fetch(APIURLConfig.baseurl + APIURLConfig.userendpoint + userid, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        getUserName().then((isi) => {
            // console.log(isi);
            setUsername(isi.user.username)
        })
        // console.log(username)
    }, [])

    return (
        <>
            <span>{username}</span>
        </>
    )
}