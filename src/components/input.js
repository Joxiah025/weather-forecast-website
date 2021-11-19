import React, { useState, useEffect, useContext } from "react";
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress
} from "react-google-places-autocomplete";
import { toast, ToastContainer } from "react-toastify";
import DataContext from "../contexts/context";
import { actions } from "../contexts/reducer";
import useGetLocation from "../hooks/location.hook";
import { getLocationByCoordinates } from "../services/location.service";
import { getWeatherFromCoordinates } from "../services/openweather.service";
import 'react-toastify/dist/ReactToastify.min.css';

const Input = () => {
  const {_, dispatch } = useContext(DataContext);
  const [location, setLocation] = useState(null);
  const locationcoordinates = useGetLocation();

  const notify = (msg) => toast.error(msg);

  const getAddress = (label) => {
    return geocodeByAddress(label);
  };

  const getCoordinates = (address) => {
    return getLatLng(address[0]);
  };

  const getWeather = (coord) => {
    return getWeatherFromCoordinates(coord);
  };

  useEffect(() => {
    dispatch({ type: actions.LOADING });
    const locationweather = (loc) => {
      getWeatherFromCoordinates(loc)
        .then((res) => {
          dispatch({ type: actions.FETCH_WEATHER, payload: res });
        })
        .catch(_ => {
          notify('Could not get weather information!')
        });
    };

    const locationcity = (loc) => {
      getLocationByCoordinates(loc)
        .then((res) => {
          const payload = {
            label: res.results[0].formatted_address,
            value: {
              description: res.results[0].formatted_address,
              place_id: res.results[0].place_id,
              reference: res.results[0].place_id
            }
          };
          dispatch({
            type: actions.FETCH_CITY,
            payload
          });
          setLocation(payload);
        })
        .catch(_ => {
          notify('Could not fetch location information!')
        });
    };

    locationcoordinates.then((loc) => {
      locationweather(loc);
      locationcity(loc);
      dispatch({ type: actions.STOP_LOADER });
    }).catch(_ => {
      notify('Could not get coordinates!')
      dispatch({ type: actions.STOP_LOADER });
    });
  }, []);

  const getLocation = async (e) => {
    dispatch({ type: actions.LOADING });
    setLocation(e);
    const coord = await getAddress(e.label).then(getCoordinates);
    getWeather(coord)
      .then((res) => {
        dispatch({ type: actions.FETCH_WEATHER, payload: res });
        dispatch({ type: actions.FETCH_CITY, payload: e });
        dispatch({ type: actions.STOP_LOADER });
      })
      .catch((err) => {
        notify('Network Error:' + err)
        dispatch({ type: actions.STOP_LOADER });
      });
  };
  return (
    <>
      <GooglePlacesAutocomplete
        selectProps={{
          placeholder: "Type to select ...",
          noOptionsMessage: () => 'Search location',
          value: location,
          // defaultValue: location,
          onSelect: getLocation,
          onChange: getLocation,
          className: 'outline-none md:w-96 dark:bg-gray-800',
          styles: {
           input: () => ({
            outline: 'none',
            border: 'none'
           }),
           control: (provided) => ({
             ...provided,
             outline: 'none',
             boxShadow: 'none',
             borderColor: 'none !important'
           })
          }
        }}
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      />
      <ToastContainer />
    </>
  );
};

export default Input;
