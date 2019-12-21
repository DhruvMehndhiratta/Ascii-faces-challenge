import types from '../types';

let initState = {
    products: [],
    fetching:false
}


export default function (state = initState, action) {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return { ...state, fetching:true }
        case types.GET_PRODUCTS_SUCCESS:
            return { ...state, products: [...state.products ,...action.payload || []] , fetching:false}
        case types.GET_PRODUCTS_FAILED:
            return { ...state,fetching:false }
        case types.EMPTY_PRODUCTS:
            console.log(action.payload , "empty case")
            return {...state, products:[...action.payload || []]}    
        default:
            return state
    }

}

