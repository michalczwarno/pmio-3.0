import memoize from 'lru-memoize';
import round from 'utils/round';

const card = {
  defaultFill: 'white', // NOT USED
  background: 'white',
  powerPlayerColor: '#fcefd9', // '#e5f1ff',
  targetColor: 'red',
  border: '#007aff',
  shadowColor: 'rgba(0, 122, 255, .2)',
  width: 120,
  height: 130, // 100
  fontSize: 10,
  fontType: 'Lato',
  icon: {
    height: 15,
    width: 16,
    margin: 15,
  },
  rowIcon: {
    height: 20,
    width: 20,
    margin: 4,
  },
  picture: {
    height: 60,
    width: 60,
    iconSize: 15,
    newMessageColor: '#007aff',
    metColor: 'LimeGreen',
    targetColor: 'red',
  },
  name: {
    fontColor: 'black',
    fontSize: 10,
  },
  title: {
    fontColor: 'grey',
    fontSize: 9,
    height: 24,
  },
  location: {
    fontColor: 'grey',
    fontSize: 10,
    height: 24,
  },
  note: {
    color: '#ffcc00',
  },
};

const textLabel = {
  width: card.width,
  height: 10,
  background: '#ffcc00',
  fontColor: 'black',
  fontSize: 10,
  fontStyle: 'Lato',
};

const department = {
  width: card.width,
  height: 52,
  background: '#5AC8FA',
  fontColor: 'white',
  fontSize: 10,
  fontStyle: 'Lato',
};

const link = {
  color: 'grey',
  width: 1.5, // not used yet
  dottedLine: {
    color: 'gray',
  },
  probablyReportsTo: {
    color: 'lightBlue',
  },
};

const colorLine = {
  height: 10,
  color: '#c6d1de',
};

const orgChart = {
  background: '#ebf0f1', // '#f8f8f8',
  grid: {
    lineColor: '#5c93ba', // 'lightGray',  // '#5c93ba'
    lineWidth1: 0.2,
    lineWidth2: 4,
    width: 5,
    heigh: 5,
  },
  page: {
    width: 1440,
    height: 1130,
  },
};

const calculatedSettings = () => {
  const recalculatedSettings = {
    orgChart,
    card,
    textLabel,
    department,
    colorLine,
    link,
  };
  recalculatedSettings.card.icon.margin = Math.max(
    round((card.width / 5 - card.icon.width) / 2),
    0
  );
  return recalculatedSettings;
};

export default memoize(1)(calculatedSettings)();
