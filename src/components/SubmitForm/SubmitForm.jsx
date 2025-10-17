import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import css from './SubmitForm.module.css';
import { fetchCv } from '../../api';

const ValidSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  position: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  email: Yup.string().email('Must be a valid email').required('Required'),
  phone: Yup.string()
    .matches(/^[0-9()+ -]*$/, 'Only digits, spaces, +, - and () are allowed')
    .required('Required'),
  city: Yup.string()
    .min(3, 'Too short')
    .max(100, 'Too long')
    .required('Required'),
  exp: Yup.string(),
  edu: Yup.string(),
  add: Yup.string(),
});

const initialValues = {
  username: '',
  position: '',
  email: '',
  phone: '',
  city: '',
  exp: '',
  edu: '',
  add: '',
};

export default function SubmitForm() {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetchCv(values);

      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${values.username}_${values.position}.docx`;
      document.body.appendChild(a);

      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error while generating a CV:', error);
      alert('Something went wrong, please try again later');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ValidSchema}
    >
      {({ isSubmitting }) => (
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
            <label htmlFor="position">Position:</label>
            <Field
              className={css.input}
              type="text"
              name="position"
              id="position"
            />
            <ErrorMessage className={css.error} name="position" component="p" />
          </div>
          <div className={css.wrp}>
            <p>Contact info:</p>
            <div className={css.box}>
              <label className={css.custom} htmlFor="email">
                Email:
              </label>
              <Field
                className={css.input}
                type="email"
                name="email"
                id="email"
              />
              <ErrorMessage className={css.error} name="email" component="p" />
              <label className={css.custom} htmlFor="phone">
                Phone:
              </label>
              <Field
                className={css.input}
                type="tel"
                name="phone"
                id="phone"
                pattern="^[0-9()+\s-]*$"
              />
              <ErrorMessage className={css.error} name="phone" component="p" />
            </div>
          </div>
          <div className={css.wrp}>
            <label htmlFor="city">Address (city, region, country):</label>
            <Field className={css.input} type="text" name="city" id="city" />
            <ErrorMessage className={css.error} name="city" component="p" />
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
          <button className={css.btn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Generating...' : 'Generate CV'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
