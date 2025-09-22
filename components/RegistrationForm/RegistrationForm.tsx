"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await register(values);
      router.push("/onboarding");
    } catch  {
      alert("Ця пошта вже використовується");
    }
  };

  return (
    <Container className={css.container}>
      <Link href="/" className={css.logo}>
        <Image
          src="/logo/Frame 269.png"
          alt="Лелека"
          width={95}
          height={30}
          priority
          className={css.logoIcon}
        />
      </Link>

      <div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={css.form}>
              <h1 className={css.title}>Реєстрація</h1>

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
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
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
              <button
                className={css.submitBtn}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Зачекайте..." : "Зареєструватись"}
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
      </div>
      <Image
        className={css.img}
        src="/auth/A beautifully detailed, stylized watercolor illustration of two storks building a nest together. One stork is gently placing a delicate twig. The style is minimalist and clean, with soft, bleeding watercolor textures and fine ink lines. The color p.jpg"
        alt="Stork illustration"
        width={720}
        height={948}
      />
    </Container>
  );
}
