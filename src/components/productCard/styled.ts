import { Flex } from "components/Grid";
import styled from "styled-components";

export const CardContainer = styled(Flex)`
  border: 0.5px #9e9e9e solid;
  position: relative;
  width: 350px;
  height: 350px;
  padding: 20px;
  flex-direction: column;
  outline: 0.5px solid #9e9e9e;
  > img {
    width: 250px;
    height: 250px;
  }
`;

export const Footer = styled(Flex)`
  justify-content: space-between;
  grid-template-columns: 100px 1fr;
`;

export const NameLabel = styled.p`
  margin: 5px;
`;

export const PriceLabel = styled.p`
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SaleTag = styled(Flex)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 20px;
  background-color: red;
  color: white;
`;
