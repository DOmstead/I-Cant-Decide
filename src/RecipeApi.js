import React from 'react';

//This function is the first of two APi calls. It works by fetching an array of recipes that meet the criteria of the selected cuisine. 
function recipeApi(cuisine = 'American'){
    const baseSearchUrl= 'https://api.spoonacular.com/recipes/search?'
    const apiKey = 'apiKey=d84963d1ace64944885b02a6e888da90';
    let instructions = 'instructionsRequired=true'
    // console.log('Recipe APi is about to run');
    
    return(
        fetch(`${baseSearchUrl}${apiKey}&cuisine=${cuisine}&${instructions}`)
    ).then(res => {
        if(!res.ok){
            console.log("Line 13 ran because something in the API process failed!")
            return Promise.reject({ message: res.statusText});
        }
        return res.json()
    }).then(
        data => {
            console.log(data)
            console.log(data.results)
            // console.log(data.results[0].title)
            // console.log(typeof data.results[0].title)
            //This was the origionaly used return statement
            // return data.results[0].title
            // return data.results[0]
            return data.results
        }
    )
}

//This function is the second of two API calls. It works by fetching the specific recipe chosen 
function searchById(id){
    const baseIdSearch = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`;
    const apiKey = 'apiKey=d84963d1ace64944885b02a6e888da90';
    return(
        fetch(`${baseIdSearch}&${apiKey}`).then(res =>{
            return res.json();
        })
    );
}

export {recipeApi, searchById};
