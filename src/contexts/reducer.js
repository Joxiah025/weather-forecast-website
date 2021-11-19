const initialState = {
    loading: false,
    city: {
      label: "London, Uk",
      value: {
        description: "London, UK",
        place_id: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
        reference: "ChIJdd4hrwug2EcRmSrV3Vo6llI"
      }
    },
    weather: null,
    activeIndex: 0,
    darkMode: localStorage.getItem('dark') === 'true' ? true : false
  };
  
  const actions = {
    FETCH_CITY: "FETCH_CITY",
    FETCH_WEATHER: "FETCH_WEATHER",
    SET_INDEX: "SET_INDEX",
    TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
    STOP_LOADER: "STOP_LOADER",
    LOADING: "LOADING"
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case actions.FETCH_CITY: {
        return {
          ...state,
          city: action.payload
        };
      }
      case actions.FETCH_WEATHER: {
        return {
          ...state,
          weather: action.payload
        };
      }
      case actions.LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case actions.STOP_LOADER: {
        return {
          ...state,
          loading: false
        };
      }
      case actions.SET_INDEX: {
        return {
          ...state,
          activeIndex: action.payload
        };
      }
      case actions.TOGGLE_DARK_MODE: {
        localStorage.setItem('dark', !state.darkMode);
        return {
          ...state,
          darkMode: !state.darkMode
        };
      }
      default:
        return state;
    }
  };
  
  export { initialState, dataReducer, actions };
  