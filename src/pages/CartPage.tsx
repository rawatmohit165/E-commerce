import type { HomeProps } from "../types";

const CartPage = ({ cartProps }: HomeProps) => {
  const onQuantityChange = (id: number, opp: "inc" | "dec") => {
    if (opp === "inc") {
      cartProps.increment(id);
      return;
    }
    cartProps.decrement(id);
  };
  return (
    <div className="flex flex-col gap-3 rounded-2xl border p-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">
          Shopping Cart({cartProps.totalItems})
        </h2>
      </div>

      {/* Clear button */}
      <div className="flex justify-end">
        <button
          onClick={() => cartProps.clearCart()}
          className="text-sm text-red-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Main layout */}
      <div className="flex-col flex gap-6 md:flex-row lg:flex-row ">
        {/* LEFT: Scrollable cart items */}
        <div className="flex flex-col gap-4  w-full  md:w-2/3 md:max-h-85 no-scrollbar lg:max-h-85 md:h-full lg:h-full md:overflow-y-auto lg:overflow-y-auto ">
          {cartProps.cart.map((item) => (
            <div
              key={item.id}
              className="border flex justify-between items-center gap-6 rounded-2xl px-4 py-4"
            >
              {/* Product info */}
              <div className="flex gap-4 items-center ">
                <img
                  className="h-16 w-16 object-contain"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">${item.price} Each</p>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4 border rounded-xl px-3 py-1">
                  <button
                    className="cursor-pointer"
                    onClick={() => onQuantityChange(item.id, "inc")}
                  >
                    +
                  </button>
                  <p>{item.qty}</p>
                  <button onClick={() => onQuantityChange(item.id, "dec")}>
                    -
                  </button>
                </div>
                <p className="text-sm font-medium">${item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="border rounded-2xl p-6 w-full md:w-1/3 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex flex-col gap-2">
            <p>Sub Total: {cartProps.totalItems}</p>
            <p>Total: ${cartProps.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
