package com.example.pm_backend.model;

public class ResponseObject {
    private RecipeModel response;
    private int status;

    public ResponseObject(RecipeModel response, int status){
        this.response = response;
        this.status = status;
    }

    public void setResponse(RecipeModel response) {
        this.response = response;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
