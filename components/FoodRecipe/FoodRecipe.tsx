import { useEffect } from "react";
import FoodModel from "../../Model/FoodModel"
import { useParams } from "react-router-dom";

type Props = {
  rescipe: null | FoodModel,
  fetchRequest: (id : number) => void
}

function FoodRecipe({ rescipe, fetchRequest }: Props) {
  const { id } = useParams();

  useEffect(() => {
    if(id != undefined){
      fetchRequest(parseInt(id))
    }
  }, [])

  {
    if(rescipe == null) return (
      <h1>Rescipe Not Fond</h1>
    )
  }
  
    return (
        <section className="food-recipe">
        <h2>{rescipe.dish_name}</h2>
        <p>{rescipe.portion_size} personer</p>
        <p>{rescipe.time} min</p>

        <h3>ingrediens</h3>
        <ul>
          {
            rescipe.ingredients.map(ingredient => {
              return <li>{ingredient.item}</li>
            })
          }
        </ul>

        <h3>discription</h3>
        <ol>
          {
            rescipe.descriptions.map(info => {
              return <li>{info.description}</li>
            })
          }
        </ol>
      </section>
    )
  }
  
  export default FoodRecipe