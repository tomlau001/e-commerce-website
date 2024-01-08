import React from "react";
import Container from "../components/Container";
import Button from "../components/Button/Button";
import Link from "next/link";
import "./success.css";

const SuccessPage = () => {
  return (
    <Container>
      <div className="success-page">
        <div>
          <h1 style={{ textAlign: "center" }}>Your Payment Accepted!</h1>
          <div className="success-buttons">
            <Link href={"/order"}>
              <Button>View Order</Button>
            </Link>
            <Link href="/">
              <Button>Continue Shopping </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SuccessPage;
