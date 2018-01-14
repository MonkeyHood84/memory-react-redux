
import pairsList from '../data/pairs';

const getNewGame = () => {
    fetch('http://www.mocky.io/v2/59f08692310000b4130e9f71')
        .then((response) => {
            return response.json()
        })
        .then((events) => {
            //actions.getEvents(events);
        })
}

const shuffleArray = (o) => {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

const shuffleCards = () => {
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
    return shuffleArray(cards);
};


const getMockedGame = () => {
    const newGame = shuffleCards();
    return newGame;
}

export default {
    getNewGame: getNewGame,
    getMockedGame: getMockedGame
}