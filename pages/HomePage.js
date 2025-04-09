import React from "react";
import { useRouter } from "next/router";
import styles from '../styles/HomePage.module.css'; 

function Home(){
    const router = useRouter();

    const getRandomRecipe = () => {
        const timestamp = Date.now();
        router.push(`/ResultPage?type=random&time=${timestamp}`); 
    };

    const customRecipe = () => {
        router.push("/SearchPage"); 
    };
    const goToFavorites = () => {
        router.push("/FavoriteDishesPage");
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return(
        <div>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <button onClick={scrollToTop}>Home</button>
                <button onClick={goToFavorites}>Favorite Dishes</button>
            </nav>
            <div>
                <h1>WHAT TO EAT?</h1>
            </div>
            <div>
                <button onClick={getRandomRecipe}>Get Random Dish</button>
                <button onClick={customRecipe}>Customize Your Dish</button>
            </div>
        </div>
    )
}

export default Home;