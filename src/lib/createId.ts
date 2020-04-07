const localStorageKey = '_idMax';

let id: number = parseInt(window.localStorage.getItem(localStorageKey) || '0') || 0;

function createId() {
  id++;

  window.localStorage.setItem(localStorageKey, id.toString());

  return id;
}

export default createId;