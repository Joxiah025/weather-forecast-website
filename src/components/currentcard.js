import { useContext } from "react";
import DataContext from "../contexts/context";
import Moment from 'react-moment';

const CurrentCard = () => {
  const {data, } = useContext(DataContext);
  const datestamp = data?.weather ? new Date(data?.weather?.current?.dt*1000) : null; // 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
  // console.log(datestamp);
  return (
    <div className="md:pt-20 font-sans text-gray-600 dark:text-gray-500">
      {data?.weather && 
      <>
        <p className="font-medium text-center">
          <Moment format="dddd MMMM DD, YYYY">{datestamp}</Moment><br/>
          <Moment format="hh : mm A">{datestamp}</Moment>
        </p>
        <div className="mt-4 mb-0 flex items-center justify-center">
          <i className={'text-9xl owi owi-' + data?.weather?.current?.weather[0]?.icon} />
          <p className="text-2xl font-bold ml-4">{data?.weather?.current?.temp} °F</p>
        </div>
        <p className="text-2xl font-bold text-center">{data?.weather?.current?.weather[0]?.main}</p>
        <div className="my-16 flex divide-x-2 divide-gray-500 justify-center">
          <div className="text-right pr-6 w-1/2">
            <p className="text-gray-500 font-normal">Humidity</p>
            <span className="text-gray-600 font-bold mr-3">{data?.weather?.current?.humidity}%</span>
          </div>
          <div className="pl-6 text-left w-1/2">
            <p className="text-gray-500 font-normal">Wind Speed</p>
            <span className="text-gray-600 font-bold">{(data?.weather?.current?.wind_speed * 1.61).toFixed(2)} km/hr</span>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default CurrentCard;
