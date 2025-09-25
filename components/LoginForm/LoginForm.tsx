"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import css from "./LoginForm.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import GoogleAuthBtn from "@/components/auth/GoogleAuthBtn";


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
      toast.error("Невірна пошта або пароль"); 
    }
  };

  return (
    <Container className={css.container}>
      <Link href="/" className={css.logo}>
        <Image
          src="/logo/Frame_269.png"
          alt="Лелека"
          width={112}
          height={48}
          priority
          className={css.logoIcon}
        />
      </Link>

      <div>
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
              <h1 className={css.title}>Вхід</h1>

              <div className={css.fieldGroup}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Пошта"
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
              </div>

              <button
                className={css.submitBtn}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Зачекайте..." : "Увійти"}
              </button>

              <GoogleAuthBtn label="Увійти через Google" />

              <p className={css.ensureText}>
                Немає аккаунту?{" "}
                <Link href="/auth/register" className={css.ensureTextPart}>
                  Зареєструватися
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <Image
        className={css.img}
        src="/auth/stork's_eggs.jpg"
        alt="Stork's eggs illustration"
        width={720}
        height={900}
      />
    </Container>
  );
}
