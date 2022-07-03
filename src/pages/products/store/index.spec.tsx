const mockGetProducts = jest.fn();

jest.mock("api/products", () => ({
  getProducts: async () => mockGetProducts(),
}));

import { useProducts } from "./index";
import { mount } from "enzyme";
import { Product, ProductType } from "api/products/domain-models-product";

const wait = (millisecond: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve("resolved");
    }, millisecond)
  );

const StateMonitors = {
  products: jest.fn(),
  filters: jest.fn(),
  error: jest.fn(),
};

describe("useProduct", () => {
  beforeEach(() => {
    /**
     * ignore react 18 enzyme warning
     */
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockGetProducts.mockReset();
  });

  const MyCmp = () => {
    const { products, filters, error, setFilters, loadProducts } =
      useProducts();
    StateMonitors.products(products);
    StateMonitors.filters(filters);
    StateMonitors.error(error);

    return (
      <div>
        <button
          className="beer"
          onClick={() => setFilters({ productType: ProductType.Beer })}
        >
          Beer
        </button>
        <button
          className="pure"
          onClick={() => setFilters({ searchText: "pure" })}
        >
          Pure
        </button>
        <button className="loadProducts" onClick={() => loadProducts()}>
          LoadProducts
        </button>
      </div>
    );
  };

  it("initialState", () => {
    mount(<MyCmp />);
    expect(mockGetProducts).toHaveBeenCalledTimes(1);
    expect(StateMonitors.products).toHaveBeenNthCalledWith(1, []);
    expect(StateMonitors.filters).toHaveBeenNthCalledWith(1, {});
    expect(StateMonitors.error).toHaveBeenNthCalledWith(1, undefined);
  });

  it("setFilters", async () => {
    const cmp = mount(<MyCmp />);
    expect(mockGetProducts).toHaveBeenCalledTimes(1);
    cmp.find("button.beer").simulate("click");
    expect(mockGetProducts).toHaveBeenCalledTimes(2);
    expect(StateMonitors.filters).toHaveBeenNthCalledWith(2, {
      productType: ProductType.Beer,
    });
    cmp.find("button.pure").simulate("click");
    expect(StateMonitors.filters).toHaveBeenNthCalledWith(3, {
      productType: ProductType.Beer,
      searchText: "pure",
    });
    expect(mockGetProducts).toHaveBeenCalledTimes(2);
    // if searchText exists, api call is invoked after 1000 milliseconds delay
    await wait(1000);
    expect(mockGetProducts).toHaveBeenCalledTimes(3);
  });

  it("loadProducts", async () => {
    const product1 = new Product(
      0,
      false,
      "$1",
      "product_1.jpg",
      "Product1",
      ProductType.Beer
    );
    mockGetProducts
      .mockResolvedValueOnce({ items: [] })
      .mockResolvedValueOnce({ items: [product1] });
    const cmp = mount(<MyCmp />);
    expect(StateMonitors.products).toHaveBeenNthCalledWith(1, []); // initial state
    await wait(100);
    expect(StateMonitors.products).toHaveBeenNthCalledWith(2, []); // useEffect load
    cmp.find("button.loadProducts").simulate("click");
    await wait(100);
    expect(StateMonitors.products).toHaveBeenNthCalledWith(3, [product1]); // triggered load
  });

  it("loadProducts with error", async () => {
    mockGetProducts
      .mockResolvedValueOnce({ items: [] })
      .mockRejectedValueOnce(new Error("failed"));

    const cmp = mount(<MyCmp />);
    expect(StateMonitors.products).toHaveBeenNthCalledWith(1, []); // initial state
    await wait(100);
    expect(StateMonitors.products).toHaveBeenNthCalledWith(2, []); // useEffect load
    expect(StateMonitors.error).toHaveBeenNthCalledWith(2, undefined); // useEffect load
    cmp.find("button.loadProducts").simulate("click");
    await wait(100);
    expect(StateMonitors.products).toHaveBeenNthCalledWith(3, []); // triggered load
    expect(StateMonitors.error).toHaveBeenNthCalledWith(3, "failed"); // triggered load
  });
});
