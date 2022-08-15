import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { Fragment } from 'react';

const BindingView = () => {
  const getData = () => [
    {
      title: 'link to taobao',
      description: 'have not link to taobao yet',
      actions: [<a key="Bind">绑定</a>],
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: 'link to alipay',
      description: 'have not link to alipay yet',
      actions: [<a key="Bind">绑定</a>],
      avatar: <AlipayOutlined className="alipay" />,
    },
  ];

  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default BindingView;
