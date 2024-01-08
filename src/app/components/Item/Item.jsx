import { getProducts } from "@/utils";
import ItemData from "../ItemData/ItemData";

const Item = async () => {
  const products = await getProducts();
  return (
    <>
      {products &&
        products.map((item) => <ItemData item={item} key={item.id} />)}
    </>
  );
};

export default Item;
