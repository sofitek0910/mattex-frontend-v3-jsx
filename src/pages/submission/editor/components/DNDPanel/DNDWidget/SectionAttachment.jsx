import { Card, Input, Col, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

import { useState } from 'react';
import FormRadio from './FormRadio';

const AttachmentSection = ({
  sortableIndex,
  //editing,
  deleteHandler,
}) => {
  //radio button in this section cannot be pre-selected
  const [dummyChoice, setDummyChoice] = useState('');
  const builderMode = true;

  const clearClickHandler = () => {
    props.removeBlock(props.section);
    // setReferenceData(defaultValues);
    // setTempReferenceData(tempDefaultValues)
  };

  return (
    <>
      <Col flex="auto" style={{ maxWidth: '80%' }}>
        <Card className="sectionCard" title="Attachment" style={{ margin: '8px' }}>
          <FormRadio
            builderMode
            mandatory
            //formEditing={editing}
            title="Attachment"
            choice={dummyChoice}
            setChoice={setDummyChoice}
          />
        </Card>
      </Col>

      <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
        <Button
          style={{ margin: '4px' }}
          icon={<DeleteOutlined />}
          onClick={() => deleteHandler(sortableIndex)}
          size="small"
        />
      </Col>
    </>
  );
};

export default AttachmentSection;
