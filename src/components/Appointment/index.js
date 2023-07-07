import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';
import Confirm from './Confirm';


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const CANCEL = "CANCEL";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const onAdd = function() {
    transition(CREATE);
  };

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props
      .bookInterview(props.id, interview)
      .then(() => {transition(SHOW, true);})
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteAppointment = function() {
    transition(CANCEL);
    props.cancelInterview(props.id)
    .then(() => {transition(EMPTY, true);})
    .catch(() => transition(ERROR_DELETE, true));
  };

  const cancel = function() {
    transition(CONFIRM);
  };

  const edit = function() {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
          onEdit={edit}
        />
      )}
      { mode === EMPTY && (
        <Empty onAdd={onAdd} />
      )}
      { mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      { mode === SAVE && (
        <Status message="Saving" />
      )}
      { mode === CANCEL && (
        <Status message="Deleting" />
      )}
      { mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}
      { mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      { mode === ERROR_SAVE && (
        <Error message="Could not book appointment." onClose={back} />
      )}
      { mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={back} />
      )}
    </article>
  );
}