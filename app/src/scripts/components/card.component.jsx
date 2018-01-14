import React from "react";
import ReactDOM from "react-dom";

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
  };

  isCardSelected(card, firstCard, secondCard) {
    return (firstCard != null && card.id === firstCard.id)
      || (secondCard != null && card.id === secondCard.id);
  };

  render() {
    const card = this.props.card;
    const isMatched = card.matched;
    const isSelected = this.isCardSelected(card, this.props.firstCard, this.props.secondCard)
    const isVisible = isMatched || isSelected;
    const cardContent = isVisible ? <span className="card-content">{card.text}</span> : '';
    const cardClasses = "card"
      + (isSelected ? " card-selected" : '')
      + (isMatched ? " card-visible" : '');

    return (
      <div className="col-xs-4 col-sm-3 col-md-2">
        <div className={cardClasses} onClick={() => isVisible ? null : this.props.onSelectedCard()}>
          {cardContent}
        </div>
      </div>
    );
  };
}