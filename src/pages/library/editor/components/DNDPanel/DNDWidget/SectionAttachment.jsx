import { Card, Input } from 'antd';

const { TextArea } = Input;

import { useState } from 'react';
import FormRadio from './FormRadio';

const AttachmentSection = ({ editing }) => {
  const [dummyChoice, setDummyChoice] = useState('');
  const builderMode = true;

  const clearClickHandler = () => {
    props.removeBlock(props.section);
    // setReferenceData(defaultValues);
    // setTempReferenceData(tempDefaultValues)
  };

  return (
    <>
      <Card title="Attachment" style={{ margin: '8px' }}>
        <FormRadio
          builderMode
          mandatory
          formEditing={editing}
          title="Attachment"
          choice={dummyChoice}
          setChoice={setDummyChoice}
        />
      </Card>
    </>
  );
};

export default AttachmentSection;
