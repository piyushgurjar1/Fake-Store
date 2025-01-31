import React, { useState } from "react";
import { postItem } from "../apis/StoreApi";
import { StoreItem } from "../types";

type FormProps = {
  storeData: StoreItem[];
  setStoreData: React.Dispatch<React.SetStateAction<StoreItem[]>>;
};

const Form = ({ storeData, setStoreData }: FormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    price: null, 
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addStoreItem = async () => {
    const res = await postItem({ ...formData, id: Date.now() });
    if (res.status === 200) {
      const newItem: StoreItem = { ...formData, id: Date.now() };
      setStoreData([newItem, ...storeData]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStoreItem();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white p-3 shadow-md rounded-lg"
    >
      <div className="space-y-0.5">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-1 border border-gray-300 rounded-lg"
            placeholder="Enter product title"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700 font-medium">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price ?? ""}
            onChange={handleChange}
            className="w-full mt-1 p-1 border border-gray-300 rounded-lg"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-1 border border-gray-300 rounded-lg"
            placeholder="Enter product description"
            rows={2}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 p-1 border border-gray-300 rounded-lg"
            placeholder="Enter product category"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full mt-1 p-1 border border-gray-300 rounded-lg"
            placeholder="Enter product image URL"
          />
        </div>


        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
