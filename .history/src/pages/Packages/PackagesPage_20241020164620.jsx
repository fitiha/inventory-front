import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, MoreVertical, Check, Truck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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
      { productName: "Product A", productDescription: "Description A", orderedAmount: 10, packedAmount: 5, quantityToPack: 0 },
      { productName: "Product B", productDescription: "Description B", orderedAmount: 20, packedAmount: 10, quantityToPack: 0 },
    ],
  },
  {
    id: "2",
    status: "confirmed",
    items: [
      { productName: "Product C", productDescription: "Description C", orderedAmount: 15, packedAmount: 5, quantityToPack: 0 },
      { productName: "Product D", productDescription: "Description D", orderedAmount: 25, packedAmount: 15, quantityToPack: 0 },
    ],
  },
];

// Sample JSON data for packages
const packagesData = [
  { id: "1", status: "not shipped", packageNumber: "PKG-123456", customer: "John Doe", packedDate: new Date(), internalNotes: "Handle with care" },
  { id: "2", status: "shipped", packageNumber: "PKG-654321", customer: "Jane Smith", packedDate: new Date(), shipDate: new Date(), carrier: "UPS", shippingCharges: 50, notes: "Fragile" },
];

const PackagesPage = () => {
  const [packages, setPackages] = useState(packagesData);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    shipmentOrder: "",
    shipDate: null,
    carrier: "",
    shippingCharges: "",
    notes: "",
  });

  const [newPackageData, setNewPackageData] = useState({
    customerId: "",
    salesOrderId: "",
    packageNumber: "",
    packedDate: null,
    internalNotes: "",
    items: [],
  });

  const [customers, setCustomers] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);

  // Fetch customers and confirmed sales orders
  useEffect(() => {
    // Simulate fetching customers
    setCustomers(customersData);

    // Simulate fetching confirmed sales orders
    setSalesOrders(salesOrdersData);
  }, []);

  // Handle input change for new package
  const handleNewPackageInputChange = (e) => {
    const { id, value } = e.target;
    setNewPackageData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle sales order selection for new package
  const handleNewPackageSalesOrderChange = (e) => {
    const { value } = e.target;
    const selectedOrder = salesOrders.find((order) => order.id === value);
    setNewPackageData((prevData) => ({
      ...prevData,
      salesOrderId: value,
      items: selectedOrder ? selectedOrder.items : [],
    }));
  };

  // Generate package number for new package
  useEffect(() => {
    const generatePackageNumber = () => {
      return `PKG-${Math.floor(Math.random() * 1000000)}`;
    };
    setNewPackageData((prevData) => ({
      ...prevData,
      packageNumber: generatePackageNumber(),
    }));
  }, []);

  // Handle form submission for new package
  const handleNewPackageSubmit = (e) => {
    e.preventDefault();
    setPackages((prevPackages) => [
      ...prevPackages,
      { ...newPackageData, status: "not shipped" },
    ]);
    // Reset form
    setNewPackageData({
      customerId: "",
      salesOrderId: "",
      packageNumber: "",
      packedDate: null,
      internalNotes: "",
      items: [],
    });
  };

  // Handle input change for shipping form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle ship manually
  const handleShipManually = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      shipmentOrder: `SHIP-${Math.floor(Math.random() * 1000000)}`,
      shipDate: null,
      carrier: "",
      shippingCharges: "",
      notes: "",
    });
    setIsDialogOpen(true);
  };

  // Handle mark as delivered
  const handleMarkAsDelivered = (pkg) => {
    setPackages((prevPackages) =>
      prevPackages.map((p) =>
        p.id === pkg.id ? { ...p, status: "delivered" } : p
      )
    );
  };

  // Handle form submission for shipping
  const handleSubmit = (e) => {
    e.preventDefault();
    setPackages((prevPackages) =>
      prevPackages.map((p) =>
        p.id === selectedPackage.id
          ? { ...p, status: "shipped", ...formData }
          : p
      )
    );
    setIsDialogOpen(false);
  };

  const renderPackages = (status) => {
    return packages
      .filter((pkg) => pkg.status === status)
      .map((pkg) => (
        <Card key={pkg.id} className="mb-4">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{pkg.packageNumber}</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                {status === "not shipped" && (
                  <Button
                    variant="ghost"
                    onClick={() => handleShipManually(pkg)}
                  >
                    Ship Manually
                  </Button>
                )}
                {status === "shipped" && (
                  <Button
                    variant="ghost"
                    onClick={() => handleMarkAsDelivered(pkg)}
                  >
                    Mark as Delivered
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent>
            <p>Customer: {pkg.customer}</p>
            <p>Packed Date: {format(pkg.packedDate, "PPP")}</p>
            {pkg.internalNotes && <p>Notes: {pkg.internalNotes}</p>}
            {pkg.shipDate && <p>Ship Date: {format(pkg.shipDate, "PPP")}</p>}
            {pkg.carrier && <p>Carrier: {pkg.carrier}</p>}
            {pkg.shippingCharges && <p>Shipping Charges: ${pkg.shippingCharges}</p>}
            {pkg.notes && <p>Notes: {pkg.notes}</p>}
          </CardContent>
        </Card>
      ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Packages</h1>

      {/* Add New Package Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNewPackageSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Customer */}
              <div className="grid gap-2">
                <Label htmlFor="customerId">Customer</Label>
                <select
                  id="customerId"
                  value={newPackageData.customerId}
                  onChange={handleNewPackageInputChange}
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
                  value={newPackageData.salesOrderId}
                  onChange={handleNewPackageSalesOrderChange}
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
                  value={newPackageData.packageNumber}
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
                        !newPackageData.packedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newPackageData.packedDate ? format(newPackageData.packedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={newPackageData.packedDate}
                      onSelect={(date) => {
                        setNewPackageData((prevData) => ({ ...prevData, packedDate: date }));
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
                  value={newPackageData.internalNotes}
                  onChange={handleNewPackageInputChange}
                  placeholder="Internal Notes"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit">Add Package</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-4">Not Shipped</h2>
          {renderPackages("not shipped")}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Shipped</h2>
          {renderPackages("shipped")}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Delivered</h2>
          {renderPackages("delivered")}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ship Package</DialogTitle>
            <DialogDescription>
              Fill in the details to ship the package.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shipmentOrder">Shipment Order</Label>
                <Input
                  id="shipmentOrder"
                  value={formData.shipmentOrder}
                  readOnly
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shipDate">Ship Date</Label>
                <Popover
                  open={isPopoverOpen}
                  onOpenChange={(open) => setIsPopoverOpen(open)}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.shipDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.shipDate ? format(formData.shipDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.shipDate}
                      onSelect={(date) => {
                        setFormData((prevData) => ({ ...prevData, shipDate: date }));
                        setIsPopoverOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="carrier">Carrier</Label>
                <Input
                  id="carrier"
                  value={formData.carrier}
                  onChange={handleInputChange}
                  placeholder="Carrier"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shippingCharges">Shipping Charges</Label>
                <Input
                  id="shippingCharges"
                  type="number"
                  value={formData.shippingCharges}
                  onChange={handleInputChange}
                  placeholder="Shipping Charges"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Notes"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackagesPage;