import { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */

import { InputContainer, Label } from './styles';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  label: string;
  'text-area'?: boolean;
  notFormField?: boolean;
}

export const Input: React.FC<InputProps> = ({
  name,
  pattern,
  label,
  'text-area': textArea = false,
  notFormField = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const { fieldName, defaultValue = '', error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);

    if (pattern) {
      const myRegex = new RegExp(pattern);
      setIsInvalid(
        !!inputRef.current &&
          !(inputRef.current.value === null || inputRef.current.value === '') &&
          !myRegex.test(inputRef.current.value),
      );
    }
  }, [inputRef, pattern]);

  useEffect(() => {
    if (!notFormField) {
      registerField<string>({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }
  }, [fieldName, inputRef, notFormField, registerField]);

  return (
    <>
      <Label
        $isFocused={isFocused}
        $isErrored={!!error || isInvalid}
        htmlFor={fieldName}
      >
        {label}
      </Label>
      <InputContainer
        {...{
          isErrored: !!error || isInvalid,
          isFilled,
          isFocused,
          isInvalid,
        }}
      >
        {!textArea ? (
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            id={fieldName}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            {...rest}
          />
        ) : (
          <textarea
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            id={fieldName}
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            {...rest}
          />
        )}
      </InputContainer>
    </>
  );
};
