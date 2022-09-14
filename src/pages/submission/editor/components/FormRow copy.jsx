import { useState } from 'react';

import { CloseOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import TitleEditPopup from './TitleEditPopup';

const { TextArea } = Input;

function FormRow({
  builderMode,
  draggable,
  moveRow,
  listingStyle,
  index,
  mandatory,
  titleEditable,
  title,
  setTitle,
  formEditing,
  removable,
  removeRow,
  visibleControllable,
  visible,
  setVisible,
  data,
  setFieldData,
  textField,
  prefillable,
}) {
  /********hook******* */
  const [titleEditPopupShow, setTitleEditPopupShow] = useState(false);

  /********handler********* */
  const titleEditClickHandler = () => {
    //trigger titleEditPopupShow to show popup
    setTitleEditPopupShow(true);
  };

  const visibleHandler = () => {
    setVisible(!visible);
  };

  //function returning width and height of element
  const getTitleWidth = () => {
    let titleWidth = 30;
    //   if(listingStyle!=='none') {
    //       titleWidth -= 4
    //   }
    //   if (!builderMode && mandatory) {
    //       titleWidth -= 4
    //   }
    //   //if (titleEditable && setTitle!=null){
    //       if (titleEditable) {
    //       titleWidth -= 4
    //   }
    return `${titleWidth}%`;
  };

  const getInputWidth = () => {
    let inputWidth = 70;
    //if (visibleControllable && setVisible!=null){
    if (visibleControllable) {
      inputWidth -= 5;
    }
    //if (removable && removeRow!=null){
    if (removable) {
      inputWidth -= 3;
    }
    return `${inputWidth}%`;
  };

  //function converting index to corresponding listing style
  const getListIndex = () => {
    if (listingStyle == 'alphabet') {
      return String.fromCharCode(97 + index);
    } else if (listingStyle == 'number') {
      return index + 1;
    }
  };

  return (
    <>
      <Input.Group
        compact
        style={{
          margin: '4px 0px',
          display: 'flex',
          minHeight: '34px',
        }}
      >
        {/*title */}
        <div
          style={{
            width: getTitleWidth(),
            backgroundColor: '#EAF4FF',
            padding: '6px 12px',
            borderRadius: '3px 0 0 3px',
          }}
        >
          {title}
        </div>

        {
          //clickable edit icon
          //(titleEditable && setTitle!=null)?(
          titleEditable ? (
            <div
              style={{
                //width: '4.1%',
                backgroundColor: '#EAF4FF',
                padding: '5px 5px',
              }}
            >
              <EditOutlined
                onClick={formEditing ? titleEditClickHandler : () => {}}
                style={{
                  cursor: formEditing ? 'pointer' : 'not-allowed',
                  color: formEditing ? '#0256B4' : '#BBBBBD',
                }}
              />
            </div>
          ) : (
            ''
          )
        }

        {
          //* that indicate mandatory
          !builderMode && mandatory ? (
            <div
              style={{
                width: '4.2%',
                backgroundColor: '#EAF4FF',
                padding: '5px 0',
              }}
            >
              *
            </div>
          ) : (
            ''
          )
        }

        {textField ? (
          //text field
          <TextArea
            placeholder={builderMode ? (prefillable ? 'Prefill text here...' : '---') : ''}
            style={{ borderRadius: '0 3px 3px 0' }}
            autoSize={{ minRows: 3 }}
            disabled={!formEditing || (builderMode && !prefillable)}
            value={data}
            allowClear
            onChange={(e) => {
              setFieldData(title, e.target.value);
            }}
          />
        ) : (
          //input field
          <Input
            style={{
              width: getInputWidth(),
              borderRadius: '0 3px 3px 0',
              border: '2px solid #EAF4FF',
            }}
            placeholder={builderMode ? (prefillable ? 'Prefill text here...' : '---') : ''}
            disabled={!formEditing || (builderMode && !prefillable)}
            value={data}
            allowClear
            //onChange={(e) => {setFieldData(e.target.value)}}
            onChange={(e) => {
              setFieldData(title, e.target.value);
            }}
          />
        )}

        {
          //visible controll button
          //(visibleControllable && setVisible!=null)?(
          visibleControllable ? (
            <div style={{ width: '5%', padding: '3px 6px' }}>
              <Button
                icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                onClick={visibleHandler}
                disabled={!formEditing}
                size="small"
                style={{ padding: '4px' }}
              ></Button>
            </div>
          ) : (
            ''
          )
        }

        {
          //cross icon for remove row
          //(removable&&removeRow)?(
          formEditing && removable ? (
            <div style={{ width: '3%', padding: '5px 6px' }}>
              <CloseOutlined
                onClick={formEditing ? () => removeRow(index) : () => {}}
                style={{
                  cursor: formEditing ? 'pointer' : 'not-allowed',
                  color: formEditing ? '#0256B4' : '#BBBBBD',
                }}
              />
            </div>
          ) : (
            ''
          )
        }
      </Input.Group>

      {/******modal for editing title******* */}
      <TitleEditPopup
        titleEditPopupShow={titleEditPopupShow}
        setTitleEditPopupShow={setTitleEditPopupShow}
        title={title}
        setTitle={setTitle}
        index={index}
      />
    </>
  );
}

FormRow.defaultProps = {
  builderMode: false,
  draggable: false,
  moveRow: null,
  listingStyle: 'none',
  index: 0,
  mandatory: false,
  titleEditable: false,
  setTitle: null,
  removable: false,
  removeRow: null,
  visibleControllable: false,
  visible: true,
  setVisible: null,
  data: '',
  textField: false,
  setFieldData: () => {},
  prefillable: false,
};

export default FormRow;
