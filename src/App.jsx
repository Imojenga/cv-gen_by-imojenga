import SubmitForm from './components/SubmitForm/SubmitForm';
import css from './App.module.css';

export default function App() {
  return (
    <main className={css.container}>
      <div className={css.wrp}>
        <svg className={css.svg} width="54" height="54" stroke="var(--main)">
          <use href="../gen.svg"></use>
        </svg>
        <h1 className={css.title}>
          CV Gen<span className={css.accent}> - your professional DNA</span>
        </h1>
      </div>
      <p className={css.text}>
        Fill in the information and create your CV in 1 click!
      </p>
      <SubmitForm />
    </main>
  );
}
