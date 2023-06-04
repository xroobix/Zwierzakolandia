import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import data from '../../data/data.json';
import { Product } from '../../types/products';
import { Filter } from './filter/Filter';
import { Gallery } from './gallery/Gallery';
import './shop.css';

type Props = {
  categoryName: string;
  category: string;
};

export const Shop: FC<Props> = ({ categoryName, category }) => {
  const [params] = useSearchParams();
  const searchParams = [...params];
  const [initialData, setInitialData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>(initialData);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  function filterByShopCategory(cat: string) {
    if (cat === 'wszystko') {
      setInitialData(data.products);
    } else {
      const dataFilteredByCategory = data.products.filter((product) => product.category === cat || product.animal === cat);
      setInitialData(dataFilteredByCategory);
    }
  }

  function filterBySearchParams() {
    let mergedProducts: Product[] = [];
    if (searchParams.length == 0) {
      setFilteredData(initialData);
      return;
    }
    searchParams.forEach((param) => {
      const currentProducts = initialData.filter((product) => {
        const key = product[param[0] as keyof Product];
        const productHasParamAsProperty = product.hasOwnProperty(param[0]);
        const isPropertyAnArray = Array.isArray(product[param[0] as keyof Product]);
        if (!productHasParamAsProperty && searchParams.length >= 1 && key == 'meat') return true;
        if (productHasParamAsProperty) {
          if (isPropertyAnArray && (key as string | string[]).includes(param[1])) {
            return true;
          } else if (key === param[1]) {
            return true;
          }
        }
      });
      if (mergedProducts.length > 0) {
        const matchingValues = mergedProducts.filter((product) => currentProducts.includes(product));
        mergedProducts = matchingValues;
      } else {
        mergedProducts = mergedProducts.concat(currentProducts);
      }
    });
    setFilteredData([...new Set(mergedProducts)].sort((a, b) => a.id - b.id));
  }

  useEffect(() => {
    filterByShopCategory(category);
  }, [category]);

  useEffect(() => {
    filterBySearchParams();
  }, [searchParams.length, initialData, category]);

  return (
    <div className="shop">
      <div className="container">
        <div className="shop__banner">
          <h1>{categoryName}</h1>
        </div>
      </div>
      <div className="shop__browser container">
        <div className="mobile-filters">
          <button className="mobile-filters-btn" onClick={() => setShowMobileFilters(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
              <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="rgba(0,0,0,1)"></path>
            </svg>
            Kategorie i filtry
          </button>
        </div>
        <div className="filter" style={{ display: showMobileFilters ? 'block' : undefined }}>
          <button className="filter-btn" onClick={() => setShowMobileFilters(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
              <path
                d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                fill="rgba(0,0,0,1)"
              ></path>
            </svg>
          </button>
          <Filter categoryName={categoryName} data={filteredData} />
        </div>
        <div className="display-products" style={showMobileFilters ? {display: 'none'} : undefined}>
          <Gallery data={filteredData} />
        </div>
      </div>
    </div>
  );
};
