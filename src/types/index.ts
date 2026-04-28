export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export type CartItem = Product & {
  qty: number;
};

export type CartProps = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

// export type HomeProps = CartProps & {
//   Pages : "home" | "cart";
//   setPage: React.Dispatch<React.SetStateAction<Pages>>;
// };
export type HomeProps = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  cartProps: CartProps;
};
export type Page = "home" | "cart";


export type Props = {
  cartProps: CartProps;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export type Products = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;

};

export type optionType = {
  lable:string,
  value:string
}

export type NavbarProps = {
  currentPage: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  totalItems: number;
};