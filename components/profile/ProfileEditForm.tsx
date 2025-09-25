import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ProfileEditForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Ім’я обов’язкове"),
  email: Yup.string().email("Невалідний email").required("Email обов’язковий"),
  gender: Yup.string().required("Оберіть стать"),
  dueDate: Yup.date().required("Оберіть дату"),
});


 export default function ProfileEditForm({ user }: { user: any }) {
  return (
    <Formik
      initialValues={{ name: user.name, email: user.email }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Оновлені дані:", values);
        // тут потом будет запрос на бекенд
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Ім’я</label>
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
            <Field as="select" name="gender" className={styles.select}>
              <option value="">-- оберіть стать --</option>
              <option value="Чоловіча">Чоловіча</option>
              <option value="Жіноча">Жіноча</option>
            </Field>
          
            <ErrorMessage
              name="gender"
              component="div"
              className={styles.error}
            />
            </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueDate">Планова дата пологів:</label>        
            <Field type="date" name="dueDate" className={styles.date} />
            <ErrorMessage
              name="dueDate"
              component="div"
              className={styles.error}
            />
            </div>
          
          <div className={styles.buttonContainer}>
            <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButtonGray}
          >
            Відмінити зміни
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButtonPink}
          >
            Зберегти зміни
          </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}