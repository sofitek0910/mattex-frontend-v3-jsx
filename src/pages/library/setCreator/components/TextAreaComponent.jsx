import { Input } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;

const TextAreaComponent = (props) => {
  console.log(props.data);
  let data = props.data;
  if (typeof data == 'undefined' && data == null) {
    data = {
      attributeKey: 'title',
      attributeLabel: 'Title',
      attributeValue: 'Document 1',
    };
  }
  const [dataSource, setDataSource] = useState(data);
  console.log(`dataSource.title: ${dataSource.title}`);
  console.log(`data.text: ${data.title}`);
  const [value, setValue] = useState('');
  return (
    <div>
      <h5 style={{ color: '#464646', fontSize: '12px', fontWeight: 600 }}>{data.attributeLabel}</h5>

      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={data.attributeValue}
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
    </div>
  );
};

export default TextAreaComponent;
