import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddItem() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    barcode: "",
    quantity: 0,
    price: 0.0,
    categoryId: "",
    typeId: "",
    supplierId: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Use the input's id as the key to update the corresponding value in formData
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form Data:", JSON.stringify(formData, null, 2)); // Log the formData as a JSON object
  };

  return (
    <Card className="mx-auto w-full">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 m">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="Item name" required />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={formData.description} onChange={handleInputChange} placeholder="Item description" />
            </div>

            {/* SKU */}
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" value={formData.sku} onChange={handleInputChange} placeholder="Unique SKU" required />
            </div>

            {/* Barcode */}
            <div className="grid gap-2">
              <Label htmlFor="barcode">Barcode</Label>
              <Input id="barcode" value={formData.barcode} onChange={handleInputChange} placeholder="Barcode (optional)" />
            </div>

            {/* Quantity */}
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" value={formData.quantity} onChange={handleInputChange} type="number" placeholder="0" required />
            </div>

            {/* Price */}
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" value={formData.price} onChange={handleInputChange} type="number" step="0.01" placeholder="Price" required />
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <Label htmlFor="categoryId">Category</Label>
              <select id="categoryId" value={formData.categoryId} onChange={handleInputChange} className="border rounded p-2" required>
                <option value="">Select category</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
              </select>
            </div>

            {/* Type */}
            <div className="grid gap-2">
              <Label htmlFor="typeId">Type</Label>
              <select id="typeId" value={formData.typeId} onChange={handleInputChange} className="border rounded p-2" required>
                <option value="">Select type</option>
                <option value="1">Type 1</option>
                <option value="2">Type 2</option>
              </select>
            </div>

            {/* Supplier */}
            <div className="grid gap-2">
              <Label htmlFor="supplierId">Supplier</Label>
              <select id="supplierId" value={formData.supplierId} onChange={handleInputChange} className="border rounded p-2" required>
                <option value="">Select supplier</option>
                <option value="1">Supplier 1</option>
                <option value="2">Supplier 2</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              Add Item
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
