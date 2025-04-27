package com.example.pm_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class RecipeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    String image;
    int time;
    int portion_size;
    String dish_name;



    //@JsonIgnore
    @OneToMany(mappedBy = "recipe")
    private List<IngredientModel> ingredients;

    @OneToMany(mappedBy = "recipe")
    private List<DescriptionModel> descriptions;

    public List<IngredientModel> getIngredients() {
        return ingredients;
    }

    public List<DescriptionModel> getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(List<DescriptionModel> descriptions) {
        this.descriptions = descriptions;
    }

    public void setIngredients(List<IngredientModel> ingredients) {
        this.ingredients = ingredients;
    }

    public void addToIngredients(IngredientModel ingred){
        this.ingredients.add(ingred);
    }

    public void addToDescriptions(DescriptionModel description){
        this.descriptions.add(description);
    }

    public int getPortion_size() {
        return portion_size;
    }

    public String getDish_name() {
        return dish_name;
    }

    public int getTime() {
        return time;
    }

    public String getImage() {
        return image;
    }

    public Long getId() {
        return id;
    }

    public boolean validIngredients(){
        for (IngredientModel item : this.ingredients) {
            if(!item.isValid()) return false;
        }
        return !this.ingredients.isEmpty();
    }

    public boolean validDescriptions(){
        for (DescriptionModel description : this.descriptions) {
            if(!description.isValid()) return false;
        }
        return !this.descriptions.isEmpty();
    }

    public boolean isValid(){
        boolean validDish = !this.dish_name.isEmpty();
        boolean validSize = this.portion_size > 0;
        boolean validTime = this.time > 0;

        return validDish
                && validSize
                && validTime
                && this.validIngredients()
                && this.validDescriptions();
    }

    public boolean isEqual(RecipeModel createdtRecipe){
        boolean name = createdtRecipe.dish_name.equals(this.dish_name);
        boolean ingredients = createdtRecipe.ingredients == this.ingredients;
        boolean description = createdtRecipe.descriptions == this.descriptions;
        boolean time = createdtRecipe.time == this.time;
        boolean img = createdtRecipe.image.equals(this.image);
        boolean size = createdtRecipe.portion_size == this.portion_size;

        return name
                && ingredients
                && description
                && time
                && img
                && size;
    }

}
