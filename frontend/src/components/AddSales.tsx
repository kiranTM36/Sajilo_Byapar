
import { useState } from "react";
import axios from "axios";
import config  from "../config/config";

interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

const AddSales = () => {
  const [customerId, setCustomerId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [products, setProducts] = useState<SaleItem[]>([
    { productId: "", quantity: 1, price: 0 },
  ]);
  const [loading, setLoading] = useState(false);

  const totalAmount = products.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const dueAmount = totalAmount - Number(paidAmount || 0);

  const handleChange = (
    index: number,
    field: keyof SaleItem,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "productId" ? value : Number(value),
            }
          : item
      )
    );
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      { productId: "", quantity: 1, price: 0 },
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts((prev) =>
      prev.length === 1
        ? [{ productId: "", quantity: 1, price: 0 }]
        : prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customerId || products.some(
      (item) => !item.productId || item.quantity <= 0 || item.price < 0
    )) {
      alert("Enter valid customer and product details");
      return;
    }

    const paid = Number(paidAmount || 0);

    if (paid < 0 || paid > totalAmount || totalAmount <= 0) {
      alert("Enter a valid paid amount");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${config}sales/add`,
        {
          customerId: Number(customerId),
          totalAmount,
          paidAmount: paid,
          products: products.map((item) => ({
            productId: Number(item.productId),
            quantity: item.quantity,
            price: item.price,
          })),
        },
        { withCredentials: true }
      );

      alert("Sale created successfully");

      setCustomerId("");
      setPaidAmount("");
      setProducts([{ productId: "", quantity: 1, price: 0 }]);
    } catch (error) {
      console.error(error);
      alert("Failed to create sale");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00855D]";

  return (
    <div className="p-5">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-5"
      >
        {/* Products */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Customer ID
            </label>
            <input
              type="number"
              min="1"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter customer ID"
              className={inputClass}
              required
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Products</h2>
            <button
              type="button"
              onClick={addProduct}
              className="text-sm text-[#00855D] font-medium"
            >
              + Add Product
            </button>
          </div>

          <div className="space-y-4">
            {products.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">
                    Product {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    min="1"
                    placeholder="Product ID"
                    value={item.productId}
                    onChange={(e) =>
                      handleChange(index, "productId", e.target.value)
                    }
                    className={inputClass}
                    required
                  />

                  <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    className={inputClass}
                    required
                  />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    className={inputClass}
                    required
                  />
                </div>

                <p className="text-right text-sm mt-3 text-gray-600">
                  Subtotal: Rs. {item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 h-fit">
          <h2 className="font-semibold mb-5">Payment Details</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-semibold">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Paid Amount
              </label>
              <input
                type="number"
                min="0"
                max={totalAmount}
                step="0.01"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                placeholder="Enter paid amount"
                className={inputClass}
                required
              />
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 text-sm">
              <span className="text-gray-500">Due Amount</span>
              <span className="font-semibold text-red-600">
                Rs. {dueAmount.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00855D] text-white rounded-md py-2.5 hover:bg-[#006e4c] disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Create Sale"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSales;