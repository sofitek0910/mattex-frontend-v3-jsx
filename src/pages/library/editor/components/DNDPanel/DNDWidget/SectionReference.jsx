import { Button, Card, Input, Col, Form, Tooltip } from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import { useCallback, useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import InputComponent from './InputComponent';
import FormRow from './FormRow';
const { TextArea } = Input;

const ReferenceSection = ({
  sortableIndex,
  editing,
  data,
  rootDataSource,
  setRootDataSource,
  editHandler,
  deleteHandler,
  cancelHandler,
  setReferenceSection,
}) => {
  const [reference, setReference] = useState(data.reference);

  const confirmHandler = (index) => {
    console.log('(newSection)rootDataSource: ', rootDataSource);
    //console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data.payload = {
      reference: reference,
    };
    delete newArr[index].originalData;
    setRootDataSource(newArr);
    setReferenceSection(newArr[index].data.payload);
  };

  const dataChangeCallback = useCallback((index, label, value) => {
    console.log(`[${index}] - label: ${label}`);
    console.log(`[${index}] - value: ${value}`);
    let newArr = [...reference];
    newArr[index] = { key: label, value: value };
    setReference(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(reference)}`);
  });

  const itemRemoveCallback = useCallback((index) => {
    console.log(`[${index}] - ${reference[index]}`);
    let newArr = [...reference];
    console.log(newArr);
    newArr.splice(index, 1);
    setReference(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(reference)}`);
  });

  const dataEditCallback = useCallback((title, value) => {
    console.log('(newSection)title, value', title, value);
    let tempPairingList = JSON.parse(JSON.stringify(reference));
    const pairingIndex = tempPairingList.findIndex((obj) => obj.key == title);
    tempPairingList[pairingIndex].value = value;
    //tempPairingList[index].value = value;
    setReference(tempPairingList);
  });

  const titleEditCallback = useCallback((index, newTitle) => {
    //let tempPairingList = JSON.parse(JSON.stringify(reference));
    //tempPairingList[index].key = newTitle;
    let newArr = [...reference];
    newArr[index].key = newTitle;
    setReference(newArr);
  });

  const addRow = () => {
    let tempPairingList = JSON.parse(JSON.stringify(reference));
    const newRow = {
      key: 'Free Text Title',
      value: '',
    };
    tempPairingList = [...tempPairingList, newRow];
    setReference(tempPairingList);
  };

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
          {/*<FormRow 
                title={value.key}
                data={value.value}
                setFieldData={setPairingData}
                formEditing={editing}
                titleEditable
                setTitle={editPairingTitle}
                removable
                removeRow={removeRow}
                //draggable
                //moveRow={moveRow}
                //listingStyle={listingStyle}
                // index={index}
                builderMode={builderMode}
                textField
                prefillable
                
          /> */}
          <InputComponent
            editing={editing}
            label={value.pairing.key}
            //placeholder={item.placeholder}
            prefilledValue={value.pairing.value}
            index={value.index}
            canRemove
            canEditLabel
            changeHandler={dataChangeCallback}
            removeHandler={itemRemoveCallback}
            labelEditHandler={titleEditCallback}
            disabled //reference is not prefillable in template
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

  const removeRow = (index) => {
    let tempPairingList = JSON.parse(JSON.stringify(reference));
    tempPairingList.splice(index, 1);
    setReference(tempPairingList);
  };

  const renderRow = (pairing, index) => {
    return (
      <FormRow
        title={pairing.key}
        data={pairing.value}
        setFieldData={dataEditCallback}
        formEditing={editing}
        titleEditable
        setTitle={editPairingTitle}
        removable
        removeRow={removeRow}
        index={index}
        prefillable
        textField
        builderMode
      />
    );
  };

  const builderMode = true;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(reference, oldIndex, newIndex).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      setReference(newData);
    }
  };

  const shouldCancelStart = (e) => {
    console.log('document.activeElement:',document.activeElement)
    //return (document.activeElement.nodeName === 'INPUT')
    return (document.activeElement.className.includes('dndInput'))  //self-defined classname of inputbox in InputComponent
  }

  return (
    <>
      <Col flex="auto" style={{ maxWidth: '80%' }}>
        <Card className="sectionCard" title="Reference" style={{ margin: '8px' }}>
          {/*reference.map((pairing, index) => renderRow(pairing, index))*/}
          <SortableContainer onSortEnd={onSortEnd} shouldCancelStart={shouldCancelStart} useDragHandle>
            {reference.map((pairing, index) => (
              <SortableItem
                key={`item-${index}`}
                index={index}
                value={{ index: index, pairing: pairing }}
              />
            ))}
          </SortableContainer>

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

export default ReferenceSection;
