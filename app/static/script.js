"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pairsList = [{
    id: 1,
    text: "1"
}, {
    id: 2,
    text: "2"
}, {
    id: 3,
    text: "3"
}, {
    id: 4,
    text: "4"
}, {
    id: 5,
    text: "5"
}, {
    id: 6,
    text: "6"
}, {
    id: 7,
    text: "7"
}, {
    id: 8,
    text: "8"
}, {
    id: 9,
    text: "9"
}, {
    id: 10,
    text: "10"
}, {
    id: 11,
    text: "11"
}, {
    id: 12,
    text: "12"
}];

var NumMemoryApp = function (_React$Component) {
    _inherits(NumMemoryApp, _React$Component);

    function NumMemoryApp(props) {
        _classCallCheck(this, NumMemoryApp);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = _this.getNewGame();
        //this.onSelectedCard = this.onSelectedCard.bind(this);
        return _this;
    }

    NumMemoryApp.prototype.getNewGame = function getNewGame() {
        return {
            game: this.shuffleCards(),
            firstCard: null,
            secondCard: null
        };
    };

    NumMemoryApp.prototype.shuffleCards = function shuffleCards() {
        var cards = [];
        for (var i = 0; i < pairsList.length; i++) {
            //if (window.CP.shouldStopExecution(1)) { break; }
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
        //window.CP.exitedLoop(1);

        return this.shuffleArray(cards);
    };

    NumMemoryApp.prototype.shuffleArray = function shuffleArray(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) { 
            //if (window.CP.shouldStopExecution(2)) { break; } 
        }
            //window.CP.exitedLoop(2);
        return o;
    };

    NumMemoryApp.prototype.onResetGame = function onResetGame() {
        var newState = this.getNewGame();
        this.setState(newState);
    };

    NumMemoryApp.prototype.onSelectedCard = function onSelectedCard(card) {
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

    NumMemoryApp.prototype.render = function render() {
        var _this2 = this;

        var status;
        if (this.state.game.filter(function (val) {
            return !val.matched;
        }).length == 0) {
            status = "COMPLETED";
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "header",
                { className: "page-header row" },
                React.createElement(
                    "h1",
                    null,
                    "Numeric Memory"
                )
            ),
            React.createElement(
                "div",
                { id: "game-extras", className: "row" },
                React.createElement(StatsComponent, { game: this.state.game }),
                React.createElement(OptionsComponent, {
                    onResetGame: function onResetGame() {
                        return _this2.onResetGame();
                    }
                })
            ),
            React.createElement(BoardComponent, {
                game: this.state.game, onSelectedCard: function onSelectedCard(card) {
                    return _this2.onSelectedCard(card);
                }
            }),
            React.createElement(StatusComponent, { status: status })
        );
    };

    return NumMemoryApp;
}(React.Component);

;

var StatsComponent = function (_React$Component2) {
    _inherits(StatsComponent, _React$Component2);

    function StatsComponent() {
        _classCallCheck(this, StatsComponent);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    StatsComponent.prototype.render = function render() {
        var totalPairs = this.props.game.length / 2;
        var matchedPairs = this.props.game.filter(function (val) {
            return val.matched;
        }).length / 2;
        return React.createElement(
            "section",
            { className: "col-xs-8 text-left game-stats" },
            React.createElement(
                "b",
                null,
                "Matched Pairs"
            ),
            " ",
            React.createElement("meter", { value: matchedPairs, min: "0", max: totalPairs }),
            " ",
            matchedPairs,
            "/",
            totalPairs
        );
    };

    return StatsComponent;
}(React.Component);

;

var OptionsComponent = function (_React$Component3) {
    _inherits(OptionsComponent, _React$Component3);

    function OptionsComponent() {
        _classCallCheck(this, OptionsComponent);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    OptionsComponent.prototype.render = function render() {
        var _this5 = this;

        return React.createElement(
            "aside",
            { className: "col-xs-4 text-right game-options" },
            React.createElement(
                "button",
                {
                    className: "btn btn-xs btn-success", onClick: function onClick() {
                        return _this5.props.onResetGame();
                    }
                },
                React.createElement(
                    "span",
                    { className: "glyphicon glyphicon-refresh", "aria-hidden": "true" },
                    "   "
                ),
                "  RESTART"
            )
        );
    };

    return OptionsComponent;
}(React.Component);

;

var BoardComponent = function (_React$Component4) {
    _inherits(BoardComponent, _React$Component4);

    function BoardComponent(props) {
        _classCallCheck(this, BoardComponent);

        var _this6 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

        _this6.state = {
            cards: props.game
        };
        return _this6;
    }

    BoardComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.setState({ cards: nextProps.game });
    };

    BoardComponent.prototype.cardUp = function cardUp(card) {

        //this.props.onSelectedCard(card);
    };

    BoardComponent.prototype.render = function render() {
        var board = this;
        var cards = this.state.cards.map(function (card) {
            return React.createElement(CardComponent, {
                id: card.id, key: card.id, card: card,
                onSelectedCard: board.props.onSelectedCard.bind(this, card)
            });
        });
        return React.createElement(
            "section",
            { id: "game-board", className: "row" },
            cards
        );
    };

    return BoardComponent;
}(React.Component);

;

var CardComponent = function (_React$Component5) {
    _inherits(CardComponent, _React$Component5);

    function CardComponent(props) {
        _classCallCheck(this, CardComponent);

        var _this7 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

        _this7.state = {
            card: props.card
        };
        return _this7;
    }

    CardComponent.prototype.turnUpCard = function turnUpCard() {
        var card = this.state.card;
        this.props.onSelectedCard(card);
    };

    CardComponent.prototype.render = function render() {
        var _this8 = this;

        //console.log("card details", this.props.card);
        var card = this.props.card;
        var cardContent;
        var cardClasses = "card";
        if (card.visible) {
            cardContent = React.createElement(
                "span",
                { className: "card-content" },
                card.text
            );
            if (!card.matched) {
                cardClasses += " card-selected";
            } else {
                cardClasses += " card-visible";
            }
        }
        return React.createElement(
            "div",
            { className: "col-xs-4 col-sm-3 col-md-2" },
            React.createElement(
                "div",
                {
                    className: cardClasses, onClick: function onClick() {
                        return _this8.props.onSelectedCard();
                    }
                },
                cardContent
            )
        );
    };

    return CardComponent;
}(React.Component);

var StatusComponent = function (_React$Component6) {
    _inherits(StatusComponent, _React$Component6);

    function StatusComponent(props) {
        _classCallCheck(this, StatusComponent);

        var _this9 = _possibleConstructorReturn(this, _React$Component6.call(this, props));

        _this9.state = {};
        return _this9;
    }

    StatusComponent.prototype.render = function render() {
        if (this.props.status !== "COMPLETED") {
            return null;
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                null,
                "Congratulations!"
            )
        );
    };

    return StatusComponent;
}(React.Component);

;

ReactDOM.render(React.createElement(NumMemoryApp, null), document.getElementById('root'));
