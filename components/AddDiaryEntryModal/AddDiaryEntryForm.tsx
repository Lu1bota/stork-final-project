"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddDiaryEntryForm.module.css";

// Тимчасова заглушка для емоцій
const DUMMY_EMOTIONS = [
  { value: "joy", label: "Радість" },
  { value: "sadness", label: "Смуток" },
  { value: "anger", label: "Злість" },
  { value: "calmness", label: "Спокій" },
  { value: "anxiety", label: "Тривога" },
  { value: "inspiration", label: "Натхнення" },
  { value: "gratitude", label: "Вдячність" },
];

interface AddDiaryEntryFormProps {
  initialValues?: { title: string; categories: string[]; entry: string };
  onSubmit: (values: {
    title: string;
    categories: string[];
    entry: string;
  }) => Promise<void>;
}

const AddDiarySchema = Yup.object().shape({
  title: Yup.string()
    .required("Поле обов’язкове")
    .max(50, "Назва запису має бути не більше 50 символів"),
  categories: Yup.array()
    .of(Yup.string().oneOf(DUMMY_EMOTIONS.map((e) => e.value)))
    .min(1, "Виберіть хоча б одну категорію"),
  entry: Yup.string()
    .required("Поле обов’язкове")
    .max(500, "Запис має бути не більше 500 символів"),
});

export default function AddDiaryEntryForm({
  initialValues,
  onSubmit,
}: AddDiaryEntryFormProps) {
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);

  return (
    <Formik
      initialValues={{
        title: initialValues?.title || "",
        categories: initialValues?.categories || [],
        entry: initialValues?.entry || "",
      }}
      validationSchema={AddDiarySchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Помилка при збереженні запису:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.label}>
            Заголовок
            <Field
              name="title"
              placeholder="Введіть заголовок запису"
              className={css.inputField}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div className={css.label}>
            Категорії
            <div className={css.categoriesWrapper}>
              {values.categories.length > 0 && (
                <div className={css.selectedTags}>
                  {values.categories.map((category) => (
                    <span key={category} className={css.tag}>
                      {DUMMY_EMOTIONS.find((e) => e.value === category)?.label}
                    </span>
                  ))}
                </div>
              )}
              <div
                className={css.dropdownContainer}
                onClick={() =>
                  setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)
                }
              >
                <div className={css.dropdownHeader}>
                  {values.categories.length === 0 ? "Натхнення" : " "}
                </div>
                {isCategoriesDropdownOpen && (
                  <div className={css.dropdownMenu}>
                    {DUMMY_EMOTIONS.map((emotion) => (
                      <div key={emotion.value} className={css.checkboxItem}>
                        <label>
                          <input
                            type="checkbox"
                            name="categories"
                            value={emotion.value}
                            checked={values.categories.includes(emotion.value)}
                            onChange={(e) => {
                              const { value, checked } = e.target;
                              const newCategories = checked
                                ? [...values.categories, value]
                                : values.categories.filter(
                                    (cat) => cat !== value
                                  );
                              setFieldValue("categories", newCategories);
                            }}
                          />
                          {emotion.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ErrorMessage
              name="categories"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div className={css.label}>
            Запис
            <Field
              name="entry"
              as="textarea"
              placeholder="Запишіть, як ви себе відчуваєте"
              className={css.textareaField}
            />
            <ErrorMessage
              name="entry"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div className={css.buttons}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Зберегти
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
