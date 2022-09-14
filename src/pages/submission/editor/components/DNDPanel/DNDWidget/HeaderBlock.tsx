import React, { useRef, useState, useEffect } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import { Card, Space, Button, Row, Col, Input } from 'antd';
import { DragOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { Project, DragItem } from '../../../../../../interfaces/interfaces';

//temp hardcode
import client_logo_1 from './client_logo_2.png';
import client_logo_2 from './client_logo_2.png';
import constructor_logo from './constructor_logo.png';

const { TextArea } = Input;

interface props {
  blockType: string;
  index: number;
  project: Project | null;
  editing: boolean;
  //builderMode: boolean
  client_logoVisible: boolean;
  setClient_logoVisible: React.Dispatch<React.SetStateAction<boolean>>;
  constructor_logoVisible: boolean;
  setConstructor_logoVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ctrlNumVisible: boolean;
  setCtrlNumVisible: React.Dispatch<React.SetStateAction<boolean>>;
  moveHeaderBlock: (dragIndex: number, hoverIndex: number) => void;
}

/*******dnd stuff****** */
const ItemTypes = {
  BLOCK: 'block',
};

const style = {
  cursor: 'move',
};
/*******dnd stuff end****** */

function HeaderBlock({
  blockType,
  index,
  project,
  editing,
  client_logoVisible,
  setClient_logoVisible,
  constructor_logoVisible,
  setConstructor_logoVisible,
  ctrlNumVisible,
  setCtrlNumVisible,
  moveHeaderBlock,
}: props) {
  /*********dnd stuff******** */
  //https://codesandbox.io/s/l5730?file=/src/Card.tsx:836-840
  //https://medium.com/kustomerengineering/building-complex-nested-drag-and-drop-user-interfaces-with-react-dnd-87ae5b72c803

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.BLOCK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      //(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging to right
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging to left
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      moveHeaderBlock(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BLOCK,
    item: () => {
      return { index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  /*******dnd stuff end****** */

  const getSpan = () => {
    let span = 24;
    if (client_logoVisible) {
      span -= 3;
    }
    if (constructor_logoVisible) {
      span -= 3;
    }
    if (ctrlNumVisible) {
      span -= 5;
    }
    return span;
  };

  switch (blockType) {
    case 'client_logo':
      if (client_logoVisible || editing) {
        return (
          <Col
            span={3}
            style={{ display: 'flex', textAlign: 'center' }}
            ref={ref}
            data-handler-id={handlerId}
            className="space-align-container"
          >
            <Card
              size="small"
              style={{ height: '100%' }}
              bodyStyle={{ height: '70%' }}
              actions={
                editing
                  ? [
                      <Button
                        type="default"
                        icon={<DragOutlined />}
                        //onClick={checkClickHandler}
                        size="small"
                        style={{ ...style }}
                      ></Button>,
                      <Button
                        type="default"
                        icon={client_logoVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        onClick={() => setClient_logoVisible(!client_logoVisible)}
                        size="small"
                      ></Button>,
                    ]
                  : []
              }
            >
              <img src={client_logo_1} className="headerSectionImg" alt="Logo"></img>
            </Card>
          </Col>
        );
      } else {
        return <></>;
      }

    case 'proj_info':
      return (
        <Col
          //span={(ctrlNumVisible||editing)?13:18}
          span={editing ? 13 : getSpan()}
          style={{ display: 'flex' }}
          ref={ref}
          data-handler-id={handlerId}
          className="space-align-container"
        >
          <Card
            size="small"
            style={{ width: '100%', height: '100%' }}
            bodyStyle={{ height: '70%' }}
            actions={
              editing
                ? [
                    <Button
                      type="default"
                      icon={<DragOutlined />}
                      //onClick={checkClickHandler}
                      size="small"
                      style={{ ...style }}
                    ></Button>,
                  ]
                : []
            }
          >
            <p>
              <Input
                placeholder={project ? 'Contract No.: ' + project.project_code : 'Contract No.'}
                disabled
                style={{ textAlign: 'center' }}
              />
            </p>
            <p>
              <TextArea
                placeholder={project ? project.project_display_name : 'Project Name'}
                autoSize={{ maxRows: 2 }}
                disabled
                style={{ textAlign: 'center' }}
              />
            </p>
          </Card>
        </Col>
      );

    case 'constructor_logo':
      if (constructor_logoVisible || editing) {
        return (
          <Col
            span={3}
            style={{ display: 'flex', textAlign: 'center' }}
            ref={ref}
            data-handler-id={handlerId}
            className="space-align-container"
          >
            <Card
              size="small"
              bodyStyle={{ height: '70%' }}
              style={{ height: '100%' }}
              actions={
                editing
                  ? [
                      <Button
                        type="default"
                        icon={<DragOutlined />}
                        //onClick={checkClickHandler}
                        size="small"
                        style={{ ...style }}
                      ></Button>,
                      <Button
                        type="default"
                        icon={constructor_logoVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        onClick={() => setConstructor_logoVisible(!constructor_logoVisible)}
                        size="small"
                      ></Button>,
                    ]
                  : []
              }
            >
              <img src={constructor_logo} className="headerSectionImg"></img>
            </Card>
          </Col>
        );
      } else {
        return <></>;
      }
    case 'cntr_num':
      if (ctrlNumVisible || editing) {
        return (
          <Col
            span={5}
            style={{ display: 'flex' }}
            ref={ref}
            data-handler-id={handlerId}
            className="space-align-container"
          >
            <Card
              size="small"
              style={{ height: '100%' }}
              bodyStyle={{ height: '70%' }}
              actions={
                editing
                  ? [
                      <Button
                        type="default"
                        icon={<DragOutlined />}
                        //onClick={checkClickHandler}
                        size="small"
                        style={{ ...style }}
                      ></Button>,
                      <Button
                        type="default"
                        icon={ctrlNumVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        onClick={() => setCtrlNumVisible(!ctrlNumVisible)}
                        size="small"
                      ></Button>,
                    ]
                  : []
              }
            >
              <p>Form Control Number:</p>
              <p>
                <TextArea
                  //placeholder="Input text here"
                  autoSize={{ minRows: 1, maxRows: 1 }}
                  disabled
                />
              </p>
            </Card>
          </Col>
        );
      } else {
        return <></>;
      }

    default:
      return <></>;
  }
}

export default HeaderBlock;
