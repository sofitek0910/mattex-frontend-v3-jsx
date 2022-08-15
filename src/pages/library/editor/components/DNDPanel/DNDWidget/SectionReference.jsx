import { Button, Card, Input } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

import { useState } from 'react';
import FormRow from './FormRow';

const ReferenceSection = ({ editing }) => {
  const [title, setTitle] = useState('');
  const [projectLevelId, setProjectLevelId] = useState('');
  const [remark, setRemark] = useState([
    { key: 'Submission Master FIlling Ref.:', value: '' },
    { key: 'Specification Reference:', value: '' },
    { key: 'Drawing Reference:', value: '' },
    { key: 'BD Reference:', value: '' },
  ]);

  const setPairingData = (title, value) => {
    let tempPairingList = JSON.parse(JSON.stringify(remark));
    const pairingIndex = tempPairingList.findIndex((obj) => obj.key == title);
    tempPairingList[pairingIndex].value = value;
    setRemark(tempPairingList);
  };

  const editPairingTitle = (index, newTitle) => {
    let tempPairingList = JSON.parse(JSON.stringify(remark));
    tempPairingList[index].key = newTitle;
    setRemark(tempPairingList);
  };

  const addRow = () => {
    let tempPairingList = JSON.parse(JSON.stringify(remark));
    const newRow = {
      key: 'Free Text Title',
      value: '',
    };
    tempPairingList = [...tempPairingList, newRow];
    setRemark(tempPairingList);
  };

  const removeRow = (index) => {
    let tempPairingList = JSON.parse(JSON.stringify(remark));
    tempPairingList.splice(index, 1);
    setRemark(tempPairingList);
  };

  const setFieldData = (title, value) => {
    if (title == 'Title') {
      setTitle(value);
    }
  };

  const renderRow = (pairing, index) => {
    return (
      <FormRow
        title={pairing.key}
        data={pairing.value}
        setFieldData={setPairingData}
        formEditing={editing}
        titleEditable
        setTitle={editPairingTitle}
        removable
        removeRow={removeRow}
        index={index}
        prefillable
        textField
      />
    );
  };

  const builderMode = true;

  return (
    <>
      <Card title="Reference" style={{ margin: '8px' }}>
        {remark.map((pairing, index) => renderRow(pairing, index))}

        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
          <Button
            className="formButton"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={addRow}
            disabled={!editing}
            style={{ borderRadius: '25px' }}
          >
            Add New Field
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ReferenceSection;
