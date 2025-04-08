import { useRouter } from "next/router";
import { fetchAPI } from "./components/fetchAPI";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ViewNutrition() {
  const router = useRouter();
  const {id} = router.query;

  const NUTRITION_API_URL = `${BASE_URL}/${id}/nutritionWidget.json?apiKey=${API_KEY}`;
  const LABEL_API_URL = `${BASE_URL}/${id}/nutritionLabel.png?apiKey=${API_KEY}`;

  const {data: nutrition, loading: nutritionLoading, error: nutritionError} = fetchAPI(NUTRITION_API_URL);

  // The label image URL is set manually since it's a static URL
  const labelUrl = LABEL_API_URL;

  const loading = nutritionLoading;
  const error = nutritionError;

  if (loading) return <p>Loading nutrition information...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Nutrition Page</h1>
      {/* Display nutrition information if available */}
      {nutrition ? (
        <div>
          <p>Nutrition information for dish ID: {id}</p>

          {/* Display the main nutrition values */}
          <ul>
            {nutrition.calories && <li>Calories: {nutrition.calories}</li>}
            {nutrition.fat && <li>Fat: {nutrition.fat}</li>}
            {nutrition.carbs && <li>Carbs: {nutrition.carbs}</li>}
            {nutrition.protein && <li>Protein: {nutrition.protein}</li>}
          </ul>

          {/* Display the nutrition label image */}
          {labelUrl && (
            <div>
              <h3>Nutrition Label:</h3>
              <img
                src={labelUrl}
                alt="Nutrition Label"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          )}
        </div>
      ) : (
        <p>No nutrition data available.</p>
      )}
    </div>
  );
}