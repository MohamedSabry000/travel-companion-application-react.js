import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;  
    try {
        const {data: { data }} = await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
  const URL = `https://community-open-weather-map.p.rapidapi.com/weather`;  
    try {
        const {data: { data }} = await axios.get(URL, {
            params: { lon: lat, lat: lng },
            headers: {
              'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
            }
        })

        return data;
    } catch (error) {
        console.log(error);
    }
}