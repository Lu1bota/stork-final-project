"use client"
import { createDiaryEntry, CreateDiaryRequest, getEmotions, updateDiaryEntry, UpdateDiaryRequest } from "@/lib/api/clientApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { DiaryEntry } from "@/types/diary"; 
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./AddDiaryEntryForm.module.css";

interface DiaryEntryFormValues { 
    title: string;
    emotions: string[];
    description: string;
}

type AddDiaryEntryFormProps = {
    onSuccess: () => void;
    entryToEdit?: DiaryEntry | null; 
};

const baseInitialValues: DiaryEntryFormValues = {
    title: "",
    emotions: [],
    description: "",
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(1, "Заголовок має бути не менше 1 символа")
        .max(64, "Заголовок занадто довгий")
        .required("Заголовок є обовʼязковим"),
    emotions: Yup.array().of(Yup.string())
        .min(1, "Оберіть хоча б одну категорію")
        .max(12, "Не можна обрати більше 12 категорій")
        .required("Категорія є обовʼязковою"),
    description: Yup.string()
        .min(1, "Запис має бути не менше 1 символа")
        .max(1000, "Запис занадто довгий")
        .required("Запис є обовʼязковим"),
});

export const AddDiaryEntryForm = ({ onSuccess, entryToEdit }: AddDiaryEntryFormProps) => { 
    
    const queryClient = useQueryClient();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownInputRef = useRef<HTMLDivElement>(null);

    // початкові значення (пусті/для редагування)
    const isEditing = !!entryToEdit;
    const initialValues: DiaryEntryFormValues = isEditing
        ? {
            title: entryToEdit.title,
            description: entryToEdit.description,
            emotions: entryToEdit.emotions.map(e => e._id), 
        }
        : baseInitialValues;
    
    // створення/редагування
    const actionFn = (values: DiaryEntryFormValues) => {
        const payload: UpdateDiaryRequest = {
            title: values.title,
            description: values.description,
            emotions: values.emotions,
        };

        if (isEditing && entryToEdit?._id) {
            return updateDiaryEntry(entryToEdit._id, payload);
        } else {
            return createDiaryEntry(payload as CreateDiaryRequest);
        }
    };
    
    const mutation = useMutation({
        mutationFn: actionFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
            onSuccess();
            toast.success(isEditing ? "Запис успішно оновлено!" : "Запис успішно додано!");
        },
        onError: () => {
            toast.error(isEditing ? "Не вдалося оновити запис." : "Не вдалося додати запис.");
        },
    });

    const handleSubmit = (values: DiaryEntryFormValues, actions: FormikHelpers<DiaryEntryFormValues>) => {
        mutation.mutate(values);
        actions.setSubmitting(false);
    }

    const { data: emotionsData} = useQuery({
        queryKey: ['emotions'],
        queryFn: getEmotions,
    });
    
    const handleDropdownClick = (e: React.MouseEvent) => {
         if (dropdownInputRef.current && dropdownInputRef.current.contains(e.target as Node)) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleEmotion = (emotionId: string, setFieldValue: FormikHelpers<DiaryEntryFormValues>["setFieldValue"], values: DiaryEntryFormValues) => {
        if (values.emotions.includes(emotionId)) {
            setFieldValue('emotions', values.emotions.filter(id => id !== emotionId));
        } else {
            if (values.emotions.length < 12) {
                setFieldValue('emotions', [...values.emotions, emotionId]);
            } else {
                toast.error("Не можна обрати більше 12 категорій.");
            }
        }
    };

    return <>
        <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
            enableReinitialize={true} 
        >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => ( 
                <Form className={css.form}>
                    
                    <div className={css.fieldWrap}>
                        <label className={css.title} htmlFor="title">Заголовок</label>
                        <Field className={`${css.input} ${ errors.title && touched.title ? css.inputError : "" }`} type="text" name="title" id="title" placeholder="Введіть заголовок запису" />
                        <ErrorMessage name="title" component="div" className={css.error}/>
                    </div>

                    {/* Поле Категорії */}
                    <div className={css.fieldWrap} ref={dropdownRef}>
                        <label className={css.title}>Категорії</label>
                        {!isDropdownOpen && values.emotions.length > 0 && (
                            <div className={`${css.input} ${css.selectedTagsContainer} ${errors.emotions && touched.emotions ? css.inputError : ""}`}
                                onClick={handleDropdownClick} ref={dropdownInputRef}>
                                {values.emotions.map((emotionId) => {
                                    const emotion = emotionsData?.find(e => e._id === emotionId);
                                    return (
                                        <div key={emotionId} className={css.selectedEmotionTag}>
                                            {emotion?.title}
                                        </div>
                                    ); 
                                })}
                                <svg width={24} height={24} className={`${css.dropdownArrow} ${isDropdownOpen ? css.dropdownArrowOpen : ""}`}>
                                    <use href="/sprite.svg#chevron_right"></use>
                                </svg>
                            </div>
                        )}

                        {/* Поле вибору (немає тегів/список відкритий) */}
                        {(isDropdownOpen || values.emotions.length === 0) && (
                            <div 
                                className={`${css.input} ${isDropdownOpen ? css.inputOpen : ""} ${errors.emotions && touched.emotions ? css.inputError : ""}`}
                                onClick={handleDropdownClick} 
                                ref={dropdownInputRef}
                            >
                                <span className={`${css.placeholder} ${errors.emotions && touched.emotions ? css.placeholderError : ""}`}>Оберіть категорію</span>
                                <svg width={24} height={24} className={`${css.dropdownArrow} ${isDropdownOpen ? css.dropdownArrowOpen : ""}`}>
                                    <use href="/sprite.svg#chevron_right"></use>
                                </svg>
                            </div>
                        )}

                        {/* Випадаючий список */}
                        {isDropdownOpen && (
                            <div className={css.emotionsDropdownList}>
                                {emotionsData?.map((emotion) => (
                                    <div
                                        key={emotion._id}
                                        className={css.emotionItem}
                                        onClick={() => toggleEmotion(emotion._id, setFieldValue, values)}
                                    >
                                        <div className={`${css.checkbox} ${values.emotions.includes(emotion._id) ? css.checked : ""}`}>
                                            {values.emotions.includes(emotion._id) && (
                                                <svg width={14} height={11} >
                                                    <use href="/sprite.svg#flag"></use>
                                                </svg>
                                            )}
                                        </div>
                                        <span>{emotion.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <ErrorMessage name="emotions" component="div" className={css.error}/>
                    </div>

                    <div className={css.fieldWrap}>
                        <label className={css.title} htmlFor="description">Запис</label>
                        <Field className={`${css.textarea} ${ errors.description && touched.description ? css.inputError : "" }`} as="textarea" name="description" id="description" rows={5} placeholder="Запишіть, як ви себе відчуваєте" />
                        <ErrorMessage name="description" component="div" className={css.error}/>
                    </div>

                    <button className={css.button} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (isEditing ? "Оновлення..." : "Збереження...") : "Зберегти"}
                    </button>
                </Form>
            )}
        </Formik>
    </>
}