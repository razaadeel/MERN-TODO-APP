import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from '../constant';

const initialState = {
    items: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
            }
        case ADD_ITEM:
            return {
                items: [...state.items, action.payload]
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case EDIT_ITEM:
            return {
                ...state,
                items: state.items.map(item =>
                    (item._id === action.payload.id) ? { ...item, name: action.payload.name } : item
                )
            }
        default:
            return state;
    }
}