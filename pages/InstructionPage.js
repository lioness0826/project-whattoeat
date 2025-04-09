import { useRouter } from "next/router";
import { fetchAPI } from "./components/fetchAPI";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ViewRecipe() {
    const router = useRouter();
    const { id, title, image } = router.query;

    const INSTRUCTION_API_URL = `${BASE_URL}/${id}/analyzedInstructions?apiKey=${API_KEY}`;

    const { data: recipe, loading: recipeLoading, error: recipeError } = fetchAPI(INSTRUCTION_API_URL);

    const loading = recipeLoading;
    const error = recipeError;

    return (
        <div>
            <button onClick={() => router.push("/")}>Home</button>
            <button onClick={() => router.push("/FavoriteDishesPage")}>Favorite Dishes</button>

            {/* Display loading message or recipe ID, title and image */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                id && title && (
                    <div>
                        <h1>{title}</h1>
                        <img src={image} alt={title} style={{ width: "200px" }} />
                    </div>
                )
            )}

            {/* Display recipe instructions */}
            {recipe && recipe.length > 0 ? (
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

            <button onClick={() => router.push(`/NutrientPage?id=${id}&title=${title}&image=${image}`)}>View Nutrition</button>
        </div>
    );
}