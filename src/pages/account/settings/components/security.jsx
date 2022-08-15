import { List } from 'antd';
const passwordStrength = {
  strong: <span className="strong">strong</span>,
  medium: <span className="medium">medium</span>,
  weak: <span className="weak">weak</span>,
};

const SecurityView = () => {
  const getData = () => [
    {
      title: 'passwprd',
      description: (
        <>
          current strength：
          {passwordStrength.strong}
        </>
      ),
      actions: [<a key="Modify">modify</a>],
    },
    {
      title: 'security phone number',
      description: `have binded to phone number: 138****8293`,
      actions: [<a key="Modify">modify</a>],
    },
    {
      title: 'security question',
      description: '未设置密保问题，密保问题可有效保护账户安全',
      actions: [<a key="Set">setting</a>],
    },
    {
      title: 'backup email',
      description: `have binded to email: ant***sign.com`,
      actions: [<a key="Modify">modify</a>],
    },
    {
      title: 'MFA devie',
      description:
        'have not bind to MFA device yet, 2-step authentication can be used after binding',
      actions: [<a key="bind">bind</a>],
    },
  ];

  const data = getData();
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
