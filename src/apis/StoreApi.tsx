import axios from "axios";
import { StoreItem } from "../types";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getStoreItems = () => {
  return api.get("/products");
};

export const deleteItem = (id: number) => {
  return api.delete(`/products/${id}`);
};

export const postItem = (post: StoreItem) => {
  return api.post("/products", post);
};
