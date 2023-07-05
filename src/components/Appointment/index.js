import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';

import useVisualMode from '../../hooks/useVisualMode';



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const onAdd = function() {
    transition(CREATE);
  };

  return (
    <article className="appointment">
      <Header time={ props.time } />
      { mode === SHOW && (
        <Show
          student={ props.interview.student }
          interviewer={ props.interview.interviewer }
        />
      )}
      { mode === EMPTY && (
        <Empty onAdd={ onAdd } />
      )}
      { mode === CREATE && (
        <Form
          interviewers={ [] }
          onCancel={ back }
        />
      )}
    </article>
  );
}