import FoodModel from "../../Model/FoodModel"
import FoodItem from "./FoodItem"

type Props = {
  rescipes: FoodModel[]
}

function FoodList({ rescipes }: Props) {
  
    return (
      <section>
        <input type="text" name="" id="" />
        <input type="button" value="serch" />
        <article>
        {
          rescipes.map(rescipe => {
            return <FoodItem key={rescipe.id} rescipe={rescipe} />
          })
        }
        </article>
      </section>
    )
  }
  
  export default FoodList