import { useCallback, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles, useField } from '@unform/core';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Radio } from '../../components/Input/RadioInput';

import {
  Container,
  ManagerHeader,
  TeamInfo,
  TeamConfiguration,
} from './styles';

interface FormData {
  'team-name': string;
  'team-website': string;
  description: string;
  'team-type': 'Real' | 'Fantasy';
  tags: string[];
}

const TeamManagement: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const radioOptions = [
    { id: 'real', value: 'real', label: 'Real' },
    { id: 'fantasy', value: 'fantasy', label: 'Fantasy' },
  ];

  const handleSubmit = useCallback((data: FormData) => {
    console.log(data);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ManagerHeader>
          <h1>Create your team</h1>
        </ManagerHeader>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TeamInfo>
            <h2>Team Information</h2>
            <div>
              <div>
                <Input
                  label="Team name"
                  name="team-name"
                  placeholder="Insert team name"
                  pattern="^\s?[a-zA-Z\u00C0-\u017F]+(\s[a-zA-Z\u00C0-\u017F]+)*\s?$"
                  title="Type in the team name"
                  required
                />
                <Input text-area label="Description" name="description" />
              </div>
              <div>
                <Input
                  label="Team website"
                  name="team-website"
                  placeholder="http://myteam.com"
                  pattern="^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\\d%_.~+=-]*)?(\#[-a-z\\d_]*)?$"
                  title="Type in the team website URL"
                  required
                />
                <Radio
                  name="team-type"
                  label="Team type"
                  options={radioOptions}
                />
              </div>
            </div>
          </TeamInfo>
          <TeamConfiguration>
            <h2>Configure Squad</h2>
            <div>
              <div>
                <Input
                  label="Search players"
                  name="player-search"
                  placeholder="Ronaldo"
                  notFormField
                />
                <button type="submit">Save</button>
              </div>
              <div />
            </div>
          </TeamConfiguration>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default TeamManagement;
