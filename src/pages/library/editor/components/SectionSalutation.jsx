import { Card, Input } from 'antd';
const { TextArea } = Input;

import { useState } from 'react';
import FormRow from './FormRow';

const SalutationSection = ({ editing }) => {
  const [to, setTo] = useState('');
  const [attn, setAttn] = useState('');
  const [attnVisible, setAttnVisible] = useState(true);

  const setFieldData = (title, value) => {
    if (title == 'To') {
      setTo(value);
    } else if (title == 'Attn.') {
      setAttn(value);
    }
  };

  return (
    <>
      <Card title="Salutation" style={{ margin: '8px' }}>
        <FormRow
          title="To"
          data={to}
          //setData={setTo}
          setFieldData={setFieldData}
          formEditing={editing}
          builderMode={true}
          mandatory
          prefillable
          style={{ width: '95%' }}
        />

        {editing || attnVisible ? (
          <FormRow
            title="Attn."
            data={attn}
            //setData={setAttn}
            setFieldData={setFieldData}
            formEditing={editing}
            builderMode={true}
            visibleControllable
            visible={attnVisible}
            setVisible={setAttnVisible}
            prefillable
            style={{ width: '95%' }}
          />
        ) : (
          ''
        )}
      </Card>
    </>
  );
};

export default SalutationSection;
