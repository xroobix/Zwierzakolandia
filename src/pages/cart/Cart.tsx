import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyCart from '../../assets/shopping-cart.svg';
import { ProductCategory } from '../../components/product-category/ProductCategory';
import useCartStore from '../../stores/cartStore';
import { CartProduct } from '../../types/products';
import './cart.css';

export const Cart = () => {
  const [showQuantityError, setShowQuantityError] = useState<boolean>(false);
  const cartStore = useCartStore();

  function handleQuantityChange(item: CartProduct, e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value);
    if (/^[0-9]+$/.test(e.target.value) && value >= 1 && value <= 99) {
      cartStore.setQuantity(item, value);
    } else {
      setShowQuantityError(true);
    }
  }

  useEffect(() => {
    cartStore.cart.forEach((item) => {
      if (item.quantity > 99) {
        cartStore.setQuantity(item, 99);
        !showQuantityError && setShowQuantityError(true);
      }
    });
  }, [cartStore.cart]);

  if (cartStore.cart.length === 0) {
    return (
      <>
        <div className="cart--empty container">
          <div className="cart--empty-text">
            <h2>Twój koszyk jest pusty</h2>
            <p>Wygląda na to, że nie dodałeś niczego do koszyka.</p>
            <p>Nasza szeroka gama produktów czeka na Ciebie!</p>
            <Link to="/" className="cart--empty-link">
              Przejdź do strony głównej
            </Link>
          </div>
          <div className="cart--empty-image">
            <img src={EmptyCart} alt="cart empty" />
          </div>
        </div>
        <ProductCategory />
      </>
    );
  }

  return (
    <div className="cart container">
      <div className="cart__products">
        {showQuantityError && (
          <div className="cart-quantity-error">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
                  fill="#dd2834"
                ></path>
              </svg>
              Nie można dodać ponad 99 sztuk produktu do koszyka.
            </span>

            <button onClick={() => setShowQuantityError(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                  fill="#dd2834"
                ></path>
              </svg>
            </button>
          </div>
        )}
        <div className="products-list">
          <div className="products-list-header">
            <h1>
              Koszyk <span>({cartStore.totalItems()})</span>
            </h1>
            <button className="products-list-header-clear" onClick={() => cartStore.clearCart()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="25">
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
              </svg>
              Wyczyść koszyk
            </button>
          </div>
          <div className="products-list-content">
            {cartStore.cart.map((item) => {
              const productNameWithoutPolishChars = item['product-name']
                .replace('ł', 'l')
                .replace('Ł', 'L')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
              const productLink = productNameWithoutPolishChars.replace(/\W+/g, '-').toLowerCase();
              return (
                <div className="products-list-item" key={`${item['product-name']} - ${item.variant}`}>
                  <Link to={`/produkt/${productLink}`} className="products-list-item-link">
                    <div className="products-list-item-image">
                      <img src={item.image} alt={item['product-name']} />
                    </div>
                    <div className="products-list-item-name">
                      <h4>
                        {item['product-name']} - {item.variant}
                      </h4>
                    </div>
                  </Link>
                  <div className="products-list-item-actions">
                    <div className="products-list-item-quanity">
                      <div className="quantity-selector">
                        <button
                          className="quantity-selector-btn"
                          onClick={() => cartStore.setQuantity(item, item.quantity - 1)}
                          disabled={item.quantity === 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill={item.quantity === 1 ? '#ccc' : '#000'}
                          >
                            <path d="M5 11V13H19V11H5Z"></path>
                          </svg>
                        </button>
                        <input
                          className="quantity-selector-input"
                          autoComplete="off"
                          value={item.quantity}
                          min={1}
                          max={99}
                          onChange={(e) => handleQuantityChange(item, e)}
                        />
                        <button
                          className="quantity-selector-btn"
                          onClick={() => cartStore.setQuantity(item, item.quantity + 1)}
                          disabled={item.quantity === 99}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill={item.quantity === 99 ? '#ccc' : '#000'}
                          >
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="products-list-item-price">
                      {item.discountedPrice ? (
                        <>
                          <span className="item-price-old">{item.price.toFixed(2)} zł</span>
                          <span className="item-price-standard">{item.discountedPrice.toFixed(2)} zł</span>
                        </>
                      ) : (
                        <span className="item-price-standard">{item.price.toFixed(2)} zł</span>
                      )}
                    </div>
                    <button className="products-list-item-remove" onClick={() => cartStore.removeFromCart(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path
                          d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"
                          fill="rgba(118,118,118,1)"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="cart__summary">
        <div className="summary-container">
          {cartStore.totalSavings() > 0 && (
            <div className="summary-savings">
              <span>Oszczędzasz</span>
              <span>{cartStore.totalSavings().toFixed(2)} zł</span>
            </div>
          )}
          <div className="summary-price">
            <span>Łączna kwota</span>
            <span>{cartStore.totalPrice().toFixed(2)} zł</span>
          </div>
          <div className="summary-actions">
            <button className="summary-actions-checkout">
              Przejdź do dostawy
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                <path
                  d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"
                  fill="#fff"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
