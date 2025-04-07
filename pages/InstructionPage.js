import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ViewRecipe() {
    const router = useRouter();
    const { id } = router.query; 
    const [recipe, setRecipe] = useState(null);
    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const INSTRUCTION_API_URL = `${BASE_URL}/${id}/analyzedInstructions?apiKey=${API_KEY}`;
            const CARD_API_URL = `${BASE_URL}/${id}/card?apiKey=${API_KEY}`;

            // fetch instruction data
            fetch(INSTRUCTION_API_URL)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch recipe instructions");
            }
            return response.json();
            })
            .then((data) => {
            if (data && data.length > 0) {
                setRecipe(data); 
            } else {
                setError("No instructions available for this recipe.");
            }
            setLoading(false);
            })
            .catch((err) => {
                setError(err.message); 
                setLoading(false); 
            });

            // fetch recipe card data
            fetch(CARD_API_URL)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch recipe card data");
            }
            return response.json();
            })
            .then((data) => {
                console.log(data);
                setCardData(data); 
                setLoading(false); 
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);  
            });
            } else {
            setLoading(false); 
            }
            }, [id]); // Re-fetch when id changes
  

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
        <p>Loading recipe card...</p> 
      )}
    </div>
  );
}