import React from "react";
import "./products.scss";
import Product from "./Product/Product";
import { useSelector } from "react-redux";

const Products = ({ secheading = true, title = "" }) => {
  const { products, isLoading, error } = useSelector((state) => state.products);

  return (
    !isLoading && (
      <div className="products-container">
        {secheading && <div className="sec-heading">{title}</div>}
        <div className="products">
          {!title &&
            products.map((elem) => {
              return (
                <Product
                  productImg={elem.image}
                  productTitle={
                    elem.product_name.length > 100
                      ? elem.product_name.substring(0, 100) + "..."
                      : elem.product_name
                  }
                  productPrice={elem.price}
                  id={elem.id}
                />
              );
            })}
        </div>
      </div>
    )
  );
};

export default Products;
