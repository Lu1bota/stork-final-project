"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import css from "./LoginForm.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";


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
    const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values);
      router.push("/");
    } catch {
      alert("Невірна пошта або пароль"); 
    }
  };

  return (
    <Container className={css.container}>
      <Link href="/" className={css.logo}>
        <svg className={css.logoIcon}>
          <use xlinkHref="/sprite.svg#company-logo" />
        </svg>
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
        {({ errors, touched, isSubmitting }) => (
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

            <button
              className={css.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Зачекайте..." : "Увійти"}
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
      <Image
        className={css.img}
        src="/auth/A cozy watercolor illustration showing a close-up view of a warm nest with three smooth, pastel-colored eggs. The style uses rich, layered watercolor washes to create depth and comforting textures in the nest. A soft, warm, ambient glow from the eg.jpg"
        alt="Stork's eggs illustration"
        width={720}
        height={900}
      />
    </Container>
  );
}
