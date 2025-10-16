import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import css from './SubmitForm.module.css';

const ValidSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  email: Yup.string().email('Must be a valid email').required('Required'),
  phone: Yup.string()
    .phone('Must be a valid phone number')
    .required('Required'),
  country: Yup.string()
    .min(2, 'Too short')
    .max(56, 'Too long')
    .required('Required'),
  region: Yup.string()
    .min(2, 'Too short')
    .max(100, 'Too long')
    .required('Required'),
  city: Yup.string()
    .min(1, 'Too short')
    .max(168, 'Too long')
    .required('Required'),
  exp: Yup.string(),
  edu: Yup.string(),
  add: Yup.string(),
});

const initialValues = {
  username: '',
  email: '',
  phone: '',
  country: '',
  region: '',
  city: '',
  exp: '',
  edu: '',
  add: '',
};

export default function SubmitForm() {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ValidSchema}
    >
      <Form className={css.form}>
        <div className={css.wrp}>
          <label htmlFor="username">Full name:</label>
          <Field
            className={css.input}
            type="text"
            name="username"
            id="username"
          />
          <ErrorMessage className={css.error} name="username" component="p" />
        </div>
        <div className={css.wrp}>
          <p>Contact info:</p>
          <div className={css.box}>
            <label className={css.custom} htmlFor="email">
              Email:
            </label>
            <Field className={css.input} type="email" name="email" id="email" />
            <ErrorMessage className={css.error} name="email" component="p" />
            <label className={css.custom} htmlFor="phone">
              Phone:
            </label>
            <Field
              className={css.input}
              type="number"
              name="phone"
              id="phone"
            />
            <ErrorMessage className={css.error} name="phone" component="p" />
          </div>
        </div>
        <div className={css.wrp}>
          <p>Address:</p>
          <div className={css.box}>
            <label className={css.custom} htmlFor="country">
              Country:
            </label>
            <Field
              className={css.input}
              type="text"
              name="country"
              id="country"
            />
            <ErrorMessage className={css.error} name="country" component="p" />
            <label className={css.custom} htmlFor="region">
              Region:
            </label>
            <Field
              className={css.input}
              type="text"
              name="region"
              id="region"
            />
            <ErrorMessage className={css.error} name="region" component="p" />
            <label className={css.custom} htmlFor="city">
              City:
            </label>
            <Field className={css.input} type="text" name="city" id="city" />
            <ErrorMessage className={css.error} name="city" component="p" />
          </div>
        </div>
        <div className={css.wrp}>
          <label htmlFor="exp">Work experience and skills:</label>
          <Field
            className={css.input}
            as="textarea"
            name="exp"
            id="exp"
            rows="6"
          />
          <ErrorMessage className={css.error} name="exp" component="p" />
        </div>
        <div className={css.wrp}>
          <label htmlFor="edu">Education:</label>
          <Field
            className={css.input}
            as="textarea"
            name="edu"
            id="edu"
            rows="6"
          />
          <ErrorMessage className={css.error} name="edu" component="p" />
        </div>
        <div className={css.wrp}>
          <label htmlFor="add">Additional info:</label>
          <Field
            className={css.input}
            as="textarea"
            name="add"
            id="add"
            rows="6"
          />
          <ErrorMessage className={css.error} name="add" component="p" />
        </div>
        <button className={css.btn} type="submit">
          Generate CV
        </button>
      </Form>
    </Formik>
  );
}
