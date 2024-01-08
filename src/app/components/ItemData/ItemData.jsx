"use client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import "./ItemData.css";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";

const ItemData = ({ item }) => {
  const dispatch = useDispatch();

  const calcDiscount = Math.floor(
    ((item.oldPrice - item.price) / item.oldPrice) * 100
  );

  const starArray = Array.from({ length: item.rating }, (_, index) => (
    <span key={index} id="star-icon">
      <IoIosStar className="icon" />
    </span>
  ));

  return (
    <div className="product-item">
      <Link href={{ pathname: "/product", query: { id: item._id } }}>
        <div className="discount-container">
          <Image src={item.image} alt="Product" width={350} height={400} />
          <p>Member 30% off</p>
          {item.isNew && <p className="new-arrival"> New Arrival </p>}
        </div>
      </Link>

      <div className="item-description">
        <Link href="">
          <h4>{item.title}</h4>
        </Link>
        <div className="price-details">
          <p className="discount">{`${calcDiscount}% off`}</p>
          <div className="price">
            <p className="old-price">{`HK$${item.oldPrice}`}</p>
            <p className="new-price">{`HK$${item.price}`}</p>
          </div>
        </div>
        <div className="cart-rating">
          <div
            className="cart"
            onClick={() =>
              dispatch(addToCart(item)) &&
              toast.success(`${item.title} successfully added to your cart!`)
            }
          >
            <AiOutlineShoppingCart className="icon" />
          </div>
          <div className="rating">{starArray}</div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ItemData;
