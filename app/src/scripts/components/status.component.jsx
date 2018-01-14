import React from "react";
import ReactDOM from "react-dom";

export default class StatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {    
    if (this.props.status !== "COMPLETED") {
      return null;      
    }
    const numOfPairs = (this.props.game || []).length / 2;
    const percentage = numOfPairs / this.props.numOfTries;
    return (      
      <div className='status-box'>
        <h2>Well Done!</h2>
        <p>You have completed it with the { Math.round(percentage * 100, 2)}% of guesses</p>
      </div>
    );
  }
};