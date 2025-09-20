"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import Container from "../Container/Container";

const validationSchema = Yup.object().shape({
  name: Yup.string().max(32).required("Імʼя є обовʼязковим"),
  email: Yup.string()
    .email("Некоректна пошта")
    .max(64)
    .required("Пошта є обовʼязковою"),
  password: Yup.string()
    .min(8, "Занадто коротка")
    .max(128, "Занадто довга")
    .required("Пароль є обовʼязковим"),
});

export default function RegistrationForm() {
  const handleSubmit = () => {
  };

  return (
    <Container>
      <Link href="/" className={css.logo}>
        <svg>
          <path d="" />
        </svg>
        <span className={css.logoPart}>LELEKA</span>
      </Link>

      <h1 className={css.title}>Реєстрація</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <label htmlFor="name" className={css.label}>
                Імʼя*
              </label>
              <Field
                id="name"
                type="text"
                name="name"
                placeholder="Ваше імʼя"
                className={`${css.input} ${
                  errors.name && touched.name ? css.inputError : ""
                }`}
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.fieldGroup}>
              <label htmlFor="email" className={css.label}>
                Пошта*
              </label>
              <Field
                id="email"
                type="email"
                name="email"
                placeholder="hello@leleka.com"
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label htmlFor="password" className={css.label}>
                Пароль*
              </label>
              <Field
                id="password"
                type="password"
                name="password"
                placeholder="********"
                className={`${css.input} ${
                  errors.password && touched.password ? css.inputError : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <button className={css.submitBtn} type="submit">
              Зареєструватись
            </button>
            <p className={css.ensureText}>
              Вже маєте аккаунт?{" "}
              <Link href="/auth/login" className={css.ensureTextPart}>
                Увійти
              </Link>
            </p>
          </Form>
        )}
      </Formik>
      {/* <img src="" alt="Storks picture" /> */}
    </Container>
  );
}
