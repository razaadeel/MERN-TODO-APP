import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../constant';

const initialState = {
    items: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            console.log(action.payload)
            return {
                ...state,
                items: action.payload,
            }
        case ADD_ITEM:
            return {
                items: [...state.items, action.payload]
            }
        case DELETE_ITEM:
            console.log(action.payload);
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        default:
            return state;
    }
}