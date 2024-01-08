import { getSingleProduct, getTrendingProducts } from "@/utils";
import Container from "../components/Container";
import ItemData from "../components/ItemData/ItemData";
import SingleItem from "../components/SingleItem/SingleItem";

const Product = async ({ searchParams }) => {
  const trendingProduct = await getTrendingProducts();
  const productId = parseInt(searchParams.id);
  const product = getSingleProduct(productId);
  return (
    <>
      <SingleItem product={product} />
      <h1 style={{ textAlign: "center", margin: "24px 0px" }}>
        Trending Products
      </h1>
      <Container>
          {trendingProduct &&
            trendingProduct.map((item) => <ItemData key={item.id} item={item} />)}
      </Container>
    </>
  );
};

export default Product;
