import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import { useState } from 'react';

const ImageComponent = ({
  editing,
  label,
  placeholder,
  prefilledValue,
  canEditLabel,
  canRemove,
  index,
  changeHandler,
}) => {
  const [_prefilledValue, setPrefilledValue] = useState(prefilledValue);

  return (
    <Row
      style={{
        backgroundColor: '#EAF4FF',
        padding: '2px',
        borderRadius: '4px',
        border: '1px solid #EAF4FF',
        color: '#0256B4',
      }}
    >
      <Col flex={editing && canEditLabel ? '180px' : '200px'}>
        {/* { (editing)?(
          <Input value={label} />
        ):(
          <div style={{padding: '4px 11px'}}>{label}</div>
        ) } */}
        <div style={{ padding: '4px 11px' }}>{label}</div>
      </Col>

      {editing && canEditLabel ? (
        <Col flex="20px" style={{ padding: '0px' }}>
          <Button type="text" style={{ padding: '0px' }}>
            <EditOutlined style={{ color: '#0256B4' }} />
          </Button>
        </Col>
      ) : (
        <></>
      )}
      <Col flex="auto">
        <Input
          placeholder={placeholder}
          defaultValue={_prefilledValue}
          onChange={(e) => {
            console.log('onChange date:', e.target.value);
            changeHandler(index, label, e.target.value);
          }}
        />
      </Col>
      {editing && canRemove ? (
        <Col flex="20px" style={{ padding: '0px 4px' }}>
          <Button type="text" style={{ padding: '0px' }}>
            <CloseCircleOutlined style={{ color: '#0256B4' }} />
          </Button>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default ImageComponent;
