import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  restaurantName: '',
  setRestaurantName: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartQuantity: () => {},
  decrementCartQuantity: () => {},
})

export default CartContext
