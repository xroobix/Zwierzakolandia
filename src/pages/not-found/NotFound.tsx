import { Link } from 'react-router-dom';
import './notFound.css'
import NotFoundImage from '../../assets/not-found.svg';
import { ProductCategory } from '../../components/product-category/ProductCategory';

export const NotFound = () => {
  return (
    <>
      <div className="notfound container">
        <div className="notfound-text">
          <h1>Ups! Wygląda na to, że zabłądziłeś!</h1>
          <p>Nie martw się, jestem pewien, że Twoji pupile są gdzieś w pobliżu!</p>
          <p>W Zwierzakolandii czekają na Ciebie fantastyczne artykuły dla Twoich pupili.</p>
          <Link to="/" className="notfound-link">
            Przejdź do strony głównej
          </Link>
        </div>
        <div className="notfound-image">
          <img src={NotFoundImage} alt="cart empty" />
        </div>
      </div>
      <ProductCategory />
    </>
  );
};
