import { useState } from 'react';

const HeaderComponent = (props) => {
  let data = props.data;
  if (typeof data == 'undefined' && data == null) {
    data = {
      title: 'Title1',
    };
  }
  const [dataSource, setDataSource] = useState(data);
  console.log(`dataSource.title: ${dataSource.title}`);
  console.log(`data.title: ${data.title}`);
  return (
    <div>
      <h3 style={{ color: '#003673', fontSize: '20px', fontWeight: 600 }}>{data.title}</h3>
      <hr style={{ border: '2px solid #003673', backgroundColor: '#003673' }}></hr>
    </div>
  );
};

export default HeaderComponent;
