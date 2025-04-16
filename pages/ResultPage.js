import { useRouter } from "next/router";
import { fetchAPI } from "./components/fetchAPI";
import { useState, useEffect} from "react";
import styles from '../styles/ResultPage.module.css';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Reusable handler functions
const useDishActions = (router, setDishCount) => {
  const handleViewNutrition = (id, title, image) => {
    router.push(`/NutrientPage?id=${id}&title=${title}&image=${image}`);
  };

  const handleViewRecipe = (id, title, image) => {
    router.push(`/InstructionPage?id=${id}&title=${title}&image=${image}`);
  };

  const handleSaveDish = (dishId, dishTitle, dishImage) => {
    let savedDishes = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
    const exists = savedDishes.some((dish) => dish.dish_id === dishId);
    if (!exists) {
      const newDish = {
        id: Date.now(),
        dish_id: dishId,
        dish_title: dishTitle,
        dish_image: dishImage
      };
      savedDishes.push(newDish);
      console.log(savedDishes);
      localStorage.setItem("favoriteDishes", JSON.stringify(savedDishes));
      setDishCount(savedDishes.length);
    }
  };

  return { handleViewNutrition, handleViewRecipe, handleSaveDish };
};

// Reusable DishCard component
const DishCard = ({ dish, onViewNutrition, onViewRecipe, onSaveDish }) => (
    <div key={dish.id} className={styles.card}>
        <div className={styles.imageContainer}>
            <img className={styles.image} src={dish.image} alt={dish.title} style={{ width: "200px" }} />
        </div>
        <div className={styles.title}>
            <h3>{dish.title}</h3>
        </div>
        <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => onViewNutrition(dish.id, dish.title, dish.image)}>View Nutrition</button>
            <button className={styles.button} onClick={() => onViewRecipe(dish.id, dish.title, dish.image)}>View Recipe</button>
            <button className={styles.button} onClick={() => onSaveDish(dish.id, dish.title, dish.image)}>Save Dish</button>
        </div>
    </div>
);

export default function ResultPage() {
    const router = useRouter();
    const { type } = router.query;
    const [content, setContent] = useState(null);
    const [dishCount, setDishCount] = useState(0);
  
    const { handleViewNutrition, handleViewRecipe, handleSaveDish } = useDishActions(router, setDishCount);
  
    useEffect(() => {
      if (type === "random") {
        setContent(<GetRandomDish />);
      } else if (type === "custom") {
        setContent(<GetCustomDish />);
      }
    }, [type]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const saved = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
        setDishCount(saved.length);
      }
    }, []);
  
    function GetRandomDish() {
      const { time } = router.query;
      const RANDOM_API_URL = time ? `${BASE_URL}/random?apiKey=${API_KEY}&number=1&time=${time}` : null;
      const { data, loading, error } = fetchAPI(RANDOM_API_URL);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
      const dish = data?.recipes?.[0];
      if (!dish) return <p>No dish found.</p>;
  
      return (
        <div className={styles.centerSingle}>
          <DishCard
            dish={dish}
            onViewNutrition={handleViewNutrition}
            onViewRecipe={handleViewRecipe}
            onSaveDish={handleSaveDish}
          />
        </div>
      );
    }
  
    function GetCustomDish() {
      const { mealType, includeIngredients, excludeIngredients } = router.query;
      const paramsReady = mealType && includeIngredients;
      const CUSTOMIZED_API_URL = paramsReady
        ? `${BASE_URL}/complexSearch?apiKey=${API_KEY}&type=${mealType}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&number=15`
        : null;
      const { data, loading, error } = fetchAPI(CUSTOMIZED_API_URL);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
      const dishes = data?.results || [];
  
      if (dishes.length === 0) {
        return <p>No dish found.</p>;
      }
  
      return (
        <div className={styles.dishGrid}>
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onViewNutrition={handleViewNutrition}
              onViewRecipe={handleViewRecipe}
              onSaveDish={handleSaveDish}
            />
          ))}
        </div>
      );
    }
  
    return (
      <div>
        <nav className={styles.navbar}>
          <button className={styles.navButton} onClick={() => router.push("/HomePage")}>Home</button>
          <div className={styles.appName}> WhatToEat?</div> 
          <button className={styles.navButton} onClick={() => router.push("/FavoriteDishesPage")}>My List ({dishCount})</button>
        </nav>
        <br /><br />
        <div className={styles.container}>{content}</div>
      </div>
    );
  }  