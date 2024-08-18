import Cart from "./components/cart";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { loading, products } = useProducts();
  const date = new Date();

  return (
    <div className="container py-10 px-20">
      {loading ? <div></div> : <Cart products={products} dateObj={date} />}
    </div>
  );
}

export default App;
