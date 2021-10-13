import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

class Tile extends React.Component{
  constructor(props){
      super(props);
      
  }
  render(){
      return <div className="tile">{`${this.props.X}, ${this.props.Y}`}</div>
  }
}

class Grid extends React.Component{
  constructor(props){
      super(props);
  }

  render() {

      const ba = Array(7).fill(Array(7).fill(null)); 
          
          return (
              <div className="xGrid">
                  {ba.map((gridY,yIndex) => {
                      return(
                      <div className="yGrid">
                          {gridY.map((gridX,xIndex) => {
                             return <Tile X={xIndex} Y={yIndex} />
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
            snake:[],
            food:[],
        }
    }

    render () {
        return (
                <Grid 
                    grid={this.props.ba}
                />
               )
    } 

}





ReactDOM.render(<Game />, document.getElementById("root"));