import { Col, Row } from "antd";
import { Product } from "api/products/domain-models-product";
import { CardContainer, NameLabel, PriceLabel, SaleTag } from "./styled";

interface IProductCardProps extends Product {}

const ProductCard: React.FC<IProductCardProps> = (product) => {
  const { productName, productImage, isSale, price } = product;
  return (
    <CardContainer>
      {isSale && <SaleTag>Sale</SaleTag>}
      <img
        src={`https://placehold.jp/24/cccccc/ffffff/300x300.png?text=${productImage}`}
      />
      <Row>
        <Col flex={1}>
          <NameLabel>{productName}</NameLabel>
        </Col>
        <Col flex={3}>
          <PriceLabel>{price}</PriceLabel>
        </Col>
      </Row>
    </CardContainer>
  );
};

export default ProductCard;
