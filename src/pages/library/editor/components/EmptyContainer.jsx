import { Empty } from 'antd';
import emptyImage from './emptyBuilderBlock.svg';

function EmptyContainer() {
  return (
    <Empty
      //className="emptyBuilderMsg"
      style={{ padding: '30vh 0 0 0' }}
      image={emptyImage}
      imageStyle={{height: '7vh'}}
      description={
        <span>
          Add your first section to start building this form
        </span>
      }
    >

    </Empty>
  )
}

export default EmptyContainer