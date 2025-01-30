import { useEffect, useState } from "react";
import { deleteItem, getStoreItems } from "../apis/StoreApi";
import { StoreItem } from "../types";
import Form from "./Form";

const Store = () => {
  const [storeData, setStoreData] = useState<StoreItem[]>([]);

  const getStoreData = async () => {
    try {
      const res = await getStoreItems();
      setStoreData(res.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    getStoreData();
  }, []);

  const handleDeletePost = async (id: number) => {
    try {
      const res = await deleteItem(id);
      if (res.status === 200) {
        const newStoreData = storeData.filter((curr) => {
          return curr.id != id;
        });
        setStoreData(newStoreData);
      }
    } catch (error) {
      console.error("Error deleting the item", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Form storeData={storeData} setStoreData={setStoreData} />
      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {storeData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 truncate mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-start items-center">
                  <p className="font-bold text-2xl text-gray-800 mr-4">
                    &#8377;{Math.round(Number(item.price))}
                  </p>
                  <div className="flex ml-auto">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
                    >
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => handleDeletePost(item.id)}
                    >
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Store;
