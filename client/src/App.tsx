import Cart from "./components/cart";
import { useDiscounts } from "./hooks/useDiscounts";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { loading: productsLoading, products } = useProducts();
  const { loading: discountsLoading, discounts } = useDiscounts();
  const isLoading = productsLoading || discountsLoading;

  // This is October 1 and Tuesday in the same time, so both discounts should be applied
  const date = new Date(2024, 9, 1);

  return (
    <div className="container py-10 px-20">
      {isLoading ? null : (
        <Cart products={products} discounts={discounts} dateObj={date} />
      )}
    </div>
  );
}

export default App;
