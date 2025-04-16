import { useRouter } from "next/router";
import fetchAPI from "../components/fetchAPI";
import styles from "../styles/Instruction.module.css";
import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ViewRecipe() {
    const router = useRouter();
    const { id, title, image } = router.query;
    const [dishCount, setDishCount] = useState(0);

    const INSTRUCTION_API_URL = id ? `${BASE_URL}/${id}/analyzedInstructions?apiKey=${API_KEY}` : null;
    const { data: recipe, loading: loading, error: error } = fetchAPI(INSTRUCTION_API_URL);

    // Load favorite dishes count
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = JSON.parse(localStorage.getItem("favoriteDishes")) || [];
            setDishCount(saved.length);
        }
    }, []);

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles["nav-left"]}>
                    <button onClick={() => router.push("/")}>Home</button>
                </div>
                <div className={styles["nav-center"]}>
                    WhatToEat?
                </div>
                <div className={styles["nav-right"]}>
                    <button onClick={() => router.push("/FavoriteDishesPage")}>My List ({dishCount})</button>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        id && title && (
                            <div className={styles.header}>
                                <h1>{title}</h1>
                                <img src={image} alt={title} style={{ width: "200px" }} />
                            </div>
                        )
                    )}

                    {recipe && recipe.length > 0 ? (
                        recipe.map((section, sectionIndex) => (
                            <div key={sectionIndex} className={styles["recipe-section"]}>
                                <h3>{section.name || "Cooking Instructions"}</h3>
                                {section.steps.map((step) => (
                                    <div key={step.number}>
                                        <h4 className={styles["step-number"]}>Step {step.number}</h4>
                                        <p className={styles["step-text"]}>{step.step}</p>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No recipe instructions available.</p>
                    )}
                    <br />
                    <button onClick={() => router.push(`/NutrientPage?id=${id}&title=${title}&image=${image}`)}>
                        View Nutrition
                    </button>
                </div>
            </div>
        </>
    );
}
