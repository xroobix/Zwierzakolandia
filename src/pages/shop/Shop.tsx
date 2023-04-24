import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/data.json';
import './shop.css';

type Props = {
  name: string;
  category: string;
};

export const Shop: FC<Props> = ({ name, category }) => {
  const [filteredData, setFilteredData] = useState(
    filterByShopCategory(category)
  );

  function filterByShopCategory(cat: string) {
    const productsData = data.products;
    const dataFilteredByCategory = productsData.filter(
      (product) => product.category === cat || product.for === cat
    );
    return dataFilteredByCategory;
  }

  useEffect(() => {
    setFilteredData(filterByShopCategory(category));
  }, [category]);

  return (
    <div className="shop">
      <div className="container">
        <div className="shop__banner">
          <h1>{name}</h1>
        </div>
      </div>
      <div className="container">
        <div className="shop__browser">
          <div className="filter">
            <h4>Produktów: {filteredData.length}</h4>
            <h2>{name}</h2>
          </div>
          <div className="gallery">
            {filteredData.map((product) => {
              const productNameWithoutPolishChars = product[
                'product-name'
              ]
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
              const productLink = productNameWithoutPolishChars
                .replace(/\W+/g, '-')
                .toLowerCase();

              const priceOfFirstVariant =
                product.options.variants[0].price.toFixed(2);

              const priceOfLastVariant =
                product.options.variants[
                  product.options.variants.length - 1
                ].price.toFixed(2);

              const discountOfFirstVariant =
                product.options.variants[0].discount;

              const discountOfLastVariant =
                product.options.variants[
                  product.options.variants.length - 1
                ].discount;

              const discountedFirstVariantPrice = parseFloat(
                (
                  parseFloat(priceOfFirstVariant) *
                  (1 - discountOfFirstVariant * 0.01)
                ).toFixed(2)
              );

              const discountedLastVariantPrice = parseFloat(
                (
                  parseFloat(priceOfLastVariant) *
                  (1 - discountOfLastVariant * 0.01)
                ).toFixed(2)
              );

              return (
                <Link
                  to={`/${product.for}/${productLink}`}
                  className="gallery__product"
                  key={product['product-name']}
                >
                  <img
                    src={product.options.variants[0].images[0].url}
                    alt="product"
                  />
                  <div className="gallery__product-variants">
                    {product.options.variants.length > 0 && (
                      <span className="product-wariants">
                        {`${product.options.name}: ${product.options.variants.length}`}
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <h4>{product['product-name']}</h4>
                    {discountOfFirstVariant > 0 ||
                    discountOfLastVariant > 0 ? (
                      <div className="product-price">
                          <span className='price-discount'>{`${discountedFirstVariantPrice.toFixed(2)} - ${discountedLastVariantPrice.toFixed(2)}zł`}</span>
                          <span className='price-discount-standard'>{`${priceOfFirstVariant} - ${priceOfLastVariant}zł`}</span>
                      </div>
                    ) : (
                      <div className="product-price">
                        <span className='price-standard'>{`${priceOfFirstVariant} - ${priceOfLastVariant}zł`}</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
