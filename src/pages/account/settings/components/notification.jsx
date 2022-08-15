import { List, Switch } from 'antd';
import { Fragment } from 'react';

const NotificationView = () => {
  const getData = () => {
    const Action = <Switch checkedChildren="open" unCheckedChildren="close" defaultChecked />;
    return [
      {
        title: 'password',
        description: 'message from other user will be shown in notification',
        actions: [Action],
      },
      {
        title: 'system message',
        description: 'system message will be shown in notification',
        actions: [Action],
      },
      {
        title: 'pending event',
        description: 'pending event will be shown in notification',
        actions: [Action],
      },
    ];
  };

  const data = getData();
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default NotificationView;
