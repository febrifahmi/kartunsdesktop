import Cookies from 'universal-cookie';
import Resizer from "react-image-file-resizer";
import { useState } from 'react';
import * as DOMPurify from 'dompurify'

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

export const SaveCookieLocal = (data) => {
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", data.logged_in_as);
    localStorage.setItem("iduser", data.iduser);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.useremail);
    localStorage.setItem("tentang", data.tentang);
    localStorage.setItem("avatar", data.avatar);
    localStorage.setItem("is_alumni", data.is_alumni);
    localStorage.setItem("is_pengurus", data.is_pengurus);
    localStorage.setItem("is_trainer", data.is_trainer);
    localStorage.setItem("is_admin", data.is_admin);
    localStorage.setItem("is_mhsarsuns", data.is_mhsarsuns);
}

export const CreateStatusCookie = (status) => {
    const cookies = new Cookies();
    cookies.set("status", status, { maxAge: 900 })
}

export const CreateStatusCookieLocal = (status) => {
    localStorage.setItem("status", status);
}

export const ReadStatusCookie = () => {
    const cookies = new Cookies();
    const status = cookies.get("status")
    return status
}

export const ReadStatusCookieLocal = () => {
    const status = localStorage.getItem("status")
    return status
}

export const RemoveStatusCookie = () => {
    const cookies = new Cookies();
    cookies.remove("status", { maxAge: 900 })
}

export const RemoveStatusCookieLocal = () => {
    localStorage.removeItem("status")
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

export const ReadCookieLocal = () => {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const iduser = localStorage.getItem("iduser")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const tentang = localStorage.getItem("tentang")
    const avatar = localStorage.getItem("avatar")
    const isalumni = localStorage.getItem("is_alumni")
    const ispengurus = localStorage.getItem("is_pengurus")
    const istrainer = localStorage.getItem("is_trainer")
    const isadmin = localStorage.getItem("is_admin")
    const ismhsarsuns = localStorage.getItem("is_mhsarsuns")
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
        ismhsarsuns
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
    if (cookies.get("status", { maxAge: 900 }) !== undefined) {
        cookies.remove("status", { maxAge: 900 })
    }
}

export const RemoveCookieLocal = () => {
    localStorage.clear();
}

export const resizeImage = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 640, 480, 'JPEG', 100, 0,
        uri => {
            resolve(uri);
        }, 'base64');
});

export const buatKodeTagihan = (timestamp, username,) => {
    return timestamp + username
}

export const ImageExist = (url) => {
    var img = new Image();
    img.src = url;
    if (img.height === 0) {
        return false
    } else {
        return true
    }
}


// https://stackoverflow.com/a/1199420
export function truncate(str, n, useWordBoundary) {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n - 1); // the original check
    return (useWordBoundary
        ? subString.slice(0, subString.lastIndexOf(" "))
        : subString) + " …";
};


export const CheckWebinarDate = (enddate, today) => {
    let d1 = new Date(enddate);
    let d2 = new Date(today);
    if (d2 < d1) {
        return true
    } else if (d2 >= d1) {
        return false
    }
}

export const getTodayDate = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    return currentDate

}

export const getMembershipEndDate = () => {
    let newdate = new Date();
    newdate.setFullYear(newdate.getFullYear() + 5);
    let newday = newdate.getDate();
    let newmonth = newdate.getMonth() + 1;
    let newyear = newdate.getFullYear()

    let duedate = `${newyear}-${newmonth}-${newday}`;
    return duedate
}

// https://masteringjs.io/tutorials/fundamentals/wait-1-second-then
export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const getUserCategory = () => {
    let cookie = ReadCookieLocal()
    if (cookie.isalumni === "true") {
        return "Alumni"
    } else {
        return "Umum"
    }
}

export const generateNomorAnggota = (date, usercategory, userid) => {
    let kategori = ""
    if (usercategory === "Alumni") {
        kategori = "01"
    } else if (usercategory === "Umum") {
        kategori = "02"
    }
    let nomor = date + kategori + userid
    return nomor
}


export const Purify = (teks) => {
    const clean = DOMPurify.sanitize(teks);
    return clean;
}


export const getBase64 = async (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export const validateAlumniFlag = (isalumni, ismhsw) => {
    if ((isalumni == true || isalumni == 1) && (ismhsw == true || ismhsw == 1)) {
        return false
    } else {
        return true
    }
}
