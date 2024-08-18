import { ChangeEvent, Fragment, useState } from "react";
import { CartItemType } from "../../model/cart";
import Price from "../shared/price";
import Input from "../shared/input";

type Props = {
  item: CartItemType;
};

function CartItem(props: Props) {
  const { item } = props;

  const [quantity, setQuantity] = useState(1);

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const qty = isNaN(value) || value < 1 ? 1 : value;
    setQuantity(qty);
  };

  return (
    <Fragment key={item.id}>
      <div className="flex gap-3 items-center">
        <img src={item.imageURL} alt={item.name} width={48} height={48} />
        <span className="text-sm font-bold">{item.name}</span>
      </div>
      <div>
        <Input
          type="number"
          value={quantity}
          onChange={changeQuantityHandler}
        />
      </div>
      <div className="text-right">
        <Price value={item.totalPrice} />
      </div>
    </Fragment>
  );
}

export default CartItem;
