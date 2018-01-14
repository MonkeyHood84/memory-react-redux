import React from "react";
import ReactDOM from "react-dom";

export default class StatsComponent extends React.Component {
  render() {
    var totalPairs = this.props.game.length / 2;
    var matchedPairs = this.props.game.filter((val) => {
      return val.matched;
    }).length / 2;
    return (
      <section className="col-xs-8 text-left game-stats">
      <b>Matched Pairs</b> <meter value={matchedPairs} min="0" max={totalPairs}></meter> {matchedPairs}/{totalPairs}
    </section>
    );
  }
};