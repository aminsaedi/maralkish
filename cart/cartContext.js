import React from "react";

const CartContext = React.createContext({
  cart: null,
  setCart: null,
  refreshCart: null,
  totalItems: null,
});

export default CartContext;
