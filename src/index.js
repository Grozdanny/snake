import React from "react";
import ReactDOM from "react-dom";
import "./index.css"



class Tile extends React.Component{
  constructor(props){
      super(props);
      
  }
  render(){
      const snakeXCoordinate = this.props.snakePositionCoordinates[0];
      const snakeYCoordinate = this.props.snakePositionCoordinates[1];
      const isSnakeIn = this.props.X === snakeXCoordinate && this.props.Y === snakeYCoordinate ? true : false;
      
      const foodXCoordinate = this.props.foodPositionCoordinates[0];
      const foodYCoordinate = this.props.foodPositionCoordinates[1];
      const isFoodIn = this.props.X === foodXCoordinate && this.props.Y === foodYCoordinate ? true : false ;
      return <div className={`tile ${isSnakeIn ? "snake" : ""} ${isFoodIn ? "food" : ""}`}></div>
  }

}

class Grid extends React.Component{
  constructor(props){
      super(props);
  }

  render() {

      const ba = Array(this.props.gridSize[1]).fill(Array(this.props.gridSize[0]).fill(null)); 
          
          return (
                 <div className="xGrid">
                  {ba.map((gridY,yIndex) => {
                      return(
                      <div className="yGrid">
                          {gridY.map((gridX,xIndex) => {
                             return <Tile X={xIndex} Y={yIndex}  snakePositionCoordinates={this.props.snakeTileCoordinates} foodPositionCoordinates={this.props.foodTileCoordinates} />
                          })}
                      </div>
                      )
                    } 
                  )}
              </div>
              
          )           
  }
  

}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            gridSize:[7, 7],
            snake:[3, 3],
            food:[5,1],
            direction: "U", 
            time: 0
        }
        this.onClick = this.onClick.bind(this);
        this.timeElaps = this.timeElaps.bind(this);
    }
    timeElaps(){

        let newSnake = [];
        let tmp = 0;
        const gridSizX = this.state.gridSize[0];
        const gridSizY = this.state.gridSize[1];

        switch(this.state.direction){           
            
            case "L":
                tmp = this.state.snake[0] - 1 < 0 ? this.state.gridSize[0] - 1 :this.state.snake[0] - 1;
                newSnake = [tmp, this.state.snake[1] ];
                break;
            case "R":
                tmp = (this.state.snake[0] + 1) % this.state.gridSize[0];
                newSnake = [tmp, this.state.snake[1] ];
                break;
            case "U":
                tmp = this.state.snake[1] - 1 < 0 ? this.state.gridSize[1] - 1 :this.state.snake[1] - 1;
                newSnake = [this.state.snake[0], tmp ];
                break;
            case "D":
                tmp = (this.state.snake[1] + 1) % this.state.gridSize[0];
                newSnake = [this.state.snake[0], tmp ];
                break;

            default:
                newSnake = [parseInt(this.state.gridSize[0]/2), parseInt(this.state.gridSize[1]/2)];
        }
        

        this.setState({snake: newSnake, time: this.state.time + 1});

    }

    componentDidMount(){
        this.setState({snake: [parseInt(this.state.gridSize[0]/2), parseInt(this.state.gridSize[1]/2)]});
        setInterval(this.timeElaps, 500);

        addEventListener('keydown', (event) => {this.BUTTON(event)})
    }
    BUTTON(event){
        let dir = this.state.direction;
        switch (event.code){

            case "KeyA":
                dir = "L";
                break;

            case "KeyD":
                dir = "R";
                break;

            case "KeyW":
                dir = "U";
                break;

            case "KeyS":
                dir = "D";
                break;
        }
        this.setState({direction: dir});
    }

    onClick(nxtDir){
        this.setState({direction: nxtDir});

    }

    render () {
        return (
                <Grid 
                    gridSize={this.state.gridSize}
                    snakeTileCoordinates={this.state.snake}
                    foodTileCoordinates={this.state.food}
                    dir={this.state.direction}
                />
               )
    } 

}





ReactDOM.render(<Game />, document.getElementById("root"));