import { Button, Result } from 'antd';
import { Link } from 'umi';
import styles from './style.less';
const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <span>check mail box</span>
      </Button>
    </a>
    <Link to="/">
      <Button size="large">home</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => {
  const email = location.state ? location.state.account : 'AntDesign@example.com';
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>successfully register with email: {email} </span>
        </div>
      }
      //subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
      subTitle="Activication mail has been sent and will expire after 24 hours. Please click the link in mail to activate account."
      extra={actions}
    />
  );
};

export default RegisterResult;
