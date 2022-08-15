import { Button, Col, Row } from 'antd';
import { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENT } from './../constants';

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  DragOutlined,
  EditOutlined,
} from '@ant-design/icons';

// import DraggableTable from "./DraggableTable";
import DraggableTable from './DraggableEditableTable';
import DraggableList from './DraggableList';
import HeaderComponent from './HeaderComponent';
import ImageComponent from './ImageComponent';
import InputComponent from './InputComponent';
import LabelComponent from './LabelComponent';
import RadioComponent from './RadioComponent';
import SectionAboutThisSubmission from './SectionAboutThisSubmission';
import SectionAttachment from './SectionAttachment';
import SectionDescriptionOfContent from './SectionDescriptionOfContent';
import SectionEntityLogoAndHeader from './SectionEntityLogoAndHeader';
import SectionFutureReply from './SectionFutureReply';
import SectionReference from './SectionReference';
import SectionSalutation from './SectionSalutation';
import SectionSignOff from './SectionSignOff';
import SectionTitle from './SectionTitle';
import TextAreaComponent from './TextAreaComponent';

import SortableInputField from './SortableInputField';
const style = {
  // border: '1px solid #EBEBEB',
  borderRadius: '4px',
  padding: '0.5rem 1rem',
  //backgroundColor: "#F6F6F8",
  backgroundColor: '#FFFFFF',
  cursor: 'move',
};
const Component = ({ data, handleRemove, components, path }) => {
  const ref = useRef(null);

  const [editing, setEditing] = useState(false);
  //   console.log(`ref: ${JSON.stringify(ref)}`);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: {
      id: data.id,
      path: path,
      type: COMPONENT,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];

  const confirmHandler = () => {
    setEditing(false);
  };
  const cancelHandler = () => {
    setEditing(false);
  };
  const editHandler = () => {
    setEditing(true);
  };
  const deleteHandler = (item) => {
    console.log(`deleteHandler: ${path}`);
    setEditing(false);
    handleRemove(path);
  };

  return (
    <div ref={ref} style={{ ...style, opacity }} className="component draggable">
      {/* <div className="componentTitle" >{data.id}</div> */}
      {/* <hr className="componentDividor" ></hr> */}
      {/* <div>{component.content}</div> */}

      <Row>
        <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
          <Row type="flex" align="middle" style={{ verticalAlign: 'middle', margin: 'auto' }}>
            <Col style={{ verticalAlign: 'middle', margin: 'auto' }}>
              {/* <PlayCircleFilled
              style={{  verticalAlign: 'middle', }}
            /> */}
              <Button
                style={{ verticalAlign: 'middle', margin: 'auto' }}
                icon={<DragOutlined />}
                size="small"
              />
            </Col>
          </Row>
        </Col>

        <Col flex="auto" style={{ maxWidth: '80%' }}>
          {component.content === 'Input' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <InputComponent></InputComponent>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'Draggable Table' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <DraggableTable></DraggableTable>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'Draggable List' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <DraggableList editing={editing}></DraggableList>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'Image Component' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <ImageComponent></ImageComponent>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'Header Component' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <HeaderComponent></HeaderComponent>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'Radio Component' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <RadioComponent></RadioComponent>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'Label Component' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <LabelComponent></LabelComponent>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'TextArea Component' ? (
            <div style={{ margin: '8px' }}>
              {' '}
              <TextAreaComponent></TextAreaComponent>{' '}
            </div>
          ) : (
            <></>
          )}

          {component.content === 'EntityLogoAndHeader' ? (
            <SectionEntityLogoAndHeader></SectionEntityLogoAndHeader>
          ) : (
            <></>
          )}

          {component.content === 'Salutation' ? (
            <SectionSalutation editing={editing}></SectionSalutation>
          ) : (
            <></>
          )}

          {component.content === 'Title' ? <SectionTitle editing={editing}></SectionTitle> : <></>}

          {component.content === 'Reference' ? (
            <SectionReference editing={editing}></SectionReference>
          ) : (
            <></>
          )}

          {component.content === 'Attachment' ? (
            <SectionAttachment editing={editing}></SectionAttachment>
          ) : (
            <></>
          )}

          {component.content === 'DescriptionOfContent' ? (
            <SectionDescriptionOfContent editing={editing}></SectionDescriptionOfContent>
          ) : (
            <></>
          )}

          {component.content === 'AboutThisSubmission' ? (
            <SectionAboutThisSubmission editing={editing}></SectionAboutThisSubmission>
          ) : (
            <></>
          )}

          {component.content === 'FutureReply' ? (
            <SectionFutureReply editing={editing}></SectionFutureReply>
          ) : (
            <></>
          )}

          {component.content === 'SignOff' ? (
            <SectionSignOff editing={editing}></SectionSignOff>
          ) : (
            <></>
          )}

          {component.content === 'SortableInputField' ? (
            <SortableInputField editing={editing}></SortableInputField>
          ) : (
            <></>
          )}
        </Col>
        <Col flex="32px" style={{ verticalAlign: 'middle', margin: 'auto' }}>
          {editing ? (
            <>
              <Button icon={<CheckOutlined onClick={confirmHandler} />} size="small" />
              <Button icon={<CloseOutlined onClick={cancelHandler} />} size="small" />
            </>
          ) : (
            <>
              <Button icon={<EditOutlined onClick={editHandler} />} size="small" />
              <Button icon={<DeleteOutlined onClick={deleteHandler} />} size="small" />
            </>
          )}
        </Col>
      </Row>
      {/* <div>{path}</div> */}
    </div>
  );
};
export default Component;
