import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { getProducts } from "../store/productSlice";
import { addInventory } from "../store/inventorySlice";

interface Item {
  productId: string;
  quantity: string;
  purchasedPrice: string;
}

const AddInventory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);

  const [batchNo, setBatchNo] = useState("");
  const [items, setItems] = useState<Item[]>([
    { productId: "", quantity: "", purchasedPrice: "" },
  ]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { productId: "", quantity: "", purchasedPrice: "" },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      batchNo,
      items: items.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        purchasedPrice: Number(item.purchasedPrice),
      })),
    };

    dispatch(addInventory(data));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add Inventory
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Add purchased products to your inventory.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="rounded-lg border bg-white p-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Batch Number
            </label>

            <input
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
              placeholder="Enter batch number"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 sm:max-w-md"
              required
            />
          </div>

          <div className="rounded-lg border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-medium text-gray-800">Products</h2>

              <button
                type="button"
                onClick={addItem}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              >
                + Add Product
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]"
                >
                  <select
                    name="productId"
                    value={item.productId}
                    onChange={(e) => handleChange(index, e)}
                    className="min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select product</option>

                    {products.map((product) => (
                      <option key={product.pId} value={product.pId}>
                        {product.productName}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Quantity"
                    min="1"
                    step="1"
                    className="min-w-0 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    required
                  />

                  <input
                    type="number"
                    name="purchasedPrice"
                    value={item.purchasedPrice}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Purchase price"
                    min="0"
                    step="0.01"
                    className="min-w-0 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-30"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end border-t pt-4">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Inventory
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventory;