import { Card, Input, Col, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { TextArea } = Input;

import { useState } from 'react';
import FormDate from './FormDate';
import FormRadio from './FormRadio';
import FormRow from './FormRow';

const AboutThisSubmissionSection = ({
  sortableIndex,
  editing,
  data,
  rootDataSource,
  setRootDataSource,
  editHandler,
  deleteHandler,
  cancelHandler,
  setAboutThisSubmission,
}) => {
  const [remarks, setRemarks] = useState(data.remarks);
  const [purposeOption, setPurposeOption] = useState(data.purposeOption);
  const [purposeOfSubmission, setPurposeOfSubmission] = useState(data.purposeOfSubmission);
  const [anticipatedDate, setAnticipatedDate] = useState(data.anticipatedDate);
  const [recordFutureReply, setRecordFutureReply] = useState(data.recordFutureReply);

  const builderMode = true;

  const confirmHandler = (index) => {
    console.log('(newSection)rootDataSource: ', rootDataSource);
    //console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data.payload = {
      remarks: remarks,
      purposeOption: purposeOption,
      purposeOfSubmission: purposeOfSubmission,
      anticipatedDate: anticipatedDate,
      recordFutureReply: recordFutureReply,
    };
    delete newArr[index].originalData;
    setRootDataSource(newArr);
    setAboutThisSubmission(newArr[index].data.payload);
  };

  const setFieldData = (title, value) => {
    if (title === 'Remarks') {
      setRemarks(value);
    }
  };

  return (
    <>
      <Col flex="auto" style={{ maxWidth: '80%' }}>
        <Card className="sectionCard" title="About This Submission" style={{ margin: '8px' }}>
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
            maxOptions={6}
            optionsEditable
            //choice={purposeOfSubmission}
            //setChoice={setPurposeOfSubmission}
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
            //choice={recordFutureReply}
            //setChoice={setRecordFutureReply}
          />
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
    </>
  );
};

export default AboutThisSubmissionSection;
