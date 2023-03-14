import axios from "axios"


export async function fetchPixabayApi(query, page =1) {
   const BASE_URL = 'https://pixabay.com/api/'
   const KEY = '34415256-969657eed504ea6a898ee73a4'

   const searchParams = new URLSearchParams ({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: ' true'

})
const response = await axios.get(`${BASE_URL}?key=${KEY}&page=${page}&per_page=40&q=${query}&${searchParams}`)

console.log(response)
return response.data

}



