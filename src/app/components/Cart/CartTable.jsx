"use client";
import {
  decreaseQuanByOne,
  increaseQuanByOne,
  removeFromCart,
  resetCart,
  saveToOrder,
} from "@/app/redux/shoppingSlice";
import { loadStripe } from "@stripe/stripe-js";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import "./CartTable.css";
import { useState } from "react";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { orderData, productData: itemData } = useSelector(
    (state) => state.shopping
  );
  const { data: session } = useSession();
  const totalPrice = itemData
    .reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0)
    .toFixed(2);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleCheckout = async () => {
    setIsLoading(true);

    const stripe = await stripePromise;
    const res = await fetch(`https://e-commerce-website-tau-sepia.vercel.app/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: itemData,
        email: session.user.email,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(saveToOrder(itemData));
      stripe.redirectToCheckout({ sessionId: data.id });
      dispatch(resetCart());
      setIsLoading(false);
    } else {
      throw new Error(`failed to create payment`);
    }
  };

  return (
    <div className="table-container">
      <div className="cart-title">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quan.</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {itemData.length > 0 ? (
        itemData.map((product) => (
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
            <p>{product.title}</p>
            <p>{`$${product.price}`}</p>
            <div className="cart-quantity">
              <button
                className="quantity-btn"
                onClick={() => dispatch(decreaseQuanByOne(product))}
              >
                {" "}
                -{" "}
              </button>
              <p>{product.quantity}</p>
              <button
                className="quantity-btn"
                onClick={() => dispatch(increaseQuanByOne(product))}
              >
                {" "}
                +{" "}
              </button>
            </div>
            <p>{`$${product.price * product.quantity}`}</p>
            <div
              onClick={() =>
                dispatch(removeFromCart(product)) &&
                toast.success(`${product.title} has removed`)
              }
            >
              <CiCircleRemove className="cart-remove-icon" />
            </div>
            <Toaster />
          </div>
        ))
      ) : (
        <h1 style={{ margin: "80px 0px" }}>your cart is now empty</h1>
      )}
      <hr />

      <h2 className="checkout">Cart Totals</h2>
      <div className="checkout-table">
        <div className="checkout-total">
          <div className="checkout-sub">
            <p>Subtotal</p>
            <p>{`$${totalPrice}`}</p>
          </div>
          <hr />
          <div className="checkout-sub">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="checkout-sub">
            <p>
              <strong>Total</strong>
            </p>
            <p>
              <strong>{`$${totalPrice}`}</strong>
            </p>
          </div>
          <Button
            className="checkout-btn"
            onClick={!session ? () => signIn() : handleCheckout}
            isLoading={isLoading}
          >
            Check Out
          </Button>
        </div>

        <div className="checkout-coupon">
          <p> Enter your promotion code here </p>
          <div className="checkout-coupon-input">
            <input type="text" placeholder="Coupon code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
