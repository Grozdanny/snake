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
      return <div className={`tile ${isSnakeIn ? "snake" : ""} ${isFoodIn ? "food" : ""}`}>{`${this.props.X}, ${this.props.Y}`}</div>
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
                             return <Tile X={xIndex} Y={yIndex} 
                             snakePositionCoordinates={this.props.snakeTileCoordinates}
                             foodPositionCoordinates={this.props.foodTileCoordinates}
                             />
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
        }
    }

    render () {
        return (
                <Grid 
                    gridSize={this.state.gridSize}
                    snakeTileCoordinates={this.state.snake}
                    foodTileCoordinates={this.state.food}
                />
               )
    } 

}





ReactDOM.render(<Game />, document.getElementById("root"));