import React from "react";
import ReactDOM from "react-dom";
import CardComponent from './card.component.jsx';

export default class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.game
    };
  };
  componentWillReceiveProps(nextProps){
    //this.setState({cards: nextProps.game});
  };
  cardUp(card) {

    //this.props.onSelectedCard(card);
  };
  render() {
    var board = this;
    var cards = this.props.game.map(function(card) {
      return <CardComponent id={card.id} key={card.id} 
        card={card} 
        firstCard={board.props.firstCard}
        secondCard={board.props.secondCard}
        onSelectedCard={board.props.onSelectedCard.bind(this, card)} />;
    });
    return (
      <section id="game-board" className="row">
        {cards}
      </section>
    );
  };
};