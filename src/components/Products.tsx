import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { SkeletonComponent } from "@syncfusion/ej2-react-notifications";
import { Shimmer } from "react-shimmer";

import { IoBagHandleOutline } from "react-icons/io5";

interface ProductsProps {
    productsList?: Array<{}>,
    addItem: (newItem: {name: string, description: string, photo: string, quantity: number, price:number}) => void
}

export default function Products({ addItem }: ProductsProps) {
    const getProducts = async () => {
        const res = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC');
        return res.json();
    };

    const handleAddItem = (newItem: {name: string, description: string, photo: string, quantity: number, price: number}) => {
        let newProduct = {
            name: newItem.name,
            description: newItem.description,
            photo: newItem.photo,
            quantity: 1,
            price: newItem.price
        }
        addItem(newProduct)
    };

    function CustomShimmer() {
        return(
            <Shimmer
                width={1900}
                height={1000}
            >
            </Shimmer>
        )
    }

    const {data, error, isLoading} = useQuery('allProducts', getProducts);

    if (error) return <div>Falha na requisição.</div>;
    if (isLoading) return CustomShimmer()

    return(
        <div className="products-container">
            <ul className="products-list">
                {
                    data.products?.map((item: any, index: number) => {
                        return <motion.div
                            animate={{ 
                                opacity: 1
                             }}
                            transition={{ duration: 0.5 }}
                            initial={{ 
                                opacity: 0
                             }}
                            whileHover={{ scale: 1.1 }}
                            key={index}
                        >
                        <li className="product-item" key={index}>
                            <Image 
                                src={item.photo} 
                                alt={item.name} 
                                className="product-image"
                                width={111}
                                height={138}
                            />
                            <div className="product-header">
                                <p className="product-name">
                                    {item.name}
                                </p>
                                <p className="product-price">
                                    R${item.price}
                                </p>
                            </div>
                            <p className="product-description">
                                {item.description}
                            </p>
                            <button className="buy-btn">
                                <IoBagHandleOutline />
                                <p onClick={() => handleAddItem({name: item.name, description: item.description, photo: item.photo, quantity: item.quantity, price: item.price})} className="btn-text">COMPRAR</p>
                            </button>
                        </li>
                    </motion.div>
                    })
                }
            </ul>
        </div>
    )
}