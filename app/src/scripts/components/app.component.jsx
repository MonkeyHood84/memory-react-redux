import React from "react";
import ReactDOM from "react-dom";
import API from '../services/api.service';

import StatsComponent from './stats.component';
import OptionsComponent from './options.component';
import BoardComponent from './board.component';
import StatusComponent from './status.component';
//import style from './../assets/styles.scss';

export default class NumMemoryApp extends React.Component {
  constructor(props) {
    super(props);
  };

  onResetGame() {
    const newGame = API.getMockedGame();
    this.props.store.dispatch({
      type: 'NEW_GAME',
      data: newGame
    });
  }

  onSelectedCard(card) {
      this.props.store.dispatch({
        type: 'TOGGLE_CARD',
        data: card
      });
  };

  componentWillMount() {
    //Get Data
    this.onResetGame();
  }

  componentDidMount() {
    //subscribe
    this.storeUnsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    //unsubscribe
    this.storeUnsubscribe();
  }

  render() {
    const curState = this.props.store.getState();
    var status;
    if (curState.listOfCards.filter(function(val) {
        return !val.matched;
      }).length == 0) { 
      status = "COMPLETED";
    }
    return (
      <div>
        <header className="page-header row">
          <h1>Numeric Memory</h1>
        </header>
        <div id="game-extras" className="row">
          <StatsComponent game={ curState.listOfCards } />
          <OptionsComponent onResetGame={() => this.onResetGame()} />
        </div>
        <StatusComponent status={status} 
            numOfTries={curState.numOfTries}
            game={ curState.listOfCards } 
            />
        <BoardComponent game={ curState.listOfCards } 
            firstCard={ curState.firstCard }
            secondCard={ curState.secondCard }
            onSelectedCard={(card) => this.onSelectedCard(card)} />
      </div>
    );
  }
};