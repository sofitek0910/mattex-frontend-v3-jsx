import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import { useRef, useState, useCallback } from 'react';

import TitleEditPopup from './TitleEditPopup';

const InputComponent = ({
  editing,
  label,
  placeholder,
  disabled = false,
  prefilledValue,
  canEditLabel,
  canRemove,
  index,
  changeHandler,
  removeHandler,
  labelEditHandler,
  listingStyle,
  setFocusing = () => {},
}) => {
  const [_prefilledValue, setPrefilledValue] = useState(prefilledValue);
  const [titleEditPopupShow, setTitleEditPopupShow] = useState(false);
  //const inputRef = useRef(null);

  const titleEditClickHandler = () => {
    //trigger titleEditPopupShow to show popup
    setTitleEditPopupShow(true);
  };

  const titleEditCallback = useCallback((index, newTitle) => {
    labelEditHandler(index, newTitle);
  });

  const convertToAscii = (index, uppercase = false) => {
    if (uppercase) {
      return String.fromCharCode('A'.charCodeAt(0) + index);
    } else {
      return String.fromCharCode('a'.charCodeAt(0) + index);
    }
  };

  return (
    <>
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
          <div style={{ padding: '4px 11px' }}>
            {/* { (editing)?(
            <Input value={label} />
          ):(
            <div style={{padding: '4px 11px'}}>{label}</div>
          ) } */}
            {listingStyle == 'alphabet' ? (
              <span style={{ padding: '0 0 4px 0' }}>{`(${convertToAscii(index)})`}</span>
            ) : (
              <></>
            )}
            {listingStyle == 'number' ? (
              <span style={{ padding: '0 0 4px 0' }}>{`(${index + 1})`}</span>
            ) : (
              <></>
            )}
            <span style={{ padding: '4px 4px' }}>{label}</span>
          </div>
        </Col>

        {editing && canEditLabel ? (
          <Col flex="20px" style={{ padding: '0px' }}>
            <Button type="text" style={{ padding: '0px' }}>
              <EditOutlined
                style={{ color: '#0256B4' }}
                onClick={editing ? titleEditClickHandler : () => {}}
              />
            </Button>
          </Col>
        ) : (
          <></>
        )}
        <Col flex="auto">
          {editing ? (
            <Input
              //ref={inputRef}
              disabled={disabled}
              placeholder={placeholder}
              defaultValue={_prefilledValue}
              onFocus={() => {
                setFocusing(true);
                // inputRef.current.focus({
                //   cursor: 'end',
                // });
              }}
              onBlur={(e) => {
                setFocusing(false);
                console.log('onBlur:', e.target.value);
                changeHandler(index, label, e.target.value);
              }}
            />
          ) : (
            <Input placeholder={placeholder} defaultValue={_prefilledValue} disabled />
          )}
        </Col>
        {editing && canRemove ? (
          <Col flex="20px" style={{ padding: '0px 4px' }}>
            <Button
              type="text"
              style={{ padding: '0px' }}
              onClick={() => {
                removeHandler(index);
              }}
            >
              <DeleteOutlined style={{ color: '#0256B4' }} />
            </Button>
          </Col>
        ) : (
          <></>
        )}
      </Row>

      {/******modal for editing title******* */}
      <TitleEditPopup
        titleEditPopupShow={titleEditPopupShow}
        setTitleEditPopupShow={setTitleEditPopupShow}
        title={label}
        setTitle={titleEditCallback}
        index={index}
      />
    </>
  );
};

export default InputComponent;
