import React from 'react';
import './CuisineWheel.css';
import PropTypes from 'prop-types';

class CuisineWheel extends React.Component{
    constructor(props){
        super(props);
        this.state = {cuisine:"", isToggleOn: true, cuisineArr:["African","American","British","Cajun","Caribbean","Chinese","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Mexican","Southern","Spanish","Thai","Vietnamese","Nordic"],
        spinAngleStart: 0, startAngle: 0, spinTime: 0, arc: Math.PI / (22 / 2) };
        this.spinTimer = null;
        this.handleOnClick = this.handleOnClick.bind(this);
        this.spin = this.spin.bind(this);
        this.rotate = this.rotate.bind(this);
        // These lines line used during development for debugging
        // this.handleClick = this.handleClick.bind(this)
        // this.myClick = this.myClick.bind(this)
    }

    static propTypes = {
        className: PropTypes.string,
        options: PropTypes.array,
        baseSize: PropTypes.number,
        spinAngleStart: PropTypes.number,
        spinTimeTotal: PropTypes.number,
        onComplete: PropTypes.func,
      };

    static defaultProps = {
        baseSize: 275,
        spinAngleStart: Math.random() * 10 + 10,
        spinTimeTotal: Math.random() * 3 + 4 * 1000,
      }

      //The following three functions handle the color assignment for each section of the RouletteWheel

      byte2Hex(n) {
        const nybHexString = '0123456789ABCDEF';
        return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
      }
    
      RGB2Color(r,g,b) {
          return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
      }

      getColor(item, maxitem) {
        const phase = 0;
        const center = 128;
        const width = 128;
        const frequency = Math.PI*2/maxitem;
        const red   = Math.sin(frequency*item+2+phase) * width + center;
        const green = Math.sin(frequency*item+3+phase) * width + center;
        const blue  = Math.sin(frequency*item+4+phase) * width + center;
        return this.RGB2Color(red,green,blue);
      }

      drawRouletteWheel() {
        // const spinTimeout = null;
        // const spinTime = 0;
        // const spinTimeTotal = 0;
        const { baseSize } = this.props;
        let { startAngle, arc } = this.state;
        let ctx;
        const canvas = this.refs.canvas;
        if (canvas.getContext) {
          const outsideRadius = baseSize - 205;
          const textRadius = baseSize - 45;
          const insideRadius = baseSize - 55;
          ctx = canvas.getContext('2d');
          ctx.clearRect(0,0,600,600);
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.font = '14px Helvetica, Arial';

          //The section below controls the creation of the RouletteWheel
          for(let i = 0; i < this.state.cuisineArr.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = this.getColor(i, this.state.cuisineArr.length);
            ctx.beginPath();
            ctx.arc(baseSize, baseSize, outsideRadius, angle, angle + arc, false);
            ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
            ctx.fill();
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.translate(baseSize + Math.cos(angle + arc / 2) * textRadius,
                          baseSize + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = this.state.cuisineArr[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
          }
          //The section below controls the creation and styling for the RouletteWheel arrow symbol.
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.lineTo(baseSize + 10, baseSize - (insideRadius + 5));
          ctx.lineTo(baseSize + 0, baseSize - (insideRadius - 20));
          ctx.lineTo(baseSize - 10, baseSize - (insideRadius + 5));
          ctx.fill();
          ctx.stroke();
        }
      }

      spin() {
        this.spinTimer = null;
        this.setState({ spinTime: 0}, () => this.rotate());
      }

      //This section is responsible for the math and function calls related to the rotation animation for the RouletteWheel
      rotate(){
        const { spinAngleStart, spinTimeTotal } = this.props;
        if(this.state.spinTime > 2800) {
          clearTimeout(this.spinTimer);
          this.stopRotateWheel();
        } else {
          const spinAngle = spinAngleStart - this.easeOut(this.state.spinTime, 0, spinAngleStart, spinTimeTotal);
          this.setState({
            startAngle: this.state.startAngle + spinAngle * Math.PI / 180,
            spinTime: this.state.spinTime + 30,
          }, () => {
            this.drawRouletteWheel();
            clearTimeout(this.spinTimer);
            this.spinTimer = setTimeout(() => this.rotate(), 30);
          })
        }
      }

      //This section controls what happens when the RouletteWheel is set to stop.
      stopRotateWheel() {
        let { startAngle, arc } = this.state;
        const { baseSize } = this.props;
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        ctx.save();
        ctx.font = 'bold 25px Roboto, Arial';
        ctx.fillStyle = 'white';
        const text = this.state.cuisineArr[index]
        //The line below controls the positioning of the text that appears inside the wheel.
        ctx.fillText(text, baseSize - ctx.measureText(text).width / 2, baseSize);
        ctx.restore();
        console.log(this.state.spinTime);
        if(this.state.spinTime === 2820){
            this.setState({cuisine: text, spinTime: 0})
            this.props.changeCuisine(text)
        }
      }

      easeOut(t, b, c, d) {
        const ts = (t/=d)*t;
        const tc = ts*t;
        return b+c*(tc + -3*ts + 3*t);
      }

      handleOnClick() {
        this.spin();
      }

    componentDidMount(){
        this.drawRouletteWheel()
        console.log("Componenet Mounted. Line 19.")
    }

    //These functions were used for debugging during the creation process. 

    // componentDidUpdate(){
    //     if(this.state.cuisine !== ""){
    //         console.log("Wheel componentDidUpdate Ran")
    //         console.log(this.state.cuisine);
    //     }
    // }

    // myClick(food){
    //     console.log("i was clicked!!!!");
    //     this.setState({cuisine:food})
    // }

    //This is a working example of toggling the state
    // handleClick(){
    //     this.setState(state => ({
    //         isToggleOn: !state.isToggleOn
    //     }));
    //     console.log(this.state.isToggleOn)
    // }

    // This is a working example of toggling the state
    // handleClick(){
    //     this.setState(food => ({
    //         cuisine: food
    //     }));
    //     console.log(this.state.isToggleOn)
    // }

    // handleClick(food){
    //         this.setState(state => ({
    //             cuisine: state.food
    //         }))
    // }


    render(){
        const { baseSize } = this.props;

        return(
            <div>
                <h2>Click Choose My Cuisine to get started!</h2>
                <div className="roulette">
                    <div className="roulette-container">
                    <canvas ref="canvas" width={baseSize * 2} height={baseSize * 2} className="roulette-canvas"></canvas>
                    </div>
                    <div className="roulette-container">
                    <input type="button" value="Choose My Cuisine" onClick={this.handleOnClick} className="button" id="spin" />
                    </div>
                </div>
                
                {/* The lines below was previously used to establish a button for each cuisine option */}
                
                {/* {this.state.cuisineArr.map((food, index) => <button key= {index} onClick= { () => {this.props.changeCuisine(food)}}>{food}</button>)} */}
                {/* {this.state.cuisineArr.map((food, index) => <button key= {index} onClick= {() => {this.setState( {cuisine:food}); recipeApi(`${food}`)}}>{food}</button>)} */}
                
                {/* The lines below were used during the devleopment of this componenet and are left in for review reasons */}
                {/* recipeApi(`${food}`) */}
                {/* <button type="submit" onClick={() => { this.props.removeTaskFunction(todo) }}>Submit</button> */}
                {/* <button onClick= {this.handleClick}>African</button> */}
                {/* <button onClick= {this.setState({cuisine:'Jewish'})}>Jewish</button> */}
                {/* <button onClick= {this.myClick()}>Cajun</button> */}
                {/* <button onClick = {(e)=> this.handleClick(e)}>Chinese</button> */}
                {/* <button>Italian</button> */}
                {/* <button onClick= {() => {this.props.changeCuisine(this.state.cuisineArr[Math.floor(Math.random() * 25)] )}}>Choose My Cuisine!</button> */}
            </div>
        );
    }
}

export default CuisineWheel;

 