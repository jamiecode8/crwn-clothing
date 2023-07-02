import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    // find is cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem)=>cartItem.id === productToAdd.id
    );

    // if find, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        )
    }

    // return new array with modified cartItems
    return [ ...cartItems, {...productToAdd, quantity:1 } ]
}

export const clearCartItem = (cartItems, itemToClear) => {
    return cartItems.filter((cartItem)=>
        cartItem.id !== itemToClear.id
    )
}

export const removeCartItem = (cartItems, itemToRemove) => {
    // find the cart Item to remove
    const existingCartItem = cartItems.find(
        (cartItem)=>cartItem.id === itemToRemove.id
    );

    // check the quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1 ){
        return cartItems.filter((cartItem)=>
            cartItem.id !== itemToRemove.id
        )
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem)=>
        cartItem.id === itemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem
    )
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: ()=> {},
    cartCount: 0,
    setCartCount: () => {},
    removeItemFromCart: ()=> {},
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const [cartItems, setCartItems] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((totle, cartItem)=> totle + cartItem.quantity, 0)
        setCartCount(newCartCount)
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItem(cartItems, itemToRemove))
    }

    const clearItemFromCart = (itemToClear) => {
        setCartItems(clearCartItem(cartItems, itemToClear))
    }

    const value = { 
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        clearItemFromCart
    };

    

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}