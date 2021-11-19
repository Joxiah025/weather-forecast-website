import {
    getCoordinates,
    isGeoLocationApiAvailable
  } from "../services/location.service";
  
  const useGetLocation = () => {
    // Default coordinates is London
    if (isGeoLocationApiAvailable()) {
      return getCoordinates().then((res) => {
        return {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      }).catch(_ => {
        return new Promise((res) =>
          res({
            lat: 51.509865,
            lng: -0.118092
          })
        );
      });
    } else {
      return new Promise((res) =>
        res({
          lat: 51.509865,
          lng: -0.118092
        })
      );
    }
  };
  
  export default useGetLocation;
  