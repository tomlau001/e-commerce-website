"use client";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";
import Button from "../Button/Button";
import "./SingleItem.css";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";

const SingleItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="product-img-and-desc">
      <div className="product-main-img">
        <Image src={product.image} width={550} height={500} alt="shoe" />
      </div>
      <div className="product-content">
        <h1 className="product-name">{product.title}</h1>
        <div className="rating-icons">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar />
        </div>

        <div className="product-prices">
          <p className="product-old-price">{`$HK$${product.oldPrice}`}</p>
          <p className="product-price">{`HK$${product.price}`}</p>
        </div>
        <p className="product-description">{product.description}</p>
        <div>
          <h1>Select Size</h1>
          <div className="product-select-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <div className="cart-wishlist-btns">
          <Button
            onClick={() =>
              dispatch(addToCart(product)) &&
              toast.success(`${product.title} successfully added to cart`)
            }
          >
            Add to Cart
          </Button>
          <CiHeart className="wishlist" />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SingleItem;
