import { MenuOutlined } from '@ant-design/icons';
import { Col, Row, Space, Button } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { useCallback, useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { PlusCircleOutlined, CopyOutlined } from '@ant-design/icons';

import InputComponent from './InputComponent';

/*
const data = [
  { label: 'label1', value: 'value1' },
  { label: 'label2', value: 'value2' },
  { label: 'label3', value: 'value3' },
];*/

/*const data  = [
  { label: 'New Title', value: '' }
];*/

const DraggableList = ({ editing, dataSource, setDataSource, alphabeticalIndex, alphabeticalIndexUpperCase }) => {
  //const [dataSource, setDataSource] = useState(data);
  // const [alphabeticalIndex, setAlphabeticalIndex] = useState(true);
  // const [alphabeticalIndexUpperCase, setAlphabeticalIndexUpperCase] = useState(true);
  const [width, setWidth] = useState(null);
  console.log(`editing: ${editing}`);

  const dataChangeCallback = useCallback((index, label, value) => {
    console.log(`[${index}] - label: ${label}`);
    console.log(`[${index}] - value: ${value}`);
    let newArr = [...dataSource];
    newArr[index] = { label: label, value: value };
    setDataSource(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(dataSource)}`);
  });

  const itemRemoveCallback = useCallback((index) => {
    console.log(`[${index}] - ${dataSource[index]}`);
    let newArr = [...dataSource];
    newArr.splice(index, 1);
    setDataSource(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(dataSource)}`);
  });

  function convertToAscii(index, uppercase = false) {
    if (uppercase) {
      return String.fromCharCode('A'.charCodeAt(0) + index);
    } else {
      return String.fromCharCode('a'.charCodeAt(0) + index);
    }
  }

  const DragHandle = sortableHandle(() => (
    <span style={{ padding: '0px 8px' }}>
      <MenuOutlined />
    </span>
  ));

  const SortableItem = sortableElement(({ item, sortableIndex }) => {
    console.log(`SortableItem - item: ${item}`);
    return (
      <li
        style={{
          borderRadius: '2px',
          // border: '1px solid #ccc',
          padding: '4px',
          //color: '#999',
          margin: '8px',
          fontSize: '14px',
          // height:"50px",
          verticalAlign: 'middle',
          margin: 'auto',
        }}
      >
        <Row>
          <Col flex="30px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
            <DragHandle />
          </Col>
          <Col flex="30px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
            (
            {alphabeticalIndex
              ? convertToAscii(sortableIndex, alphabeticalIndexUpperCase)
              : sortableIndex + 1}
            )
          </Col>
          <Col flex="auto" style={{ verticalAlign: 'middle', margin: 'auto' }}>
            <InputComponent
              editing={editing}
              label={item.label}
              placeholder={item.placeholder}
              prefilledValue={item.value}
              index={sortableIndex}
              canRemove
              canEditLabel
              changeHandler={dataChangeCallback}
              removeHandler={itemRemoveCallback}
            />
          </Col>
        </Row>
      </li>
    );
  });

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul style={{ padding: '2px', margin: '0px' }}>{children}</ul>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource, oldIndex, newIndex).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      setDataSource(newData);
    }
  };

  const AddHandler = () => {
    setDataSource([...dataSource, { label: 'New Title', value: '' }] )
  }

  return (
    <div className="DNDPanel">
      <div className="pageContainer" style={{ minHeight: '500px' }}>
        <div className="page">
          <SortableContainer onSortEnd={onSortEnd} useDragHandle>
            {dataSource.map((value, index) => {
              //console.log(`index: ${index}`);
              return (
                <SortableItem key={`item-${index}`} index={index} item={value} sortableIndex={index} />
              );
            })}
          </SortableContainer>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
          <Space>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={AddHandler}>
              Add New Field
            </Button>

            <Button type="primary" icon={<CopyOutlined />} onClick={() => {}}>
              Import from Template Library
            </Button>
          </Space>
      </div>
      </div>
    </div>
  );
};

export default DraggableList;
