// src/components/FloatingButton.tsx

import React, { useState } from "react";
import { convertDashedToCapitalized } from "../../utils";
import { useAppContext } from "../../context/AppContext";
import { addExpense } from "../../apis";

const categories = [
  "housing",
  "transportation",
  "food",
  "utilities",
  "healthcare",
  "child-expense",
  "entertainment",
  "outside-food",
];

const incomeCategories = ["salary", "others"];

const types = ["expense", "income"];

const AddExpense: React.FC = () => {
  const { dispatch } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    type: "expense",
    date: "",
    time: "",
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    // Handle form submission logic (e.g., API call)
    await addExpense({ ...formData, amount: Number(formData.amount) });
    togglePopup();
    dispatch({ type: "SET_LOADING", payload: false });
  };

  return (
    <>
      {/* Floating Add Button */}
      <button
        onClick={togglePopup}
        className="absolute flex place-content-center text-3xl bottom-4 right-4 bg-blue-600 text-white rounded-full h-12 w-12 shadow-lg hover:bg-blue-700 transition"
      >
        +
      </button>

      {/* Popup/Modal */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Type:</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  required
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {convertDashedToCapitalized(type)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  required
                >
                  <option value="">Select a category</option>
                  {(formData.type === "expense"
                    ? categories
                    : incomeCategories
                  ).map((category) => (
                    <option key={category} value={category}>
                      {convertDashedToCapitalized(category)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount:</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time:</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="HH:mm"
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg p-2"
              >
                Add
              </button>
              <button
                type="button"
                onClick={togglePopup}
                className="mt-2 text-red-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddExpense;
