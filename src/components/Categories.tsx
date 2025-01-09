// import React, { useState } from "react";
import { CategoriesProp } from "../utils/types/Type";
// import { IoIosArrowDropleftCircle, IoIosArrowDropright } from "react-icons/io";
import Beef from "../assets/categoriesicon/steak.png";
import Breakfast from "../assets/categoriesicon/english-breakfast.png";
import Chicken from "../assets/categoriesicon/turkey.png";
import Dessert from "../assets/categoriesicon/dessert.png";
import Goat from "../assets/categoriesicon/goat.png";
import Lamb from "../assets/categoriesicon/sheep.png";
import Miscellaneous from "../assets/categoriesicon/cooking.png";
import Pasta from "../assets/categoriesicon/dish.png";
import Pork from "../assets/categoriesicon/pig.png";
import Seafood from "../assets/categoriesicon/seafood.png";
import Side from "../assets/categoriesicon/side-dish.png";
import Starter from "../assets/categoriesicon/starters.png";
import Vegan from "../assets/categoriesicon/plant-based.png";
import Recommend from "../assets/categoriesicon/recommend.png";
import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";
import { v4 as uuidv4 } from "uuid";
const icon = [
  Beef,
  Breakfast,
  Chicken,
  Dessert,
  Goat,
  Lamb,
  Miscellaneous,
  Pasta,
  Pork,
  Seafood,
  Side,
  Starter,
  Vegan,
  Vegan,
];

const Categories = ({ categories }: CategoriesProp) => {
  return (
    <div className="flex justify-center  font-Mono ">
      <div className="grid grid-cols-8 md:flex md:justify-center gap-2 p-2 bg-[#DA8359] rounded-2xl flex-wrap border-2 border-black">
        <Tooltip placement="bottom" title={"recommend menu"}>
          <NavLink
            to={`/Recommend`}
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive
                  ? "bg-[#FCFAEE] border-2 border-black rounded-xl"
                  : "bg-[#ECDFCC] rounded-xl border-2 border-black"
              }`
            }
          >
            <img
              src={Recommend}
              alt={Recommend}
              className="rounded-xl p-1 w-12 min-w-12 h-12 bg-contain"
            />
          </NavLink>
        </Tooltip>
        {categories?.meals?.map((category, index) => (
          <Tooltip
            placement="bottom"
            title={category.strCategory}
            color={"#493628"}
            key={uuidv4()}
          >
            <NavLink
              to={`/${category.strCategory}`}
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive
                    ? "bg-[#FCFAEE] rounded-xl border-2 border-black"
                    : "bg-[#ECDFCC] rounded-xl border-2 border-black "
                }`
              }
            >
              <img
                src={icon[index]}
                alt={category.strCategory}
                className="rounded-xl p-1 w-12 min-w-12 h-12 bg-contain"
              />
            </NavLink>
          </Tooltip>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default Categories;
