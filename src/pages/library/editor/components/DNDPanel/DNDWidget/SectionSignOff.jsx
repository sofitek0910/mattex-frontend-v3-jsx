import { Card, Input, Col, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;

import { useEffect, useState } from 'react';
import FormRow from './FormRow';
import FormSwitch from './FormSwitch';
import SignOffBlock from './SignOffBlock'; 

const SectionSignOff = ({ 
  sortableIndex, 
  editing, 
  data, 
  rootDataSource, 
  setRootDataSource,
  editHandler,
  deleteHandler,
  cancelHandler, 
  setSignOff
}) => {
  const [showSubmitter, setShowSubmitter] = useState(data.showSubmitter);
  const [idVisible, setIdVisible] = useState(data.idVisible);
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

  const confirmHandler = (index) => {
    console.log('(newSection)rootDataSource: ',rootDataSource)
    //console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data.payload = {
      "showSubmitter": showSubmitter,
      "idVisible": idVisible,
    }
    delete newArr[index].originalData;
    setRootDataSource(newArr);
    setSignOff(newArr[index].data.payload)
  };

  return (
    <>
    <Col flex="auto" style={{ maxWidth: '80%' }}>
      <Card className='sectionCard' title="Sign Offs" style={{ margin: '8px' }}>
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
    </Col> 
    <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
        {editing ? (
          <>
            <Tooltip title="Save Change(s)">
              <Button type="primary" style={{ margin: '4px' }} icon={<CheckOutlined />} onClick={() => confirmHandler(sortableIndex)} size="small" />
            </Tooltip>
            <Tooltip placement="bottom" title="Cancel Change(s)">
              <Button style={{ margin: '4px' }} icon={<CloseOutlined />} onClick={() => cancelHandler(sortableIndex)} size="small" />
            </Tooltip>
          </>
        ) : (
          <>
            <Button style={{ margin: '4px' }} icon={<EditOutlined/>} onClick={() => editHandler(sortableIndex)} size="small" />
            <Button style={{ margin: '4px' }} icon={<DeleteOutlined />} onClick={() => deleteHandler(sortableIndex)} size="small" />
          </>
        )}
    </Col>
    </>
  );
};

export default SectionSignOff;
