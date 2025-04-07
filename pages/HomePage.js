import React from "react";
import { useRouter } from "next/router";

function Home(){
    const router = useRouter();

    const getRandomRecipe = () => {
        router.push("/ResultPage?type=random&fetch=true"); 
        };

    const customRecipe = () => {
        router.push("/SearchPage?type=custom"); 
    };

    return(
        <div>
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