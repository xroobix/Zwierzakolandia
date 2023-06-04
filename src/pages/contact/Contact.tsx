import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import Logo from '../../assets/icon.svg';
import './contact.css';

export const Contact = () => {
  const [textAreacount, setTextAreaCount] = useState<number>(0);

  type FormData = z.infer<typeof schema>;

  const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

  const schema = z.object({
    firstName: z.string().nonempty('Imię jest wymagane!').max(15),
    lastName: z.string().nonempty('Nazwisko jest wymagane!').max(15),
    email: z.string().nonempty('Email jest wymagany!').email('Email jest niepoprawny!'),
    phone: z.string().nonempty('Telefon jest wymagany!').regex(phoneRegex, 'Nie prawidłowy numer!'),
    orderNumber: z.string().optional(),
    message: z.string().nonempty('Wiadomość jest wymagana!').max(250, 'Wiadomość jest za długa!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleCountChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaCount(e.target.value.length);
  }

  return (
    <div className="contact">
      <div className="contact-container">
        <Link to="/" className="header__logo">
          <img src={Logo} alt="logo icon" />
          <span>Zwierzakolandia</span>
        </Link>
        <div className="contact-header">
          <span>Skontaktuj się z naszą obsługą klienta</span>
        </div>
        <form className="contact-form" onSubmit={handleSubmit((data: FormData) => console.log(data))}>
          <div className="contact-form-row">
            <div className="contact-form-column">
              <label htmlFor="firstName">
                Imię <span className="contact-form-required">*</span>
              </label>
              <input type="text" placeholder="Imię" id="firstName" {...register('firstName')} />
              {errors.firstName && <span className="contact-form-error">{errors.firstName.message}</span>}
            </div>
            <div className="contact-form-column">
              <label htmlFor="lastName">
                Nazwisko <span className="contact-form-required">*</span>
              </label>
              <input type="text" placeholder="Nazwisko" id="lastName" {...register('lastName')} />
              {errors.lastName && <span className="contact-form-error">{errors.lastName.message}</span>}
            </div>
          </div>
          <div className="contact-form-column">
            <label htmlFor="email">
              Email <span className="contact-form-required">*</span>
            </label>
            <input type="email" placeholder="Email" id="email" {...register('email')} />
            {errors.email && <span className="contact-form-error">{errors.email.message}</span>}
          </div>
          <div className="contact-form-row">
            <div className="contact-form-column">
              <label htmlFor="phone">
                Numer telefonu <span className="contact-form-required">*</span>
              </label>
              <input type="text" placeholder="Numer telefonu" id="phone" {...register('phone')} />
              {errors.phone && <span className="contact-form-error">{errors.phone.message}</span>}
            </div>
            <div className="contact-form-column">
              <label htmlFor="orderNumber">Numer zamówienia (opcjonalnie)</label>
              <input type="text" placeholder="Numer zamówienia" id="orderNumber" {...register('orderNumber')} />
              {errors.orderNumber && <span className="contact-form-error">{errors.orderNumber.message}</span>}
            </div>
          </div>
          <div className="contact-form-column">
            <label htmlFor="message">
              Wiadomość <span className="contact-form-required">*</span>
            </label>
            <span className="contact-form-message-length">Znaków {textAreacount}/250</span>
            <textarea placeholder="Twoja wiadomość" id="message" {...register('message')} onChange={(e) => handleCountChange(e)}></textarea>
            {errors.message && <span className="contact-form-error">{errors.message.message}</span>}
          </div>
          <div className="contact-form-submit">
            <button type="submit" className="contact-form-submit-btn">
              Wyślij wiadomość
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
