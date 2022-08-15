import { Card, Input, Row } from 'antd';
const { TextArea } = Input;

const EntityLogoAndHeader = ({
  project,
  editing,
  fieldOrder,
  setFieldOrder,
  ctrlNumVisible,
  setCtrlNumVisible,
}) => {
  const moveHeaderBlock = (dragIndex, hoverIndex) => {
    setFieldOrder((prevOrder) =>
      update(prevOrder, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevOrder[dragIndex]],
        ],
      }),
    );
  };

  const renderBlock = (block, index) => {
    return (
      // <HeaderBlock
      //   blockType={block}
      //   index={index}
      //   project={project}
      //   editing={editing}
      //   ctrlNumVisible={ctrlNumVisible}
      //   setCtrlNumVisible={setCtrlNumVisible}
      //   moveHeaderBlock={moveHeaderBlock}
      //   />
      <></>
    );
  };

  return (
    <>
      <Card title="Entity Logos and Headers" style={{ margin: '8px' }}>
        <Row style={{ width: '100%' }} gutter={[8, 8]}>
          {/* {fieldOrder.map((block, index) => renderBlock(block, index))} */}
        </Row>
      </Card>
    </>
  );
};

export default EntityLogoAndHeader;
