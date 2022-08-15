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
  deleteHandler
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
      <Col flex={editing && canEditLabel ? '230px' : '250px'}>
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
      {editing ? (
        <Input
          placeholder={placeholder}
          defaultValue={_prefilledValue}
          onBlur={(e) => {
            console.log('onBlur:', e.target.value);
            changeHandler(index, label, e.target.value);
          }}
        />
      ):(
        <Input
          placeholder={placeholder}
          defaultValue={_prefilledValue}
          disabled
        />
      )}
        
      </Col>
      {editing && canRemove ? (
        <Col flex="20px" style={{ padding: '0px 4px' }}>
          <Button type="text" style={{ padding: '0px' }} onClick={() => {deleteHandler(index)}}>
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
