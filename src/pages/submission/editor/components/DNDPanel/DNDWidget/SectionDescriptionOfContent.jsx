import { Button, Card, Checkbox, Form, Input, Select, Space, Col, Tooltip } from 'antd';

import {
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  HolderOutlined,
} from '@ant-design/icons';
const { TextArea } = Input;
const { Meta } = Card;
const { Option } = Select;

import { arrayMoveImmutable } from 'array-move';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { useState, useCallback, useEffect } from 'react';
import InputComponent from './InputComponent';
import SpecSetImportPopup from './SpecSetImportPopup';

const SectionDescriptionOfContent = ({
  sortableIndex,
  editing,
  data,
  rootDataSource,
  setRootDataSource,
  editHandler,
  deleteHandler,
  cancelHandler,
  setDescriptionOfContent,
}) => {
  const [pairingList, setPairingList] = useState(data.pairingList);
  const [listingStyle, setListingStyle] = useState(data.listingStyle);
  const [showTopFreeText, setShowTopFreeText] = useState(data.showTopFreeText);
  const [topFreeText, setTopFreeText] = useState(data.topFreeText);
  const [showBottomFreeText, setShowBottomFreeText] = useState(data.showBottomFreeText);
  const [bottomFreeText, setBottomFreeText] = useState(data.bottomFreeText);
  const [specSetImportPopupShow, setSpecSetImportPopupShow] = useState(false);
  const [focusing, setFocusing] = useState(false);

  useEffect(() => {
    console.log('focusing', focusing);
  }, [focusing]);

  const builderMode = true;

  const confirmHandler = (index) => {
    console.log('(newSection)rootDataSource: ', rootDataSource);
    //console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data.payload = {
      pairingList: pairingList,
      listingStyle: listingStyle,
      showTopFreeText: showTopFreeText,
      topFreeText: topFreeText,
      showBottomFreeText: showBottomFreeText,
      bottomFreeText: bottomFreeText,
    };
    delete newArr[index].originalData;
    setRootDataSource(newArr);
    setDescriptionOfContent(newArr[index].data.payload);
  };

  /*******fuctions rows data****** */
  const dataChangeCallback = useCallback((index, label, value) => {
    console.log(`[${index}] - label: ${label}`);
    console.log(`[${index}] - value: ${value}`);
    let newArr = [...pairingList];
    newArr[index] = { key: label, value: value };
    setPairingList(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(pairingList)}`);
  });

  const itemRemoveCallback = useCallback((index) => {
    console.log(`[${index}] - ${pairingList[index]}`);
    let newArr = [...pairingList];
    console.log(newArr);
    newArr.splice(index, 1);
    setPairingList(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(pairingList)}`);
  });

  const dataEditCallback = useCallback((title, value) => {
    console.log('(newSection)title, value', title, value);
    let tempPairingList = JSON.parse(JSON.stringify(pairingList));
    const pairingIndex = tempPairingList.findIndex((obj) => obj.key == title);
    tempPairingList[pairingIndex].value = value;
    //tempPairingList[index].value = value;
    setPairingList(tempPairingList);
  });

  const titleEditCallback = useCallback((index, newTitle) => {
    let newArr = [...pairingList];
    newArr[index].key = newTitle;
    setPairingList(newArr);
  });

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
      <HolderOutlined />
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
        {editing ? (
          <Form.Item style={{ margin: '0px' }}>
            <DragHandle />
          </Form.Item>
        ) : (
          <></>
        )}
        <Form.Item
          style={editing ? { margin: '0px', width: '95%' } : { margin: '0px', width: '100%' }}
        >
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

          {/*********
           *
           * Error occur when user is editing the input field (focusing on it)
           * then drag the handle (do the reordering)
           * (InputComponent set pairing list by onBlur, so the app crash when blur and reorder
           * happen at the same time)
           * Now added useState focusing and disable sortableItem (sortableElement) when focusing=true
           * but this make the flow not so smooth
           *
           * ******* */}
          <InputComponent
            editing={editing}
            label={value.pairing.key}
            placeholder="Prefill Text Here..."
            prefilledValue={value.pairing.value}
            index={value.index}
            canRemove
            canEditLabel
            changeHandler={dataChangeCallback}
            removeHandler={itemRemoveCallback}
            labelEditHandler={titleEditCallback}
            listingStyle={listingStyle}
            setFocusing={setFocusing}
          />
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
      <Col flex="auto" style={{ maxWidth: '80%' }}>
        <Card
          className="sectionCard"
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
                <SortableItem
                  key={`item-${index}`}
                  index={index}
                  value={{ index: index, pairing: pairing }}
                  disabled={focusing}
                />
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
                  onClick={() => {
                    setSpecSetImportPopupShow(true);
                  }}
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

      <SpecSetImportPopup
        isModalVisible={specSetImportPopupShow}
        setIsModalVisible={setSpecSetImportPopupShow}
        setSpecSet={setPairingList}
      />
    </>
  );
};

export default SectionDescriptionOfContent;
