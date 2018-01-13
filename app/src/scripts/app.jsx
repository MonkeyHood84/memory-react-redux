require('./../assets/styles.scss');
import React from "react";
import ReactDOM from "react-dom";
import {pairsList} from './data/pairs';
import StatsComponent from './components/stats.component';
import OptionsComponent from './components/options.component';
import BoardComponent from './components/board.component';
import StatusComponent from './components/status.component';
//import style from './../assets/styles.scss';

class NumMemoryApp extends React.Component {
  constructor(props) {
    super(props);    
    this.state = this.getNewGame();
    //this.onSelectedCard = this.onSelectedCard.bind(this);
  };

  getNewGame() {
    return {
      game: this.shuffleCards(),
      firstCard: null,
      secondCard: null,
    };
  };
  shuffleCards() {
    var cards = [];
    for (var i = 0; i < (pairsList.length); i++) {
      var card = JSON.parse(JSON.stringify(pairsList[i]));
      card.id = i;
      card.visible = false;
      card.matched = false;
      cards.push(card);
      var pairedCard = JSON.parse(JSON.stringify(card));
      //this way of clone might not work if the object contains functions
      pairedCard.id = i + pairsList.length;
      cards.push(pairedCard);;
    }
    return this.shuffleArray(cards);
  };
  shuffleArray(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
  onResetGame() {
    var newState = this.getNewGame();
    this.setState(newState);
  }
  onSelectedCard(card) {
    //console.log(this, card);
    var cards = this.state.game.slice();
    var firstCard = this.state.firstCard;
    var secondCard = this.state.secondCard;
    //if the card is visible ignore the click
    if (card.visible) {
      return;
    }
    //console.log(cards, cards.indexOf(card));
    //make selected card visible
    cards[cards.indexOf(card)].visible = true;
    //console.log(firstCard, secondCard);
    //if second card is set then reset the selectedCards
    if (this.state.secondCard) {
      cards[cards.indexOf(firstCard)].visible = false;
      cards[cards.indexOf(secondCard)].visible = false;
      secondCard = null;
      firstCard = null;
    }
    if (!firstCard) {
      //set this card as first card
      firstCard = card;
      //and wait for second card to be selected.
    } else {
      //second card seleted
      secondCard = card;
      if (firstCard.text == secondCard.text) {
        //is a match
        cards[cards.indexOf(firstCard)].matched = true;
        cards[cards.indexOf(secondCard)].matched = true;
        firstCard = null;
        secondCard = null;
      } else {
        //didnt match. wait for next click
      }
    }

    this.setState({
      game: cards,
      firstCard: firstCard,
      secondCard: secondCard
    });
  };
  render() {
    var status;
    if (this.state.game.filter(function(val) {
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
          <StatsComponent game={ this.state.game } />
          <OptionsComponent onResetGame={() => this.onResetGame()} />
        </div>
        <BoardComponent game={ this.state.game } onSelectedCard={(card) => this.onSelectedCard(card)} />
        <StatusComponent status={status} />
      </div>
    );
  }
};


ReactDOM.render(
  <NumMemoryApp / >,
  document.getElementById('root')
);