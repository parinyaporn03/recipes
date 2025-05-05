import { memo, useCallback, useContext, useEffect, useState } from "react";
import { FoodResponse } from "../utils/types/Type";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "antd";
import Lottie from "lottie-react";
import LoaderAnimation from "../lotties/loader.json";
import { motion } from "framer-motion";
import Hat from "../assets/logo/hat.png";
import { v4 as uuidv4 } from "uuid";
import { CategoriesContext } from "../App";

const Meal = memo(() => {
  const categories = useContext(CategoriesContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();
  const [data, setData] = useState<FoodResponse | undefined>(undefined);

  const handleMealClick = (idMeal: string) => {
    navigate(`/recipes/${category}/detail/${idMeal}`);
  };

  const filterDataByCategory = useCallback(async (category: string) => {
    setLoading(true);
    try {
      if (category !== "Recommend") {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setData(response.data);
      } else {
        const responses = await Promise.all(
          Array.from({ length: 8 }, () =>
            axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
          )
        );
        const meals = responses.map((response) => response.data.meals).flat();
        setData({ meals });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (category) {
      filterDataByCategory(category);
    } else {
      navigate("/recipes/Recommend");
    }
  }, [category, filterDataByCategory, navigate]);

  if (!categories) {
    return (
      <div className="flex h-72 justify-center ">
        <Lottie animationData={LoaderAnimation} loop={true} />
      </div>
    );
  }

  if (
    ![
      ...categories.meals.map((meal) => meal.strCategory),
      "Recommend",
    ].includes(category ?? "")
  ) {
    return <div className="flex justify-center items-center">Not Found</div>;
  }

  return (
    <div className="p-8 font-Mono  ">
      <h2 className="text-xl font-bold mb-4">Meals</h2>
      {loading ? (
        category === "Recommend" ? (
          <div className="flex h-72 justify-center ">
            <Lottie animationData={LoaderAnimation} loop={true} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {data?.meals.map(() => (
              <div
                key={uuidv4()}
                className=" rounded-lg px-4 py-6 shadow hover:shadow-lg bg-white"
              >
                <div className="flex justify-center">
                  <Skeleton.Image active className="mb-2 !w-full" />
                </div>
                <Skeleton active paragraph={{ rows: 1 }} />
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {data?.meals.map((meal, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.07,
              }}
              key={uuidv4()}
              className={`cursor-pointer relative border-2 border-black rounded-lg px-4 py-6 shadow hover:shadow-lg 
                  ${index % 2 === 0 ? "bg-[#FFFAD9]" : "bg-[#eaf6e7]"}
                `}
              onClick={() => handleMealClick(meal.idMeal)}
            >
              <img
                src={Hat}
                className="absolute -top-6 w-12 -right-[23px] z-50 "
              />
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-32 rounded-lg object-cover mb-2"
              />
              <p className="text-lg font-bold text-center font-Matemasie">
                {meal.strMeal}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Meal;
