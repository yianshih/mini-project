import { Flex } from "components/Grid";
import styled from "styled-components";

export const Container = styled(Flex)`
  border: 1px #9e9e9e solid;
  padding: 10px;
  max-width: 1400px;
  margin: auto;

  @media (max-width: 1500px) {
    max-width: 1050px;
  }
  @media (max-width: 1150px) {
    max-width: 700px;
  }
  @media (max-width: 800px) {
    max-width: 350px;
  }
`;

export const FilterLabel = styled.div`
  margin-right: 10px;
`;

export const FilterTypeContainer = styled(Flex)`
  justify-content: flex-end;
  margin-left: 10px;
`;
