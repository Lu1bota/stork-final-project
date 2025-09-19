'use client';

import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import {toast} from 'react-hot-toast';
import { saveProfile } from '../../../lib/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './OnboardingForm.module.css'



const validationSchema = Yup.object({
    gender: Yup.string().required('Оберіть стать дитини'),
    dueDate: Yup.date().nullable().required('Оберіть дату'),
    avatar: Yup.mixed().nullable(),
  });

  export default function OnboardingForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
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
      initialValues={{ gender: '', dueDate: null, avatar: null }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append('gender', values.gender);
        formData.append('dueDate', values.dueDate?.toISOString() || '');
        if (avatarFile) {
          formData.append('avatar', avatarFile);
        }

        mutation.mutate(formData);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className={styles.form}>
        <div className={styles.upload}>
          <label htmlFor="avatar" className={styles.avatarLabel}>
            <div className={styles.avatarPreview}>
              {avatarFile ? (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="avatar"
                  className={styles.avatarImage}
                />
              ) : (
                <img src="/avatar-upload.svg" alt="avatar upload" className={styles.avatarIcon} />
              )}
            </div>
            <button type="button" className={styles.uploadButton} onClick={() => fileInputRef.current?.click()} >
                Завантажити фото
                </button>
          </label>
          <input
          ref={fileInputRef}
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
        <label htmlFor="gender" className={styles.label}>Стать дитини</label>
            <Field as="select" name="gender" className={styles.select}>
              <option value="">Оберіть стать</option>
              <option value="male">Хлопчик</option>
              <option value="female">Дівчинка</option>
              <option value="unknown">Ще не знаю</option>
            </Field>
            <ErrorMessage name="gender" component="div" className={styles.error} />
          </div>

        <div className={styles.field}>
        <label htmlFor="born date" className={styles.label}>Планова дата пологів</label>
            <Field name="dueDate">
              {({ field, form }: any) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date | null) => {
                    setFieldValue('dueDate', date);
                  }}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Оберіть дату"
                  calendarClassName={styles.calendar}
                  className={styles.input}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              )}
            </Field>
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