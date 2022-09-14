import { useState } from 'react';

const ImageComponent = (props) => {
  let data = props.data;
  if (typeof data == 'undefined' && data == null) {
    data = [
      {
        path: './coperate_logo1.png',
        width: '256px',
      },
    ];
  }

  const [dataSource, setDataSource] = useState(data);
  return <img src={data.path} width={data.width} />;
};

export default ImageComponent;
