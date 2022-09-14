import { arrayMoveImmutable } from 'array-move';
import { useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { MenuOutlined } from '@ant-design/icons';

const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

const DraggableList = ({ editing }) => {
  const [dataSource, setDataSource] = useState(data);
  console.log(`editing: ${editing}`);

  const DragHandle = sortableHandle(() => (
    <span style={{ padding: '0px 8px' }}>
      <MenuOutlined />
    </span>
  ));

  const SortableItem = sortableElement(({ item }) => {
    console.log(`SortableItem - item: ${item}`);
    return (
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
        <DragHandle />
        {item}
      </li>
    );
  });

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
      const newData = arrayMoveImmutable(dataSource, oldIndex, newIndex).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      setDataSource(newData);
    }
  };

  return (
    <div>
      {editing ? <div>{'AAA'}</div> : <div>{'BBB'}</div>}
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {dataSource.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} item={value} />
        ))}
      </SortableContainer>
    </div>
  );
};

export default DraggableList;
