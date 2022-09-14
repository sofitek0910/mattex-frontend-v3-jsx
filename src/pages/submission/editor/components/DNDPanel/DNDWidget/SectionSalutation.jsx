import { Card, Input, Col, Button, Tooltip } from 'antd';
const { TextArea } = Input;

import { useState, useEffect } from 'react';
import FormRow from './FormRow';

import { EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

const SalutationSection = ({
  sortableIndex,
  editing,
  data,
  rootDataSource,
  setRootDataSource,
  editHandler,
  deleteHandler,
  cancelHandler,
  setSalutationSection,
}) => {
  const [to, setTo] = useState(data.to);
  const [attn, setAttn] = useState(data.attn);
  const [attnVisible, setAttnVisible] = useState(data.attnVisible);

  /*const [to, setTo] = useState(rootDataSource[sortableIndex].data.payload.to);
  const [attn, setAttn] = useState(rootDataSource[sortableIndex].data.payload.attn);
  const [attnVisible, setAttnVisible] = useState(rootDataSource[sortableIndex].data.payload.attnVisible);
  */

  /*useEffect(() => {
    updateRootElement(sortableIndex, {
      'to': to,
      'attn': attn,
      'attnVisible': attnVisible
    })
  },[to, attn, attnVisible])*/

  const confirmHandler = (index) => {
    console.log('(newSection)rootDataSource: ', rootDataSource);
    //console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data.payload = {
      to: to,
      attn: attn,
      attnVisible: attnVisible,
    };
    delete newArr[index].originalData;
    setRootDataSource(newArr);
    setSalutationSection(newArr[index].data.payload);
  };

  const setFieldData = (title, value) => {
    if (title == 'To') {
      setTo(value);
    } else if (title == 'Attn.') {
      setAttn(value);
    }
  };

  return (
    <>
      <Col flex="auto" style={{ maxWidth: '80%' }}>
        <Card className="sectionCard" title="Salutation" style={{ margin: '8px' }}>
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
      </Col>
      <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
        {editing ? (
          <>
            <Tooltip title="Save Change(s)">
              <Button
                type="primary"
                style={{ margin: '4px' }}
                icon={<CheckOutlined />}
                onClick={() => confirmHandler(sortableIndex)}
                size="small"
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Cancel Change(s)">
              <Button
                style={{ margin: '4px' }}
                icon={<CloseOutlined />}
                onClick={() => cancelHandler(sortableIndex)}
                size="small"
              />
            </Tooltip>
          </>
        ) : (
          <>
            <Button
              style={{ margin: '4px' }}
              icon={<EditOutlined />}
              onClick={() => editHandler(sortableIndex)}
              size="small"
            />
            <Button
              style={{ margin: '4px' }}
              icon={<DeleteOutlined />}
              onClick={() => deleteHandler(sortableIndex)}
              size="small"
            />
          </>
        )}
      </Col>
      {/*
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
      */}
    </>
  );
};

export default SalutationSection;
