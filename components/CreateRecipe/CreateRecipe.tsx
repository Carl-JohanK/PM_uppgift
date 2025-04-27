import { FormEvent, useState } from "react";
import FoodModel from "../../Model/FoodModel";
import { useNavigate } from "react-router-dom";
import ResponseObj from "../../Model/ResponseObj";
import './CSS/CreateRecipe.css';

type prop = {
    createRescipe: (recipe: FoodModel) => Promise<ResponseObj | null>,
}

function CerateRecipe({ createRescipe }: prop) {
    const navigate = useNavigate();
    const [newRecipe, setNewRecipe] = useState<FoodModel>({
        image: "",
        time: 0,
        portion_size: 0,
        dish_name: "",
        descriptions: [{
            description: ""
        }],
        ingredients: [{
            item: ""
        }]
    })

    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const key = e.currentTarget.name;
        let value: string | number = e.currentTarget.value;

        if (key == 'time' || key == 'portion_size') {
            const numValue = Number(value);
            value = isNaN(numValue) ? 0 : numValue;
        }

        setNewRecipe((prev) => ({
            ...prev,
            [key]: value
        }));
    }

    function handleArrayInput(
        key: "ingredients" | "descriptions",
        index: number,
        value: string) {
        setNewRecipe((prev) => ({
            ...prev,
            [key]: prev[key].map((item, i) =>
                i === index ? {
                    ...item,
                    [key === "ingredients" ? "item" : "description"]: value
                } : item
            )
        }));
    }

    function handleArrayLength(key: "ingredients" | "descriptions", isPlus: boolean) {
        setNewRecipe((prev) => {
            const updatedArray = [...(prev[key] || [])];

            if (isPlus) {
                updatedArray.push({ item: "" });
            } else {
                updatedArray.pop();
            }

            return {
                ...prev,
                [key]: updatedArray,
            };
        })
    }

    const submitRecipe = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const response = await createRescipe(newRecipe);
        if (!response) return;

        if (response.status === 201) {
            const createdRecipe = response.response;
            if (createdRecipe?.id) {
                navigate('/food/recipe/' + createdRecipe.id);
            }
        } else {
            alert("problem att skapa ett nyt resept error: " + response.status);
        }
    };

    return (
        <form onSubmit={submitRecipe} action="supmit" className="form">
            <h1>skapa ditt resept</h1>
            <main className="form-content">
            <article className="side-content">
                <section className="form-input">
                    <h3>dich name:</h3>
                    <textarea onChange={handleInput} required name="dish_name" id="name" rows={1}></textarea>
                </section>

                <section className="form-input">
                    <h3>time:</h3>
                    <textarea onChange={handleInput} required name="time" id="time" rows={1}></textarea>
                </section>

                <section className="form-input">
                    <h3>portion size:</h3>
                    <textarea onChange={handleInput} required name="portion_size" id="size" rows={1}></textarea>
                </section>

                <section className="form-input">
                    <h3>img url:</h3>
                    <textarea onChange={handleInput} required name="image" id="img" rows={1}></textarea>
                </section>
            </article>

            <article className="side-content">
                <section>
                    <div className="form-input">
                        <h3>ingredient:</h3>
                        <div className="div-button" 
                        onClick={() => handleArrayLength("ingredients", true)}>+</div>
                        <div className="div-button" 
                        onClick={() => handleArrayLength("ingredients", false)}>-</div>
                    </div>
                    {
                        newRecipe.ingredients.map((ingredient, index) => {
                            return (
                                <textarea key={index}
                                    required
                                    name={`ingredients-${index}`}
                                    id="ingredients"
                                    onChange={(e) => { handleArrayInput("ingredients", index, e.currentTarget.value) }}
                                ></textarea>
                            )
                        })
                    }
                </section>

                <section>
                    <div className="form-input">
                        <h3>description:</h3>
                        <div className="div-button" 
                        onClick={() => handleArrayLength("descriptions", true)}>+</div>
                        <div className="div-button" 
                        onClick={() => handleArrayLength("descriptions", false)}>-</div>
                    </div>
                    {
                        newRecipe.descriptions.map((info, index) => {
                            return (
                                <textarea key={index}
                                    required
                                    name={`descriptions-${index}`}
                                    id="descriptions"
                                    onChange={(e) => { handleArrayInput("descriptions", index, e.currentTarget.value) }}
                                ></textarea>
                            )
                        })
                    }
                </section>
            </article>
            </main>

            <button>create recipe</button>
        </form>
    )
}

export default CerateRecipe;