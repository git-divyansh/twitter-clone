
export const uploadToCloudinary = async (pics : any) => {

    if(pics){
        const data = new FormData()
        data.append("file", pics)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "dgxnxys84")

        const res = await fetch(`${process.env.CLOUDINARY_URL}/image/upload`, {
            method: "post",
            body : data
        })

        const fileData = await res.json()
        return fileData.toString()
    } else{
        console.log("Error from upload function");
        
    }

}