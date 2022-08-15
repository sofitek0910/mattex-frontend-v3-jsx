import { COLUMN, COMPONENT, ROW } from './constants';

const initialData = {
  layout: [
    {
      type: ROW,
      id: 'row0',
      children: [
        {
          type: COLUMN,
          id: 'column0',
          children: [
            {
              type: COMPONENT,
              id: 'component0',
            },
            {
              type: COMPONENT,
              id: 'component1',
            },
          ],
        },
        {
          type: COLUMN,
          id: 'column1',
          children: [
            {
              type: COMPONENT,
              id: 'component2',
            },
          ],
        },
      ],
    },
    {
      type: ROW,
      id: 'row1',
      children: [
        {
          type: COLUMN,
          id: 'column2',
          children: [
            {
              type: COMPONENT,
              id: 'component3',
            },
            {
              type: COMPONENT,
              id: 'component0',
            },
            {
              type: COMPONENT,
              id: 'component2',
            },
          ],
        },
      ],
    },
  ],
  components: {
    component0: { id: 'component0', type: 'Input', content: 'Input' },
    component1: { id: 'component1', type: 'Image', content: 'Image Component' },
    component2: { id: 'component2', type: 'Draggable Table', content: 'Draggable Table' },
    component3: { id: 'component3', type: 'Draggable List', content: 'Draggable List' },
    component4: { id: 'component4', type: 'phone', content: 'Some phone' },
  },
};

export default initialData;
