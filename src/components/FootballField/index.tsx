import { FormHandles } from '@unform/core';
import { useCallback, useMemo, useState } from 'react';
import { OptionTypeBase } from 'react-select';

import { Player } from '../Player';

import {
  Container,
  Header,
  FieldContainer,
  CenterLine,
  CenterCircle,
  Field,
  Area,
  SelectInput,
  selectInputStyles,
} from './styles';

interface FootbalFieldProps {
  className?: string;
  title: string;
  $form: React.RefObject<FormHandles>;
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const FootballField: React.FC<FootbalFieldProps> = ({
  className,
  title,
}) => {
  const [formationValue, setFormationValue] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: OptionTypeBase) => setFormationValue(e.value),
    [],
  );

  const selectOptions = [
    {
      value: '2 - 3 - 5',
      label: '2 - 3 - 5',
    },
    {
      value: '4 - 4 - 2',
      label: '4 - 4 - 2',
    },
    {
      value: '4 - 5 - 1',
      label: '4 - 5 - 1',
    },
    {
      value: '4 - 3 - 3',
      label: '4 - 3 - 3',
    },
    {
      value: '3 - 5 - 2',
      label: '3 - 5 - 2',
    },
    {
      value: '3 - 4 - 3',
      label: '3 - 4 - 3',
    },
  ];

  const selectedFormation = useMemo(
    () =>
      formationValue
        ? formationValue.split(' - ').map((formationSize, i) => ({
            uid:
              i === 0
                ? 'attack'
                : i === 1
                ? 'middle'
                : i === 2
                ? 'defense'
                : `undefined-${i}`,
            formation: Number(formationSize),
          }))
        : null,
    [formationValue],
  );

  return (
    <Container {...{ className }}>
      <Header>
        {title}
        <SelectInput
          name="formation"
          options={selectOptions}
          styles={selectInputStyles}
          onChange={handleChange}
        />
      </Header>
      <FieldContainer>
        <Field layout={selectedFormation}>
          <div />
          {selectedFormation &&
            selectedFormation.map(({ uid, formation }) => (
              <Area key={uid} {...(formation > 4 && { bigArea: true })}>
                {[...Array(formation)].map((_, i) => (
                  <Player
                    // eslint-disable-next-line react/no-array-index-key
                    key={`p-${i}`}
                    $col={
                      formation > 4
                        ? i + 1 <= 2
                          ? 2
                          : i - 1
                        : formation === 4
                        ? i + 1 >= 2 && i + 1 <= 3
                          ? 2
                          : i + 1 === 4
                          ? 3
                          : i + 1
                        : formation === 2
                        ? i
                          ? 3
                          : i + 1
                        : formation === 1
                        ? 2
                        : i + 1
                    }
                    $row={formation > 4 ? (i + 1 <= 2 ? 1 : 2) : 1}
                    {...(formation > 4
                      ? i + 1 <= 2 && { $twins: i + 1 }
                      : formation === 4 &&
                        i + 1 >= 2 &&
                        i + 1 <= 3 && { $twins: -i })}
                  />
                ))}
              </Area>
            ))}
          {selectedFormation && (
            <Area>
              <Player $col={2} />
            </Area>
          )}
        </Field>
        <CenterLine />
        <CenterCircle />
      </FieldContainer>
    </Container>
  );
};
