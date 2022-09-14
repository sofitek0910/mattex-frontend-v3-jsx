import { Col, Row, Space, Button, Input } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { useCallback, useState, useRef, useEffect } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { PlusCircleOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { STRUCTURE_TYPE } from '../blockTypeDefinition';
import FreeTextInput from './FreeTextInput';

const DraggableList = ({ editing, dataSource, setDataSource }) => {
  //const [dataSource, setDataSource] = useState(data);
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   console.log(`inputRef: ${inputRef}`);
  // },[inputRef])

  const dataChangeCallback = useCallback((index, val) => {
    //const dataChangeHandler = (index, value) => {

    let value = val;
    console.log("value === '　'", value === '　');
    if (value === '　') {
      value = '';
    }
    console.log(`[${index}] - value: ${value}`);
    let newArr = [...dataSource];
    newArr[index] = value;
    setDataSource(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(dataSource)}`);
  });

  const itemRemoveHandler = (index) => {
    console.log(`[${index}] - ${dataSource[index]}`);
    let newArr = [...dataSource];
    newArr.splice(index, 1);
    setDataSource(newArr);
    console.log(`[${index}] - dataSource: ${JSON.stringify(dataSource)}`);
  };

  const DragHandle = sortableHandle(() => (
    <span style={{ padding: '0px 8px', cursor: 'grab' }}>
      <HolderOutlined />
    </span>
  ));

  const SortableItem = sortableElement(({ item, sortableIndex }) => {
    console.log(`SortableItem - item: ${item}`);
    console.log(`item in STRUCTURE_TYPE: ${item in STRUCTURE_TYPE}`);

    return (
      <div
        style={{
          margin: '6px 4px',
          borderRadius: '4px',
          height: '50px',
          width: '100%',
          padding: '8px 0',
          background: item in STRUCTURE_TYPE ? STRUCTURE_TYPE[item].color : '#FDF6F0',
        }}
      >
        <Row>
          <Col flex="30px" style={{ top: '-4px', margin: 'auto' }}>
            <DragHandle />
          </Col>
          <Col flex="auto" style={{ top: '-5px', textAlign: 'left', padding: '0 16px' }}>
            {item in STRUCTURE_TYPE ? (
              <>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {STRUCTURE_TYPE[item].title}
                </div>
                <div style={{ fontSize: '12px' }}>{STRUCTURE_TYPE[item].description}</div>
              </>
            ) : (
              <FreeTextInput
                item={item === '　' ? '' : item}
                index={sortableIndex}
                changeHandler={dataChangeCallback}
              />
            )}
          </Col>
          <Col
            flex="50px"
            style={{
              fontSize: '24px',
              padding: '0px',
              top: '-3px',
              position: 'relative',
            }}
          >
            <DeleteOutlined
              style={{ color: 'red' }}
              onClick={() => {
                itemRemoveHandler(sortableIndex);
              }}
            />
          </Col>
        </Row>
      </div>
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
    setDataSource([...dataSource, { label: 'New Title', value: '' }]);
  };

  return (
    <div className="DNDPanel">
      <div className="pageContainer" style={{ minHeight: '500px' }}>
        <div className="page">
          <SortableContainer onSortEnd={onSortEnd} useDragHandle>
            {dataSource.map((value, index) => {
              //console.log(`index: ${index}`);
              return (
                <SortableItem
                  key={`item-${index}`}
                  index={index}
                  item={value}
                  sortableIndex={index}
                />
              );
            })}
          </SortableContainer>
        </div>
      </div>
    </div>
  );
};

export default DraggableList;
