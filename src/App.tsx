import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";
import { createContext, useCallback, useEffect, useState } from "react";
import { CategoriesMeal } from "./utils/types/Type";
import axios from "axios";
import { url } from "./utils/constants/Constant";
export const CategoriesContext = createContext<CategoriesMeal | undefined>(
  undefined
);

function App() {
  const [categories, setCategories] = useState<CategoriesMeal | undefined>(
    undefined
  );

  const getCategory = useCallback(async () => {
    try {
      const response = await axios.get(`${url}list.php?c=list`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <>
      <CategoriesContext.Provider value={categories}>
        <RouterProvider router={Router} />
      </CategoriesContext.Provider>
    </>
  );
}

export default App;
