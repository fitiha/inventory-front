import { useState, useEffect } from "react";
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
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

// Sample JSON data for customers and confirmed sales orders
const customersData = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

const salesOrdersData = [
  {
    id: "1",
    status: "confirmed",
    items: [
      {
        productName: "Product A",
        productDescription: "Description A",
        orderedAmount: 10,
        packedAmount: 5,
        quantityToPack: 0,
      },
      {
        productName: "Product B",
        productDescription: "Description B",
        orderedAmount: 20,
        packedAmount: 10,
        quantityToPack: 0,
      },
    ],
  },
  {
    id: "2",
    status: "confirmed",
    items: [
      {
        productName: "Product C",
        productDescription: "Description C",
        orderedAmount: 15,
        packedAmount: 5,
        quantityToPack: 0,
      },
      {
        productName: "Product D",
        productDescription: "Description D",
        orderedAmount: 25,
        packedAmount: 15,
        quantityToPack: 0,
      },
    ],
  },
];

export const AddPackage = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    customerId: "",
    salesOrderId: "",
    packageNumber: "",
    packedDate: null,
    internalNotes: "",
    items: [],
  });

  const [customers, setCustomers] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Fetch customers and confirmed sales orders
  useEffect(() => {
    // Simulate fetching customers
    setCustomers(customersData);

    // Simulate fetching confirmed sales orders
    setSalesOrders(salesOrdersData);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle sales order selection
  const handleSalesOrderChange = (e) => {
    const { value } = e.target;
    const selectedOrder = salesOrders.find((order) => order.id === value);
    setFormData((prevData) => ({
      ...prevData,
      salesOrderId: value,
      items: selectedOrder ? selectedOrder.items : [],
    }));
  };

  // Handle item change
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  // Generate package number
  useEffect(() => {
    const generatePackageNumber = () => {
      return `PKG-${Math.floor(Math.random() * 1000000)}`;
    };
    setFormData((prevData) => ({
      ...prevData,
      packageNumber: generatePackageNumber(),
    }));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", JSON.stringify(formData, null, 2));
    
    // Reset form
    setFormData({
      customerId: "",
      salesOrderId: "",
      packageNumber: "",
      packedDate: null,
      internalNotes: "",
      items: [],
    });
  };

  return (
    <Card className="mx-auto w-full">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 m-6">
            {/* Customer */}
            <div className="grid gap-2">
              <Label htmlFor="customerId">Customer</Label>
              <select
                id="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              >
                <option value="">Select customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sales Order */}
            <div className="grid gap-2">
              <Label htmlFor="salesOrderId">Sales Order</Label>
              <select
                id="salesOrderId"
                value={formData.salesOrderId}
                onChange={handleSalesOrderChange}
                className="border rounded p-2"
                required
              >
                <option value="">Select sales order</option>
                {salesOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.id}
                  </option>
                ))}
              </select>
            </div>

            {/* Package Number */}
            <div className="grid gap-2">
              <Label htmlFor="packageNumber">Package Number</Label>
              <Input
                id="packageNumber"
                value={formData.packageNumber}
                readOnly
                placeholder="Package Number"
                required
              />
            </div>

            {/* Packed Date */}
            <div className="grid gap-2">
              <Label htmlFor="packedDate">Packed Date</Label>
              <Popover
                open={isPopoverOpen}
                onOpenChange={(open) => setIsPopoverOpen(open)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.packedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.packedDate ? (
                      format(formData.packedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                  className={}
                    mode="single"
                    selected={formData.packedDate}
                    onSelect={(date) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        packedDate: date,
                      }));
                      setIsPopoverOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Internal Notes */}
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="internalNotes">Internal Notes</Label>
              <Input
                id="internalNotes"
                value={formData.internalNotes}
                onChange={handleInputChange}
                placeholder="Internal Notes"
              />
            </div>

            {/* Items */}
            <div className="col-span-2">
              <Card className="mb-4">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 items-center mb-4">
                    <Label>Item and Description</Label>
                    <Label>Ordered Amount</Label>
                    <Label>Packed Amount</Label>
                    <Label>Quantity to Pack</Label>
                  </div>
                  {formData.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 gap-4 items-center mb-4"
                    >
                      <div className="grid gap-2">
                        <Input
                          value={`${item.productName} - ${item.productDescription}`}
                          readOnly
                        />
                      </div>
                      <div className="grid gap-2">
                        <Input value={item.orderedAmount} readOnly />
                      </div>
                      <div className="grid gap-2">
                        <Input value={item.packedAmount} readOnly />
                      </div>
                      <div className="grid gap-2">
                        <Input
                          id={`quantityToPack-${index}`}
                          name="quantityToPack"
                          type="number"
                          value={item.quantityToPack}
                          onChange={(e) => handleItemChange(index, e)}
                          placeholder="Quantity to Pack"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="w-[400px]">
              Create Package
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

