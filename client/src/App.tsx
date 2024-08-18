import Cart from "./components/cart";
import { useDiscounts } from "./hooks/useDiscounts";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { loading: productsLoading, products } = useProducts();
  const { loading: discountsLoading, discounts } = useDiscounts();
  const isLoading = productsLoading || discountsLoading;
  const date = new Date();

  return (
    <div className="container py-10 px-20">
      {isLoading ? <div></div> : <Cart products={products} discounts={discounts} dateObj={date} />}
    </div>
  );
}

export default App;
