import { getEmotions } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik"
import { useId } from "react";
import css from "./AddDiaryEntryForm.module.css";

export const AddDiaryEntryForm = () => {
    
    const { data: emotionsData} = useQuery({
        queryKey: ['emotions'],
        queryFn: getEmotions,
    });

    const fieldId = useId();

    return <>
        <Formik initialValues={{ }} onSubmit={() => { }}>
            <Form className={css.form}>
                <label className={css.title} htmlFor={`${fieldId}-title`} >Заголовок</label>
                <Field className={`${css.input} ${css['margin-bottom']}`} type="text" name="title" id={`${fieldId}-title`} placeholder="Введіть заголовок запису" />

                <label className={css.title} htmlFor={`${fieldId}-emotions`} >Категорії</label>
                <Field className={`${css.select} ${css['margin-bottom']}`} as="select" name="emotions" id={`${fieldId}-emotions`}>
                    <option className={css.option} value="">Оберіть категорію</option>
                    {emotionsData?.map((emotion) => {
                        return <option key={emotion._id} className={css.optionItem} value={emotion.title}>{emotion.title}</option>
                    })}
                </Field>

                <label className={css.title} htmlFor={`${fieldId}-entry`}>Запис</label>
                <Field className={`${css.textarea} ${css['margin-bottom']}`} as="textarea" name="entry" id="entry" rows={5} placeholder="Запишіть, як ви себе відчуваєте"/>

                <button className={css.button} type="submit">{"Зберегти"}</button>
            </Form>
        </Formik>
    </>
}