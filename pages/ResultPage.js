import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function GetRandomDish(){
    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const RANDOM_API_URL = `${BASE_URL}/random?apiKey=${API_KEY}&number=1`;
      
        fetch(RANDOM_API_URL)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch data");
                return response.json();
            })
            .then((data) => {
                setDish(data.recipes[0]);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        }, []);

    const handleViewNutrition = (id) => {
        router.push(`/NutrientPage?id=${id}`); // Pass dish id as query parameter
      };

    const handleViewRecipe = (id) => {
    router.push(`/InstructionPage?id=${id}`); // Pass dish id as query parameter
    };

    const handleSaveDish = (dishId) => {
        let savedDishes = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
        const exists = savedDishes.some((dish) => dish.dish_id === dishId);
        if (!exists) {
            const newDish = {
                id: Date.now(),  // unique ID
                dish_id: dishId
              };
            savedDishes.push(newDish);
            localStorage.setItem("favoriteDishes", JSON.stringify(savedDishes));
          }
      };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!dish) return <p>No dish loaded.</p>;

    return (
        <div>
            <div>
                <img src={dish.image} alt={dish.title} style={{ width: "300px" }} />
            </div>
            <div>
                <h2>{dish.title}</h2>
            </div>
            <div>
                <button onClick={() => handleViewNutrition(dish.id)}>View Nutrition</button>
                <button onClick={() => handleViewRecipe(dish.id)}>View Instruction</button>
                <button onClick={() => handleSaveDish(dish.id)}>Save Dish</button>
            </div>
        </div>
    );
}

function GetCustomDish(){

    const router = useRouter();
    // Retrieve query parameters from the URL
    const { mealType, includeIngredients, excludeIngredients } = router.query;

    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const CUSTOMIZED_API_URL = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&type=${mealType}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&number=5`;

        fetch(CUSTOMIZED_API_URL)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((data) => {
            setDishes(data.results); // Extract the first (random) recipe
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []); // Runs once when the component mounts

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleViewNutrition = (id) => {
        router.push(`/NutrientPage?id=${id}`); // Pass dish id as query parameter
      };

    const handleViewRecipe = (id) => {
    router.push(`/InstructionPage?id=${id}`); // Pass dish id as query parameter
    };

    const handleSaveDish = (dishId) => {
        let savedDishes = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
        const exists = savedDishes.some((dish) => dish.dish_id === dishId);
        if (!exists) {
            const newDish = {
                id: Date.now(),  // unique ID
                dish_id: dishId
              };
            savedDishes.push(newDish);
            localStorage.setItem("favoriteDishes", JSON.stringify(savedDishes));
            
            console.log("Saving dish:", dishId);
          }
      };

    return (
        <div>
        {/* Display Dishes */}
            {dishes.map((dish) => (
            <div key={dish.id}>
                <div>
                    <img src={dish.image} alt={dish.title} style={{ width: "200px" }} />
                </div>
                <div>
                    <h2>{dish.title}</h2>
                </div>
                <div>
                    <button onClick={() => handleViewNutrition(dish.id)}>View Nutrition</button>
                    <button onClick={() => handleViewRecipe(dish.id)}>View Instruction</button>
                    <button onClick={() => handleSaveDish(dish.id)}>Save Dish</button>
                </div>
            </div>
            ))}
        </div>
    );
}

// Default export: Decides which function to execute based on query
export default function ResultPage() {

    const router = useRouter();
    const { type } = router.query; // Get the 'type' query parameter
    
    let content;
    if (type === "random") {
        content = <GetRandomDish />;
    } else if (type === "custom") {
        content = <GetCustomDish />;
    }

    return (       
      <div>
            <div>
                <button onClick={() => router.push("/HomePage")}>Return Home</button>
                <button onClick={() => router.push("/FavoriteDishesPage")}>Favorite Dishes</button>
            </div>
            <div>
                <h1>RESULT PAGE</h1>
            </div>
            <div>
                {content}
            </div>
      </div>
    );
  }