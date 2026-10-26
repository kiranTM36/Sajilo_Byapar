import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { getProducts } from "../store/productSlice";

interface InventoryItem {
  productId: string;
  quantity: string;
  purchasedPrice: string;
}

const AddInventory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector(
    (state: RootState) => state.product
  );

  const [batchNo, setBatchNo] = useState("");
  const [items, setItems] = useState<InventoryItem[]>([
    { productId: "", quantity: "", purchasedPrice: "" }
  ]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (
    index: number,
    field: keyof InventoryItem,
    value: string
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addProduct = () => {
    setItems([
      ...items,
      { productId: "", quantity: "", purchasedPrice: "" }
    ]);
  };

  const removeProduct = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !batchNo.trim() ||
      items.some(
        item =>
          !item.productId ||
          Number(item.quantity) <= 0 ||
          item.purchasedPrice === "" ||
          Number(item.purchasedPrice) < 0
      )
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/inventory/add",
        {
          batchNo,
          items: items.map(item => ({
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            purchasedPrice: Number(item.purchasedPrice)
          }))
        }
      );

      if (response.data.success) {
        alert("Inventory added successfully!");

        setBatchNo("");
        setItems([
          { productId: "", quantity: "", purchasedPrice: "" }
        ]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add inventory.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Add Inventory
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">
            Batch Number
          </label>

          <input
            type="text"
            placeholder="Enter batch number"
            value={batchNo}
            onChange={e => setBatchNo(e.target.value)}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 border rounded-lg p-4"
          >
            <div>
              <label className="block mb-2 text-sm font-medium">
                Product
              </label>

              <select
                value={item.productId}
                onChange={e =>
                  handleChange(index, "productId", e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              >
                <option value="">Select Product</option>

                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                placeholder="Quantity"
                value={item.quantity}
                onChange={e =>
                  handleChange(index, "quantity", e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Purchase Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Purchase price"
                value={item.purchasedPrice}
                onChange={e =>
                  handleChange(index, "purchasedPrice", e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeProduct(index)}
                disabled={items.length === 1}
                className="w-full rounded-lg bg-red-500 text-white p-3 hover:bg-red-600 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addProduct}
            className="rounded-lg border px-5 py-3 hover:bg-gray-100"
          >
            + Add Product
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 text-white px-5 py-3 hover:bg-blue-700"
          >
            Save Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;