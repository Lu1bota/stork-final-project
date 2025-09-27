"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ProfileEditForm.module.css";
import { User } from "@/types/user";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("Ім'я обов'язкове"),
  email: Yup.string().email("Невалідний email").required("Email обов'язковий"),
  gender: Yup.string().required("Оберіть стать"),
  dueDate: Yup.date().required("Оберіть дату"),
});

interface UpdateUserPayload {
  name: string;
  email: string;
  gender: "boy" | "girl" | "null" | "";
  dueDate?: string | null;
}

async function updateUserProfileAsJSON(payload:UpdateUserPayload):Promise<User> {
  const token = localStorage.getItem('accessToken');
  const {data} = await axios.patch<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
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
  const setUser = useAuthStore(state => state.setUser);

  const {mutate, isPending} = useMutation({
    mutationFn: updateUserProfileAsJSON,
    onSuccess: async () => {
      const fullUser = await getMe();
      setUser(fullUser);
    }
    // onError:()=>{}
  })

  return (
    <Formik
      initialValues={{
        name: user.name || '',
        email: user.email || '',
        gender: user.gender || '',
        dueDate: user.dueDate ? user.dueDate.split('T')[0] : '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {
        const payload: UpdateUserPayload = {
          name: values.name,
          email: values.email,
          gender: values.gender,
          dueDate: values.dueDate ? formatDueDate(values.dueDate) : null,
        }
        console.log('PATCH payload:', payload);
        mutate(payload, {
          onSettled: () => setSubmitting(false),
        });
      }}
    >

      {({ isSubmitting, resetForm }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Ім&#39;я</label>
            <Field id="name" name="name" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Пошта</label>
            <Field id="email" name="email" className={styles.input} />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gender">Стать дитини:</label>             
            <Field as="select" id="gender" name="gender" className={styles.select}>
              <option value="">-- оберіть стать --</option>
              <option value="boy">Хлопчик</option>
              <option value="girl">Дівчинка</option>
              <option value="null">Ще не знаю</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className={styles.error}
            />
            </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueDate">Планова дата пологів:</label>        
            <Field type="date" id="dueDate" name="dueDate" className={styles.date} />
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
              className={styles.submitButtonGray}
            >
              Відмінити зміни
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className={styles.submitButtonPink}
            >
              {isSubmitting || isPending ? 'Збереження...' : 'Зберегти зміни'}
            </button>
            </div>
        </Form>
      )}
    </Formik>
  );
}