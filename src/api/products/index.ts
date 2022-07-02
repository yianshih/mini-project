import {
  GetProducts,
  GetProductsResponse,
} from "api/products/domain-models-api";
import { mockProducts } from "api/products/mockProducts";
import { Product, ProductType } from "api/products/domain-models-product";

const productFuzzySearch = (text: string) => (product: Product) => {
  const { productName = "" } = product;
  return productName.toLowerCase().includes(text.toLowerCase());
};

export const getProducts = async (
  getProducts?: GetProducts
): Promise<GetProductsResponse> => {
  const { productType, searchText } = getProducts || {};
  return Promise.resolve({
    items: mockProducts
      .map((p) =>
        Product.from({
          index: p?.index,
          isSale: p?.isSale,
          price: p?.price,
          productImage: p?.productImage,
          productName: p?.productName,
          type: p?.type as ProductType,
        })
      )
      .filter((p) => {
        if (productType && productType !== p.type) return false;
        if (searchText && !productFuzzySearch(searchText)(p)) return false;
        return true;
      }),
  });
};
