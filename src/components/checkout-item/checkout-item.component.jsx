import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const { removeItemFromCart } = useContext(CartContext)
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
            <span className='quantity'>{quantity}</span>
            <div onClick={()=>removeItemFromCart(cartItem,true)} className='remove-button'>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;