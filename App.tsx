import { useState, useEffect } from 'react'
import FoodModel from './Model/FoodModel'
import './App.css'
import axios from 'axios'
import FoodList from './components/Foods/FoodList';
import { Link, Route, Routes } from 'react-router-dom';
import FoodRecipe from './components/FoodRecipe/FoodRecipe';
import CerateRecipe from './components/CreateRecipe/CreateRecipe';
import ResponseObj from './Model/ResponseObj';

function App() {
  const baseUrl = "http://localhost:8080/api/";
  const [rescipes, setRescipes] = useState<FoodModel[]>([])
  const [rescipe, setRescipe] = useState<FoodModel | null>(null);

  const createRescipe = async (rescipe: FoodModel) => {
    try {
      const response = (await axios.post(baseUrl + "create/recipe/", rescipe)).data as ResponseObj;
      return response;
    } catch (error) {
      return null;
    }
  }

  function fetchRequest(id: number) {
    fetchRescipe(id);
  }

  const fetchRescipe = async (id: number) => {
    try {
      const response = await axios.get(baseUrl + "recipe/" + id)
      if (response.status == 200) setRescipe(response.data);
      else setRescipe(null);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    axios.get(baseUrl + 'recipe')
      .then(response => {
        setRescipes(response.data)
      });
  }, [])

  return (
    <div className="app">
      <Link to={"/food/create"}>Create new Recipe</Link>
      <Routes>
        <Route path="/" element={<FoodList rescipes={rescipes} />} />
        <Route path="/food/recipe/:id" element={<FoodRecipe rescipe={rescipe} fetchRequest={fetchRequest} />} />

        <Route path="/food/create" element={<CerateRecipe createRescipe={createRescipe} />} />
      </Routes>
    </div>
  )
}

export default App
