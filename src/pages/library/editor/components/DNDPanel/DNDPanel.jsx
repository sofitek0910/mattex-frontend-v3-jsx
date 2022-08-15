import { arrayMoveImmutable } from 'array-move';
import { useState } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { MenuOutlined } from '@ant-design/icons';
import { SIDEBAR_ITEMS } from './sidebarDefintion';
import { INITIAL_DATA } from './initialData';

import { DragOutlined, CloseCircleOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons';
import { Button, Input, Row, Col, Card } from 'antd';

//const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

// import DraggableTable from './DraggableEditableTable';
// import DraggableList from './DraggableList';
// import HeaderComponent from './HeaderComponent';
// import ImageComponent from './ImageComponent';
// import InputComponent from './InputComponent';
// import LabelComponent from './LabelComponent';
// import RadioComponent from './RadioComponent';
// import SectionFutureReply from './SectionFutureReply';
// import SectionReference from './SectionReference';
// import SectionSalutation from './SectionSalutation';
// import SectionSignOff from './SectionSignOff';
// import SectionTitle from './SectionTitle';

import SortableInputField from './DNDWidget/SortableInputField';
import SectionAboutThisSubmission from './DNDWidget/SectionAboutThisSubmission';
import SectionAttachment from './DNDWidget/SectionAttachment';
import SectionDescriptionOfContent from './DNDWidget/SectionDescriptionOfContent';
import SectionEntityLogoAndHeader from './DNDWidget/SectionEntityLogoAndHeader';
import SectionFutureReply from './DNDWidget/SectionFutureReply';
import SectionReference from './DNDWidget/SectionReference';
import SectionSalutation from './DNDWidget/SectionSalutation';
import SectionSignOff from './DNDWidget/SectionSignOff';
import SectionTitle from './DNDWidget/SectionTitle';


const DNDPanel = () => {
  const [sideBarList, setSideBarList] = useState(SIDEBAR_ITEMS);
  const [rootDataSource, setRootDataSource] = useState(INITIAL_DATA);

  const DragHandle = sortableHandle(() => (
    <span style={{ padding: '2px 2px', border: '1px solid #EBEBEB', borderRadius: '4px', height:'40px', width: '40px'}}>
      <DragOutlined />
    </span>
  ));

  
  const updateRootElement = (index, payload) => {
    console.log(`[{${index}}] - updateElement - payload: ${JSON.stringify(payload)}`)
    console.log(`[{${index}}] - updateElement - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].data.payload = payload;
    setRootDataSource(newArr);
  };

  
  const confirmHandler = (index) => {
    console.log(`[{${index}}] - confirmHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    delete newArr[index].originalData;
    setRootDataSource(newArr);
  };
  const cancelHandler = (index) => {
    console.log(`[{${index}}] - cancelHandler - rootDataSource: ${JSON.stringify(rootDataSource)}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = false;
    newArr[index].data = {...newArr[index].originalData};
    delete newArr[index].originalData;
    setRootDataSource(newArr);
  };
  const editHandler = (index) => {
    console.log(`editHandler: ${index}`)
    let newArr = [...rootDataSource];
    newArr[index].editing = true;
    newArr[index].originalData = {...newArr[index].data};
    setRootDataSource(newArr);
  };
  const deleteHandler = (index) => {
    console.log(`deleteHandler: ${index}`)
    let newArr = [...rootDataSource];
    newArr.splice(index, 1);
    setRootDataSource(newArr);
  };

  const SortableItem = sortableElement(({ item, sortableIndex }) => {
    console.log(`SortableItem - item: ${JSON.stringify(item)}`);
    console.log(`SortableItem - sortableIndex: ${sortableIndex}`);
    return (
      <li >


        
      <Row>
        <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
          <Row type="flex" align="middle" style={{ verticalAlign: 'middle', margin: 'auto' }}>
            <Col style={{ verticalAlign: 'middle', margin: 'auto' }}>
        <DragHandle />
            </Col>
          </Row>
        </Col>

        <Col flex="auto" style={{ maxWidth: '80%' }}>
          {/* {JSON.stringify(item)}  DEBUG*/}

          
          {item.type === 'SortableInputField' ? (
            <SortableInputField sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SortableInputField>
          ) : ( <></> )}

          {item.type === 'SectionAboutThisSubmission' ? (
            <SectionAboutThisSubmission sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionAboutThisSubmission>
          ) : ( <></> )}

          {item.type === 'SectionAttachment' ? (
            <SectionAttachment sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionAttachment>
          ) : ( <></> )}

          {item.type === 'SectionDescriptionOfContent' ? (
            <SectionDescriptionOfContent sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionDescriptionOfContent>
          ) : ( <></> )}

          {item.type === 'SectionEntityLogoAndHeader' ? (
            <SectionEntityLogoAndHeader sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionEntityLogoAndHeader>
          ) : ( <></> )}

          {item.type === 'SectionFutureReply' ? (
            <SectionFutureReply sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionFutureReply>
          ) : ( <></> )}

          {item.type === 'SectionReference' ? (
            <SectionReference sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionReference>
          ) : ( <></> )}

          {item.type === 'SectionSalutation' ? (
            <SectionSalutation sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionSalutation>
          ) : ( <></> )}

          {item.type === 'SectionSignOff' ? (
            <SectionSignOff sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionSignOff>
          ) : ( <></> )}

          {item.type === 'SectionTitle' ? (
            <SectionTitle sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionTitle>
          ) : ( <></> )}





        </Col>
        <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
          {item.editing ? (
            <>
              <Button style={{ margin: '4px' }} icon={<CheckOutlined onClick={() => confirmHandler(sortableIndex)} />} size="small" />
              <Button style={{ margin: '4px' }} icon={<CloseOutlined onClick={() => cancelHandler(sortableIndex)} />} size="small" />
            </>
          ) : (
            <>
              <Button style={{ margin: '4px' }} icon={<EditOutlined onClick={() => editHandler(sortableIndex)} />} size="small" />
              <Button style={{ margin: '4px' }} icon={<DeleteOutlined onClick={() => deleteHandler(sortableIndex)} />} size="small" />
            </>
          )}
        </Col>
      </Row>
      </li>
    );
  });

  const SortableContainer = sortableContainer(({ children }) => {
    return ( 
    <ul style={{ padding: '2px', }} >
      {children}
    </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(rootDataSource, oldIndex, newIndex).filter((el) => !!el);
      console.log('Sorted items: ', newData);
      setRootDataSource(newData);
    }
  };

  return (
    <div className="DNDPanel">
      <Row>
        <Col flex="300px">
          
          <Card title="Sections" >
            {sideBarList.map((item, index) => {
              return (
                (item.disabled)?
                (<Button type="primary" style={{margin: '4px', borderRadius: '4px', width: '100%', padding: '0px'}} disabled> 
                  <Row>
                    <Col flex="30px" style={{ padding: '0px' }}> <CloseCircleOutlined /> </Col>
                    <Col flex="auto" style={{ padding: '0px' }}> {item.title}  </Col>
                    <Col flex="20px" style={{ padding: '0px' }}>  {(item.mandatory)? <>*</> : <></>} </Col>
                  </Row>
                </Button>) :
                (<Button type="primary" style={{margin: '4px', borderRadius: '4px', width: '100%', padding: '0px'}} > 
                  <Row>
                    <Col flex="30px" style={{ padding: '0px' }}> <PlusCircleOutlined /> </Col>
                    <Col flex="auto" style={{ padding: '0px' }}> {item.title}  </Col>
                    <Col flex="20px" style={{ padding: '0px' }}>  {(item.mandatory)? <>*</> : <></>} </Col>
                  </Row>
                </Button>)
              )

            }
            )}
          </Card>
        </Col>
        <Col flex="auto" style={{ maxWidth: '80%' }}>
          <SortableContainer onSortEnd={onSortEnd} useDragHandle>
            {rootDataSource.map((value, index) => (
              <SortableItem key={`item-${index}`} index={index} item={value} sortableIndex={index} />
            ))}
          </SortableContainer>
        </Col>
      </Row>
    </div>
  );
};

export default DNDPanel;
