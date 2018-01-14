const cardsReducer = (state = [], action) => {
    switch (action.type) {
        case 'CARDS_MATCHED':
            return state.map(card => cardReducer(card, action));
        default:
            return state;
    }
}

const cardReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CARDS_MATCHED':
            if(state.id === action.data.firstCard.id 
            || state.id ===  action.data.secondCard.id) {
                return {...state, matched: true};
            }
            return state;
        default:
            return state;
    }
}

export default cardsReducer;