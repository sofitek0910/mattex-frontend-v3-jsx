import { PlusCircleOutlined } from '@ant-design/icons';
import { Input, Radio } from 'antd';
import FormRadioOption from './FormRadioOption';

function FormRadio({
  builderMode,
  mandatory,
  formEditing,
  title,
  options,
  optionsEditable,
  setOptions,
  choice,
  setChoice,
  prechoosable,
}) {
  /**********handler******* */
  const addOptionHandler = () => {
    if (setOptions) {
      let tempOptions = [...options, 'New Option'];
      setOptions(tempOptions);
    }
  };

  const setOptionHandler = (newOption, index) => {
    if (setOptions) {
      let tempOptions = [...options];
      tempOptions[index] = newOption;
      setOptions(tempOptions);
    }
  };

  const removeOptionHandler = (index) => {
    if (setOptions) {
      let tempOptions = [...options];
      tempOptions.splice(index, 1);
      setOptions(tempOptions);
    }
  };

  {
    /*******render option**** */
  }
  const renderOption = (option, index) => {
    return (
      <FormRadioOption
        builderMode={builderMode}
        formEditing={formEditing}
        optionsEditable={optionsEditable}
        setOptionHandler={setOptionHandler}
        removeOptionHandler={removeOptionHandler}
        option={option}
        index={index}
        prechoosable={prechoosable}
      />
    );
  };

  /*****function returning width of element*** */
  const getTitleWidth = () => {
    let titleWidth = 30;
    if (!builderMode && mandatory) {
      titleWidth -= 4;
    }
    return `${titleWidth}%`;
  };

  const getDataWidth = () => {
    let dataWidth = 70;
    if (optionsEditable) {
      dataWidth -= 4;
    }
    return `${dataWidth}%`;
  };

  return (
    <Input.Group
      compact
      style={{
        margin: '4px 0px',
        display: 'flex',
        minHeight: '34px',
      }}
    >
      {/******title label***** */}
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
        //* that indicate mandatory
        !builderMode && mandatory ? (
          <div
            style={{
              width: '4.2%',
              backgroundColor: '#EAF4FF',
              //height: '34px',
            }}
          >
            *
          </div>
        ) : (
          ''
        )
      }

      {/*******box containing radio buttons****** */}
      <div
        style={{
          //width: '70%',
          width: getDataWidth(),
          borderRadius: '0 3px 3px 0',
          border: '2px solid #EAF4FF',
          display: 'inline',
          padding: '3px 6px',
        }}
      >
        <Radio.Group
          onChange={(e) => {
            setChoice(e.target.value);
          }}
          value={choice}
        >
          {options.map((option, index) => renderOption(option, index))}
        </Radio.Group>
      </div>
      {
        //clickable icon for adding option
        optionsEditable ? (
          <div style={{ width: '4%', padding: '3px 6px' }}>
            <PlusCircleOutlined
              onClick={formEditing ? addOptionHandler : () => {}}
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
  );
}

FormRadio.defaultProps = {
  builderMode: false,
  mandatory: false,
  optionsEditable: false,
  options: ['Yes', 'No'],
  setOptions: null,
  prechoosable: false,
  //choice:null
};

export default FormRadio;
