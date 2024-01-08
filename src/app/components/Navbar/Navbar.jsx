"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoBookmarksOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";

import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { orderData, productData } = useSelector((state) => state.shopping);

  const countProductsInCart = productData.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <header>
      <nav>
        <div className="nav-logo">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-menu">
          <li>
            <Link className={` ${pathname === "/" ? "active" : ""}`} href="/">
              Latest
            </Link>
          </li>
          <li>
            <Link
              className={` ${pathname === "/mens" ? "active" : ""}`}
              href="/mens"
            >
              Mens
            </Link>
          </li>
          <li>
            <Link
              className={` ${pathname === "/womens" ? "active" : ""}`}
              href="/womens"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              className={` ${pathname === "/kids" ? "active" : ""}`}
              href="/kids"
            >
              Kids
            </Link>
          </li>
        </ul>
        <div className="nav-btns">
          {orderData && orderData.length > 0 && session && (
            <div className="order-btn">
              <Link href={"/order"}>
                <button className="nav-btn">
                  <IoBookmarksOutline className="icon" />
                  <span className="hide">Order</span>
                </button>
              </Link>
            </div>
          )}
          <div className="login-avatar">
            {session && (
              <Link onClick={() => signOut()} href="/login">
                <button className="nav-btn">
                  <BsPerson className="icon" />
                  <span className="hide">Log out</span>
                </button>
              </Link>
            )}
            {session && (
              <Image
                src={session.user.image}
                alt="avatar"
                width={40}
                height={40}
                className="avatar hide"
              />
            )}
          </div>

          {!session && (
            <Link onClick={() => signIn()} href="/login">
              <button className="nav-btn">
                <BsPerson className="icon" />
                <span className="hide">Login</span>
              </button>
            </Link>
          )}

          <div className="cart-wrapper">
            <Link href="/cart">
              <AiOutlineShoppingCart className="nav-cart" />{" "}
            </Link>
            <div className="cart-count">{countProductsInCart}</div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
