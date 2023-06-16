import React from 'react'
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList({ interviewers, interviewer, setInterviewer }) {

  const interviewerList = interviewers.map(interviewerItem => {
    return <InterviewerListItem
      key={ interviewerItem.id }
      id={ interviewerItem.id }
      name={ interviewerItem.name }
      avatar={ interviewerItem.avatar }
      selected={ interviewer === interviewerItem.id }
      setInterviewer={ setInterviewer }
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ interviewerList }</ul>
    </section>
  );
}

