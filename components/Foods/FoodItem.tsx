import FoodModel from "../../Model/FoodModel"
import "./FoodItem.css"
import { Link } from "react-router-dom";

type Props = {
  rescipe: FoodModel
}

function FoodItem({ rescipe }: Props) {
  
    return (
      <Link to={'/food/recipe/' + rescipe.id}>
      <div>
        <h1>{rescipe.dish_name}</h1>
        <img src={rescipe.image} alt={'image of ' + rescipe.dish_name} />
      </div>
      </Link>
    )
  }
  
  export default FoodItem