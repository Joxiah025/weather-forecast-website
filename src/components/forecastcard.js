import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import moment from "moment";
import { useContext } from "react";
import DataContext from "../contexts/context";
import { actions } from "../contexts/reducer";

const ForecastCard = () => {
    const {data, dispatch} = useContext(DataContext);

    const getDate = (dt) => {
      return moment(new Date(dt*1000)).format('MMM, DD');
    }

    const setIndex = (index) => {
      dispatch({type: actions.SET_INDEX, payload: index});
    }

    const getItems = () => {
      return data?.weather?.daily?.map((x, i) => {
        return (
            <div onClick={() => setIndex(i)} key={i} className={data.activeIndex === i ? 'text-center rounded-md px-10 py-6 dark:bg-green-700 bg-blue-400 text-white dark:text-gray-300 mr-4' : 'text-center rounded-md px-10 py-6 bg-transparent text-gray-500 mr-4 hover:shadow'}>
              <h3 className="font-bold">{i === 0 ? 'Today' : getDate(x.dt) }</h3>
              <i className={'text-4xl owi owi-' + x?.weather[0]?.icon} />
              <p className={ data.activeIndex === i ? 'font-normal text-white dark:text-gray-300' : 'font-normal text-gray-400' }>Humidity</p>
              <span className={ data.activeIndex === i ? 'font-normal text-white dark:text-gray-300' : 'font-normal text-gray-400' }>{x?.humidity}%</span>
            </div>
        )
      });
    }
    
    return (
      <div className="flex justify-between">
        <ScrollingCarousel show={4.5} slide={1} swiping className="flex justify-between cursor-pointer">
          {getItems()}
        </ScrollingCarousel>
      </div>
    )
  };
  
  export default ForecastCard;
  