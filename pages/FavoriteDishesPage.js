import { useEffect, useState } from "react";
import styles from '../styles/Favorite.module.css';
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FavoriteDishesPage() {
    const [dishData, setDishData] = useState([]);
    const [src, setSrc] = useState({});
    const [title, setTitle] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("favoriteDishes");
            if (stored) {
                setDishData(JSON.parse(stored));

            }
        }
    }, []); 

    const fetchData = async () => {
        const imgMap = {};
        const titleMap = {};
    
        for (const item of dishData) {
            try {
                const result = await fetch(`${BASE_URL}/${item.dish_id}/information?apiKey=${API_KEY}`);
    
                if (!result.ok) {
                    console.warn("Failed to fetch for dish ID:", item.dish_id);
                    continue;
                }
    
                const data = await result.json();
                imgMap[item.id] = data.image;
                titleMap[item.id] = data.title;
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }
    
        setSrc(imgMap);
        setTitle(titleMap);
    };

    useEffect(() => {
        if (dishData.length > 0) {
            fetchData();
        }
    }, [dishData]);    

    const removeDish=(removed_id)=>{
        const updatedDishes = dishData.filter(dish => dish.id !== removed_id);
        setDishData(updatedDishes);

        const newSrc={...src};
        delete newSrc[removed_id];
        setSrc(newSrc);

        const newTitle={...title};
        delete newTitle[removed_id];
        setTitle(newTitle);

        if (typeof window !=="undefined") {
            localStorage.setItem("favoriteDishes", JSON.stringify(updatedDishes));
        }
    };

    return (
        <div className={styles.favPage}>
            <nav className={styles.navbar}>
                <Link href={"/HomePage"} className={styles.nav}>Home</Link>
                <Link href={"/FavoriteDishesPage"} className={styles.nav}>Favorite Dishes</Link>
            </nav>
            <div className={styles.favContent}>
                <div className={styles.favTitle}>
                    <h1>Favorite Dishes</h1>
                </div>
                
                {dishData.length===0?(<div><p>No saved dishes.</p></div>):
                (<ul>{dishData.map(dish=>(
                    <li key={dish.id}>
                        <img src={src[dish.id]} alt="dish-img" style={{width: '150px'}} />
                        <h3>{title[dish.id]}</h3>
                        <button onClick={()=>removeDish(dish.id)}>Mark as completed</button>
                    </li>   
                ))}
                </ul>)}
            </div>
           
        </div>
    );
}