import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CheckoutDisplayProps {
    closeCheckoutWindow: () => void,
    finishShop: () => void,
    checkoutList: Array<{}>,
    deleteItem: (itemID: number) =>  void,
    addQuantity: (productID: number) => void,
    subtractQuantity: (productID: number) => void,
    totalPriceSum: number
}

export default function Checkout({ closeCheckoutWindow, finishShop, checkoutList, deleteItem, addQuantity, subtractQuantity, totalPriceSum }:CheckoutDisplayProps) { 
    const handleDeleteItem = (id: number) => {
        deleteItem(id)
    }

    const addItemQuantity = (productID: number) => {
        addQuantity(productID)
    }

    const subtractItemQuantity = (productID: number) => {
        subtractQuantity(productID)
    }

    return(
        <motion.div className="checkout-container"
        >
            <div className="checkout-container-header">
                <h1>Carrinho de compras</h1>
                <button className="close-window" onClick={closeCheckoutWindow}>
                    X
                </button>
            </div>
            <ul className="cart-products-list">
                {
                    checkoutList.map((item: any, index: number) => {
                        return <li className="cart-product-item" key={index}>
                        <Image 
                            src={item.photo} 
                            alt={item.name}
                            className="cart-product-image"
                            width={46}
                            height={57}
                        />
                        <p className="cart-product-name">
                            {item.name}
                        </p>
                        <div className="quantity-selector-container">
                            <p>qtd.</p>
                            <div className="quantity-selector">
                                <p onClick={() => subtractItemQuantity(item.id)} className="quantity-selector-button">-</p>
                                <p className="separator">|</p>
                                <p >{item.quantity}</p>
                                <p className="separator">|</p>
                                <p onClick={() => addItemQuantity(item.id)} className="quantity-selector-button">+</p>
                            </div>
                        </div>
                        <p className="cart-product-price">
                            R${item.price}
                        </p>
                        <div onClick={() => handleDeleteItem(item.id)} className="delete-item">
                            X
                        </div>
                    </li>
                    })
                }
            </ul>
            <div className="cart-total">
                <h1>Total:</h1>
                <h1>R${totalPriceSum}</h1>
            </div>
            <p className="checkout-btn" onClick={finishShop}>
                Finalizar Compra
            </p>
        </motion.div>
    )
}