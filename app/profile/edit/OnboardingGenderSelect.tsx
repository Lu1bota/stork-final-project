'use client';

import Select, {SingleValue} from 'react-select';
import { Field, FieldProps } from 'formik';
import styles from '../../../components/CustomSelect/CustomSelect.module.css'

interface OptionType {
  value: string;
  label: string;
}

const genderOptions = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'null', label: 'Ще не знаю' },
];

export default function OnboardingGenderSelect() {
  return (
    <div className={styles.field}>
      <label htmlFor="gender" className={styles.label}>Стать дитини</label>
      <Field name="gender">
        {({ field, form, meta }: FieldProps<string>) => {
          const hasError = meta.touched && meta.error;

          return (
            <div>
              <Select
                className={styles.myCustomSelect}
                options={genderOptions}
                name={field.name}
                value={genderOptions.find(option => option.value === field.value)}
                onChange={(option: SingleValue<OptionType>) => {
                  form.setFieldValue(field.name, option?.value || '');
                }}
                onBlur={() => form.setFieldTouched(field.name, true)}
                classNamePrefix="react-select"
                placeholder="Оберіть стать"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: hasError ? 'red' : base.borderColor,
                    boxShadow: hasError ? '0 0 0 1px red' : base.boxShadow,
                    '&:hover': {
                      borderColor: hasError ? 'red' : base.borderColor,
                    },
                  }),
                }}
              />
              {hasError && (
                <div className={styles.error}>{meta.error}</div>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
}
