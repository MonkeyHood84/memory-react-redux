import cardsReducer from './cards.reducer'

const initialState = {
    listOfCards: [],
    firstCard: null,
    secondCard: null,
    numOfTries: 0
}

const boardReducer = (state, action) => {
    if(!state){
        return initialState;
    }
    switch (action.type) {
        case 'NEW_GAME':
            return {...initialState, listOfCards: action.data};
        case 'TOGGLE_CARD':
            if(!state.firstCard || state.secondCard){
                //it is first card to turn up. it can not be a match
                return {
                    ...state, 
                    firstCard:action.data, 
                    secondCard: null
                };
            }
            //it is the second card to turn up
            const secondCard = action.data;
            if(state.firstCard.id === secondCard.id){
                //it is the same card that was clicked before
                return state;
            }
            //from now on it counts as a try
            if(state.firstCard.text === secondCard.text){
                //it is a match
                //cards of the board needs to be updated.
                const updatedCards = cardsReducer(state.listOfCards, {
                    type: 'CARDS_MATCHED',
                    data: {
                        firstCard: state.firstCard,
                        secondCard: secondCard
                    }
                });
                return {
                    ...state, 
                    listOfCards: updatedCards,
                    firstCard: null,
                    secondCard: null,
                    numOfTries: state.numOfTries + 1
                };
            }
            //it did not match
            return {
                    ...state, 
                    secondCard: secondCard,
                    numOfTries: state.numOfTries + 1
                };
        default:
            return state;
    }
}

export default boardReducer;