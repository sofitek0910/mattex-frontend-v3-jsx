import { Avatar } from 'antd';
import styles from './index.less';
import moment from 'moment';

const ArticleListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a href={href}>{owner}</a> issue on <a href={href}>{href}</a>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
