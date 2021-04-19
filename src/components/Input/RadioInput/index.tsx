import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { RadioMainLabel, OptionsContainer } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  options: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
export const Radio: React.FC<InputProps> = ({
  name,
  label,
  options,
  ...rest
}) => {
  const inputRefs = useRef<any[]>([]);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs) => {
        return refs.current?.find((input: HTMLInputElement) => input?.checked)
          ?.value;
      },
      setValue: (refs, id) => {
        const inputRef = refs.current?.find((ref: any) => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs) => {
        const inputRef = refs.current.find((ref: any) => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <RadioMainLabel>{label}</RadioMainLabel>
      <OptionsContainer>
        {options.map((option, index) => (
          <span key={option.id}>
            <input
              type="radio"
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              id={option.id}
              name={name}
              defaultChecked={defaultValue.includes(option.id)}
              value={option.value}
              {...rest}
            />
            <span />

            <label htmlFor={option.id} key={option.id}>
              {option.label}
            </label>
          </span>
        ))}
      </OptionsContainer>
    </>
  );
};
