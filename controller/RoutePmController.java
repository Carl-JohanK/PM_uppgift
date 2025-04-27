package com.example.pm_backend.controller;

import com.example.pm_backend.model.RecipeModel;
import com.example.pm_backend.model.ResponseObject;
import com.example.pm_backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/*")
@CrossOrigin(origins = "http://localhost:5173/")
public class RoutePmController {

    @Autowired
    RecipeService recipeService;

    @GetMapping("/recipe")
    public ResponseEntity<List<RecipeModel>> GetRecipes(){
        return ResponseEntity.status(200).body(recipeService.getAllRecipes());
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<RecipeModel> GetRecipeId(@PathVariable Long id){
        RecipeModel recipe = recipeService.getRecipeId(id);

        if(recipe == null){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(recipe);
    }

    @GetMapping("/recipe/search/{searchString}")
    public String GetSearchRecipe(@PathVariable String searchString){
        return "search all";
    }

    @PostMapping("/create/recipe")
    public ResponseEntity<ResponseObject> PostCreate(@RequestBody RecipeModel recipe){
        ResponseObject responseObject = new ResponseObject(
                null,
                400);
        if(recipe.isValid()) {
            recipeService.saveRecipe(recipe);
            RecipeModel recipeFromDB = recipeService.getCreatedRecipe(recipe);

            responseObject.setResponse(recipeFromDB);
            if(recipeFromDB != null) responseObject.setStatus(201);
        }

        return ResponseEntity
                .status(responseObject.getStatus())
                .body(responseObject);
    }

    @PatchMapping("/update/recipe/{id}")//    just in case
    public String PatchRecipe(@PathVariable Long id){
        return "update";
    }

    @DeleteMapping("/delete/{id}")//    just in case
    public String DeleteRecipe(@PathVariable Long id){
        return "delete";
    }

}
