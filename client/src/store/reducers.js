import { combineReducers } from "@reduxjs/toolkit";

const currencyStore = {
  currency: "USD",
};

const productStore = {
  products: [],
};

const currencyReducer = (state = currencyStore, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};

const productReducer = (state = productStore, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const foundProduct = state.products.find(
        (item) => item.id === action.payload.id
      );

      if (foundProduct) {
        const index = state.products.indexOf(foundProduct);
        return {
          products: [
            ...state.products.slice(0, index),
            action.payload,
            ...state.products.slice(index + 1),
          ],
        };
      } else {
        return {
          products: [...state.products, action.payload],
        };
      }

    case "DELETE_PRODUCT":
      const foundForDelete = state.products.find(
        (item) => item.id === action.payload.id
      );
      const indexFordelete = state.products.indexOf(foundForDelete);
      return {
        products: [
          ...state.products.slice(0, indexFordelete),
          ...state.products.slice(indexFordelete + 1),
        ],
      };

    case "UPDATE_AMOUNT":
      const foundForUpdate = state.products.find(
        (item) => item.id === action.payload.id
      );
      const indexForUpdate = state.products.indexOf(foundForUpdate);
      return {
        products: [
          ...state.products.slice(0, indexForUpdate),
          { ...state.products[indexForUpdate], amount: action.payload.amount },
          ...state.products.slice(indexForUpdate + 1),
        ],
      };

    default:
      return state;
  }
};

export default combineReducers({
  currencyReducer,
  productReducer,
});
