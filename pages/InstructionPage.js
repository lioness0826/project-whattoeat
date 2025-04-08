import { useRouter } from "next/router";
import { fetchAPI } from "./components/fetchAPI";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ViewRecipe() {
    const router = useRouter();
    const {id} = router.query;

    const INSTRUCTION_API_URL = `${BASE_URL}/${id}/analyzedInstructions?apiKey=${API_KEY}`;
    const CARD_API_URL = `${BASE_URL}/${id}/card?apiKey=${API_KEY}`;

    const {data: recipe, loading: recipeLoading, error: recipeError} = fetchAPI(INSTRUCTION_API_URL);
    const {data: cardData, loading: cardLoading, error: cardError} = fetchAPI(CARD_API_URL);

    const loading = recipeLoading || cardLoading;
    const error = recipeError || cardError;

    return (
        <div>
            <h1>COOKING INSTRUCTION PAGE</h1>

            {/* Display loading message or recipe ID */}
            {id ? (
                <p>This is the recipe for dish ID: {id}</p>
            ) : (
                <p>Loading...</p>
            )}

            {/* Display loading message, error, or recipe instructions */}
            {loading ? (
                <p>Loading instructions...</p>
            ) : error ? (
                <p>{error}</p>
            ) : recipe && recipe.length > 0 ? (
                // Display recipe steps if data exists
                recipe.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <h2>{section.name || "Recipe Instructions"}</h2>
                        {section.steps.map((step) => (
                            <div key={step.number}>
                                <h3>Step {step.number}</h3>
                                <p>{step.step}</p>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No recipe instructions available.</p>
            )}

            {/* Display recipe card data (image, recipe details, etc.) */}
            {cardData ? (
                <div>
                    <h2>Recipe Card</h2>
                    {cardData.url && <img src={cardData.url} alt="Recipe Image" style={{ width: "500px", height: "auto" }} />}
                </div>
            ) : (
                <p>No recipe card available.</p>
            )}
        </div>
    );
}