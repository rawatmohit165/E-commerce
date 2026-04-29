import { useEffect, useMemo, useState } from "react";
import type { HomeProps, Products, optionType, CartItem } from "../types";
import { FaSearch } from "react-icons/fa";
import axiosClient from "../api/axiosClient";

const HomePage = (props: HomeProps) => {
  const [search, setSearch] = useState<string>("");
  const [product, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [cats, setCats] = useState("ALL");
  const CATEGORIES_ALL: string = "ALL";
  const [sortby, setSortby] = useState<string>("default");
  const [added, setAdded] = useState<number | null>(null);

  const handlecart = (e: React.MouseEvent, products: Products) => {
    e.stopPropagation();
    props.cartProps.addToCart(products);
    setAdded(products.id);
    setTimeout(() => setAdded(null), 1200);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axiosClient.get<{ products: Products[] }>(
          "/products?limit=100",
        );

        setProducts(res.data.products);
      } catch (err) {
        setError("getting problem to get the data from the response...");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const catsfilter = useMemo(() => {
    const catlist = [...new Set(product.map((p) => p.category))];
    return [CATEGORIES_ALL, ...catlist];
  }, [product]);

  const filterdata = useMemo(() => {
    let list = [...product];
    if (cats !== CATEGORIES_ALL) list = list.filter((p) => p.category === cats);
    if (search.trim()) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (sortby === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortby === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortby === "price-rating") list.sort((a, b) => b.rating - a.rating);
    if (sortby === "price-dis")
      list.sort((a, b) => b.discountPercentage - a.discountPercentage);
    return list;
  }, [product, search, cats, sortby]);

  const options: optionType[] = [
    { lable: "Default", value: "default" },
    { lable: "Price: Low → High", value: "price-asc" },
    { lable: "Price: High → Low", value: "price-desc" },
    { lable: "Top Rated", value: "price-rating" },
    { lable: "Best Discount", value: "price-dis" },
  ];

  return (
    <div className="w-full lg:max-w-7xl lg:mx-auto">
      <div className="bg-[#2563Eb] w-full px-4 md:px-6 py-12">
        <h1 className="text-white text-center text-2xl md:text-4xl lg:text-4xl font-bold">Find What You Love</h1>
        <p className="text-white text-center text-sm md:text-xl lg:text-2xl ">
          Shop From 100+ premium products with great deals
        </p>
      </div>
      <div className="flex justify-between gap-3 px-2 mt-3 flex-wrap md:gap-4 lg:gap-6 lg:justify-between md:justify-between">
        <div className=" border rounded-lg bg-white py-1 flex flex-1 focus-within:border focus-within:border-blue-500 items-center ">
          <FaSearch className="text-grey-400 text-[20px] mx-2 items-center" />
          <input
            className="border-none outline-none flex-1"
            type="text" 
            placeholder="Search Products ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="mr-3">
              ✕
            </button>

          )}
        </div>
        <div className=" border relative rounded-lg bg-white py-1 flex flex-full focus-within:border focus-within:border-blue-500 items-center ">
          <select
            value={sortby}
            onChange={(e) => setSortby(e.target.value)}
            className="borner-none outline-none"
          >
            {options.map((p: optionType) => (
              <option key={p.lable} value={p.value}>
                {p.lable}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mt-2 px-2 ">
        {catsfilter.map((p) => (
          <div key={p}>
            <button
              className={`"border rounded-xl px-2.5 py-1 text-sm 
              bg-white ${p === cats ? "bg-blue-800 text-yellow border border-blue-500  hover:border-blue-500 " : "bg-white border hover:text-blue-500 text-grey-200 hover:border-blue-500"}"`}
              onClick={() => setCats(p)}
            >
              {p.replace(/-/g, " ")}
            </button>
          </div>
        ))}
      </div>
      {loading ? (
        <div className="grid grid-cols-2 gap-3 mx-3 my-3 rounded-2xl md:grid-cols-3 lg:grid-cols-4 ">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-40 md:h-56 lg:64 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#2563EB] border rounded-xl px-5 py-2 text-white md:rounded-2xl lg:rounded-2xl"
          >
            Retry
          </button>
        </div>
      ) : filterdata.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3 my-2.5 flex-wrap ">
          {filterdata.map((products) => {
            const inCart: CartItem | undefined = props.cartProps.cart.find(
              (i) => i.id === products.id,
            );

            return (
              <div
                key={products.id}
                className="flex flex-col  border rounded-xl justify-center items-start py-3 px-3 border-gray-300 hover:border-gray-500 hover:shadow-2xl hover:scale-102 transition duration-300"
              >
                <div>
                  <img src={products.thumbnail} alt={products.title} />
                  {/* {setLoading(false)} */}
                  <p className="font-bold">{products.category}</p>
                  <p>{products.title}</p>
                  <div>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={
                          s <= Math.round(products.rating)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      >
                        ★{" "}
                      </span>
                    ))} 
                    <span> {products.rating}</span>
                  </div>
                  <p> ${products.price.toFixed(2)}</p>
                  <button
                    className={`border rounded-2xl w-full lg:py-2 md:py-1.5 py-1 flex-1 ${
                      inCart
                        ? "bg-white text-[#2563EB]"
                        : "bg-[#2563EB] text-white"
                    }`}
                    onClick={(e) => handlecart(e, products)}
                  >
                    {added === products.id
                      ? " ✓ Added!"
                      : inCart
                        ? `in Cart (${inCart.qty})`
                        : "Add To Cart "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center py-50">
          <p> No Product found for {search} </p>
          <button
            onClick={() => setSearch("")}
            className="bg-[#2563EB] border rounded-2xl px-5 py-2 text-white"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};
export default HomePage;
