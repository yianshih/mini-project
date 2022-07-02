import ProductList from "components/productList";
import ProductFilters from "pages/products/filters";
import { useProducts } from "pages/products/store";
import { Container } from "./styled";

const Products: React.FC = () => {
  const {
    setFilters,
    products,
    error,
    filters: { searchText, productType },
  } = useProducts();

  return (
    <Container>
      <ProductFilters
        onProductTypeChange={(productType) => setFilters({ productType })}
        onSearchTextChange={(searchText) => setFilters({ searchText })}
        productType={productType}
        searchText={searchText}
      />
      {error ? <div>{error}</div> : <ProductList products={products} />}
    </Container>
  );
};

export default Products;
