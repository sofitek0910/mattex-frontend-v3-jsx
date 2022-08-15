import { Card, Input } from 'antd';

const { TextArea } = Input;

import { useEffect, useState } from 'react';
import FormRow from './FormRow';
import FormSwitch from './FormSwitch';
import SignOffBlock from './SignOffBlock'; 

const SectionSignOff = ({ editing }) => {
  const [showSubmitter, setShowSubmitter] = useState(true);
  const [idVisible, setIdVisible] = useState(true);
  const builderMode = true;

  const [strToBool, setStrToBool] = useState(showSubmitter ? 'Yes' : 'No');
  useEffect(() => {
    console.log('strToBool:', strToBool);
    storeBool(strToBool);
  }, [strToBool]);

  const storeBool = (choice) => {
    if (choice == 'Yes') {
      setShowSubmitter(true);
    } else if (choice == 'No') {
      setShowSubmitter(false);
    }
  };
  return (
    <>
      <Card title="Sign Offs" style={{ margin: '8px' }}>
        <SignOffBlock builderMode={builderMode} showSubmitter={showSubmitter} />

        <FormSwitch
          formEditing={editing}
          title="Include submitter in sign off"
          checked={showSubmitter}
          setChecked={setShowSubmitter}
        />

        {editing || idVisible ? (
          <FormRow
            //title={idName}
            //titleEditable
            //setTitle={setTitle}
            title="Circulation Identification:"
            formEditing={editing}
            builderMode={builderMode}
            visibleControllable
            visible={idVisible}
            setVisible={setIdVisible}
          />
        ) : (
          ''
        )}
      </Card>
    </>
  );
};

export default SectionSignOff;
