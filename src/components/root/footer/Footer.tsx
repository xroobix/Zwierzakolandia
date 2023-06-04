import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { Link } from 'react-router-dom';
import Dog from '../../../assets/dog.svg'
import Cat from '../../../assets/cat.svg'
import './footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <img src={Dog} alt="dog" className="footer-dog" />
      <img src={Cat} alt="cat" className="footer-cat" />
      <div className="container">
        <div className="footer-content">
          <div className="footer-content-mobile">
            <Accordion transition transitionTimeout={250}>
              <AccordionItem
                initialEntered
                header={
                  <>
                    <h3>Zwierzakolandia</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="arrow-down">
                      <path
                        d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                        fill="white"
                      ></path>
                    </svg>
                  </>
                }
              >
                <div className="footer-section">
                  <a href="#">
                    <p>O nas</p>
                  </a>
                  <a href="#">
                    <p>Blog</p>
                  </a>
                  <Link to="/kontakt">
                    <p>Kontakt</p>
                  </Link>
                  <a href="#">
                    <p>Newsletter</p>
                  </a>
                </div>
              </AccordionItem>

              <AccordionItem
                header={
                  <>
                    <h3>Informacje</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" className="arrow-down">
                      <path
                        d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                        fill="white"
                      ></path>
                    </svg>
                  </>
                }
              >
                <div className="footer-section">
                  <a href="#">
                    <p>Regulamin</p>
                  </a>
                  <a href="#">
                    <p>Polityka prywatności i cookies</p>
                  </a>
                  <a href="#">
                    <p>Program lojalnościowy</p>
                  </a>
                  <a href="#">
                    <p>Dostawa</p>
                  </a>
                  <a href="#">
                    <p>Sposoby płatności</p>
                  </a>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="footer-content-desktop">
            <div className="footer-section">
              <h3>Zwierzakolandia</h3>
              <a href="#">
                <p>O nas</p>
              </a>
              <a href="#">
                <p>Blog</p>
              </a>
              <Link to="/kontakt">
                <p>Kontakt</p>
              </Link>
              <a href="#">
                <p>Newsletter</p>
              </a>
            </div>
            <div className="footer-section">
              <h3>Informacje</h3>
              <a href="#">
                <p>Regulamin</p>
              </a>
              <a href="#">
                <p>Polityka prywatności i cookies</p>
              </a>
              <a href="#">
                <p>Program lojalnościowy</p>
              </a>
              <a href="#">
                <p>Dostawa</p>
              </a>
              <a href="#">
                <p>Sposoby płatności</p>
              </a>
            </div>
          </div>
          <div className="footer-content-contact">
            <div className="footer-section">
              <h3>Siedziba</h3>
              <p>ul. Przykładowa 123</p>
              <p>00-000 Miasto</p>
              <p>
                Tel: <a href="tel:+48123456789">+48 123 456 789</a>
              </p>
              <p>
                <a href="mailto:kontakt@zwierzakolandia.pl">kontakt@zwierzakolandia.pl</a>
              </p>
            </div>
            <div className="footer-section">
              <h3>Godziny otwarcia</h3>
              <p>Pon - Pt: 9:00 - 18:00</p>
              <p>Sob: 10:00 - 16:00</p>
              <p>Nd: Zamknięte</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            <a target="_blank" href="https://www.github.com/xroobix">
              &copy; {new Date().getFullYear()} Zwierzakolandia. Wszelkie prawa zastrzeżone
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
