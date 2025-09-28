"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./ProfileEditForm.module.css";
import { User } from "@/types/user";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useId } from "react";
import toast from "react-hot-toast";

const genderOptions = [
  { value: "boy", label: "Хлопчик" },
  { value: "girl", label: "Дівчинка" },
  { value: "null", label: "Ще не знаю" },
];

const today = new Date();
today.setHours(0, 0, 0, 0);
const maxDueDate = new Date(today);
maxDueDate.setMonth(maxDueDate.getMonth() + 10);

const validationSchema = Yup.object({
  name: Yup.string().required("Ім'я обов'язкове"),
  email: Yup.string().email("Невалідний email").required("Email обов'язковий"),
  gender: Yup.string()
    .oneOf([...genderOptions.map((g) => g.value), ""], "Оберіть стать")
    .required("Оберіть стать"),
  dueDate: Yup.date()
    .required("Оберіть дату")
    .min(today, "Дата не може бути в минулому")
    .max(maxDueDate, "Максимум на 10 місяців від сьогодні"),
});

interface UpdateUserPayload {
  name: string;
  email: string;
  gender: "boy" | "girl" | "null" | "";
  dueDate?: string | null;
}

async function updateUserProfileAsJSON(
  payload: UpdateUserPayload
): Promise<User> {
  const token = localStorage.getItem("accessToken");
  const { data } = await axios.patch<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
}

function formatDueDate(date: string | Date): string {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default function ProfileEditForm({ user }: { user: User }) {
  const selectId = useId();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfileAsJSON,
    onSuccess: async () => {
      const fullUser = await getMe();
      setUser(fullUser);
      toast.success('Профіль успішно оновлено!')
    },
    onError: () => {
      toast.error('Сталася помилка. Будь ласка, спробуйте пізніше.');
    }
  });

  const parseDueDate = (str?: string | null): Date | null => {
    if (!str) return null;
    const iso = /^\d{4}-\d{2}-\d{2}/;
    if (iso.test(str)) return new Date(str);
    const [dd, mm, yyyy] = str.split("-");
    if ([dd, mm, yyyy].every(Boolean)) return new Date(+yyyy, +mm - 1, +dd);
    return null;
  };

  return (
    <Formik
      initialValues={{
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        dueDate: parseDueDate(user.dueDate),
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const payload: UpdateUserPayload = {
          name: values.name,
          email: values.email,
          gender: values.gender,
          dueDate: values.dueDate ? formatDueDate(values.dueDate) : null,
        };
        console.log("PATCH payload:", payload);
        mutate(payload, {
          onSettled: () => setSubmitting(false),
        });
      }}
    >
      {({ isSubmitting, resetForm }) => {
        return (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Ім&#39;я
              </label>
              <Field id="name" name="name" className={styles.input} />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Пошта
              </label>
              <Field id="email" name="email" className={styles.input} />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={selectId} className={styles.label}>
                Стать дитини
              </label>
              <Field name="gender">
                {({ field, form, meta }: FieldProps<string>) => {
                  const hasError = Boolean(meta.touched && meta.error);

                  return (
                    <>
                      <Select
                        inputId={selectId}
                        instanceId={selectId}
                        className={`select${hasError ? " selectError" : ""}`}
                        classNamePrefix="react-select"
                        options={genderOptions}
                        value={
                          genderOptions.find((o) => o.value === field.value) ??
                          null
                        }
                        onChange={(
                          opt: SingleValue<{ value: string; label: string }>
                        ) => form.setFieldValue(field.name, opt?.value ?? "")}
                        onBlur={() => form.setFieldTouched(field.name, true)}
                        placeholder="Оберіть стать"
                        isSearchable={false}
                        isClearable={false}
                        aria-invalid={hasError}
                        aria-describedby={
                          hasError ? `${selectId}-error` : undefined
                        }
                      />
                      {hasError && (
                        <div id={`${selectId}-error`} className={styles.error}>
                          {meta.error as string}
                        </div>
                      )}
                    </>
                  );
                }}
              </Field>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dueDate" className={styles.label}>
                Планова дата пологів
              </label>
              <Field name="dueDate">
                {({ field, form, meta }: FieldProps<Date | null>) => (
                  <DatePicker
                    id="dueDate"
                    calendarClassName='calendar'
                    selected={field.value}
                    onChange={(date: Date | null) =>
                      form.setFieldValue(field.name, date)
                    }
                    onBlur={() => form.setFieldTouched(field.name, true)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Оберіть дату"
                    className={`${styles.date} ${
                      meta.touched && meta.error ? styles.inputError : ""
                    }`}
                    minDate={today}
                    maxDate={maxDueDate}
                  />
                )}
              </Field>

              <ErrorMessage
                name="dueDate"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="button"
                onClick={() => resetForm()}
                disabled={isSubmitting || isPending}
                className={`${styles.button} ${styles.reset}`}
              >
                Відмінити зміни
              </button>

              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className={`${styles.button} ${styles.submit}`}
              >
                {isSubmitting || isPending ? "Збереження..." : "Зберегти зміни"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
