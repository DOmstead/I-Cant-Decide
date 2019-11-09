import React from 'react';

function recipeApi(cuisine = 'italian'){
    const baseSearchUrl= 'https://api.spoonacular.com/recipes/search?'
    // const baseInstructionsUrl= `https://api.spoonacular.com/recipes/${id}/information?`
    const apiKey = 'apiKey=d84963d1ace64944885b02a6e888da90';
    // const searchById = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`  
    // let cuisine = 'cuisine=italian';
    let instructions = 'instructionsRequired=true'

    console.log('Recipe APi is about to run');
    
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

function searchById(id){
    const baseIdSearch = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`;
    const apiKey = 'apiKey=d84963d1ace64944885b02a6e888da90';
    return(
        fetch(`${baseIdSearch}&${apiKey}`).then(res =>{
            return res.json();
        })
    );
}



// export default {searchById, recipeApi}

export {recipeApi, searchById};

// export default searchById