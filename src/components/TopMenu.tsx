import React from "react";
import { motion } from "framer-motion";

import { PiShoppingCartBold } from "react-icons/pi";

interface NavProps {
    handleCheckoutDisplay: () => void,
    productQuantity: number
}

export default function TopMenu({ handleCheckoutDisplay,  productQuantity }:NavProps) {

    return(
        <div className="topmenu-container">
            <div className="logo">
                <h1>MKS</h1>
                <h3>Sistemas</h3>
            </div>
            <div onClick={handleCheckoutDisplay} className="cart-button">
                <span >
                    <a><PiShoppingCartBold /></a> 
                </span>
                <p className="product-quantity-number">
                    {productQuantity}
                </p>
            </div>
        </div>
    )
}