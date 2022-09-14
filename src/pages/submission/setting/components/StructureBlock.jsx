import React from 'react';
import { Button, Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { STRUCTURE_TYPE } from '../blockTypeDefinition';

const StructureBlock = ({ blockType, usage, setList }) => {
  if (usage === 'preview') {
    //blocks shown in preview mode
    if (blockType in STRUCTURE_TYPE) {
      return (
        <span
          style={{
            display: 'inline-block',
            padding: '16px 8px 16px',
            margin: '4px',
            background: STRUCTURE_TYPE[blockType].color,
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {STRUCTURE_TYPE[blockType].title}
          </div>
          <div style={{ fontSize: '12px' }}>{STRUCTURE_TYPE[blockType].description}</div>
        </span>
      );
    } else {
      return (
        <span
          style={{
            display: 'inline-block',
            padding: '16px 8px 16px',
            background: '#FDF6F0',
            margin: '4px',
            height: '74px',
            top: '-20px',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 'bold', top: '5px', position: 'relative' }}>
            {blockType}
          </div>
        </span>
      );
    }
  } else if (usage === 'addable') {
    //addable buttons of different types (left side in edit mode)
    return (
      <Button
        style={{
          margin: '4px',
          borderRadius: '4px',
          height: '50px',
          width: '100%',
          padding: '8px 0',
          background: STRUCTURE_TYPE[blockType].color,
        }}
        onClick={() => setList(blockType)}
      >
        <Row>
          <Col flex="auto" style={{ top: '-5px', textAlign: 'left', padding: '0 16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {STRUCTURE_TYPE[blockType].title}
            </div>
            <div style={{ fontSize: '12px' }}>{STRUCTURE_TYPE[blockType].description}</div>
          </Col>
          <Col
            flex="50px"
            style={{
              fontSize: '24px',
              padding: '0px',
              top: '-3px',
              position: 'relative',
            }}
          >
            <PlusCircleOutlined />
          </Col>
        </Row>
      </Button>
    );
  }
};
export default StructureBlock;
