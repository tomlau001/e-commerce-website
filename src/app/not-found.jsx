"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NotFound = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearTimeout(timer);
      router.push("/");
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div
      style={{
        height: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>
        Your Page Not Found, redirect to <Link href="/">Home</Link> Page in{" "}
        {countdown}s
      </h1>
    </div>
  );
};

export default NotFound;
