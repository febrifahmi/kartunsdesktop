import { APIURLConfig } from "../config"

export const LogoKartUNS = (props) => {
    const width = props.width
    
    return(
        <>
            <img className="object-full" src={APIURLConfig.baseurl+"static/img/logokartunsinvert.png"} width={width}></img>
        </>
    )
}