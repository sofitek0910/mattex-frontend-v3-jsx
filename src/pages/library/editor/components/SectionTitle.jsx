import { Button, Card, Col, Input, Option, Row, Select } from 'antd';

import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
const { TextArea } = Input;

import { useState } from 'react';
import FormRow from './FormRow';

const TitleSection = ({ editing }) => {
  const [title, setTitle] = useState('');
  const [projectLevelId, setProjectLevelId] = useState('');
  const [remark, setRemark] = useState([{ key: 'Free Text Title', value: '' }]);

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
      <Card title="Title" style={{ margin: '8px' }}>
        <FormRow
          title="Title"
          data={title}
          //setData={setTo}
          setFieldData={setFieldData}
          formEditing={editing}
          builderMode={builderMode}
          mandatory
        />

        <Input.Group
          compact
          style={{ borderRadius: '3px 3px 3px 3px', backgroundColor: '#EAF4FF' }}
        >
          {/**label side */}
          <div
            style={{
              //width: getTitleWidth(),
              width: !builderMode ? '26%' : '30%',
              backgroundColor: '#EAF4FF',
              height: '100%',
              padding: '6px 12px',
              borderRadius: '3px 0 0 3px',
            }}
          >
            Submission Ref. No.:
          </div>
          {
            //* that indicate mandatory
            !builderMode ? (
              <div
                style={{
                  width: '4.2%',
                  backgroundColor: '#EAF4FF',
                  height: '80px',
                }}
              >
                *
              </div>
            ) : (
              ''
            )
          }

          {/**data side */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '70%',
              height: '100%',
              padding: '6px 12px',
              borderRadius: '0 3px 3px 0',
              border: '2px solid #EAF4FF',
            }}
          >
            {/**label row*/}
            <Row>
              <Col span={9}>
                <div style={{ fontSize: '10px' }}>Project Level Identification</div>
              </Col>
              <Col span={7}>
                <div style={{ fontSize: '10px' }}>Type of Submission</div>
              </Col>
              <Col span={6}>
                <div style={{ fontSize: '10px' }}>No. of Submission</div>
              </Col>
              <Col span={2}>
                <div style={{ fontSize: '10px' }}>Rev</div>
              </Col>
            </Row>

            {/**data filling row*/}
            <Row>
              <Col span={8}>
                <Input
                  size="small"
                  placeholder={builderMode ? '---' : ''}
                  disabled={!editing}
                  value={projectLevelId}
                  onChange={(e) => {
                    setProjectLevelId(e.target.value);
                  }}
                />
              </Col>
              <Col span={1}>
                <div
                  style={{
                    fontSize: '10px',
                    textAlign: 'center',
                    padding: '2px 0',
                  }}
                >
                  -
                </div>
              </Col>

              <Col span={6}>
                <Select size="small" disabled={builderMode} style={{ width: '90px' }}>
                  <Option value="mat">MAT</Option>
                </Select>
              </Col>
              <Col span={1}>
                <div
                  style={{
                    fontSize: '10px',
                    textAlign: 'center',
                    padding: '2px 0',
                  }}
                >
                  -
                </div>
              </Col>

              <Col span={4}>
                <Input size="small" placeholder={builderMode ? '---' : ''} disabled={builderMode} />
              </Col>
              <Col span={1}>
                <Button
                  icon={<ReloadOutlined />}
                  type="primary"
                  onClick={() => {}}
                  disabled={builderMode}
                  size="small"
                  style={{ padding: '4px' }}
                ></Button>
              </Col>
              <Col span={1}></Col>

              <Col span={2}>
                <Input
                  placeholder={builderMode ? '---' : ''}
                  disabled={builderMode}
                  size="small"
                  //value={projectLevelId}
                  //onChange={(e) => {setProjectLevelId( e.target.value)}}
                />
              </Col>
            </Row>
          </div>
        </Input.Group>

        {/*******remark(free text)***** */}
        {remark.map((pairing, index) => renderRow(pairing, index))}

        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
          <Button
            className="formButton"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={addRow}
            disabled={!editing || remark.length >= 3}
            style={{ borderRadius: '25px' }}
          >
            Add Free Text Field {remark.length}/3
          </Button>
        </div>
      </Card>
    </>
  );
};

export default TitleSection;
