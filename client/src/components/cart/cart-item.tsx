import { ChangeEvent, Fragment, useState } from "react";
import { Product } from "../../model/product";
import Price from "../shared/price";
import Input from "../shared/input";

type Props = {
  product: Product;
};

function CartItem(props: Props) {
  const { product } = props;

  const [quantity, setQuantity] = useState(1);

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const qty = isNaN(value) || value < 1 ? 1 : value;
    setQuantity(qty);
  };

  return (
    <Fragment key={product.id}>
      <div className="flex gap-3 items-center">
        <img src={product.imageURL} alt={product.name} width={48} height={48} />
        <span className="text-sm font-bold">{product.name}</span>
      </div>
      <div>
        <Input
          type="number"
          value={quantity}
          onChange={changeQuantityHandler}
        />
      </div>
      <div className="text-right">
        <Price value={quantity * product.price} />
      </div>
    </Fragment>
  );
}

export default CartItem;
