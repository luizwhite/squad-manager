import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */

import { InputContainer, Label } from './styles';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  label: string;
  'text-area'?: boolean;
  notFormField?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
  handleSearch?: MouseEventHandler<HTMLButtonElement>;
  $ref?: React.RefObject<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
  name,
  pattern,
  label,
  'text-area': textArea = false,
  notFormField = false,
  icon: Icon,
  handleSearch,
  $ref,
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
      setIsInvalid((state) => {
        if (
          !!inputRef.current &&
          !(inputRef.current.value === null || inputRef.current.value === '')
        ) {
          if (!myRegex.test(inputRef.current.value)) {
            inputRef.current.setCustomValidity(inputRef.current.title);
            inputRef.current.focus();
            inputRef.current.reportValidity();

            return true;
          }

          inputRef.current.setCustomValidity('');
          inputRef.current.reportValidity();

          return false;
        }
        return state;
      });
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
            ref={
              !notFormField
                ? (inputRef as React.RefObject<HTMLInputElement>)
                : $ref
            }
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
        {Icon && handleSearch && !textArea && (
          <button onClick={handleSearch} type="button">
            <Icon size={20} />
          </button>
        )}
      </InputContainer>
    </>
  );
};
