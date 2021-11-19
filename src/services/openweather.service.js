import axios from "axios";

const getWeatherFromCoordinates = async (data) => {
  const response = await axios.get(
    'https://api.openweathermap.org/data/2.5/onecall?units=Imperial&lat='+data.lat+'&lon='+data.lng+'&exclude=hourly,minutely&appid='+process.env.REACT_APP_OPEN_WEATHER_KEY
  );
  return response.data;
};

export { getWeatherFromCoordinates };
