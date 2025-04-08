import React, { useState } from "react";
import { useRouter } from "next/router";

function GetUserInput() {
    const router = useRouter();
    //store user inputs
    const [mealType, setMealType] = useState("");
    const [includeIngredients, setIncludeIngredients] = useState("");
    const [excludeIngredients, setExcludeIngredients] = useState("");
    // Handle form submission and navigate to ResultPage 
    const handleCustomOption = () => {
        if (!mealType || !includeIngredients || !excludeIngredients) {
            alert("Please fill out all fields.");
            return;
        }
        router.push(`/ResultPage?type=custom&mealType=${mealType}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}`);
    };
    return (
        <div>
            <div>
                <h1>SEARCH PAGE</h1>
            </div>
            <div>
                <button onClick={() => router.push("/")}>Home Page</button>
                <button onClick={() => router.push("/FavoriteDishesPage")}>Favorite Dishes</button>
            </div>

            {/* Input fields for user to enter data */}
            <div>
                <label>
                    Meal Type (e.g., breakfast, lunch, dinner):
                    <input
                        type="text"
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Included Ingredients:
                    <input
                        type="text"
                        value={includeIngredients}
                        onChange={(e) => setIncludeIngredients(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Excluded Ingredients:
                    <input
                        type="text"
                        value={excludeIngredients}
                        onChange={(e) => setExcludeIngredients(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <button onClick={handleCustomOption}>Generate Dishes</button>
            </div>
        </div>
    );
}

export default GetUserInput;