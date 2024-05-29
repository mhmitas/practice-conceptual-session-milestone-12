import axios, { } from "axios";
import axiosInstance from "../../hooks/axiosInstance";

// in this file i will take the actual image file
async function imageUpload(image) {
    const imageFile = new FormData()
    imageFile.append('image', image)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imageFile)
    return data.data.display_url
}


////////////////////////
//  save user in DB   //
async function saveUserInDb(user) {
    const userInfo = {
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        status: 'verified',
        role: 'guest',
    }
    const res = await axiosInstance.put('/user', userInfo)
    return res
}


export { imageUpload, saveUserInDb }