import { useEffect, useState } from "react";
import styles from '../styles/Favorite.module.css';
import Link from "next/link";
import { useRouter } from "next/router";

export default function FavoriteDishesPage() {
    const [dishData, setDishData] = useState([]);
    const router = useRouter();
    const [dishCount, setDishCount] = useState(0);

    const handleViewNutrition = (id, title, image) => {
        router.push(`/NutrientPage?id=${id}&title=${title}&image=${image}`);
    };
    
    const handleViewRecipe = (id, title, image) => {
    router.push(`/InstructionPage?id=${id}&title=${title}&image=${image}`);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("favoriteDishes");
            if (stored) {
                setDishData(JSON.parse(stored));

            }
        }
    }, []);

    const removeDish=(removed_id)=>{
        const updatedDishes = dishData.filter(dish => dish.id !== removed_id);
        setDishData(updatedDishes);
        
        if (typeof window !=="undefined") {
            localStorage.setItem("favoriteDishes", JSON.stringify(updatedDishes));
        }
    };

    // Load favorite dishes count
    useEffect(() => {
        setDishCount(dishData.length);
    }, [dishData]);

    return (
        <div className={styles.favPage}>
            <nav className={styles.navbar}>
                <Link href={"/HomePage"} className={styles.nav}>Home</Link>
                <div className={styles.appName}> WhatToEat?</div> 
                <Link href={"/FavoriteDishesPage"} className={styles.nav} scroll={true}>My List ({dishCount})</Link>
            </nav>
            <div className={styles.favContent}>

                {dishData.length===0?(<div><p>No saved dishes.</p></div>):
                 (<ul className={styles.listArea}>{dishData.map(dish=>(
                    <li key={dish.id} className={styles.favList}>
                        <img src={dish.dish_image} alt="dish-img" style={{width: '150px'}} />
                        <h3 className={styles.favTitle}>{dish.dish_title}</h3>
                        <div className={styles.buttonList}>
                            <button onClick={()=>handleViewNutrition(dish.dish_id, dish.dish_title, dish.dish_image)} className={styles.btn}>View Nutrition</button>
                            <button onClick={()=>handleViewRecipe(dish.dish_id, dish.dish_title, dish.dish_image)} className={styles.btn}>View Recipe</button>
                            <button onClick={()=>removeDish(dish.id)} className={styles.btn}>Mark Done</button>
                        </div>
                    </li>   
                ))}
                </ul>)}
            </div> 
        </div>
    );
}