import { Tag } from 'antd';
import { useState } from 'react';

const HeaderComponent = (props) => {
  let data = props.data;
  if (typeof data == 'undefined' && data == null) {
    data = {
      text: 'Label1',
    };
  }
  const [dataSource, setDataSource] = useState(data);
  console.log(`dataSource.title: ${dataSource.title}`);
  console.log(`data.text: ${data.title}`);
  return (
    <div>
      <Tag
        color="default"
        style={{
          textAlign: 'center',
          padding: '8px',
          width: '100%',
          wordWrap: 'break-word',
          display: 'block',
        }}
      >
        {data.text}
      </Tag>
    </div>
  );
};

export default HeaderComponent;
