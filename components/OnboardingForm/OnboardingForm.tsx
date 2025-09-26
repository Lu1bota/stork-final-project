"use client";

import { useState, useEffect, useRef, useId } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./OnboardingForm.module.css";
import Image from "next/image";
import Select, { SingleValue } from "react-select";
import { updateMe } from "@/lib/api/clientApi";

/* ---------- локальні опції статі ---------- */
type Gender = "boy" | "girl" | "null";
type GenderOption = { value: Gender; label: string };

const genderOptions: ReadonlyArray<GenderOption> = [
  { value: "boy",  label: "Хлопчик"  },
  { value: "girl", label: "Дівчинка" },
  { value: "null", label: "Ще не знаю"  },
];

/* ---------- формат dd-MM-yyyy для бекенду ---------- */
const formatDueDate = (d: Date) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

interface FormValues {
  gender: Gender | "";
  dueDate: Date | null;
  avatar: File | null;
}

const initialValues: FormValues = {
  gender: "",
  dueDate: null,
  avatar: null,
};

/* ---------- ВБУДОВАНИЙ SELECT ДЛЯ СТАТІ ---------- */
function GenderSelect({ options }: { options: ReadonlyArray<GenderOption> }) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>Стать дитини</label>

      <Field name="gender">
        {({ field, form, meta }: FieldProps<Gender | "">) => {
          const hasError = Boolean(meta.touched && meta.error);
          const wrapper = `${styles.mySelect} ${hasError ? styles.selectError : ""}`;

          return (
            <>
              <Select
                inputId={id}
                instanceId={id}
                className={wrapper}
                classNamePrefix="react-select"
                options={options as GenderOption[]}
                value={options.find(o => o.value === field.value) ?? null}
                onChange={(opt: SingleValue<GenderOption>) =>
                  form.setFieldValue(field.name, opt?.value ?? "")
                }
                onBlur={() => form.setFieldTouched(field.name, true)}
                placeholder="Оберіть стать"
                isSearchable={false}
                isClearable={false}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${id}-error` : undefined}
              />

              {hasError && (
                <div id={`${id}-error`} className={styles.error}>
                  {meta.error as string}
                </div>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
}

/* ====================== ОСНОВНИЙ КОМПОНЕНТ ====================== */
export default function OnboardingForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // межі дат: сьогодні ... +10 місяців
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDueDate = new Date(today); maxDueDate.setMonth(maxDueDate.getMonth() + 10);

  const validationSchema = Yup.object({
    gender: Yup.string()
      .oneOf(genderOptions.map(o => o.value), "Оберіть стать дитини")
      .required("Оберіть стать дитини"),
    dueDate: Yup.date()
      .nullable()
      .required("Оберіть дату")
      .min(today, "Дата не може бути в минулому")
      .max(maxDueDate, "Максимум на 10 місяців від сьогодні"),
    avatar: Yup.mixed().nullable(),
  });

  // прев’ю для аватарки
  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setPreviewUrl(prev => { if (prev) URL.revokeObjectURL(prev); return url; });
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
  }, [avatarFile]);

  const mutation = useMutation<unknown, Error, FormData>({
    mutationFn: (fd) => updateMe(fd),
    onSuccess: () => { toast.success("Дані збережено"); router.push("/"); },
    onError:   () => { toast.error("Помилка при збереженні даних!"); },
  });

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.navbar}>
          <Image
            src="/logo/Frame_269.png"
            alt="Лелека"
            width={285}
            height={87}
            style={{ width: 95, height: "auto" }}
            priority
          />
        </div>

        <h1 className={styles.title}>Давайте познайомимось ближче</h1>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const fd = new FormData();
            if (values.dueDate) fd.append("dueDate", formatDueDate(values.dueDate));
            fd.append("gender", values.gender as Gender);
            if (avatarFile) fd.append("photoURL", avatarFile);
            mutation.mutate(fd);
          }}
        >
          {({ setFieldValue }) => (
            <Form className={styles.form} noValidate>
              {/* Аватар */}
              <div className={styles.upload}>
                <div className={styles.avatarPreview} aria-live="polite">
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
                    const file = e.target.files?.[0] ?? null;
                    setAvatarFile(file);
                    setFieldValue("avatar", file);
                  }}
                />
              </div>

              {/* Пара полів */}
              <div className={styles.fieldsRow}>
                <div className={styles.fieldCol}>
                  <GenderSelect options={genderOptions} />
                </div>

                <div className={styles.fieldCol}>
                  <label htmlFor="dueDate" className={styles.label}>
                    Планова дата пологів
                  </label>
                  <Field name="dueDate">
                    {({ field, meta, form }: FieldProps<Date | null>) => (
                      <DatePicker
                        id="dueDate"
                        selected={field.value}
                        onChange={(date: Date | null) => form.setFieldValue(field.name, date)}
                        onBlur={() => form.setFieldTouched(field.name, true)}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Оберіть дату"
                        calendarClassName={styles.calendar}
                        wrapperClassName={styles.controlWrapper}
                        className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ""}`}
                        dropdownMode="select"
                        minDate={today}
                        maxDate={maxDueDate}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="dueDate" component="div" className={styles.error} />
                </div>
              </div>

              <button type="submit" className={styles.button} disabled={mutation.isPending}>
                {mutation.isPending ? "Збереження..." : "Зберегти"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className={styles.right}>
        <Image
          src="/onboarding/seedling.jpg"
          alt="Seedling"
          width={720}
          height={900}
          className={styles.image}
          priority
        />
      </div>
    </div>
  );
}
