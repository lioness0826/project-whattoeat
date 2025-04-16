import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../styles/SearchPage.module.css'; // Import CSS Module

function GetUserInput() {
    const router = useRouter();
    
    // States for meal type
    const [mealType, setMealType] = useState("");

    // States for ingredients lists
    const [includeIngredients, setIncludeIngredients] = useState([]);
    const [excludeIngredients, setExcludeIngredients] = useState([]);
    const [tempInclude, setTempInclude] = useState("");
    const [tempExclude, setTempExclude] = useState("");
    const [dishCount, setDishCount] = useState(0);

    // Handle adding and removing ingredients
    const addIngredient = (type) => {
        if (type === "include" && tempInclude.trim()) {
            setIncludeIngredients([...includeIngredients, tempInclude.trim()]);
            setTempInclude("");
        } else if (type === "exclude" && tempExclude.trim()) {
            setExcludeIngredients([...excludeIngredients, tempExclude.trim()]);
            setTempExclude("");
        }
    };

    const removeIngredient = (type, index) => {
        if (type === "include") {
            setIncludeIngredients(includeIngredients.filter((_, i) => i !== index));
        } else if (type === "exclude") {
            setExcludeIngredients(excludeIngredients.filter((_, i) => i !== index));
        }
    };

    // Handle form submission
    const handleCustomOption = () => {
        if (!mealType|| includeIngredients.length === 0 ) {
            alert("Please fill out all fields.");
            return;
        }

        router.push(`/ResultPage?type=custom&mealType=${mealType}&includeIngredients=${includeIngredients.join(",")}&excludeIngredients=${excludeIngredients.join(",")}`);
    };

    // Load favorite dishes count
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
            setDishCount(saved.length);
        }
    }, []);

    return (
        <div>
            <nav className={styles.navbar}>
                <button className={styles.navButton} onClick={() => router.push("/")}>Home</button>
                <div className={styles.appName}> WhatToEat?</div> 
                <button className={styles.navButton} onClick={() => router.push("/FavoriteDishesPage")}>My List ({dishCount})</button>
            </nav>
            
            <div className={styles.container}>
            {/* Meal Type Selection */}
            <div className={styles.section}>
                <label className={styles.label}>
                    Meal Type:
                    <select className={styles.select} value={mealType} onChange={(e) => setMealType(e.target.value)}>
                        <option value="">Select Meal Type</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Drink">Drink</option>
                    </select>
                </label>
            </div>

            {/* Included Ingredients */}
            <div className={styles.section}>
                <label className={styles.label}>Included Ingredients:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={tempInclude}
                    onChange={(e) => setTempInclude(e.target.value)}
                />
                <button className={styles.button} onClick={() => addIngredient("include")}>Add</button>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {includeIngredients.map((item, index) => (
                        <li key={index} className={styles.ingredientItem}>
                        <span>{item}</span>
                        <button className={styles.button} onClick={() => removeIngredient("include", index)}>Remove</button>
                        </li>
                     ))}
                </ul>


            </div>

            {/* Excluded Ingredients */}
            <div className={styles.section}>
                <label className={styles.label}>Excluded Ingredients:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={tempExclude}
                    onChange={(e) => setTempExclude(e.target.value)}
                />
                <button className={styles.button} onClick={() => addIngredient("exclude")}>Add</button>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {excludeIngredients.map((item, index) => (
                        <li key={index} className={styles.ingredientItem}>
                        <span>{item}</span>
                        <button className={styles.button} onClick={() => removeIngredient("include", index)}>Remove</button>
                        </li>
                     ))}
                </ul>
            </div>

            {/* Submit Button */}
            <button className={styles.generateButton} onClick={handleCustomOption}>Generate Dishes</button>
            </div>
        </div>
    );
}

export default GetUserInput;