import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Radio } from '../../components/Input/RadioInput';
import { FootballField } from '../../components/FootballField';

import {
  Container,
  ManagerHeader,
  TeamInfo,
  TeamConfiguration,
  SaveButton,
} from './styles';
import { useTeams, Team } from '../../hooks/teams';

interface FormData {
  'team-name': string;
  'team-website': string;
  description: string;
  'team-type': 'Real' | 'Fantasy';
  // tags: string[];
  formation: string;
}

const TeamManagement: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addTeam, getTeam } = useTeams();
  const history = useHistory();

  const { id } = useParams<{ id?: string }>();

  const radioOptions = [
    { id: 'real', value: 'real', label: 'Real' },
    { id: 'fantasy', value: 'fantasy', label: 'Fantasy' },
  ];

  const handleSubmit = useCallback(
    (data: FormData) => {
      console.log(data);
      const { description, formation } = data;

      const team: Omit<Team, 'id'> = {
        name: data['team-name'],
        description,
        type: data['team-type'],
        website: data['team-website'],
        formation,
      };

      addTeam(team);
      history.push('/');
    },
    [addTeam, history],
  );

  useEffect(() => {
    const team = getTeam(Number(id));

    if (!team) history.push('/manager');
    else if (id && formRef.current) {
      const formData = {
        'team-name': team.name,
        description: team.description,
        'team-website': team.website,
        'team-type': team.type,
        formation: team.formation,
      };

      formRef.current.setData(formData);
    }
  }, [formRef, getTeam, history, id]);

  return (
    <>
      <Header />
      <Container>
        <ManagerHeader>
          <h1>{!id ? 'Create your team' : 'Update your team information'}</h1>
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
                  pattern="^\s?([a-zA-Z\u00C0-\u017F]{2,})+(\s[a-zA-Z\u00C0-\u017F]{2,})*\s?$"
                  maxLength={25}
                  title="Type in the team name"
                  required
                />
                <Input
                  text-area
                  label="Description"
                  name="description"
                  maxLength={80}
                />
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
                  required
                />
              </div>
            </div>
          </TeamInfo>
          <TeamConfiguration>
            <h2>Configure Squad</h2>
            <div>
              <div>
                <FootballField title="formation" />
                <SaveButton type="submit">Save</SaveButton>
              </div>
              <div>
                <Input
                  label="Search players"
                  name="player-search"
                  placeholder="Ronaldo"
                  notFormField
                />
              </div>
            </div>
          </TeamConfiguration>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default TeamManagement;
