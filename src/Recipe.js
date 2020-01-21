import React from 'react';
import {recipeApi,searchById} from './RecipeApi.js';
import './Recipe.css'

class RecipeComp extends React.Component {
  constructor(props){
    super(props);
    this.state = {message: "Check out this great recipe:", title:"", id:"" , image: "", imageUrls: "", readyInMinutes: "1", servings: "", instructions: "", analyzedInstructions: "", extendedIngredients:""}
  }

 //This function fires when the recipe componenet is mounted. It makes multiple API calls and updates statebased off those calls.  
  componentDidMount(){
    this.setState({message: "Check out this great recipe:"});
    recipeApi(this.props.cuisine).then(res =>{ 
      let instance = res[Math.ceil(Math.random() * 9)];
      this.setState({title: instance.title, id:instance.id, image: instance.image, imageUrls: instance.imageUrls, readyInMinutes: instance.readyInMinutes, servings: instance.servings});
      searchById(this.state.id).then( res =>{
        this.setState({instructions: res.instructions,analyzedInstructions: res.analyzedInstructions[0].steps, image: res.image,servings: res.servings, extendedIngredients: res.extendedIngredients});
      });
    });
  }

  render() {
    if(this.state.extendedIngredients !== ""){
      return (
      <div className="recipe">
        <h2>{this.state.message}</h2>
        <h3>{this.state.title}</h3>
        <div>
        <p className="readyInMinutesAndServings">Serves {this.state.servings}</p>
        <p className="readyInMinutesAndServings">Total Cook Time: {this.state.readyInMinutes} Minutes</p>
        </div>
        <h2 className="ingredientsHeader">Ingredients</h2>
        <ul className="recipeIngredientsContainer">{this.state.extendedIngredients.map((ingredient,index) => <li className= "recipeIngredient" key={index}>{ingredient.original}</li>)}</ul>
        <img src= {this.state.image} alt= 'The Requested Recipe'/>
      <ul className="recipeInstructions">{this.state.analyzedInstructions.map((item,index) => <ul className= 'numberAndStepContainer' key={index + 50}><li className= 'stepNumber' key={index}>{item.number}</li> <li className='stepInstruction' key={index + 80}>{item.step}</li></ul>)}</ul>
      </div>
      )
    }
    return(
      <div>
      <h2>{this.state.message}</h2>
      <p>Fetching an amazing recipe just for you! </p>
      <div className="loading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
    };
  }

export default RecipeComp 