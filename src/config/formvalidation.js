export const ValidateArtikel = (judulartikel, descartikel, artikeltext, artikelimgurl, authorid, image) => {
    const error = {}
    if (judulartikel === "" || judulartikel === undefined || descartikel === "" || descartikel === undefined || artikeltext === "" || artikeltext === undefined || artikelimgurl === "" || artikelimgurl === undefined || authorid === "" || authorid === undefined || image === "" || image === undefined) {
        error.message = "Seluruh isian form harus lengkap!"
    }
    console.log(error)
    return error
}


export const ValidateInputForm = (data) => {
    const error = {}
    let inputs = Object.values(data)
    if(inputs.includes("") || inputs.includes(undefined)){
        error.message = "Seluruh isian form harus lengkap!"
    }
    console.log(error)
    return error
}