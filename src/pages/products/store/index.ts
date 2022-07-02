import { getProducts } from "api/products";
import { GetProducts } from "api/products/domain-models-api";
import { Product, ProductType } from "api/products/domain-models-product";
import { useEffect, useState } from "react";
import { Debouncer } from "utils/index";

interface ProductFilters {
  productType?: ProductType;
  searchText?: string;
}

export interface ProductsState {
  readonly filters: ProductFilters;
  readonly products: ReadonlyArray<Product>;
  readonly error?: string;
}

export const initialState: ProductsState = {
  filters: {},
  products: [],
  error: undefined,
};

const searchDebouncer = new Debouncer(500);

export const useProducts = () => {
  const [state, setState] = useState<ProductsState>(initialState);
  const { products, error, filters } = state;
  const { searchText, productType } = filters;

  useEffect(() => {
    if (searchText) {
      searchDebouncer.debouce(() => loadProducts({ searchText, productType }));
    } else {
      searchDebouncer.cancel();
      loadProducts({ searchText, productType });
    }
  }, [searchText, productType]);

  const updateState = (data: Partial<ProductsState>) =>
    setState((prev) => ({ ...prev, ...data }));

  const loadProducts = async (filters?: GetProducts) => {
    try {
      const { items } = await getProducts(filters);
      updateState({ products: items });
    } catch (ex: any) {
      updateState({ error: ex?.message, products: [] });
    }
  };

  const setFilters = (data: ProductsState["filters"]) =>
    setState((prev) => ({ ...prev, filters: { ...prev?.filters, ...data } }));

  return {
    products,
    error,
    filters,
    loadProducts,
    setFilters,
  };
};
