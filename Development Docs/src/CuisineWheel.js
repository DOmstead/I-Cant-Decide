import React from 'react';
import { recipeApi } from './RecipeApi';
import './CuisineWheel.css';

class CuisineWheel extends React.Component{
    constructor(props){
        super(props);
        this.state = {cuisine:"", isToggleOn: true, cuisineArr:["African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Southern","Spanish","Thai","Vietnamese","Nordic"] };
        this.handleClick = this.handleClick.bind(this)
        this.myClick = this.myClick.bind(this)
    }

    //This is a working example of toggling the state
    // handleClick(){
    //     this.setState(state => ({
    //         isToggleOn: !state.isToggleOn
    //     }));
    //     console.log(this.state.isToggleOn)
    // }

    // This is a working example of toggling the state
    handleClick(){
        this.setState(food => ({
            cuisine: food
        }));
        console.log(this.state.isToggleOn)
    }


    // handleClick(food){
    //         this.setState(state => ({
    //             cuisine: state.food
    //         }))
    // }

    componentDidUpdate(){
        if(this.state.cuisine !== ""){
            console.log("Wheel componentDidUpdate Ran")
            console.log(this.state.cuisine);
        }
    }


    componentDidMount(){
        // this.setState({cuisine:"Greek"});
        console.log("Componenet Mounted. Line 19.")
    }

    myClick(food){
        console.log("i was clicked!!!!");
        this.setState({cuisine:food})
    }


    //Thinkful session Mentor lady said to create an array of all cuisines, map over them and render a componenet button for each one. I took screenshots of her example.
    render(){
        return(
            <div>
                <h2>Click Choose My Cusine or if you've got something specific in mind click the corresponding cuisine</h2>
                {this.state.cuisineArr.map((food, index) => <button key= {index} onClick= { () => {this.props.changeCuisine(food)}}>{food}</button>)}
                {/* {this.state.cuisineArr.map((food, index) => <button key= {index} onClick= {() => {this.setState( {cuisine:food}); recipeApi(`${food}`)}}>{food}</button>)} */}
                {/* recipeApi(`${food}`) */}
                {/*Need to better understand the sytax on line below and how that differ than my previosu attempts because it resolved the problem
                Got it from https://stackoverflow.com/questions/33846682/react-onclick-function-fires-on-render */}
                {/* <button type="submit" onClick={() => { this.props.removeTaskFunction(todo) }}>Submit</button> */}
                {/* <button onClick= {this.handleClick}>African</button> */}
                {/* <button onClick= {this.setState({cuisine:'Jewish'})}>Jewish</button> */}
                {/* <button onClick= {this.myClick()}>Cajun</button> */}
                {/* <button onClick = {(e)=> this.handleClick(e)}>Chinese</button> */}
                {/* <button>Italian</button> */}
                <button onClick= {() => {this.props.changeCuisine(this.state.cuisineArr[Math.floor(Math.random() * 25)] )}}>Choose My Cuisine!</button>
            </div>
        );
    }
}

export default CuisineWheel;

// Math.floor(Math.random() * 25)
//This component accomplishes the following. When a button is clicked on the state is set to the corresponding cuising. 
//A prompt is then given to accept. Once the user clicks to accept an API call is then made to get a recipe and is rendered though the screen through
// Recipe.js and RecipeApi.js

//Instead of rendering a ton of buttons I could have one button appear the says "Decide for me", and another that says "Show me my options". The decide for me should do an api call with a randomly chosen cusine. The rest should perform
//the apiRecipe call with the selected cusine. 

//Call Recipe componenet with the state of the food state of the button that called it then use that state for the recipe Api call. 