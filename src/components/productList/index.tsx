import { Product } from "api/products/domain-models-product";

interface IProductListProps {
  products: ReadonlyArray<Product>;
}

const ProductList: React.FC<IProductListProps> = (props) => {
  const { products } = props;
  return (
    <div>
      {products.map((p) => (
        <div key={p.index}>{p.productName}</div>
      ))}
    </div>
  );
};

export default ProductList;
