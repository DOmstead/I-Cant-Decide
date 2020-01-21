const apiKey = 'apiKey=d84963d1ace64944885b02a6e888da90';

//This function is the first of two APi calls. It works by fetching an array of recipes that meet the criteria of the selected cuisine. 
function recipeApi(cuisine = 'American'){
    const baseSearchUrl= 'https://api.spoonacular.com/recipes/search?'
    let instructions = 'instructionsRequired=true'   
    return(
        fetch(`${baseSearchUrl}${apiKey}&cuisine=${cuisine}&${instructions}`)
    ).then(res => {
        if(!res.ok){
            return Promise.reject({ message: res.statusText});
        }
        return res.json()
    }).then(
        data => {
            return data.results
        }
    )
}

//This function is the second of two API calls. It works by fetching the specific recipe chosen 
function searchById(id){
    const baseIdSearch = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`;
    return(
        fetch(`${baseIdSearch}&${apiKey}`).then(res =>{
            return res.json();
        })
    );
}

export {recipeApi, searchById};
