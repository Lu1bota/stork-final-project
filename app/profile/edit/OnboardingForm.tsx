"use client";

import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./OnboardingForm.module.css";
import { nextServer } from "@/lib/api/api";
import dynamic from "next/dynamic";
import { FieldInputProps, FieldMetaProps } from "formik";
import Image from "next/image";

interface FormValues {
  gender: string;
  dueDate: Date | null;
  avatar: File | null;
}

const validationSchema = Yup.object({
  gender: Yup.string().required("Оберіть стать дитини"),
  dueDate: Yup.date().nullable().required("Оберіть дату"),
  avatar: Yup.mixed().nullable(),
});

const initialValues: FormValues = {
  gender: "",
  dueDate: null,
  avatar: null,
};
const genderMap: Record<string, "boy" | "girl" | "null"> = {
  male: "boy",
  female: "girl",
  unknown: "null",
};

const GenderSelect = dynamic(() => import("./OnboardingGenderSelect"), {
  ssr: false,
});

export default function OnboardingForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (avatarFile) {
      const objectUrl = URL.createObjectURL(avatarFile);
      setPreviewUrl(objectUrl);
  
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [avatarFile]);

  const mutation = useMutation<unknown, Error, FormData>({
    mutationFn: (formData) => nextServer.patch("/users/me", formData),
    onSuccess: () => {
      toast.success("Дані збережено");
      router.push("/my-day");
    },
    onError: () => {
      toast.error("Помилка при збереженні даних!");
    },
  });

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        if (values.dueDate) {
          formData.append("dueDate", values.dueDate.toISOString());
        }

        formData.append("gender", genderMap[values.gender] || "null");

        if (avatarFile) {
          formData.append("avatar", avatarFile);
        }

        mutation.mutate(formData);
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <div className={styles.upload}>
            <div className={styles.avatarPreview}>
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="avatar"
                  width={164}
                  height={164}
                  className={styles.avatarImage}
                  unoptimized
                />
              ) : (
                <Image
                  src="/avatar-upload.svg"
                  alt="avatar upload"
                  width={164}
                  height={164}
                  className={styles.avatarIcon}
                />
              )}
            </div>
            <button
              type="button"
              className={styles.uploadButton}
              onClick={() => fileInputRef.current?.click()}
            >
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
                setFieldValue("avatar", file);
              }}
            />
          </div>
          <GenderSelect />
          <div className={styles.field}>
            <label htmlFor="born date" className={styles.label}>
              Планова дата пологів
            </label>
            <Field name="dueDate">
              {({
                field,
                meta,
              }: {
                field: FieldInputProps<Date | null>;
                meta: FieldMetaProps<Date | null>;
              }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date | null) => {
                    setFieldValue("dueDate", date);
                  }}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Оберіть дату"
                  calendarClassName={styles.calendar}
                  className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ""}`}
                  dropdownMode="select"
                />
              )}
            </Field>
            <ErrorMessage
              name="dueDate"
              component="div"
              className={styles.error}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Збереження..." : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
