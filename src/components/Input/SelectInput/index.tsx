import React, { useRef, useEffect, useCallback } from 'react';

import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
export const SelectInput: React.FC<Props> = ({ name, onChange, ...rest }) => {
  const selectRef = useRef(null);

  const { fieldName, defaultValue = '', registerField } = useField(name);

  const handleChange = useCallback(
    (value, actionMeta) => {
      if (value && rest.required)
        (selectRef.current as any).select.inputRef.required = false;
      else if (rest.required)
        (selectRef.current as any).select.inputRef.required = true;

      if (onChange) {
        onChange(value, actionMeta);
      }
    },
    [onChange, rest.required],
  );

  useEffect(() => {
    if (selectRef.current && rest.required)
      (selectRef.current as any).select.inputRef.required = true;
  }, [name, rest.required]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }

        if (!ref.state.value) {
          return '';
        }

        return ref.state.value.value;
      },
      setValue: (ref: any, value: any) => {
        ref.select.setValue({ value, label: value });
      },
    });
  }, [
    fieldName,
    registerField,
    rest.isMulti,
    rest.required,
    rest.value,
    selectRef,
  ]);

  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      onChange={handleChange}
      {...rest}
    />
  );
};
