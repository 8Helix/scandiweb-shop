export const changeCurrency = (payload) => {
  return { type: "CHANGE_CURRENCY", payload };
};

export const updateCart = (payload) => {
  return { type: "ADD_PRODUCT", payload };
};

export const updateAmount = (payload) => {
  return { type: "UPDATE_AMOUNT", payload };
};

export const deleteProduct = (payload) => {
  return { type: "DELETE_PRODUCT", payload };
};
