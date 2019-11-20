import React from 'react';
import {recipeApi,searchById} from './RecipeApi.js';

class RecipeComp extends React.Component {
  constructor(props){
    super(props);
    this.state = {message: "Check out this great recipe:", title:"", id:"" , image: "", imageUrls: "", readyInMinutes: "", servings: "", instructions: "", extendedIngredients:""}
  }

 //This function fires when teh recipe componenet is mounted. It makes multiple API calls and updates statebased off those calls.  
 componentDidMount(){
    this.setState({message: "Check out this great recipe:"});
    recipeApi(this.props.cuisine).then(res =>{ 
      let instance = res[Math.ceil(Math.random() * 9)];
      console.log(`recipe line 19 ${instance.title}`);
      this.setState({title: instance.title, id:instance.id, image: instance.image, imageUrls: instance.imageUrls, readyInMinutes: instance.ReadyInMinutes, servings: instance.servings});
      searchById(this.state.id).then( res =>{
        // console.log(this.state.id);
        // console.log(res);
        this.setState({instructions: res.instructions,image: res.image,servings: res.servings, extendedIngredients: res.extendedIngredients});
        // console.log("This is the line 22 state")
        // console.log(this.state);
      });
    });
  }

  //This function was used for debugging during development.
  // componentDidUpdate(){
  //   if(this.state.extendedIngredients !== ""){
  //     console.log("ComponentDidUpdate Ran");
  //     console.log(this.state.extendedIngredients);
  //     // this.state.extendedIngredients.map( ingredient => (
  //     //   // <div key={ingredient.name}> {ingredient.name} </div>
  //     //   // console.log(ingrediant.name),
  //     //   // document.querySelector(".ingrediantList")
  //     //   this.setState({ingrediant.name: ingrediant.name})
  //       // ))
  //   }
  // }

  render() {
    console.log("The Render function ran")
    console.log(this.state);
    if(this.state.extendedIngredients !== ""){
      return (
      <div className="recipe">
        <h2>{this.state.message}</h2>
        <h3>{this.state.title}</h3>
        <p>Serves {this.state.servings}</p>
        <ul>{this.state.extendedIngredients.map(ingredient => <li>{ingredient.original}</li>)}</ul>
        {/* <p>{this.state.extendedIngredients[0].name}</p> */}
        {/* < Test extendedIngredients={this.state.extendedIngredients} /> */}
        {/* <ul>{this.state.extendedIngredients.map(ingrediant => )}</ul> */}
        {/* <p id= "ingredientList" className= "ingredientList"></p> */}
        <img src= {this.state.image} alt= 'The Requested Recipe'/>
        <p>{this.state.instructions}</p>
      </div>
      )
    }
      return(
        <div>
        <h2>{this.state.message}</h2>
        <p>Fetching an amazing recipe just for you! </p>
        </div>
      )
    };
  }

export default RecipeComp 