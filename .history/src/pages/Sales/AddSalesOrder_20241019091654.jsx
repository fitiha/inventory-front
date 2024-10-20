import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"; 
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Trash2 } from "lucide-react";

const AddSalesOrder = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    customerId: "",
    expectedShipmentDate: null,
    salesPersonId: "",
    invoiceId: "",
    items: [{ productId: "", quantity: 0, price: 0.0 }],
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle item change
  const handleItemChange = (index, e) => {
    const { id, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][id] = value;
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  // Add new item
  const addItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { productId: "", quantity: 0, price: 0.0 }],
    }));
  };

  // Remove item
  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", JSON.stringify(formData, null, 2));
  };

  return (
    <Card className="mx-auto w-full">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 m-6">
            {/* Customer ID */}
            <div className="grid gap-2">
              <Label htmlFor="customerId">Customer ID</Label>
              <Input
                id="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                placeholder="Customer ID"
                required
              />
            </div>

            {/* Expected Shipment Date */}
            <div className="grid gap-2">
              <Label htmlFor="expectedShipmentDate">Expected Shipment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Input
                    id="expectedShipmentDate"
                    value={formData.expectedShipmentDate ? formData.expectedShipmentDate.toLocaleDateString() : ""}
                    onClick={(e) => e.preventDefault()}
                    placeholder="Select a date"
                    readOnly
                    required
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={formData.expectedShipmentDate}
                    onSelect={(date) => setFormData((prevData) => ({ ...prevData, expectedShipmentDate: date }))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Sales Person ID */}
            <div className="grid gap-2">
              <Label htmlFor="salesPersonId">Sales Person ID</Label>
              <Input
                id="salesPersonId"
                value={formData.salesPersonId}
                onChange={handleInputChange}
                placeholder="Sales Person ID"
                required
              />
            </div>

            {/* Invoice ID */}
            <div className="grid gap-2">
              <Label htmlFor="invoiceId">Invoice ID</Label>
              <Input
                id="invoiceId"
                value={formData.invoiceId}
                onChange={handleInputChange}
                placeholder="Invoice ID (optional)"
              />
            </div>

            {/* Items */}
            <div className="col-span-2">
              <Card className="mb-4">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Items</CardTitle>
                  <Button className="hover:bg-green-700" type="button" variant="outline" onClick={addItem}>
                    Add Item
                  </Button>
                </CardHeader>
                <CardContent>
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center mb-4">
                      <Input
                        id="productId"
                        value={item.productId}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Product ID"
                        required
                      />
                      <Input
                        id="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Quantity"
                        required
                      />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Price"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeItem(index)}
                        className="hover:bg-red-500 w-16"
                      >
                        <Trash2 onClick={()=> removeItem()} size={16} />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="w-[400px]">
              Create Sales Order
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddSalesOrder;