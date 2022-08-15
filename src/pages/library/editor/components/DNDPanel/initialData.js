// import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';
export const INITIAL_DATA = [
  {
    id: uuidv4(),
    type: 'SectionAboutThisSubmission',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionAttachment',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionDescriptionOfContent',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionEntityLogoAndHeader',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionFutureReply',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionReference',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionSalutation',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionSignOff',
    editing: false,
    data: {}
  },
  {
    id: uuidv4(),
    type: 'SectionTitle',
    editing: false,
    data: {}
  },
  {
      type: 'SortableInputField',
      editing: false,
      data: {
        payload: [
            { label: 'Submission Master FIlling Ref.:', value: '' },
            { label: 'Specification Reference:', value: '' },
            { label: 'Drawing Reference:', value: '' },
            { label: 'BD Reference:', value: '' },
          ]
      }
  },
//   {
//       type: 'EntityLogoAndHeader',
//       title: 'EntityLogoAndHeader',
//       editing: false,
//       data: {}
//   },
//   {
//       type: 'Salutation',
//       title: 'Salutation',
//       editing: false,
//       data: {
//         to: '',
//         attn: '',
//         vidible: false
//       }
//   },
//   {
//       type: 'Title',
//       title: 'Title',
//       editing: false,
//       data: {
//         title: '',
//         projectLevelId: '',
//         payload: [{ key: 'Free Text Title', value: '' }]
//       }
//   },
//   {
//       type: 'Reference',
//       title: 'Reference',
//       editing: false,
//       data: {
//         payload: [
//             { key: 'Submission Master FIlling Ref.:', value: '' },
//             { key: 'Specification Reference:', value: '' },
//             { key: 'Drawing Reference:', value: '' },
//             { key: 'BD Reference:', value: '' },
//           ]
//       }
//   },
//   {
//       type: 'Attachment',
//       title: 'Attachment',
//       editing: false,
//       payload: [{
//         label: ['Yes', 'No'],
//         selected: 'Yes'
//       }]
//   },
//   {
//       type: 'DescriptionOftitle',
//       title: 'DescriptionOftitle',
//       disabled: false,
//       mandatory: true,
//   },
//   {
//       type: 'AboutThisSubmission',
//       title: 'AboutThisSubmission',
//       disabled: false,
//       mandatory: true,
//   },
//   {
//       type: 'FutureReply',
//       title: 'FutureReply',
//       disabled: false,
//       mandatory: true,
//   },
//   {
//       type: 'SignOff',
//       title: 'SignOff',
//       disabled: false,
//       mandatory: true,
//   },
];
