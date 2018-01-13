class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: props.card
    };
  };
  turnUpCard() {
    var card = this.state.card;
    this.props.onSelectedCard(card);
  };
  render() {
    //console.log("card details", this.props.card);
    var card = this.props.card;
    var cardContent;
    var cardClasses = "card";
    if (card.visible) {
      cardContent = <span className="card-content">{ card.text }</span>;
      if (!card.matched) {
        cardClasses += " card-selected";
      } else {
        cardClasses += " card-visible";
      }
    }
    return (
      <div className="col-xs-4 col-sm-3 col-md-2">
        <div className={cardClasses} onClick={() => this.props.onSelectedCard()}>
          {cardContent}
        </div>
      </div>
    );
  };
}