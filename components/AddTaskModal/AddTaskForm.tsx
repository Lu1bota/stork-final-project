"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./AddTaskForm.module.css";

interface AddTaskFormProps {
  initialValues?: { title: string; date: Date };
  onSubmit: (values: { title: string; date: Date }) => Promise<void>;
}

const today = new Date();

// Створення об'єкта дати, яка буде через 10 місяців
const maxDateLimit = new Date();
maxDateLimit.setMonth(today.getMonth() + 10);

const AddTaskSchema = Yup.object().shape({
  title: Yup.string().required("Поле обов’язкове"),
  date: Yup.date()
    .required("Дата обов’язкова")
    .min(today, "Не можна вибрати минулу дату")
    .max(maxDateLimit, "Дату можна вибрати не більше ніж на 10 місяців вперед"),
});

export default function AddTaskForm({
  initialValues,
  onSubmit,
}: AddTaskFormProps) {
  return (
    <Formik
      initialValues={{
        title: initialValues?.title || "",
        date: initialValues?.date || today,
      }}
      validationSchema={AddTaskSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Помилка при збереженні завдання:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.label}>
            Завдання
            <Field
              name="title"
              placeholder="Прийняти вітаміни"
              className={css.inputField}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <div className={css.label}>
            Дата
            <ReactDatePicker
              selected={values.date}
              onChange={(date: Date | null) => setFieldValue("date", date)}
              dateFormat="dd.MM.yyyy"
              minDate={today}
              maxDate={maxDateLimit}
              className={css.inputField}
            />
            <ErrorMessage
              name="date"
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
