import { Card, Input, Col, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;

import { useState } from 'react';
import FormRadio from './FormRadio';
import FormRow from './FormRow';

const { Meta } = Card;

const FutureReplySection = ({ 
  sortableIndex, 
  editing, 
  data, 
  rootDataSource, 
  setRootDataSource,
  editHandler,
  deleteHandler,
  cancelHandler, 
  setFutureReply
 }) => {
  const [freeText, setFreeText] = useState(data.freeText)
  const [reply, setReply] = useState(data.reply)
  const [replyOptions, setReplyOptions] = useState(data.replyOptions);
  const [signature, setSignature] = useState(data.signature);
  const [name, setName] = useState(data.name);
  const [date, setDate] = useState (data.date);

  const builderMode = true;

  const confirmHandler = (index) => {
    console.log('(newSection)rootDataSource: ',rootDataSource)
    //console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data.payload = {
      "freeText":freeText,
      "reply": reply,
      "replyOptions": replyOptions,
      "signature": signature,
      "name": name,
      "date": date
    }
    delete newArr[index].originalData;
    setRootDataSource(newArr);
    setFutureReply(newArr[index].data.payload)
  };

  const changeTitle = (index, newTitle) => {
    let tempPairingLists = JSON.parse(JSON.stringify(freeText));
    tempPairingLists.key = newTitle;
    setFreeText(tempPairingLists);
  };

  const setPairingData = (title, value) => {
    let tempPairingLists = JSON.parse(JSON.stringify(freeText));
    const pairingIndex = tempPairingLists.findIndex((obj) => obj.key === title);
    tempPairingLists[pairingIndex].value = value;
    setFreeText(tempPairingLists);
  };

  // useEffect(() => {
  //   const data = { pairing: pairingList, reply: reply, replyOptions: replyOptions, signiture: "", name: "", date: "" }
  //   const setData = props.section.setData
  //   setFutureReplyData({...data});
  //   setData(data);
  // }, [reply, pairingList, replyOptions])

  return (
    <>
    <Col flex="auto" style={{ maxWidth: '80%' }}>
      <Card
        title={
          <Meta
            title="Future Reply"
            description="The Below Section will Appear if Yes is Toggled during Submissions"
          />
        }
        style={{ margin: '8px' }}
      >
        <FormRadio
          builderMode
          mandatory
          formEditing={editing}
          title="Reply"
          options={replyOptions}
          setOptions={setReplyOptions}
          maxOptions={6}
          optionsEditable
          choice={reply}
          setChoice={setReply}
        />

        <FormRow
          builderMode
          formEditing={editing}
          title={freeText.key}
          titleEditable
          textField
          setTitle={changeTitle}
          data={freeText.value}
          setFieldData={setPairingData}
        />

        <FormRow
          builderMode
          mandatory
          formEditing={editing}
          title={'Signature'}
          data={signature}
        />

        <FormRow
          builderMode
          mandatory
          formEditing={editing}
          title={'Name'}
          data={name}
        />

        <FormRow
          builderMode
          mandatory
          formEditing={editing}
          title={'Date'}
          data={date}
        />


        {/*tempPairingList.map((rows, i) => {
          return (
            <FormRow
              key={i}
              builderMode
              mandatory={rows.key !== 'Comment'}
              formEditing={editing}
              title={rows.key}
              titleEditable={rows.key === 'Comment'}
              textField={rows.key === 'Comment'}
              setTitle={changeTitle}
              data={rows.value}
              setFieldData={setPairingData}
              index={i}
              prefillable
            />
          );
        })*/}
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

export default FutureReplySection;
