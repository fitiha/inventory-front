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
import { Trash2, Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AddSalesOrder = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    customerId: "",
    expectedShipmentDate: null,
    salesPersonId: "",
    invoiceId: "",
    items: [{ productId: "", quantity: 0, price: 0.0 }],
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
              <Popover
                open={isPopoverOpen}
                onOpenChange={(open) => setIsPopoverOpen(open)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.expectedShipmentDate && "text-muted-foreground"
                      ""
                    )}
                  >
                    <CalendarIcon className=" mr-2 h-4 w-4" />
                    {formData.expectedShipmentDate ? format(formData.expectedShipmentDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.expectedShipmentDate}
                    onSelect={(date) => {
                      setFormData((prevData) => ({ ...prevData, expectedShipmentDate: date }));
                      setIsPopoverOpen(false);
                    }}
                    initialFocus
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
                  <div className="flex items-center gap-2">
                    <CardTitle>Items</CardTitle>
                    <Button className="hover:bg-green-700" type="button" variant="outline" onClick={addItem}>
                      <Plus size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center mb-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`productId-${index}`}>Product ID</Label>
                        <Input
                          id={`productId-${index}`}
                          value={item.productId}
                          onChange={(e) => handleItemChange(index, e)}
                          placeholder="Product ID"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          placeholder="Quantity"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`price-${index}`}>Price</Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, e)}
                          placeholder="Price"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeItem(index)}
                        className="hover:bg-red-500 w-16 mt-5"
                      >
                        <Trash2 size={16} className="hover:text-red-600" />
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