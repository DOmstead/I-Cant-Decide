import React from 'react';
import './App.css';
import RecipeComp from './Recipe.js';
import CuisineWheel from './CuisineWheel';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {startingPage: true, CuisineWheel:false, RecipeComp:false, cuisine: "", newRecipe:false}
  }

  updateCuisine = (food) => {
    this.setState({cuisine: food });
  }

  recipeToggle = () => {
    this.setState(prevState => ({RecipeComp: !prevState.RecipeComp}))
  }

  cuisineWheelToggle = () => {
    this.setState(prevState => ({CuisineWheel: !prevState.CuisineWheel}))
  }

  newRecipeToggle = () => {
    this.setState( prevState => ({newRecipe: !prevState.newRecipe}))
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className= "homeContainer">
          <button className= "home" onClick = {() => this.setState({startingPage: true, CuisineWheel:false, RecipeComp:false, cuisine: "", newRecipe:false})}>Home</button>
          </div>
          { this.state.startingPage &&
          <div>
            <h1> I Can't Decide!</h1>
            <h3> An app to help you choose</h3>
            <p> Click below to get started! </p>
            <button className="getStartedButton" onClick = {() => {this.setState(prevState => ({CuisineWheel: !prevState.CuisineWheel, startingPage: !prevState.startingPage}))}}>I Can't Decide what to cook! </button>
          </div>
          }
          {this.state.CuisineWheel && <CuisineWheel changeCuisine={this.updateCuisine} />}
          {this.state.RecipeComp && <RecipeComp cuisine ={this.state.cuisine}/>}
          {this.state.cuisine !== "" && !this.state.newRecipe && <button className="displayRecipe" onClick = {() => {this.recipeToggle(); this.cuisineWheelToggle(); this.newRecipeToggle()}}>{`${this.state.cuisine} sounds delicious! Show me my recipe!`}</button>}
          {this.state.cuisine !== "" && this.state.newRecipe && <button className= "tryAgain" onClick = {() => {this.cuisineWheelToggle(); this.recipeToggle(); this.setState({cuisine:""}); this.newRecipeToggle() }} >{`Let's Try Again`}</button>}
        </header>
      </div>
    );
  };
}

export default App;


