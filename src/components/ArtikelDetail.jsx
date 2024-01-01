import { useState, useEffect } from "react"
import { APIURLConfig } from "../config"
import { CreateStatusCookie, ReadCookie } from "../config/utils"

export const ArtikelDetail = (props) => {
    const artikelid = props.artikelid

    const [artikel, setArtikel] = useState()

    let cookie = ReadCookie()

    const getArticle = () => {
        let response = fetch(APIURLConfig.baseurl + APIURLConfig.articleendpoint + artikelid, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.token}`
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
        CreateStatusCookie("Detail Artikel");
        getArticle()
            .then((isi) => {
                // console.log("Isi artikel: ",isi.articles);
                setArtikel(isi.article)
            })
            .catch((err) => console.log(err))
        // console.log("Setelah diisi baru", artikel)
    }, [])

    return (
        <>
            <div>
                {artikel && artikel !== undefined ?
                    <div>
                        <h3>{artikel.articletitle}</h3>
                        <div>
                            {artikel.articledesc}
                        </div>
                    </div>
                    :
                    ""
                }
            </div>
        </>
    )
}