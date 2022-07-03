import { Product, ProductType } from "./domain-models-product";

describe("Product", () => {
  it("from", () => {
    expect(
      Product.from({
        index: 0,
        isSale: false,
        type: ProductType.Beer,
        productName: "Product1",
        productImage: "Product_1.jpg",
        price: "$1",
      })
    ).toEqual(
      new Product(0, false, "$1", "Product_1.jpg", "Product1", ProductType.Beer)
    );
  });
});
