import "../App.css";
import Categories from "../components/Categories";
import Pan from "../assets/logo/pan.png";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { CategoriesContext } from "../App";

const Home = () => {
  const categories = useContext(CategoriesContext);

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
