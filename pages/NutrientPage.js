import { useRouter } from "next/router";
import fetchAPI from "../components/fetchAPI";
import styles from "../styles/Nutrition.module.css";
import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ViewNutrition() {
  const router = useRouter();
  const { id, title, image } = router.query;
  const [dishCount, setDishCount] = useState(0);

  const NUTRITION_API_URL = id
    ? `${BASE_URL}/${id}/nutritionWidget.json?apiKey=${API_KEY}`
    : null;

  const {
    data: nutrition,
    loading: nutritionLoading,
    error: nutritionError,
  } = fetchAPI(NUTRITION_API_URL);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
      setDishCount(saved.length);
    }
  }, []);

  if (nutritionLoading) return <p>Loading nutrition information...</p>;
  if (nutritionError) return <p>Error: {nutritionError}</p>;

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles["nav-left"]}>
          <button onClick={() => router.push("/")}>Home</button>
        </div>
        <div className={styles["nav-center"]}>WhatToEat?</div>
        <div className={styles["nav-right"]}>
          <button onClick={() => router.push("/FavoriteDishesPage")}>
            My List ({dishCount})
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {nutrition ? (
            <>
              <h1>{title}</h1>
              <img src={image} alt={title} />

              {/* Nutrition Info */}
              <div className={styles["nutrition-section"]}>
                <h3 className={styles["nutrition-label"]}>Nutrition Label</h3>
                <ul>
                  {nutrition.nutrients &&
                    nutrition.nutrients.map((nutrient, index) =>
                      [
                        "Calories",
                        "Fat",
                        "Saturated Fat",
                        "Carbohydrates",
                        "Sugar",
                        "Protein",
                        "Sodium",
                        "Fiber",
                      ].includes(nutrient.name) ? (
                        <li key={index}>
                          {nutrient.name}: {nutrient.amount} {nutrient.unit}
                        </li>
                      ) : null
                    )}
                </ul>
              </div>

              {/* Ingredient List */}
              <div className={styles["ingredients-list"]}>
                <h3>Ingredients</h3>
                <ul>
                  {nutrition.ingredients &&
                    nutrition.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.amount} {ingredient.unit} of{" "}
                        {ingredient.name}
                      </li>
                    ))}
                </ul>
              </div>

              <br />
              <button
                onClick={() =>
                  router.push(
                    `/InstructionPage?id=${id}&title=${title}&image=${image}`
                  )
                }
              >
                View Recipe
              </button>
            </>
          ) : (
            <p>No nutrition data available.</p>
          )}
        </div>
      </div>
    </>
  );
}
