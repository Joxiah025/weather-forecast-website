import axios from "axios";

const isGeoLocationApiAvailable = () => {
  return "geolocation" in navigator ? true : false;
};

const getCoordinates = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

const getLocationByCoordinates = async (data) => {
  const city = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&latlng=' +
      data.lat + ',' + data.lng + '&key='+process.env.REACT_APP_GOOGLE_API_KEY
  );
  return city.data;
};

const getPicture = async (loc) => {
  const photo = await axios.get(
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=name,photos&input='+ loc + '&key=' + process.env.REACT_APP_GOOGLE_API_KEY
  );
  return photo.data;
}

export { isGeoLocationApiAvailable, getCoordinates, getLocationByCoordinates, getPicture };
