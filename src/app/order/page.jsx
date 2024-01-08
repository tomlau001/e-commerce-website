"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./order.css";
import Button from "../components/Button/Button";
import { resetOrder } from "../redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.shopping);
  const totalPrice = orderData
    .reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0)
    .toFixed(2);
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "56px" }}>
        Your Order Details
      </h1>
      <div className="table-container">
        <div className="cart-title">
          <p>Product</p>
          <p>Description</p>
          <p>Price</p>
          <p>Quan.</p>
          <p>Total</p>
        </div>
        <hr />
        {orderData && orderData.length > 0 ? (
          orderData.map((product) => (
            <div key={product._id} className="cart-items">
              <Link href={{ pathname: "/product", query: { id: product._id } }}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="cart-item-img"
                />
              </Link>
              <div>
                <p style={{ marginBottom: "8px", fontWeight: "500" }}>
                  {product.title}
                </p>
                <p className="hide">{product.description}</p>
              </div>
              <p>{`$${product.price}`}</p>
              <div className="cart-quantity">
                <p>{product.quantity}</p>
              </div>
              <p>{`$${product.price * product.quantity}`}</p>
            </div>
          ))
        ) : (
          <h1 style={{ margin: "80px 0px" }}>your order is now empty</h1>
        )}
        <hr />

        <h2 className="checkout">Payment Details</h2>
        <div className="checkout-table">
          <div className="checkout-total">
            <hr />
            <div className="checkout-sub">
              <p>
                <strong>Total Paid</strong>
              </p>
              <p>
                <strong>{`$${totalPrice}`}</strong>
              </p>
            </div>
            <Button
              className="checkout-btn"
              onClick={() =>
                dispatch(resetOrder()) &&
                toast.success(`the order is now empty`)
              }
            >
              Reset Order
            </Button>
          </div>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
