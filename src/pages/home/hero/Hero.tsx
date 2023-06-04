import { Link } from 'react-router-dom';
import './hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__text">
            <h2>Witaj w Zwierzakolandii</h2>
            <h1>Ulubionym sklepie Twojego pupila!</h1>
            <p>
              W naszym sklepie znajdziesz wszystko, czego potrzebujesz, aby zadbać o swojego przyjaciela. Od pysznego jedzenia po wygodne
              łóżeczka i zabawki, mamy wszystko, czego potrzebujesz, aby zaspokoić potrzeby Twojego pupila.
            </p>
            <div className="hero__link">
              <Link to="/wszystko">Sprawdź</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
