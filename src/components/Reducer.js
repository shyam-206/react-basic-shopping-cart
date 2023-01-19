export const Reducer = (state , action) => {

    if (action.type === "REMOVE_ITEM") {
        return {
          ...state,
          item: state.item.filter((curElem) => {
            return curElem.id !== action.payload
          }),
        }
    }

    if(action.type === "CLEAR_CART") {
        return { ...state, item: [] }
    }

    if(action.type === "INCREMENT"){
      const updatedCart = state.item.map((currElem) => {
        if(currElem.id === action.payload){
          return{...currElem, quantity : currElem.quantity + 1}
        }
        return currElem
      })

      return {...state, item : updatedCart}
    }

    if(action.type === "DECREMENT"){
      let updatedCart = state.item.map((currElem) => {
        if(currElem.id === action.payload){
          return{...currElem, quantity : currElem.quantity - 1}
        }
        return currElem
      })
      .filter((currElem) => currElem.quantity !== 0) 

      return {...state, item : updatedCart}
    }

    if(action.type === "GET_TOTAL") {
      let { totalItem , totalAmount } = state.item.reduce(
        (accum, curVal) => {
          let { price ,quantity } = curVal

           let updateTotalAmount = price * quantity
           accum.totalAmount += updateTotalAmount

           accum.totalItem += quantity
           return accum
        }, 
        { 
          totalItem : 0 ,
          totalAmount : 0,
        }
      )
      return { ...state, totalItem, totalAmount }
    }
    return state
}