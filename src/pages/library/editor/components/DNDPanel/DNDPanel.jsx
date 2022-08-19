import { arrayMoveImmutable } from 'array-move';
import { useState, useEffect } from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import { MenuOutlined } from '@ant-design/icons';
import { SIDEBAR_ITEMS } from './sidebarDefintion';
import { INITIAL_DATA } from './initialData';
import { SIDEBAR_INDEX } from './sidebarIndex';

import { DragOutlined, CloseCircleOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined, MinusCircleOutlined} from '@ant-design/icons';
import { Button, Input, Row, Col, Card } from 'antd';
import { v4 as uuidv4 } from 'uuid';

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
import EmptyContainer from '../EmptyContainer';


const DNDPanel = (props) => {
  const [sideBarList, setSideBarList] = useState(SIDEBAR_ITEMS);
  //const [rootDataSource, setRootDataSource] = useState(INITIAL_DATA);
  const [rootDataSource, setRootDataSource] = useState([]);

 //hook of each section data in order to keep data even if the section is removed(data need to be restored when section is added again)
  const [EntityLogoAndHeader, setEntityLogoAndHeader] = useState({
    "fieldOrder": ["client_logo", "proj_info", "constructor_logo", "cntr_num"],
    "ctrlNumVisible": true
  })

  const [Salutation, setSalutation] = useState({
    "to": "",
    "attn": "",
    "attnVisible": true
  })

  const [Title, setTitle] = useState({
    "title": "",
    "project_level_id": "",
    "remark": [{ key: "Free Text Title", value: "" }]
  })

  const [Reference, setReference] = useState({
    reference: [{
      key: "Submission Master FIlling Ref.:",
      value: ""
    }, {
      key: "Specification Reference:",
      value: ""
    }, {
      key: "Drawing Reference:",
      value: ""
    }, {
      key: "BD Reference:",
      value: ""
    }], order_of_fields: ["", "", "", ""]
  })
  const [DescriptionOfContent, setDescriptionOfContent] = useState({
    "pairingList": [{ key: "Free Text Title", value: "" }],
    "listingStyle": "alphabet",
    "showTopFreeText": true,
    "topFreeText": "",
    "showBottomFreeText": false,
    "bottomFreeText": ""
  })

  const [AboutThisSubmission, setAboutThisSubmission] = useState({
    "remarks": '',
    "purposeOption": ['For Review', 'For Acceptance', 'For Information', 'For Record'],
    "purposeOfSubmission": '',
    "anticipatedDate": null,
    "recordFutureReply": ''
  })
  const [FutureReply, setFutureReply] = useState({
    "freeText": { key: "Comment", value: "" },
    "reply": "",
    "replyOptions": ['Acceptance', 'Acceptance with Comments', 'Rejected'],
    "signature": "",
    "name": "",
    "date": ""
  })

  const [SignOff, setSignOff] = useState({
    "showSubmitter": true,
    "idVisible": true,
    //"idName": "Circulation Identification"
    //"circulationID": ''
  })

  useEffect(() => {
    if (rootDataSource.length > 0){
      props.changedCallback(true)
      props.savedCallback(false)
    }
  }, [
      rootDataSource, 
      EntityLogoAndHeader, 
      Salutation, 
      Title, 
      Reference, 
      DescriptionOfContent,
      AboutThisSubmission,
      FutureReply,
      SignOff
    ]);

  const stateList = {
    'EntityLogoAndHeader': EntityLogoAndHeader,
    'Salutation': Salutation,
    'Title': Title,
    'Reference': Reference,
    'DescriptionOfContent': DescriptionOfContent,
    'AboutThisSubmission': AboutThisSubmission,
    'FutureReply': FutureReply,
    'SignOff': SignOff
  }

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

  //handler when clicking left side section list
  const addHandler = (section, index) => {
    console.log(`addHandler: ${section}`)
    let newSection = {
      id: uuidv4(),
      type: section,
      editing: false,
      data: {
        payload: stateList[section]
      }
    }
    console.log('newSection:',newSection)
    let newArr = [...rootDataSource,newSection];
    setRootDataSource(newArr);
    let sideArr = [...sideBarList];
    sideArr[index].inUse = !sideArr[index].inUse;
    setSideBarList(sideArr);
  }
  const removeHandler = (section, index) => {
    let dataIndex = rootDataSource.findIndex((element) => element.type === section)
    let newArr = [...rootDataSource];
    newArr.splice(dataIndex, 1);
    setRootDataSource(newArr);
    let sideArr = [...sideBarList];
    sideArr[index].inUse = !sideArr[index].inUse;
    setSideBarList(sideArr);
  }

  //handler for buttons beside each section card
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
    let sideArr = [...sideBarList];
    sideArr[SIDEBAR_INDEX[rootDataSource[index].type]].inUse = !sideArr[SIDEBAR_INDEX[rootDataSource[index].type]].inUse;
    setSideBarList(sideArr);
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

        
        {/*dummy section for testing* */
        item.type === 'SortableInputField' ? (
          <SortableInputField sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SortableInputField>
        ) : ( <></> )}

        {item.type === 'AboutThisSubmission' ? (
          <SectionAboutThisSubmission 
           sortableIndex={sortableIndex} 
           editing={item.editing} 
           data={item.data.payload} 
           rootDataSource={rootDataSource}
           setRootDataSource={setRootDataSource}
           editHandler={editHandler}
           deleteHandler={deleteHandler}
           cancelHandler={cancelHandler}
           setAboutThisSubmission={setAboutThisSubmission} 
          />
        ) : ( <></> )}

        {item.type === 'Attachment' ? (
          <SectionAttachment
            sortableIndex={sortableIndex} 
            //editing={item.editing} 
            deleteHandler={deleteHandler}
          />
        ) : ( <></> )}

        {item.type === 'DescriptionOfContent' ? (
          <SectionDescriptionOfContent
            sortableIndex={sortableIndex} 
            editing={item.editing} 
            data={item.data.payload} 
            rootDataSource={rootDataSource}
            setRootDataSource={setRootDataSource}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            cancelHandler={cancelHandler}
            setDescriptionOfContent={setDescriptionOfContent} 
          />
        ) : ( <></> )}

        {item.type === 'EntityLogoAndHeader' ? (
          <SectionEntityLogoAndHeader
           sortableIndex={sortableIndex} 
           editing={item.editing} 
           data={item.data.payload} 
           rootDataSource={rootDataSource}
           setRootDataSource={setRootDataSource}
           editHandler={editHandler}
           deleteHandler={deleteHandler}
           cancelHandler={cancelHandler}
           setEntityLogoAndHeader={setEntityLogoAndHeader} 
          />
        ) : ( <></> )}

        {item.type === 'FutureReply' ? (
          <SectionFutureReply
           sortableIndex={sortableIndex} 
           editing={item.editing} 
           data={item.data.payload} 
           rootDataSource={rootDataSource}
           setRootDataSource={setRootDataSource}
           editHandler={editHandler}
           deleteHandler={deleteHandler}
           cancelHandler={cancelHandler}
           setFutureReply={setFutureReply}
          />
        ) : ( <></> )}

        {item.type === 'Reference' ? (
          <SectionReference
            sortableIndex={sortableIndex} 
            editing={item.editing} 
            data={item.data.payload} 
            rootDataSource={rootDataSource}
            setRootDataSource={setRootDataSource}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            cancelHandler={cancelHandler}
            setReferenceSection={setReference} 
          />
        ) : ( <></> )}

        {item.type === 'Salutation' ? (
          <SectionSalutation
            sortableIndex={sortableIndex} 
            editing={item.editing} 
            data={item.data.payload} 
            rootDataSource={rootDataSource}
            setRootDataSource={setRootDataSource}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            cancelHandler={cancelHandler}
            setSalutationSection={setSalutation}
          />
        ) : ( <></> )}

        {item.type === 'SignOff' ? (
          <SectionSignOff
           sortableIndex={sortableIndex} 
           editing={item.editing} 
           data={item.data.payload} 
           rootDataSource={rootDataSource}
           setRootDataSource={setRootDataSource}
           editHandler={editHandler}
           deleteHandler={deleteHandler}
           cancelHandler={cancelHandler}
           setSignOff={setSignOff}
          />
        ) : ( <></> )}

        {item.type === 'Title' ? (
          <SectionTitle
            sortableIndex={sortableIndex} 
            editing={item.editing} 
            data={item.data.payload} 
            rootDataSource={rootDataSource}
            setRootDataSource={setRootDataSource}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            cancelHandler={cancelHandler}
            setTitleSection={setTitle}
          />
        ) : ( <></> )}
          

        {/*
        <Col flex="auto" style={{ maxWidth: '80%' }}>
          {item.type === 'SortableInputField' ? (
            <SortableInputField sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SortableInputField>
          ) : ( <></> )}

          {item.type === 'AboutThisSubmission' ? (
            <SectionAboutThisSubmission sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionAboutThisSubmission>
          ) : ( <></> )}

          {item.type === 'Attachment' ? (
            <SectionAttachment sortableIndex={sortableIndex} editing={item.editing} updateRootElement={updateRootElement}></SectionAttachment>
          ) : ( <></> )}

          {item.type === 'DescriptionOfContent' ? (
            <SectionDescriptionOfContent sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionDescriptionOfContent>
          ) : ( <></> )}

          {item.type === 'EntityLogoAndHeader' ? (
            <SectionEntityLogoAndHeader sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionEntityLogoAndHeader>
          ) : ( <></> )}

          {item.type === 'FutureReply' ? (
            <SectionFutureReply sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionFutureReply>
          ) : ( <></> )}

          {item.type === 'Reference' ? (
            <SectionReference sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionReference>
          ) : ( <></> )}

          {item.type === 'Salutation' ? (
            <SectionSalutation sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionSalutation>
          ) : ( <></> )}

          {item.type === 'SignOff' ? (
            <SectionSignOff sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionSignOff>
          ) : ( <></> )}

          {item.type === 'Title' ? (
            <SectionTitle sortableIndex={sortableIndex} editing={item.editing} data={item.data.payload} updateRootElement={updateRootElement}></SectionTitle>
          ) : ( <></> )}
        </Col>
        <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
          {item.editing ? (
            <>
              {item.type != 'Attachment'?
                <Button style={{ margin: '4px' }} icon={<CheckOutlined onClick={() => confirmHandler(sortableIndex)} />} size="small" />:''
              }
              <Button style={{ margin: '4px' }} icon={<CloseOutlined onClick={() => cancelHandler(sortableIndex)} />} size="small" />
            </>
          ) : (
            <>
              {item.type != 'Attachment'?
                <Button style={{ margin: '4px' }} icon={<EditOutlined onClick={() => editHandler(sortableIndex)} />} size="small" />:''
              }
              <Button style={{ margin: '4px' }} icon={<DeleteOutlined onClick={() => deleteHandler(sortableIndex)} />} size="small" />
            </>
          )}
        </Col>
            */}
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
                (item.inUse)?
                //the buttons need add/remove section handler
                (<Button
                 style={{margin: '4px', borderRadius: '4px', width: '100%', padding: '0px'}} 
                 onClick={() => removeHandler(item.type, index)}
                 > 
                  <Row>
                    <Col flex="30px" style={{ padding: '0px' }}> <MinusCircleOutlined /> </Col>
                    <Col flex="auto" style={{ padding: '0px' }}> {item.title}  </Col>
                    <Col flex="20px" style={{ padding: '0px' }}>  {(item.mandatory)? <>*</> : <></>} </Col>
                  </Row>
                </Button>) :
                (<Button
                 type="primary" 
                 style={{margin: '4px', borderRadius: '4px', width: '100%', padding: '0px'}} 
                 onClick={() => addHandler(item.type, index)}
                 > 
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
        <Col flex="auto" style={{ maxWidth: '79%' }}>
          {
            (rootDataSource.length > 0)?
              (
                <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                  {rootDataSource.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} item={value} sortableIndex={index} />
                  ))}
                </SortableContainer>
              ):(
                  <EmptyContainer/>
                )
          }
        </Col>
      </Row>
    </div>
  );
};

export default DNDPanel;
