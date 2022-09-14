import Icon, {
  CalendarOutlined,
  IdcardOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Input } from 'antd';
import { ReactComponent as SignSvg } from './signiture.svg';

const { TextArea } = Input;

const iconStyle = {
  color: '#0256B4',
};

function SignOffBlock({ builderMode, showSubmitter }) {
  return (
    <Card
      style={{
        width: '309px',
        backgroundColor: !showSubmitter ? '#EBEBEB' : '',
      }}
      headStyle={{ padding: '8px 12px' }}
      title={
        <Input.Group compact>
          <div
            style={{
              width: '10%',
              padding: '5px 6px',
            }}
          >
            <MenuOutlined />
          </div>
          <Input style={{ width: '90%' }} defaultValue="Prepared by:" disabled={builderMode} />
        </Input.Group>
      }
    >
      <Input.Group compact style={{ padding: '4px 0' }}>
        <div
          style={{
            width: '10%',
            padding: '5px 6px',
          }}
        >
          <UserOutlined style={iconStyle} />
        </div>
        <Input style={{ width: '90%' }} placeholder="Name" disabled={builderMode} />
      </Input.Group>

      <Input.Group compact style={{ padding: '4px 0' }}>
        <div
          style={{
            width: '10%',
            padding: '5px 6px',
          }}
        >
          <IdcardOutlined style={iconStyle} />
        </div>
        <Input style={{ width: '90%' }} placeholder="Role" disabled={builderMode} />
      </Input.Group>

      <Input.Group compact style={{ padding: '4px 0' }}>
        <div
          style={{
            width: '10%',
            padding: '5px 6px',
          }}
        >
          <Icon component={SignSvg} />
        </div>
        <TextArea style={{ width: '90%' }} autoSize={{ minRows: 3 }} disabled={builderMode} />
      </Input.Group>

      <Input.Group compact style={{ padding: '4px 0' }}>
        <div
          style={{
            width: '10%',
            padding: '5px 6px',
          }}
        >
          <CalendarOutlined style={iconStyle} />
        </div>
        <div
          style={{
            width: '90%',
            padding: '4px',
            color: '#969696',
          }}
        >
          Generated when this user approve
        </div>
      </Input.Group>
    </Card>
  );
}

export default SignOffBlock;
