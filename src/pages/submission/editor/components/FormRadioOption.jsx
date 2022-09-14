import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Radio } from 'antd';
import { useEffect, useState } from 'react';

function FormRadioOption({
  builderMode,
  formEditing,
  optionsEditable,
  setOptionHandler,
  removeOptionHandler,
  option,
  index,
  prechoosable,
}) {
  /*******hooks******** */
  const [optionEditing, setOptionEditing] = useState(false);
  useEffect(() => {
    if (!formEditing) {
      setOptionEditing(false);
    }
  }, [formEditing]);

  const [newOption, setNewOption] = useState(option);
  /*const [newFlag, setNewFlag] = useState<boolean>(true)
    useEffect(() => {
        if(option != 'New Option'){
            setNewFlag(false)
        }
        if(newFlag){
            setOptionEditing(true)
        }
    }, [])*/

  /*********handler ******* */
  const checkHandler = () => {
    setOptionEditing(false);
    setOptionHandler(newOption, index);
  };

  const crossHandler = () => {
    setOptionEditing(false);
    removeOptionHandler(index);
  };

  const controllIconStyle = {
    cursor: formEditing ? 'pointer' : 'not-allowed',
    color: formEditing ? '#0256B4' : '#BBBBBD',
    margin: '0 0 0 8px',
  };

  return (
    <Radio value={option} disabled={!formEditing || !prechoosable}>
      {/*<Input size="small" placeholder="small size" />*/}
      {optionEditing ? (
        //show input box when user click the edit icon
        <Input
          size="small"
          value={newOption}
          onChange={(e) => {
            setNewOption(e.target.value);
          }}
          allowClear
          suffix={<CheckOutlined onClick={checkHandler} />}
        />
      ) : optionsEditable ? (
        <>
          {option}

          {/*******edit icon**** */}
          <EditOutlined
            onClick={formEditing ? () => setOptionEditing(true) : () => {}}
            style={controllIconStyle}
          />

          {/******remove icon**** */}
          <CloseOutlined
            onClick={formEditing ? crossHandler : () => {}}
            style={controllIconStyle}
          />
        </>
      ) : (
        option
      )}
    </Radio>
  );
}

export default FormRadioOption;
