import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/products';
import './gallery.css';

interface Props {
  data: Product[];
}

export const Gallery: FC<Props> = ({ data }) => {
  const itemsPerPageOptions = [12, 24, 36, 48];
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setCurrentPage(e.selected);
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemsPerPage(12);
    setItemOffset(0);
    setCurrentPage(0);
  }, [data]);

  const Pagination = () => (
    <div className="pagination">
      <div className="items-per-page">
        <div className="items-per-page-header">
          <p>Produkty na stronę:</p>
        </div>
        <div className="items-per-page-btns">
          {itemsPerPageOptions.map((i) => (
            <button
              key={`items-per-page-btn-${i}`}
              className={itemsPerPage === i ? 'items-per-page-btn-selected' : 'items-per-page-btn'}
              onClick={() => setItemsPerPage(i)}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {data.length > itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          containerClassName="pagination-pages"
          activeClassName="page-active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-prev"
          previousLinkClassName="page-prev-link"
          nextClassName="page-next"
          nextLinkClassName="page-next-link"
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          renderOnZeroPageCount={null}
          forcePage={currentPage}
        />
      )}
    </div>
  );

  return (
    <>
      {data.length > 0 && <Pagination />}
      <div className="gallery">
        {currentItems.map((product) => {
          const productNameWithoutPolishChars = product['product-name']
            .replace('ł', 'l')
            .replace('Ł', 'L')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          const productLink = productNameWithoutPolishChars.replace(/\W+/g, '-').toLowerCase();

          const priceOfFirstVariant = product.options.variants[0].price.toFixed(2);

          const priceOfLastVariant = product.options.variants[product.options.variants.length - 1].price.toFixed(2);

          const discountOfFirstVariant = product.options.variants[0].discount;

          const discountOfLastVariant = product.options.variants[product.options.variants.length - 1].discount;

          const discountedFirstVariantPrice = parseFloat(
            (parseFloat(priceOfFirstVariant) * (1 - discountOfFirstVariant * 0.01)).toFixed(2)
          );

          const discountedLastVariantPrice = parseFloat((parseFloat(priceOfLastVariant) * (1 - discountOfLastVariant * 0.01)).toFixed(2));

          return (
            <Link to={`/produkt/${productLink}`} className="gallery__product" key={product['product-name']}>
              <div className='gallery__product-header'>
                <img src={product.options.variants[0].images[0].src} alt="product" />
                <div className="gallery__product-variants">
                  {product.options.variants.length > 0 && (
                    <span className="product-wariants">{`${product.options.name}: ${product.options.variants.length}`}</span>
                  )}
                </div>
              </div>
              <div className="product-info">
                <h4>{product['product-name']}</h4>
                {discountOfFirstVariant > 0 || discountOfLastVariant > 0 ? (
                  <div className="product-price">
                    {product.options.variants.length > 1 ? (
                      <>
                        <span className="price-discount">{`${discountedFirstVariantPrice.toFixed(2)} - ${discountedLastVariantPrice.toFixed(
                          2
                        )}zł`}</span>
                        <span className="price-discount-standard">{`${priceOfFirstVariant} - ${priceOfLastVariant}zł`}</span>
                      </>
                    ) : (
                      <>
                        <span className="price-discount">{`${discountedFirstVariantPrice.toFixed(2)}zł`}</span>
                        <span className="price-discount-standard">{`${priceOfFirstVariant}zł`}</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="product-price">
                    {product.options.variants.length > 1 ? (
                      <span className="price-standard">{`${priceOfFirstVariant} - ${priceOfLastVariant}zł`}</span>
                    ) : (
                      <span className="price-standard">{`${priceOfFirstVariant}zł`}</span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      {data.length > 0 && <Pagination />}
    </>
  );
};
