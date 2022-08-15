import { Card, Input } from 'antd';

const { TextArea } = Input;

import { useState } from 'react';
import FormDate from './FormDate';
import FormRadio from './FormRadio';
import FormRow from './FormRow';

const AboutThisSubmissionSection = ({ editing }) => {
  const [remarks, setRemarks] = useState('');
  const [purposeOption, setPurposeOption] = useState([
    'For Review',
    'For Acceptance',
    'For Information',
    'For Record',
  ]);
  const [purposeOfSubmission, setPurposeOfSubmission] = useState('');
  const [anticipatedDate, setAnticipatedDate] = useState(null);
  const [recordFutureReply, setRecordFutureReply] = useState('');

  const builderMode = true;

  const setFieldData = (title, value) => {
    if (title === 'Remarks') {
      setRemarks(value);
    }
  };

  return (
    <>
      <Card title="About This Submission" style={{ margin: '8px' }}>
        <FormRow
          title="Remarks"
          data={remarks}
          setFieldData={setFieldData}
          formEditing={editing}
          builderMode={builderMode}
          textField
          prefillable
        />
        <FormRadio
          builderMode={builderMode}
          mandatory
          formEditing={editing}
          title="Purpose of Submission"
          options={purposeOption}
          setOptions={setPurposeOption}
          optionsEditable
          choice={purposeOfSubmission}
          setChoice={setPurposeOfSubmission}
        />

        <FormDate
          title="Anticipated Date of Reply"
          date={anticipatedDate}
          setDate={setAnticipatedDate}
          formEditing={editing}
          info="Extra information"
          builderMode={builderMode}
          mandatory
        />

        <FormRadio
          builderMode={builderMode}
          mandatory
          formEditing={editing}
          title="Record Future Reply on Cover"
          choice={recordFutureReply}
          setChoice={setRecordFutureReply}
        />
      </Card>
    </>
  );
};

export default AboutThisSubmissionSection;
