"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import css from "./LoginForm.module.css";
import Container from "../Container/Container";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некоректна пошта")
    .max(64)
    .required("Пошта є обовʼязковою"),
  password: Yup.string()
    .min(8, "Занадто коротка")
    .max(128, "Занадто довга")
    .required("Пароль є обовʼязковим"),
});

export default function LoginForm() {
  const handleSubmit = (values, actions) => {
    actions.resetForm();
  };

  return (
    <Container>
      <Link href="/" className={css.logo}>
        <svg>
          <path d="" />
        </svg>
        <span className={css.logoPart}>LELEKA</span>
      </Link>

      <h1 className={css.title}>Вхід</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <Field
              type="email"
              name="email"
              placeholder="Пошта"
              className={`${css.input} ${
                errors.email && touched.email ? css.inputError : ""
              }`}
            />
            <ErrorMessage name="email" component="div" className={css.error} />

            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              className={`${css.input} ${
                errors.password && touched.password ? css.inputError : ""
              }`}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />

            <button className={css.submitBtn} type="submit">
              Увійти
            </button>
            <p className={css.ensureText}>
              Немає аккаунту?{" "}
              <Link href="/auth/register" className={css.ensureTextPart}>
                Зареєструватися
              </Link>
            </p>
          </Form>
        )}
      </Formik>
      {/* <img src="" alt="Stork's eggs picture" /> */}
    </Container>
  );
}
