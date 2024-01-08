import styles from "./page.module.css";
import ItemDetails from "./components/SingleItem/SingleItem";
import Item from "./components/Item/Item";
import Container from "./components/Container";

export default function Home() {
  return (
    <Container>
      <Item />
    </Container>
  );
}
