import { Product, ProductType } from "api/products/domain-models-product";

export class GetProducts {
  constructor(
    readonly productType?: ProductType,
    readonly searchText?: string
  ) {}
}

export class GetProductsResponse {
  constructor(readonly items: ReadonlyArray<Product>) {}
}
