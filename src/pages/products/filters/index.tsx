import { ProductType } from "api/products/domain-models-product";
import { getEnumValues } from "utils/index";
import { useMemo } from "react";
import { Select, Input } from "antd";
import { Flex } from "components/Grid";
import { FilterLabel } from "./styled";

const { Option } = Select;

type IMenuOption = {
  key: "all" | ProductType;
  label: string;
};

const MENU_OPTIONS: IMenuOption[] = [
  { key: "all", label: "All" },
  ...getEnumValues(ProductType).map((type) => ({
    key: type as ProductType,
    label: type,
  })),
];

interface IProductFiltersProps {
  searchText?: string;
  productType?: ProductType;
  onProductTypeChange: (productType?: ProductType) => void;
  onSearchTextChange: (text?: string) => void;
}

const ProductFilters: React.FC<IProductFiltersProps> = ({
  searchText,
  productType,
  onSearchTextChange,
  onProductTypeChange,
}) => {
  const TypeFilter = useMemo(
    () => (
      <Select
        defaultValue={productType ?? "all"}
        style={{ width: 120 }}
        onChange={(value: IMenuOption["key"]) =>
          onProductTypeChange(value === "all" ? undefined : value)
        }
      >
        {MENU_OPTIONS.map((o) => (
          <Option value={o.key} key={o.key}>
            {o.label}
          </Option>
        ))}
      </Select>
    ),
    [productType]
  );

  const FreeSearch = useMemo(
    () => (
      <Input
        value={searchText}
        placeholder="Search..."
        onChange={(e) => onSearchTextChange(e.target?.value)}
      />
    ),
    [searchText]
  );

  return (
    <Flex style={{ justifyContent: "space-between" }}>
      <div>{FreeSearch}</div>
      <Flex>
        <FilterLabel>Filter by</FilterLabel>
        {TypeFilter}
      </Flex>
    </Flex>
  );
};

export default ProductFilters;
