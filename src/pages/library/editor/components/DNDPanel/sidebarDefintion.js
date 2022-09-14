// import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';
export const SIDEBAR_ITEMS = [
//   {
//       type: 'Draggable List',
//       title: 'Draggable List',
//       inUse: false,
//       mandatory: false, 
//   },
  {
      type: 'EntityLogoAndHeader',
      title: 'Entity Logo and Header',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'Salutation',
      title: 'Salutation',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'Title',
      title: 'Title',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'Reference',
      title: 'Reference',
      inUse: false,
      mandatory: false,
  },
  {
      type: 'Attachment',
      title: 'Attachment',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'DescriptionOfContent',
      title: 'Description of Content',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'AboutThisSubmission',
      title: 'About This Submission',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'FutureReply',
      title: 'Future Reply',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'SignOff',
      title: 'Sign Off',
      inUse: false,
      mandatory: true,
  },
//   {
//       type: 'SortableInputField',
//       title: 'SortableInputField',
//       inUse: false,
//       mandatory: true,
//   },
];
