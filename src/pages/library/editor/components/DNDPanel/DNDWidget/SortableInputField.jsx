import { MenuOutlined, PlusCircleOutlined, CopyOutlined, HolderOutlined } from '@ant-design/icons';
import { Col, Row, Space, Button } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { useCallback, useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import InputComponent from './InputComponent';

var sampleData = [
  { label: 'Submission Master FIlling Ref.:', value: '' },
  { label: 'Specification Reference:', value: '' },
  { label: 'Drawing Reference:', value: '' },
  { label: 'BD Reference:', value: '' },
];

const SortableInputField = ({ sortableIndex, updateRootElement, editing, data, alphabeticalIndex, alphabeticalIndexUpperCase }) => {
  const [dataSource, setDataSource] = useState(sampleData);
  console.log(`editing: ${editing}`);
  console.log(`dataSource: ${JSON.stringify(dataSource)}`);

  const dataChangeCallback = useCallback((index, label, value) => {
    console.log(`[${index}] dataChangeCallback - label: ${label} / value: ${value}`);
    console.log(`[${index}] dataChangeCallback - dataSource: ${JSON.stringify(dataSource)}`);
    let newArr = [...dataSource];
    newArr[index] = { label: label, value: value };
    console.log(`[${index}] dataChangeCallback - newArr: ${JSON.stringify(newArr)}`);
    setDataSource(newArr);
    console.log(`[${index}] dataChangeCallback - dataSource: ${JSON.stringify(dataSource)}`);

    //updateRootElement(sortableIndex, newArr)
  });

  function convertToAscii(index, uppercase = false) {
    if (uppercase) {
      return String.fromCharCode('A'.charCodeAt(0) + index);
    } else {
      return String.fromCharCode('a'.charCodeAt(0) + index);
    }
  }

  const DragHandle = sortableHandle(() => (
      <HolderOutlined />
  ));

  
  const addField = () => {
    let newArr = [...dataSource];
    newArr.push({ label: 'New Label', value: '' })
    setDataSource(newArr);
    //updateRootElement(sortableIndex, newArr)
  };
  
  const deleteField = (index) => {
    console.log(`deleteField - index: ${index}`)
    let newArr = [...dataSource];
    newArr.splice(index, 1);
    setDataSource(newArr);
    //updateRootElement(sortableIndex, newArr)
  };

  const SortableItem = sortableElement(({ item, sortableIndex, deleteField }) => {
    // console.log(`SortableItem - item: ${JSON.stringify(item)}`);
    // console.log(`SortableItem - sortableIndex: ${sortableIndex}`);
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
            <span style={{ padding: '0px 8px' }}>
              {(editing) ? (<DragHandle />) : (<HolderOutlined />)}
            </span>
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
              deleteHandler={deleteField}
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

      //updateRootElement(sortableIndex, newData)

    }
  };

  return (
    <div>
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {dataSource.map((value, index) => {
          //console.log(`index: ${index}`);
          return (
            <SortableItem key={`item-${index}`} index={index} item={value} sortableIndex={index} deleteField={deleteField} />
          );
        })}
      </SortableContainer>

      
      <div style={{display: 'flex', justifyContent: 'center', padding: '4px'}}>
            <Space>
                <Button
                type="primary"
                icon={<PlusCircleOutlined/>}
                onClick={addField}
                disabled={!editing}
                style={{borderRadius: '25px'}}
                >
                    Add New Field
                </Button>

                <Button
                type="primary"
                icon={<CopyOutlined />}
                onClick={()=>{}}
                disabled={!editing}
                style={{borderRadius: '25px'}}
                >
                    Import from Template Library
                </Button>
            </Space>
        </div>
    </div>
  );
};

export default SortableInputField;
