import React from "react";
import { useRouter } from "next/router";

function Home(){
    const router = useRouter();

    const getRandomRecipe = () => {
        router.push("/ResultPage?type=random"); 
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
            <nav >
                <button onClick={scrollToTop}>Home Page</button>
                <button onClick={goToFavorites}>Favorite Dish</button>
            </nav>
            <div>
                <h1>WHAT TO EAT?</h1>
            </div>
            <div>
                <button onClick={getRandomRecipe}>Get Random Dish</button>
                <button onClick={customRecipe}>Customize Your Dish</button>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </div>
        </div>
    )
}

export default Home;
