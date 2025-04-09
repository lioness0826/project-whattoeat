import { useRouter } from "next/router";
import { fetchAPI } from "./components/fetchAPI";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ViewNutrition() {
  const router = useRouter();
  const { id, title, image } = router.query;

  const NUTRITION_API_URL = `${BASE_URL}/${id}/nutritionWidget.json?apiKey=${API_KEY}`;

  const { data: nutrition, loading: nutritionLoading, error: nutritionError } = fetchAPI(NUTRITION_API_URL);

  const loading = nutritionLoading;
  const error = nutritionError;

  if (loading) return <p>Loading nutrition information...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={() => router.push("/")}>Home</button>
      <button onClick={() => router.push("/FavoriteDishesPage")}>Favorite Dishes</button>
      
      {nutrition ? (
        <div>
          <h1>{title}</h1>
          <img src={image} alt={title} style={{ width: "200px" }} />
          {/* Display key nutrition values */}
          <ul>
            {nutrition.nutrients && nutrition.nutrients.map((nutrient, index) => (
              // Only display key nutrients
              (["Calories", "Fat", "Saturated Fat", "Carbohydrates", "Sugar", "Protein", "Sodium", "Fiber"].includes(nutrient.name) && 
                <li key={index}>
                  {nutrient.name}: {nutrient.amount} {nutrient.unit} (
                  {nutrient.percentOfDailyNeeds}% of Daily Needs)
                </li>)
            ))}
          </ul>

          {/* Display important vitamins and minerals */}
          <div>
            <h3>Key Vitamins and Minerals</h3>
            <ul>
              {nutrition.nutrients && nutrition.nutrients.filter(nutrient => 
                nutrient.name === "Calcium" || nutrient.name === "Iron" || nutrient.name === "Magnesium"
              ).map((nutrient, index) => (
                <li key={index}>
                  {nutrient.name}: {nutrient.amount} {nutrient.unit} (
                  {nutrient.percentOfDailyNeeds}% of Daily Needs)
                </li>
              ))}
            </ul>
          </div>

          {/* Display ingredient list */}
          <div>
            <h3>Ingredients</h3>
            <ul>
              {nutrition.ingredients && nutrition.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} of {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Display caloric breakdown */}
          <div>
            <h3>Caloric Breakdown</h3>
            <ul>
              {nutrition.caloricBreakdown && (
                <>
                  <li>Protein: {nutrition.caloricBreakdown.percentProtein}%</li>
                  <li>Fat: {nutrition.caloricBreakdown.percentFat}%</li>
                  <li>Carbs: {nutrition.caloricBreakdown.percentCarbs}%</li>
                </>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p>No nutrition data available.</p>
      )}
      <button onClick={() => router.push(`/InstructionPage?id=${id}&title=${title}&image=${image}`)}>View Instructions</button>
    </div>
  );
}