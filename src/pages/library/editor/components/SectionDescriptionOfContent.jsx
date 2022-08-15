import { Button, Card, Checkbox, Form, Input, Select, Space } from 'antd';

import { CopyOutlined, MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Meta } = Card;
const { Option } = Select;

import { arrayMoveImmutable } from 'array-move';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { useState } from 'react';
import InputComponent from './InputComponent';

const SectionDescriptionOfContent = ({ editing }) => {
  const [pairingList, setPairingList] = useState([{ key: 'Free Text Title', value: '' }]);
  const [listingStyle, setListingStyle] = useState('alphabet');
  const [showTopFreeText, setShowTopFreeText] = useState(true);
  const [topFreeText, setTopFreeText] = useState('');
  const [showBottomFreeText, setShowBottomFreeText] = useState(false);
  const [bottomFreeText, setBottomFreeText] = useState('');

  const builderMode = true;

  /*******fuctions rows data****** */
  const setPairingData = (title, value) => {
    let tempPairingList = JSON.parse(JSON.stringify(pairingList));
    const pairingIndex = tempPairingList.findIndex((obj) => obj.key == title);
    tempPairingList[pairingIndex].value = value;
    setPairingList(tempPairingList);
  };

  const editPairingTitle = (index, newTitle) => {
    let tempPairingList = JSON.parse(JSON.stringify(pairingList));
    tempPairingList[index].key = newTitle;
    setPairingList(tempPairingList);
  };

  /*******fuctions for rows****** */
  const moveRow = (dragIndex, hoverIndex) => {
    setPairingList((prevOrder) =>
      update(prevOrder, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevOrder[dragIndex]],
        ],
      }),
    );
  };

  const addRow = () => {
    let tempPairingList = JSON.parse(JSON.stringify(pairingList));
    const newRow = {
      key: 'Free Text Title',
      value: '',
    };
    tempPairingList = [...tempPairingList, newRow];
    setPairingList(tempPairingList);
  };

  const removeRow = (index) => {
    let tempPairingList = JSON.parse(JSON.stringify(pairingList));
    tempPairingList.splice(index, 1);
    setPairingList(tempPairingList);
  };
  console.log(`pairingList: ${JSON.stringify(pairingList)}`);

  // const renderRow = (pairing, index) => {
  //   return (<FormRow
  //           title={pairing.key}
  //           data={pairing.value}
  //           setFieldData={setPairingData}
  //           formEditing={editing}
  //           titleEditable
  //           setTitle={editPairingTitle}
  //           removable
  //           removeRow={removeRow}
  //           draggable
  //           moveRow={moveRow}
  //           listingStyle={listingStyle}
  //           index={index}
  //           builderMode={builderMode}
  //           prefillable
  //       />)
  // }

  const DragHandle = sortableHandle(() => (
    <span style={{ padding: '0px 8px', width: '50px' }}>
      <MenuOutlined />
    </span>
  ));

  const SortableItem = sortableElement(({ value }) => (
    <li
      style={{
        borderRadius: '2px',
        border: '1px solid #ccc',
        padding: '4px',
        //color: '#999',
        margin: '8px',
        fontSize: '14px',
      }}
    >
      <Form layout="inline">
        <Form.Item style={{ margin: '0px' }}>
          <DragHandle />
        </Form.Item>
        <Form.Item style={{ margin: '0px', width: '95%' }}>
          {/* <FormRow 
                title={value.key}
                data={value.value}
                setFieldData={setPairingData}
                formEditing={editing}
                titleEditable
                setTitle={editPairingTitle}
                removable
                removeRow={removeRow}
                draggable
                moveRow={moveRow}
                listingStyle={listingStyle}
                // index={index}
                builderMode={builderMode}
                prefillable
                
          /> */}
          <InputComponent editing={editing} label={value.key} value={value.value} />
        </Form.Item>
      </Form>
    </li>
  ));

  const SortableContainer = sortableContainer(({ children }) => {
    return (
      <ul
        style={{
          padding: '2px',
        }}
      >
        {children}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(pairingList, oldIndex, newIndex).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      setPairingList(newData);
    }
  };

  return (
    <>
      <Card
        title={
          <Meta
            title="Description of Contents"
            description="This is the description of description of contents"
          />
        }
        style={{ margin: '8px' }}
        extra={
          <Select
            value={listingStyle}
            style={{ width: 120 }}
            disabled={!editing}
            //setListingStyle( e.target.value)
            onChange={(value) => {
              setListingStyle(value);
            }}
          >
            <Option value="alphabet">(a) (b) (c)...</Option>
            <Option value="number">(1) (2) (3)...</Option>
            <Option value="none">none</Option>
          </Select>
        }
      >
        <div>
          <Checkbox
            checked={showTopFreeText}
            disabled={!editing}
            onChange={(e) => {
              setShowTopFreeText(e.target.checked);
            }}
          >
            Show Free Text Field on Top
          </Checkbox>
          {showTopFreeText ? (
            <TextArea
              rows={2}
              disabled={!editing}
              placeholder="Type here..."
              value={topFreeText}
              onChange={(e) => {
                setTopFreeText(e.target.value);
              }}
            />
          ) : (
            ''
          )}
        </div>

        <div>
          {/* {pairingList.map((pairing, index) => renderRow(pairing, index))} */}

          <SortableContainer onSortEnd={onSortEnd} useDragHandle>
            {pairingList.map((pairing, index) => (
              <SortableItem key={`item-${index}`} index={index} value={pairing} />
            ))}
          </SortableContainer>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
            <Space>
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

              <Button
                className="formButton"
                type="primary"
                icon={<CopyOutlined />}
                onClick={() => {}}
                disabled={!editing}
                style={{ borderRadius: '25px' }}
              >
                Import from Template Library
              </Button>
            </Space>
          </div>
        </div>

        <div>
          <Checkbox
            checked={showBottomFreeText}
            disabled={!editing}
            onChange={(e) => {
              setShowBottomFreeText(e.target.checked);
            }}
          >
            Show Free Text Field on Bottom
          </Checkbox>
          {showBottomFreeText ? (
            <TextArea
              rows={2}
              disabled={!editing}
              placeholder="Type here..."
              value={bottomFreeText}
              onChange={(e) => {
                setBottomFreeText(e.target.value);
              }}
            />
          ) : (
            ''
          )}
        </div>
      </Card>
    </>
  );
};

export default SectionDescriptionOfContent;
