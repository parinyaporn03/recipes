import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MealResponse, Meal } from "../utils/types/Type";
import { MdArrowBackIos } from "react-icons/md";
import { Skeleton } from "antd";

import { v4 as uuidv4 } from "uuid";

type Ingredient = {
  ingredient: string;
  measure: string;
};

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const detail = meal?.meals[0];
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);

  const getMealById = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setMeal(response.data);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIngredient = (mealDetail: Meal | undefined) => {
    if (!mealDetail) return;
    const ingredients = Object.keys(mealDetail)
      .filter(
        (key) =>
          key.startsWith("strIngredient") && mealDetail[key as keyof Meal] //เอาค่าของkeyที่ขึ้นต้นด้วยstrIngredient และไม่ว่าง
      )
      .map((key) => {
        const index = key.replace("strIngredient", ""); // ดึงเลขข้างหลัง key เช่น strIngredient1 จะได้ 1
        const measureKey = `strMeasure${index}`; // สร้าง key ของ measure เช่น strMeasure1
        return {
          ingredient: mealDetail[key as keyof Meal] as string,
          measure: (mealDetail[measureKey as keyof Meal] as string) || "",
        };
      });
    setIngredient(ingredients);
  };

  useEffect(() => {
    if (id) {
      getMealById(id);
    } else {
      navigate("/recipes/Recommend");
    }
  }, [id, navigate]);
  useEffect(() => {
    if (meal) {
      getIngredient(detail);
    }
  }, [meal, detail]);

  return (
    <div className="relative flex flex-col p-8 w-screen h-screen overflow-hidden ">
      <div
        className="flex items-center cursor-pointer sticky top-0 "
        onClick={() => {
          navigate(-1);
        }}
      >
        <MdArrowBackIos />
        <div className="ml-1">Back</div>
      </div>
      {loading ? (
        <div className=" flex h-full overflow-hidden rounded-xl mt-5">
          <div className="relative flex flex-col bg-cover bg-center w-1/2">
            <div className="flex justify-center items-center h-full">
              <Skeleton.Image active className="!w-full !h-full" />
            </div>

            <div className="absolute top-0 left-0 z-10 w-full p-4 rounded-br-2xl">
              <Skeleton paragraph={{ rows: 0 }} active />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <Skeleton paragraph={{ rows: 10 }} active />
          </div>
        </div>
      ) : detail ? (
        <div className=" flex h-full overflow-hidden rounded-xl mt-5">
          {/* Left */}

          <div
            style={{
              backgroundImage: `url(${detail.strMealThumb})`,
            }}
            className="relative flex flex-col bg-cover bg-center w-1/2"
          >
            {/* Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-[#D6C0B3]"></div>

            {/* Title */}
            <div className="absolute top-0 left-0 z-10 bg-[#D6C0B3] w-fit p-4 rounded-br-2xl">
              <h3 className="text-xl font-bold ">{detail.strMeal}</h3>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 bg-[#D6C0B3] overflow-auto p-4">
            <p className="py-2">
              <strong className="text-lg ">Category:</strong>{" "}
              {detail.strCategory}
            </p>
            <p className="py-2">
              <strong className="text-lg">Area:</strong> {detail.strArea}
            </p>
            <div className="text-lg font-bold py-5">ingredient</div>
            <div className="card">
              {ingredient.map((i, index) => (
                <p key={uuidv4()} className="ml-2 ">
                  {index + 1}. {i.ingredient} {i.measure}
                </p>
              ))}
            </div>

            <h4 className="text-lg font-bold py-5">Instructions</h4>
            <div className="card">
              <div className="ml-2">{detail.strInstructions}</div>
            </div>

            {detail.strYoutube ? (
              <>
                <h4 className="text-lg font-bold pt-8">Video</h4>
                <div className="video-container">
                  <iframe
                    className="w-full aspect-video p-5"
                    src={`https://www.youtube.com/embed/${
                      detail.strYoutube.split("v=")[1]
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div>Not found menu</div>
      )}
    </div>
  );
};

export default Detail;
