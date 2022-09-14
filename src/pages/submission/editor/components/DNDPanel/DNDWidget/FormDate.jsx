import { InfoCircleOutlined } from '@ant-design/icons';
import { DatePicker, Input, Tooltip } from 'antd';
import moment from 'moment';

function FormDate({
  builderMode,
  mandatory,
  formEditing,
  title,
  date,
  setDate,
  prefillable,
  info,
}) {
  //function returning width and height of element
  const getTitleWidth = () => {
    let titleWidth = 30;
    if (!builderMode && mandatory) {
      titleWidth -= 4;
    }
    return `${titleWidth}%`;
  };

  const getDataWidth = () => {
    let dataWidth = 70;
    if (info != '') {
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
              height: '34px',
            }}
          >
            *
          </div>
        ) : (
          ''
        )
      }
      <DatePicker
        autoFocus
        disabled={!formEditing || (builderMode && !prefillable)}
        style={{
          width: getDataWidth(),
          borderRadius: '0 3px 3px 0',
          border: '2px solid #EAF4FF',
        }}
        value={date ? moment(date) : null}
        //onChange={date?((e) => {setDate(Date(e.target._d))}):()=>{}}
        onChange={(e) => {
          console.log('onChange date:', e);
        }}
      />
      {info != '' ? (
        <div style={{ width: '4%', padding: '3px 6px' }}>
          <Tooltip title={info}>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        </div>
      ) : (
        ''
      )}
    </Input.Group>
  );
}

FormDate.defaultProps = {
  builderMode: false,
  mandatory: false,
  data: null,
  prefillable: false,
  info: '',
};

export default FormDate;
