import React, { createContext, useReducer,useEffect } from 'react'
import './Cart.css'
import ContextCart from './ContextCart'
import { Products } from './Products'
import { Reducer } from './Reducer';

export const CartContext = createContext();
const initialState = {
    item : Products,
    totalAmount : 0,
    totalitem :0,
}

export default function Cart() {

  //const[item, setItem ] = useState(Products)
  const [state ,dispatch] = useReducer(Reducer,initialState)

  //for the delete the indiv. items from cart
  const removeItem = (id) => {
    return dispatch({
        type: "REMOVE_ITEM",
        payload : id,
    })
  }

  //clear all items
  const clearCart = () => {
    return dispatch({type:"CLEAR_CART"})
  }
 
  //increment the items
  const increment = (id) => {
    return dispatch({
      type : "INCREMENT",
      payload : id
    })
  }

  //decrement item
  const decrement = (id) => {
    return dispatch({
      type : "DECREMENT",
      payload : id
    })
  }

  //we will use the useEffect to update the data
  useEffect(() => {
    dispatch ({ type : "GET_TOTAL" })
  },[state.item])

  return (
    <>  
        <CartContext.Provider value={{...state, removeItem, clearCart, increment, decrement}}>
            <ContextCart />
        </CartContext.Provider>
        
    </>
  )
}
