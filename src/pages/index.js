import Graph from "../components/graph";
import Input from "../components/input";
import ForecastCard from "../components/forecastcard";
import CurrentCard from "../components/currentcard";
import { useContext, useEffect } from "react";
import DataContext from "../contexts/context";
import { actions } from "../contexts/reducer";
import Switch from "react-switch";
import { MoonLoader } from "react-spinners";

const IndexPage = () => {
  const { data, dispatch } = useContext(DataContext);

  useEffect(() => {
    if (window === undefined) return
    const root = window.document.documentElement
    root.classList.remove(data.darkMode ? 'light' : 'dark')
    root.classList.add(data.darkMode ? 'dark' : 'light')
  }, [data])

  const toggleDarkMode = () => {
    dispatch({ type: actions.TOGGLE_DARK_MODE });
  }

  return (
    <>
      <section className="w-100  dark:bg-gray-800 bg-gray-50 min-h-screen">
        <header className="pt-6 px-10 h-20 w-full shadow-md dark:bg-gray-800 flex justify-between">
          <div className="w-2/3 flex justify-start">
            <div className="md:mr-24 w-full">
              <Input />
            </div>
          </div>
          <div className="w-1/3 flex justify-end">
            <Switch 
              onChange={toggleDarkMode} 
              checked={data.darkMode} 
              checkedIcon={<div>☀️</div>}
              uncheckedIcon={<div>🌙</div>}
              offColor={'#090c0c'}
              onColor={'#090c0c'}
              height={23}
              width={48}
              handleDiameter={25}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            />
          </div>
        </header>
        <div className="md:flex md:space-between md:mt-2 mt-8">
          {
            data.loading 
            ?
              <>
                <div className="mx-auto my-32" style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "left"
                }}>
                  <MoonLoader color={data.darkMode ? '#047857' : '#5596f6'} loading={data.loading} css={''} size={100} />
                </div>
              </>
            :
              <> 
                <div className="dark:bg-gray-800 w-full md:w-1/3">            
                  <div className="pt-2">
                    <CurrentCard /> 
                  </div>
                </div>
                <div className="md:w-2/3 w-full">
                  <div className="px-8 pt-8 pb-6">
                    <Graph/> 
                  </div>
                  <div className="px-10 py-2">
                    <ForecastCard />
                  </div>
                </div>
              </>
          }
        </div>
        <footer className="my-4 px-10 text-gray-400 dark:text-gray-700">
          &#8594; <a href="https://github.com/joxiah025" target="__blank">Github</a>
        </footer>        
      </section>
    </>
  );
};

export default IndexPage;
