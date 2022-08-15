import { Card, Input } from 'antd';

const { TextArea } = Input;

import { useState } from 'react';
import FormRadio from './FormRadio';
import FormRow from './FormRow';

const { Meta } = Card;

const FutureReplySection = ({ editing }) => {
  const [pairingList, setPairingList] = useState([
    { key: 'Comment', value: '' },
    { key: 'Signature', value: '' },
    { key: 'Name', value: '' },
    { key: 'Date', value: '' },
  ]);
  const [reply, setReply] = useState('');
  const [replyOptions, setReplyOptions] = useState([
    'Acceptance',
    'Acceptance with Comments',
    'Rejected',
  ]);
  const [tempPairingList, setTempPairingList] = useState([
    { key: 'Comment', value: '' },
    { key: 'Signature', value: '' },
    { key: 'Name', value: '' },
    { key: 'Date', value: '' },
  ]);
  const [tempReply, setTempReply] = useState('');
  const [tempReplyOptions, setTempReplyOptions] = useState([
    'Acceptance',
    'Acceptance with Comments',
    'Rejected',
  ]);

  const builderMode = true;

  const changeTitle = (index, newTitle) => {
    let tempPairingLists = JSON.parse(JSON.stringify(tempPairingList));
    tempPairingLists[index].key = newTitle;
    setTempPairingList(tempPairingLists);
  };

  const setPairingData = (title, value) => {
    let tempPairingLists = JSON.parse(JSON.stringify(tempPairingList));
    const pairingIndex = tempPairingLists.findIndex((obj) => obj.key === title);
    tempPairingLists[pairingIndex].value = value;
    setTempPairingList(tempPairingLists);
  };

  // useEffect(() => {
  //   const data = { pairing: pairingList, reply: reply, replyOptions: replyOptions, signiture: "", name: "", date: "" }
  //   const setData = props.section.setData
  //   setFutureReplyData({...data});
  //   setData(data);
  // }, [reply, pairingList, replyOptions])

  return (
    <>
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
          options={tempReplyOptions}
          setOptions={setTempReplyOptions}
          optionsEditable
          choice={tempReply}
          setChoice={setTempReply}
        />
        {tempPairingList.map((rows, i) => {
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
        })}
      </Card>
    </>
  );
};

export default FutureReplySection;
