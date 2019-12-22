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
            let updatedProducts = [...action.payload]
            updatedProducts.forEach((item,i,self)=>{
                if(i>0 && i%20===0){
                    self.splice(i + (i/20 - 1), 0, {src: `http://localhost:3000/ads/?r=${Math.floor(Math.random() * 1000 * i)}`})
                }
                if(action.payload.length-1 === i && (i+1)%20 === 0) {
                    self.push({src: `http://localhost:3000/ads/?r=${Math.floor(Math.random() * 1000 * i)}`});
                }
            });
            return { ...state, products: [...state.products, ...(updatedProducts || [])] , fetching:false}
        case types.GET_PRODUCTS_FAILED:
            return { ...state,fetching:false }
        case types.EMPTY_PRODUCTS:
            return {...state, products:[...action.payload || []]}    
        default:
            return state
    }

}

