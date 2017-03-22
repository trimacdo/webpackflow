export default (text = 'Hello To you') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  return element;
};