// action types
const LOAD_MATCHES = 'match/LOAD';
const DELETE_MATCH = 'match/DELETE';
const DELETE_ALL_MATCHES = 'match/DELETE_ALL_MATCHES';

// action creators
const loadMatches = (matches) => ({
    type: LOAD_MATCHES,
    matches
});

const removeMatch = (matchedUserId) => ({
    type: DELETE_MATCH,
    matchedUserId
});

const removeAllMatches = () => ({
    type: DELETE_MATCH
});


// thunks
export const createMatches = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/matches`, {
        method: 'POST'
    });

    if (response.ok) {
        const matches = await response.json();
        dispatch(loadMatches(matches));
    }
}
export const getMatches = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/matches`);

    if (response.ok) {
        const matches = await response.json();
        dispatch(loadMatches(matches));
    }
}

export const deleteMatch = (userId, matchedUserId) => async dispatch => {
    await fetch(`/api/matches/${userId}/${matchedUserId}`, {
        method: 'DELETE'
    });

    dispatch(removeMatch(matchedUserId))
}

// export const deleteAllMatches = (userId) => async dispatch => {
//     await fetch(`/api/users/${userId}/matches`, {
//         method: 'DELETE'
//     });

//     dispatch(removeMatch(matchedUserId))
// }


// reducer
const initialState = { matches: {} };

const matchReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_MATCHES:
            newState = { ...state };
            newState.matches['byUserId'] = action.matches.user_matches.reduce((matches, match) => {
                matches[match.user_2_id] = match;
                return matches;
            }, {})
            return newState;
        case DELETE_MATCH:
            newState = { ...state };
            delete newState.matches['byUserId'][action.matchedUserId];
            return newState;
        default:
            return state
    }
}

export default matchReducer;
