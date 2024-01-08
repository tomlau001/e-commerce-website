import { productData } from "@/app/constants/data";

export async function getProducts() {
  const res = await fetch("https://fakestoreapiserver.reactbd.com/smart");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  return res.json();
}

export async function getTrendingProducts() {
  const res = await fetch("https://fakestoreapiserver.reactbd.com/smarttrending");
  if (!res.ok) {
    throw new Error("something went wrong, cannot fetch trending product ");
  }
  return res.json();
}

export function getSingleProduct(id){
  const item  = productData.find(product => product._id === id)
  return item
}