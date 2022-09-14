import { useState, useEffect, useRef } from 'react';
import { Typography, Input, Space } from 'antd';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;

const FreeTextInput = ({ item, index, changeHandler }) => {
  const [editableStr, setEditableStr] = useState(item);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const checkHandlder = () => {
    if (editableStr === '') {
      setEditableStr('　');
    }
    changeHandler(index, editableStr);
    setEditing(false);
  };

  const editHandler = () => {
    setEditing(true);
    inputRef.current.focus({ cursor: 'end' });
  };

  return (
    <div style={{ fontSize: '14px', fontWeight: 'bold', top: '10px', position: 'relative' }}>
      {editing ? (
        <Input
          value={editableStr}
          onChange={(e) => setEditableStr(e.target.value)}
          addonAfter={<CheckOutlined onClick={checkHandlder} />}
          style={{ top: '-3px', position: 'relative' }}
          allowClear
        />
      ) : (
        <Space>
          {item}
          <EditOutlined
            onClick={() => {
              setEditing(true);
            }}
            style={{ color: 'blue' }}
          />
        </Space>
      )}
    </div>
  );
};

export default FreeTextInput;
