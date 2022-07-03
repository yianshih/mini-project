jest.mock("api/products/mockProducts", () => ({
  mockProducts: [
    {
      index: 0,
      isSale: false,
      price: "$1",
      productImage: "product_1.jpg",
      productName: "Pure Blonde Crate",
      type: "Beer",
    },
    {
      index: 1,
      isSale: true,
      price: "$2",
      productImage: "product_2.jpg",
      productName: "Victoria Bitter 4x6x375ml",
      type: "Wine",
    },
    {
      index: 0,
      isSale: false,
      price: "$3",
      productImage: "product_3.jpg",
      productName: "Kirin Megumi 4x6x330ml",
      type: "Cider",
    },
  ],
}));

import { getProducts } from "api/products";
import { ProductType } from "./domain-models-product";

describe("getProducts", () => {
  it("Search without filters", async () => {
    const { items } = await getProducts();
    expect(items).toEqual([
      {
        index: 0,
        isSale: false,
        price: "$1",
        productImage: "product_1.jpg",
        productName: "Pure Blonde Crate",
        type: "Beer",
      },
      {
        index: 1,
        isSale: true,
        price: "$2",
        productImage: "product_2.jpg",
        productName: "Victoria Bitter 4x6x375ml",
        type: "Wine",
      },
      {
        index: 0,
        isSale: false,
        price: "$3",
        productImage: "product_3.jpg",
        productName: "Kirin Megumi 4x6x330ml",
        type: "Cider",
      },
    ]);
  });

  it("search with ProductType", async () => {
    const { items } = await getProducts({ productType: ProductType.Beer });
    expect(items).toEqual([
      {
        index: 0,
        isSale: false,
        price: "$1",
        productImage: "product_1.jpg",
        productName: "Pure Blonde Crate",
        type: "Beer",
      },
    ]);
  });

  it("search with SearchText", async () => {
    const { items } = await getProducts({ searchText: "pure" });
    expect(items).toEqual([
      {
        index: 0,
        isSale: false,
        price: "$1",
        productImage: "product_1.jpg",
        productName: "Pure Blonde Crate",
        type: "Beer",
      },
    ]);
  });

  it("search with ProductType and SearchText", async () => {
    const { items } = await getProducts({
      productType: ProductType.Cider,
      searchText: "pure",
    });
    expect(items).toEqual([]);
  });
});
