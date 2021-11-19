import IndexPage from "./pages/index";
import { useReducer } from "react";
import { dataReducer, initialState } from "./contexts/reducer";
import DataContext from "./contexts/context";

export default function App() {
  const [data, dispatch] = useReducer(dataReducer, initialState);
  return (
    <DataContext.Provider value={{ data, dispatch }}>
      <IndexPage />
    </DataContext.Provider>
  );
}
