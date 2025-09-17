'use client';

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import {toast} from 'react-hot-toast';
import { saveProfile } from '../../../lib/api';
import styles from './OnboardingForm.module.css'


const validationSchema = Yup.object({
    gender: Yup.string().required('Оберіть стать дитини'),
    dueDate: Yup.date().required('Оберіть дату'),
    avatar: Yup.mixed().nullable(),
  });

  export default function OnboardingForm() {
    const router = useRouter();
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const mutation = useMutation<unknown, Error, FormData>({
        mutationFn: saveProfile,
        onSuccess: () => {
        toast.success('Дані збережено');
      router.push('/my-day');
        },
        onError: () => {
            toast.error('Помилка при збереженні даних!')
        },
    });

    return (
        <Formik
      initialValues={{ gender: '', dueDate: '', avatar: null }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append('gender', values.gender);
        formData.append('dueDate', values.dueDate);
        if (avatarFile) {
          formData.append('avatar', avatarFile);
        }

        mutation.mutate(formData);
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
        <div className={styles.upload}>
          <label htmlFor="avatar" className={styles.avatarButton}>
            <div className={styles.avatarPreview}>
              {avatarFile ? (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="avatar"
                  className={styles.avatarImage}
                />
              ) : (
                <span className={styles.avatarIcon}>📷</span>
              )}
            </div>
            Завантажити фото
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setAvatarFile(file || null);
              setFieldValue('avatar', file);
            }}
          />
        </div>

          <div className={styles.field}>
            <Field as="select" name="gender" className={styles.select}>
              <option value="">Оберіть стать</option>
              <option value="male">Хлопчик</option>
              <option value="female">Дівчинка</option>
              <option value="unknown">Ще не знаю</option>
            </Field>
            <ErrorMessage name="gender" component="div" className={styles.error} />
          </div>

          <div className={styles.field}>
            <Field type="date" name="dueDate" className={styles.input} />
            <ErrorMessage name="dueDate" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.button} disabled={mutation.isPending}>
            {mutation.isPending ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
    );

  }