import { Product } from "api/products/domain-models-product";
import { Flex } from "components/Grid";
import ProductCard from "components/productCard";
import { ListContainer } from "./styled";

interface IProductListProps {
  products: ReadonlyArray<Product>;
}

const ProductList: React.FC<IProductListProps> = (props) => {
  const { products = [] } = props;

  if (!products?.length) {
    return <Flex style={{ margin: "20px" }}>Product not found</Flex>;
  }

  return (
    <ListContainer>
      {products.map((p) => (
        <ProductCard key={p.index} {...p} />
      ))}
    </ListContainer>
  );
};

export default ProductList;
