import { Product } from "../../model/product";
import Price from "../shared/price";

type Props = {
  products: Product[];
};

function CartTotals(props: Props) {
  const { products } = props;
  const subtotal = products.reduce((acc, product) => acc + product.price, 0);

  return (
    <dl className="grid grid-cols-[1fr_min-content] gap-2 items-center ali text-right border-t border-gray-300 mt-4 pt-4">
      <dt>Subtotal:</dt>
      <dd>
        <Price value={subtotal} />
      </dd>
      <dt>Sale:</dt>
      <dd><Price value={123} /></dd>
      <dt>Total:</dt>
      <dd className="text-xl font-bold"><Price value={123} /></dd>
    </dl>
  );
}

export default CartTotals;
