package com.example.pm_backend.service;

import com.example.pm_backend.model.DescriptionModel;
import com.example.pm_backend.model.IngredientModel;
import com.example.pm_backend.model.RecipeModel;
import com.example.pm_backend.repository.DescriptionRepository;
import com.example.pm_backend.repository.IngredientRepository;
import com.example.pm_backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private DescriptionRepository descriptionRepository;

    public void saveRecipe(RecipeModel recipe) {
        List<IngredientModel> ingredients = recipe.getIngredients();
        List<DescriptionModel> descriptions = recipe.getDescriptions();
        for (IngredientModel ingredient : ingredients) {
            ingredient.setRecipe(recipe);
        }
        for (DescriptionModel description : descriptions) {
            description.setRecipe(recipe);
        }
        recipe.setDescriptions(descriptions);
        recipe.setIngredients(ingredients);

        recipeRepository.save(recipe);
        ingredientRepository.saveAll(ingredients);
        descriptionRepository.saveAll(descriptions);
    }

    public List<RecipeModel> getAllRecipes(){
        return recipeRepository.findAll();
    }

    public RecipeModel getRecipeId(long id){
        RecipeModel recipe = recipeRepository.getRecipeModelById(id);
        return recipe;
    }

    public RecipeModel getCreatedRecipe(RecipeModel recipe){
        List<RecipeModel> allRecipes = getAllRecipes();
        for (int i = allRecipes.size() - 1; i >= 0; i--) {
            if(allRecipes.get(i).isEqual(recipe)) return allRecipes.get(i);
        }
        return null;
    }
}
