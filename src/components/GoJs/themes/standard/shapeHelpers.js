import personCardIcon from './images/PersonCard.png';
import commentIcon from './images/comment.png';

export const person = {
  name: '',
  title: '',
  figure: 'Rectangle',
  stroke: '#1d5c92',
  strokeCap: 'round',
  strokeWidth: 1,
  type: 'person',
  sidebarIcon: personCardIcon,
  category: 'Person',
};

export const department = {
  name: 'department',
  figure: 'RoundedRectangle',
  fill: 'lightblue',
  type: 'department',
  category: 'Department',
};

export const toDo = {
  name: '',
  title: '',
  category: 'ToDo',
};

export const text = {
  text: 'Text',
  name: 'text',
  title: 'Title',
  figure: 'Rectangle',
  fill: 'lightyellow',
  stroke: '#1d5c92',
  category: 'TextLabel',
};

export const comment = {
  category: 'Comment',
  text: 'Text',
  figure: 'Cloud',
  fill: 'lightyellow',
  stroke: '#1d5c92',
  sidebarIcon: commentIcon,
};

export default {
  person,
  department,
  comment,
  text,
  toDo,
};
