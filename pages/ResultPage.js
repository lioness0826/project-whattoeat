import { useRouter } from "next/router";
import { fetchAPI } from "./components/fetchAPI";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Reusable handler functions
const useDishActions = (router) => {
  const handleViewNutrition = (id) => {
    router.push(`/NutrientPage?id=${id}`);
  };

  const handleViewRecipe = (id) => {
    router.push(`/InstructionPage?id=${id}`);
  };

  const handleSaveDish = (dishId) => {
    let savedDishes = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
    const exists = savedDishes.some((dish) => dish.dish_id === dishId);
    if (!exists) {
      const newDish = {
        id: Date.now(),
        dish_id: dishId,
      };
      savedDishes.push(newDish);
      localStorage.setItem("favoriteDishes", JSON.stringify(savedDishes));
    }
  };

  return { handleViewNutrition, handleViewRecipe, handleSaveDish };
};

// Reusable DishCard component
const DishCard = ({ dish, onViewNutrition, onViewRecipe, onSaveDish }) => (
    <div key={dish.id}>
        <div>
            <img src={dish.image} alt={dish.title} style={{ width: "200px" }} />
        </div>
        <div>
            <h2>{dish.title}</h2>
        </div>
        <div>
            <button onClick={() => onViewNutrition(dish.id)}>View Nutrition</button>
            <button onClick={() => onViewRecipe(dish.id)}>View Instruction</button>
            <button onClick={() => onSaveDish(dish.id)}>Save Dish</button>
        </div>
    </div>
);

function GetRandomDish() {
    const router = useRouter();
    const { handleViewNutrition, handleViewRecipe, handleSaveDish } = useDishActions(router);
  
    const RANDOM_API_URL = `${BASE_URL}/random?apiKey=${API_KEY}&number=1`;
    const { data, loading, error } = fetchAPI(RANDOM_API_URL);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    const dish = data?.recipes?.[0];

    if (dish.length === 0) {
        return <p>No dish found.</p>;
    }
  
    return (
        <DishCard
            dish={dish}
            onViewNutrition={handleViewNutrition}
            onViewRecipe={handleViewRecipe}
            onSaveDish={handleSaveDish}
        />
    );
  }
  
function GetCustomDish() {
    const router = useRouter();
    const { mealType, includeIngredients, excludeIngredients } = router.query;
    const { handleViewNutrition, handleViewRecipe, handleSaveDish } = useDishActions(router);

    const CUSTOMIZED_API_URL = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&type=${mealType}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&number=5`;
    const { data, loading, error } = fetchAPI(CUSTOMIZED_API_URL);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const dishes = data?.results || [];

    if (dishes.length === 0) {
        return <p>No dish found.</p>;
    }

    return (
        <div>
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

export default function ResultPage() {
  const router = useRouter();
  const { type } = router.query;

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
        <div>{content}</div>
    </div>
  );
}