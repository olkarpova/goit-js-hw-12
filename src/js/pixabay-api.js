import axios from "axios";

export async function getImagesByQuery(query, pageNo = 1) {
    try {
        const response = await axios.get("https://pixabay.com/api/", {
            params: {
                key: "53489981-68e2194cff91adb725bcb77ca",
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: pageNo,
                per_page: 15
            }
        });
        return response.data;
    } 
    catch (error) {
        throw new Error("Pixabay API error");
    }

}
