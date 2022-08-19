import { Card, Input, Row, Col, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined, PlusCircleOutlined, HolderOutlined, EyeInvisibleOutlined, EyeOutlined, DragOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import client_logo_2 from './client_logo_2.png';
import HeaderBlock  from './HeaderBlock';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
const { TextArea } = Input;



const EntityLogoAndHeader = ({
  // project,
  // editing,
  // fieldOrder,
  //setFieldOrder,
  // ctrlNumVisible,
  // setCtrlNumVisible,
  sortableIndex, 
  editing, 
  data, 
  rootDataSource, 
  setRootDataSource,
  editHandler,
  deleteHandler,
  cancelHandler, 
  setEntityLogoAndHeader
}) => {

  const project = { 
    "project_id": 14,
    "project_code": "1010",
    "project_name": "Fanling North New Development Area, Phase 1: Fanling Bypass Eastern Section (Shek Wu San Tsuen North to Lung Yeuk Tau)",
    "project_display_name": "Fanling North New Development Area, Phase 1: Fanling Bypass Eastern Section (Shek Wu San Tsuen North to Lung Yeuk Tau)",
    "client": "",
    "division": "Civil 2",
    "status": 1,
    "project_in_charge": "Alex Zhang"
  }

  const [fieldOrder,setFieldOrder] = useState(data.fieldOrder)
  const [ctrlNumVisible,setCtrlNumVisible] = useState(data.ctrlNumVisible)

  const confirmHandler = (index) => {
    console.log('(newSection)rootDataSource: ',rootDataSource)
    //console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data.payload = {
      "fieldOrder": fieldOrder,
      "ctrlNumVisible": ctrlNumVisible
    }
    delete newArr[index].originalData;
    setRootDataSource(newArr);
    setEntityLogoAndHeader(newArr[index].data.payload)
  };

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

  // const HeaderBlock = (
  //   blockType,
  //   index,
  //   project,
  //   editing,
  //   ctrlNumVisible,
  //   setCtrlNumVisible,
  //   moveHeaderBlock
  // ) => {

  // }

  const renderBlock = (block, index) => {
    return (
      <HeaderBlock
        blockType={block}
        index={index}
        project={project}
        editing={editing}
        ctrlNumVisible={ctrlNumVisible}
        setCtrlNumVisible={setCtrlNumVisible}
        moveHeaderBlock={moveHeaderBlock}
      />
    );
  };



  const SortableList  = sortableContainer(({ children }) => {
    console.log('children:',children)
    // console.log('fieldOrder:',fieldOrder)
    // return (
    //     <ul>
    //       {fieldOrder.map((value, index) => (
    //         <SortableItem key={`item-${value}`} index={index} value={value} />
    //       ))}
    //     </ul>
    //   );
    // return(
    //   <span>
    //     {
    //     fieldOrder.map((block, index) => (
    //       <SortableItem key={`item-${index}`} index={index} value={{'index':index, 'block': block}} />
    //     ))
    //     }
    //   <span/>
    // );
    return (
      
      // <Col
      // span={3}
      // style={{display: 'flex', textAlign: "center"}} 
      // //ref={ref} 
      // //data-handler-id={handlerId} 
      // className="space-align-container"
      // >
      <ul style={{display: 'inline'}}>
        {children}
      </ul>
      //</Col>
      //<span>{children}</span>
    );
  });

  const DragHandle = sortableHandle(() => (
    <span style={{ padding: '0px 8px', width: '50px' }}>
      <DragOutlined />
    </span>
  ));

  const SortableItem = sortableElement(({ value }) => (
    <>
      <Col
        span={3}
        style={{display: 'flex', textAlign: "center"}} 
        //ref={ref} 
        //data-handler-id={handlerId} 
        className="space-align-container"
      >
        <Card 
          size="small" 
          style={{height: '100%'}}
          bodyStyle={{height: '70%'}}
          actions={
            editing?([<DragHandle/>]):([])
          }
        >
          <img src={client_logo_2} className="headerSectionImg" alt="Logo"></img >
        </Card>
      </Col>

      {/* {
        value.block === 'client_logo'? (
          <Col
            span={3}
            style={{display: 'flex', textAlign: "center"}} 
            //ref={ref} 
            //data-handler-id={handlerId} 
            className="space-align-container"
          >
            <Card 
              size="small" 
              style={{height: '100%'}}
              bodyStyle={{height: '70%'}}
              actions={
                editing?([<DragHandle/>]):([])
              }
            >
              <img src={client_logo_2} className="headerSectionImg" alt="Logo"></img >
            </Card>
          </Col>
        ):(<></>)
      }

      {
        value.block === 'proj_info'? (
          <Col
            span={(ctrlNumVisible||editing)?13:18} 
            style={{display: 'flex'}}
            //ref={ref} 
            //data-handler-id={handlerId} 
            className="space-align-container"
          >
            <Card
              size="small"
              style={{width: '100%',height: '100%'}}
              bodyStyle={{height: '70%'}}
              actions={
                editing?([<DragHandle/>]):([])
              }
            >
            <p><Input
             //placeholder={project?'Contract No.: '+project.project_code:'Contract No.'} 
             placeholder={'Contract No.'} 
             disabled 
             style={{textAlign:'center'}}
            /></p>
            <p><TextArea
                //placeholder={project?project.project_display_name:'Project Name'}
                placeholder={'Project Name'}
                autoSize={{maxRows: 2 }}
                disabled 
                style={{textAlign:'center'}}
                /></p>
            </Card>
          </Col>
        ):(<></>)
      }

      {
        value.block === 'constructor_logo'  ? (<></>):(<></>)
      }

      {
        value.block === 'cntr_num'  ? (<></>):(<></>)
      } */}
      
    </>
  ))

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(fieldOrder, oldIndex, newIndex).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      setFieldOrder(newData);
    }
  };

  return (
    <>
    <Col flex="auto" style={{ maxWidth: '80%' }}>
      <Card title="Entity Logos and Headers" style={{ margin: '8px' }}>
        <DndProvider backend={HTML5Backend}>
          <Row style={{ width: '100%' }} gutter={[8, 8]}>
            {fieldOrder.map((block, index) => renderBlock(block, index))}
            {/* <SortableList  onSortEnd={onSortEnd} useDragHandle axis={'x'} fieldOrder={fieldOrder}>
              {fieldOrder.map((block, index) => (
                <SortableItem key={`item-${index}`} index={index} value={{'index':index, 'block': block}} />
              ))}
            </SortableList > */}
          </Row>
        </DndProvider>
      </Card>
    </Col>
    <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
        {editing ? (
          <>
            <Tooltip title="Save Change(s)">
              <Button type="primary" style={{ margin: '4px' }} icon={<CheckOutlined />} onClick={() => confirmHandler(sortableIndex)} size="small" />
            </Tooltip>
            <Tooltip placement="bottom" title="Cancel Change(s)">
              <Button style={{ margin: '4px' }} icon={<CloseOutlined />} onClick={() => cancelHandler(sortableIndex)} size="small" />
            </Tooltip>
          </>
        ) : (
          <>
            <Button style={{ margin: '4px' }} icon={<EditOutlined/>} onClick={() => editHandler(sortableIndex)} size="small" />
            <Button style={{ margin: '4px' }} icon={<DeleteOutlined />} onClick={() => deleteHandler(sortableIndex)} size="small" />
          </>
        )}
    </Col>
    </>
  );
};

export default EntityLogoAndHeader;
