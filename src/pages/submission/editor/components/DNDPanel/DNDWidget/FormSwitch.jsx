import { Input, Switch } from 'antd';

function FormSwitch({ formEditing, title, checked, setChecked }) {
  const onChange = (checked) => {
    setChecked(checked);
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
          width: '30%',
          backgroundColor: '#EAF4FF',
          padding: '6px 12px',
          borderRadius: '3px 0 0 3px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: '70%',
          borderRadius: '0 3px 3px 0',
          border: '2px solid #EAF4FF',
          display: 'inline',
          padding: '12px',
        }}
      >
        <Switch checked={checked} onChange={onChange} disabled={!formEditing} />
      </div>
    </Input.Group>
  );
}

export default FormSwitch;
