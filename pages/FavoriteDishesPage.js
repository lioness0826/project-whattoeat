import { useEffect, useState } from "react";
import styles from '../styles/Favorite.module.css';
import Link from "next/link";
import { useRouter } from "next/router";

export default function FavoriteDishesPage() {
    const [dishData, setDishData] = useState([]);
    const router = useRouter();

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

    return (
        <div className={styles.favPage}>
            <nav className={styles.navbar}>
                <Link href={"/HomePage"} className={styles.nav}>Home</Link>
                <Link href={"/FavoriteDishesPage"} className={styles.nav} scroll={true}>Favorite Dishes</Link>
            </nav>
            <div className={styles.favContent}>
                <div className={styles.favTitle}>
                    <h1>Favorite Dishes</h1>
                </div>
                
                {dishData.length===0?(<div><p>No saved dishes.</p></div>):
                (<ul>{dishData.map(dish=>(
                    <li key={dish.id} className={styles.favList}>
                        <img src={dish.dish_image} alt="dish-img" style={{width: '150px'}} />
                        <h3>{dish.dish_title}</h3>
                        <button onClick={()=>handleViewNutrition(dish.dish_id, dish.dish_title, dish.dish_image)}>View Nutrition</button>
                        <button onClick={()=>handleViewRecipe(dish.dish_id, dish.dish_title, dish.dish_image)}>View Instruction</button>
                        <button onClick={()=>removeDish(dish.id)}>Mark as completed</button>
                        <br /><br /><br />
                    </li>   
                ))}
                </ul>)}
            </div> 
        </div>
    );
}