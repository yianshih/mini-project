export enum ProductType {
  Beer = "Beer",
  Wine = "Wine",
  Spirits = "Spirits",
  Cider = "Cider",
}

export class Product {
  static from(data: Product) {
    const {
      index = 0,
      isSale = false,
      price = "",
      productImage = "",
      productName = "",
      type = "",
    } = data;
    return Object.assign(
      //@ts-ignore
      new Product(),
      {
        index,
        isSale,
        price,
        productImage,
        productName,
        type,
      } as Product
    );
  }

  constructor(
    readonly index: number,
    readonly isSale: boolean,
    readonly price: string,
    readonly productImage: string,
    readonly productName: string,
    readonly type: ProductType
  ) {}
}
