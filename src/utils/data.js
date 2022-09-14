export const submissionStatusTypes = [
  {
    text: 'Work in Progress',
    styles: {
      color: 'rgba(0, 142, 211, 1)',
      background: 'rgba(221, 244, 255, 1)',
    },
    id: 0,
  },
  {
    text: 'Approved',
    styles: { color: 'rgba(20, 182, 57, 1)', background: 'rgba(222, 250, 221, 1)' },
    id: 1,
  },
  {
    text: 'Approved with Comments',
    styles: {
      color: 'rgba(1, 98, 75, 1)',
      background: 'rgba(237, 255, 251, 1)',
    },
    id: 2,
  },
  {
    text: 'Awaiting Approval',
    styles: {
      color: 'rgba(234, 162, 9, 1)',
      background: 'rgba(255, 244, 219, 1)',
    },
    id: 3,
  },
  {
    text: 'Cancelled',
    styles: {
      color: 'rgba(113, 112, 112, 1)',
      background: 'rgba(244, 244, 244, 1)',
    },
    id: 4,
  },
  {
    text: 'Rejected',
    styles: { color: 'rgba(210, 51, 1, 1)', background: 'rgba(255, 238, 238, 1)' },
    id: 5,
  },
  {
    text: 'N/A',
    styles: {
      border: '1px solid rgb(215, 215, 215)',
      background: 'white',
      color: 'rgb(113, 112, 112)',
    },
    id: 6,
  },
];
