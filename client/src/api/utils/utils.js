import axios, { } from "axios";

// in this file i will take the actual image file
async function imageUpload(image) {
    console.log(image)
    const imageFile = new FormData()
    imageFile.append('image', image)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imageFile)
    return data.data.display_url
}

export { imageUpload }