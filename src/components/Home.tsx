import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { CategoriesMeal } from "../utils/types/Type";
import { url } from "../utils/constants/Constant";
import Categories from "../components/Categories";
import Pan from "../assets/logo/pan.png";
// import Meal from "../components/Meal";
import { Outlet } from "react-router-dom";
const Home = () => {
  // const [data, setData] = useState<FoodResponse | undefined>(undefined);
  const [categories, setCategories] = useState<CategoriesMeal | undefined>(
    undefined
  );

  const getCategory = async () => {
    try {
      const response = await axios.get(`${url}list.php?c=list`);
      if (response.data.meals === null) {
        console.log("No meals found for this category.");
        setCategories({ meals: [] });
      } else {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className=" bg-[#A5B68D] w-full border-b-2 border-gray-400 ">
        <div className="flex items-center justify-center">
          <div className=" text-5xl   text-center p-4 font-Mountains ">
            Let's Cook
          </div>
          <img src={Pan} className="w-28" />
        </div>
        {categories && <Categories categories={categories} />}
      </div>
      <Outlet />
    </>
  );
};

export default Home;
