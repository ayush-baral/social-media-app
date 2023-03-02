export const saveState = (key, data) => {
  localStorage?.setItem(key, JSON?.stringify(data));
};

export const loadState = (key) => {
  localStorage?.getItem(key);
};

export const removeState = (key) => {
  localStorage?.removeItem(key);
};
