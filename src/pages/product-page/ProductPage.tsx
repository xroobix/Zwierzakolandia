import { FC, useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { ToastContainer, toast } from 'react-toastify';
import { ProductDesc } from '../../components/product-desc/ProductDesc';
import data from '../../data/data.json';
import useCartStore from '../../stores/cartStore';
import { CartProduct } from '../../types/products';
import './productpage.css';
type Props = {
  id: number;
};

export const ProductPage: FC<Props> = ({ id }) => {
  const product = getProductDataById(id);
  const [currentVariantIdx, setCurrentVariantIdx] = useState<number>(0);
  const [currentVariant, setCurrentVariant] = useState(product.options.variants[currentVariantIdx]);
  const [currentPrice, setCurrentPrice] = useState(() => getPrice(currentVariantIdx));
  const [quantity, setQuantity] = useState<number>(1);
  const [showQuantityError, setShowQuantityError] = useState<boolean>(false);
  const variantName = product.options.name.slice(0, -1);
  const addToCartStore = useCartStore((state) => state.addToCart);

  const images = currentVariant.images.map((image) => {
    return {
      original: image.src,
      thumbnail: image.src,
    };
  });

  function getProductDataById(id: number) {
    const productsData = data.products;
    const dataFilteredById = productsData.filter((product) => product.id === id);
    return dataFilteredById[0];
  }

  function getPrice(idx: number) {
    const variantPrice = product.options.variants[idx].price.toFixed(2);
    const variantDiscount = product.options.variants[idx].discount;
    const discountedVariantPrice = parseFloat((parseFloat(variantPrice) * (1 - variantDiscount * 0.01)).toFixed(2));
    return discountedVariantPrice;
  }

  function handleVariantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const variantIdx = parseFloat(e.target.value);
    setCurrentVariantIdx(variantIdx);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value);
    if (/^[0-9]+$/.test(e.target.value) && value >= 1 && value <= 99) {
      setQuantity(value);
    } else {
      setShowQuantityError(true);
    }
  }

  function addToCart() {
    let cartProduct: CartProduct = {
      'product-number': currentVariant['product-number'],
      'product-name': product['product-name'],
      image: currentVariant.images[0].src,
      price: currentVariant.price,
      variant: currentVariant.value,
      quantity: quantity,
    };
    if (currentPrice != currentVariant.price) cartProduct.discountedPrice = currentPrice;

    addToCartStore(cartProduct);
    toast.success('Produkt dodany do koszyka!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }

  useEffect(() => {
    setCurrentPrice(getPrice(currentVariantIdx));
    setCurrentVariant(product.options.variants[currentVariantIdx]);
  }, [currentVariantIdx]);

  useEffect(() => {
    setShowQuantityError(false);
  }, [quantity]);

  return (
    <div className="pdp">
      <div className="container">
        <div className="pdp__wrapper">
          <div className="pdp-image">
            <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} showNav={false} showBullets={false} />
          </div>
          <div className="pdp-product-info">
            <h2 className="pdp-header">{product['product-name']}</h2>
            <h4 className="pdp-brand">{product.brand}</h4>
            <p className="pdp-pdnumber">{`Numer produktu: ${currentVariant['product-number']}`}</p>
            <div className="pdp-price-info">
              <div className="pdp-price">
                {currentVariant.discount > 0 ? (
                  <>
                    <span className="pdp-discount">{`${currentPrice.toFixed(2)}zł - `}</span>
                    <span className="pdp-discount-standard">{`${currentVariant.price.toFixed(2)}zł`}</span>
                  </>
                ) : (
                  <span className="pdp-standard">{`${currentPrice.toFixed(2)}zł`}</span>
                )}
              </div>
              <div>{currentVariant.discount > 0 && <span className="pdp-discount-text">Najniższa cena z 30 dni przed obniżką</span>}</div>
            </div>
            <div className="pdp-options">
              <div className="variant-select">
                <label htmlFor={variantName.toLowerCase()}>{variantName}</label>
                <select
                  name={variantName.toLowerCase()}
                  id={variantName.toLowerCase()}
                  value={currentVariantIdx}
                  onChange={(e) => handleVariantChange(e)}
                >
                  {product.options.variants.map((variant, idx) => {
                    const price = getPrice(idx);
                    return <option key={variant.value} value={idx}>{`${variant.value} - ${price.toFixed(2)}zł`}</option>;
                  })}
                </select>
              </div>
              {currentVariant.available && (
                <div className="pdp-quantity">
                  <div className="pdp-quantity-header">Liczba sztuk</div>
                  <div className="pdp-quantity-selector">
                    <button className="quantity-btn" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill={quantity === 1 ? '#ccc' : '#000'}
                      >
                        <path d="M5 11V13H19V11H5Z"></path>
                      </svg>
                    </button>
                    <input
                      className="quantity"
                      autoComplete="off"
                      value={quantity}
                      min={1}
                      max={99}
                      onChange={(e) => handleAmountChange(e)}
                    />
                    <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)} disabled={quantity === 99}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill={quantity === 99 ? '#ccc' : '#000'}
                      >
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                      </svg>
                    </button>
                  </div>
                  {showQuantityError && (
                    <div className="quantity-error">
                      {' '}
                      <p>Podaj min. 1, maks. 99</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {product.meat && (
              <p className="pdp-flavor">
                Smak <span> {product.meat.join(', ')}</span>
              </p>
            )}
            <div className="pdp-cart">
              <button className="pdp-cart-btn" disabled={!currentVariant.available} onClick={() => addToCart()}>
                {currentVariant.available ? `Dodaj do koszyka` : `Produkt niedostępny`}
              </button>
            </div>
          </div>
        </div>
        <ProductDesc data={product.info} />
      </div>
    </div>
  );
};
