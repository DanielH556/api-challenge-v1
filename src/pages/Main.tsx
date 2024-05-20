"use client"
import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Checkout from "../components/Checkout";

interface CheckoutListProps {
    id: number,
    name: string,
    description: string,
    photo: string,
    quantity: number,
    price: number,
}

export default function Main() {
    const queryClient = new QueryClient();
    const [checkoutDisplay, setCheckoutDisplay] = useState(false);
    const [checkoutList, setCheckoutList] = useState(Array<{}>);
    const [totalProducts, setTotalProducts] = useState(0);

    const handleAddQuantity = (productID: number) => {
        setCheckoutList(prevCheckoutList => 
            prevCheckoutList?.map((item: any, index) => 
                item.id === productID ? { ...item, quantity: item.quantity + 1 } : item
    ))
    }

    const handleSubtractQuantity = (productID: number) => {
        setCheckoutList(prevCheckoutList => 
            prevCheckoutList?.map((item: any, index) => 
                item.id === productID && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    ))
    }

    const handleCheckoutDisplay = () => {
        setCheckoutDisplay(!checkoutDisplay)
    }

    const handleFinishShop = () => {
        alert('Finalizar compra!')
    }

    const handleDeleteItem = (itemID: number) => {
        console.dir('sssssss')
        setCheckoutList(prevCheckoutList => prevCheckoutList.filter((item: any) => item.id !== itemID))
    }

    const handleAddItem = (newItem: {name: string, description: string, photo: string, quantity: number, price: number}) => {
        console.log(newItem)
        const newCheckoutItem = {
            id: checkoutList.length+1,
            name: newItem.name,
            description: newItem.description,
            photo: newItem.photo,
            quantity: newItem.quantity,
            price: newItem.price
        }
        setCheckoutList(prevCheckoutList => [...prevCheckoutList, newCheckoutItem]);
        setTotalProducts(totalProducts + newItem.quantity)
    }

    const totalPriceB = checkoutList?.reduce((total, item: any) => parseInt(JSON.stringify(total)) + (item.quantity * item.price), 0);

    return(
        <QueryClientProvider client={queryClient}>
                <main>
                    <div>
                        <header>
                            <TopMenu 
                                handleCheckoutDisplay={handleCheckoutDisplay} 
                                productQuantity={totalProducts}
                            />
                        </header>
                        <main>
                            <Products 
                                addItem={handleAddItem}
                            />
                            { checkoutDisplay && 
                            <Checkout 
                                closeCheckoutWindow={handleCheckoutDisplay} 
                                finishShop={handleFinishShop}
                                checkoutList={checkoutList}
                                deleteItem={handleDeleteItem}
                                addQuantity={handleAddQuantity}
                                subtractQuantity={handleSubtractQuantity}
                                totalPriceSum={parseInt(JSON.stringify(totalPriceB))}
                            /> }
                        </main>
                        <footer>
                            <Footer />
                        </footer>
                    </div>
            </main>
        </QueryClientProvider>
    )
}