import { FC } from 'react';
import { Product } from '../../../types/products';
import './filter.css';
import { FilterBy } from './filterBy/FilterBy';

interface Props {
  categoryName: string;
  data: Product[];
}

export const Filter: FC<Props> = ({ categoryName, data }) => {
  const categories = createFilterData('category');
  const types = createFilterData('type');
  const animals = createFilterData('animal');
  const brands = createFilterData('brand');
  const meats = createFilterData('meat');
  const allFilters = [categories, types, animals, brands, meats];

  function createFilterData(filterBy: string) {
    const filteredArray = data
      .map((product) => product[filterBy as keyof Product])
      .flat(1)
      .sort() as string[];
    const filteredArrayWithUndefined = filteredArray.filter((item, index) => filteredArray.indexOf(item) === index);
    const filteredData = filteredArrayWithUndefined.filter((item) => item !== undefined);
    return { name: filterBy, data: filteredData };
  }

  return (
    <>
      <h5>Produktów: {data.length}</h5>
      <h1>{categoryName}</h1>
      {allFilters.map((filter) => {
        const removeCurrentCategory = filter.data.filter((item) => item !== categoryName.toLowerCase());
        return removeCurrentCategory.length === 0 ? null : (
          <FilterBy key={`filter-${filter.name}`} name={filter.name} filteredData={removeCurrentCategory} />
        );
      })}
    </>
  );
};
