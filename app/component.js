export default (text = 'Hello To you') => {
  const element = document.createElement('div');
  const hello = "hello";
  element.innerHTML = text + `${hello} my name is SSSSSLOL`;

  return element;
};
