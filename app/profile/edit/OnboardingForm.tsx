'use client';

import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import {toast} from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './OnboardingForm.module.css'
import { nextServer } from "@/lib/api/api";
import dynamic from 'next/dynamic';
import { FieldInputProps, FieldMetaProps } from 'formik';

interface FormValues {
    gender: string;
    dueDate: Date | null;
    avatar: File | null;
  }

const validationSchema = Yup.object({
    gender: Yup.string().required('Оберіть стать дитини'),
    dueDate: Yup.date().nullable().required('Оберіть дату'),
    avatar: Yup.mixed().nullable(),
  });

  const initialValues: FormValues = {
    gender: '',
    dueDate: null,
    avatar: null,
  };
  const genderMap: Record<string, 'boy' | 'girl' | 'null'> = {
    male: 'boy',
    female: 'girl',
    unknown: 'null',
  };

  const GenderSelect = dynamic(() => import('../../components/OnboardingGenderSelect'), {
    ssr: false,
  });

  export default function OnboardingForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const mutation = useMutation<unknown, Error, FormData>({
        mutationFn: (formData) =>
            nextServer.patch('/users/me', formData),
        onSuccess: () => {
        toast.success('Дані збережено');
      router.push('/my-day');
        },
        onError: () => {
            toast.error('Помилка при збереженні даних!')
        },
    });

    return (
        <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          if (values.dueDate) {
            formData.append('dueDate', values.dueDate.toISOString());
          }
        
          const genderMap: Record<string, 'boy' | 'girl' | 'null'> = {
            male: 'boy',
            female: 'girl',
            unknown: 'null',
          };
        
          formData.append('gender', genderMap[values.gender] || 'null');
        
          if (avatarFile) {
            formData.append('avatar', avatarFile);
          }
        
          mutation.mutate(formData);
        }}
      >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
        <div className={styles.upload}>
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
        <GenderSelect />
        <div className={styles.field}>
        <label htmlFor="born date" className={styles.label}>Планова дата пологів</label>
        <Field name="dueDate">
      {({ field, meta }: { field: FieldInputProps<Date | null>, meta: FieldMetaProps<Date | null> }) => (
        <DatePicker
          selected={field.value}
          onChange={(date: Date | null) => {
            setFieldValue('dueDate', date);
          }}
          dateFormat="dd.MM.yyyy"
          placeholderText="Оберіть дату"
          calendarClassName={styles.calendar}
          className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ''}`}
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
