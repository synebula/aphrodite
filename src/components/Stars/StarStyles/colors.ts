const colors = {
  primary: '#1890ff',
  red: '#f5222d',
  'light-grey': '#f0f0f0',
  grey: '#c0c0c0',
  green: '#73d13d',
};
export default colors;

export const tagColors = {
  magenta: 'magenta',
  red: 'red',
  volcano: 'volcano',
  orange: 'orange',
  gold: 'gold',
  lime: 'lime',
  green: 'green',
  cyan: 'cyan',
  blue: 'blue',
  geekblue: 'geekblue',
  purple: 'purple',
};

export function randomColor() {
  const keys = Object.keys(colors);
  const index = Math.floor(Math.random() * keys.length);
  return colors[keys[index]];
}

export function tagColor(index: number) {
  const keys = Object.keys(tagColors);
  return tagColors[keys[(index + 4) % keys.length]];
}
