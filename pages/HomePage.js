import React from "react";
import { useRouter } from "next/router";
import styles from '../styles/HomePage.module.css'; 

function Home(){
    const router = useRouter();

    // Function to get a random recipe
    const getRandomRecipe = () => {
        const timestamp = Date.now();
        router.push(`/ResultPage?type=random&time=${timestamp}`); 
    };

    // Function to navigate to the custom dish search page
    const customRecipe = () => {
        router.push("/SearchPage"); 
    };

    // Function to navigate to the favorite dishes page
    const goToFavorites = () => {
        router.push("/FavoriteDishesPage");
    };

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return(
        <div className={styles.page}>
            <nav className={styles.navbar}>
                <button className={styles.navButton} onClick={scrollToTop}>Home</button>
                <button className={styles.navButton} onClick={goToFavorites}>Favorite Dishes</button>
            </nav>

            <div className={styles.main}>
                <h1 className={styles.h1}>WHAT TO EAT?</h1>
                <div className={styles.mainButtons}>
                    <button className={styles.btn} onClick={getRandomRecipe}>Get Random Dish</button>
                    <button className={styles.btn} onClick={customRecipe}>Customize Your Dish</button>
                </div>
            </div>
        </div>
    );
}

export default Home;