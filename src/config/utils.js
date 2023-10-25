import Cookies from 'universal-cookie';
import Resizer from "react-image-file-resizer";

export const SaveCookie = (data) => {
    const cookies = new Cookies();
    cookies.set("token", data.access_token, { maxAge: 900 })
    cookies.set("username", data.logged_in_as, { maxAge: 900 })
    cookies.set("iduser", data.iduser, { maxAge: 900 })
    cookies.set("name", data.name, { maxAge: 900 })
    cookies.set("email", data.useremail, { maxAge: 900 })
    cookies.set("tentang", data.tentang, { maxAge: 900 })
    cookies.set("avatar", data.avatar, { maxAge: 900 })
    cookies.set("is_alumni", data.is_alumni, { maxAge: 900 })
    cookies.set("is_pengurus", data.is_pengurus, { maxAge: 900 })
    cookies.set("is_trainer", data.is_trainer, { maxAge: 900 })
    cookies.set("is_admin", data.is_admin, { maxAge: 900 })
    // console.log("Name: " + cookies.get('name'));
}

export const CreateStatusCookie = (status) => {
    const cookies = new Cookies();
    cookies.set("status", status, { maxAge: 900 })
}

export const ReadStatusCookie = () => {
    const cookies = new Cookies();
    const status = cookies.get("status")
    return status
}

export const RemoveStatusCookie = () => {
    const cookies = new Cookies();
    cookies.remove("status", { maxAge: 900 })
}

export const ReadCookie = () => {
    const cookies = new Cookies();
    const token = cookies.get("token")
    const username = cookies.get("username")
    const iduser = cookies.get("iduser")
    const name = cookies.get("name")
    const email = cookies.get("email")
    const tentang = cookies.get("tentang")
    const avatar = cookies.get("avatar")
    const isalumni = cookies.get("is_alumni")
    const ispengurus = cookies.get("is_pengurus")
    const istrainer = cookies.get("is_trainer")
    const isadmin = cookies.get("is_admin")
    return {
        token,
        username,
        iduser,
        name,
        email,
        tentang,
        avatar,
        isalumni,
        ispengurus,
        istrainer,
        isadmin,
    }
}

export const RemoveCookie = () => {
    const cookies = new Cookies();
    cookies.remove("token", { maxAge: 900 })
    cookies.remove("username", { maxAge: 900 })
    cookies.remove("iduser", { maxAge: 900 })
    cookies.remove("name", { maxAge: 900 })
    cookies.remove("email", { maxAge: 900 })
    cookies.remove("tentang", { maxAge: 900 })
    cookies.remove("avatar", { maxAge: 900 })
    cookies.remove("isalumni", { maxAge: 900 })
    cookies.remove("ispengurus", { maxAge: 900 })
    cookies.remove("istrainer", { maxAge: 900 })
    cookies.remove("isadmin", { maxAge: 900 })
    if(cookies.get("status", { maxAge: 900 }) !== undefined){
        cookies.remove("status", { maxAge: 900 })
    }
}

export const resizeImage = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 400, 300, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    }, 'base64' );
});

