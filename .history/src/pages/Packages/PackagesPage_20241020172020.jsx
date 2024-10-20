import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, MoreVertical } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";  
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";

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

  // Handle input change
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

  // Handle form submission
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="w-fit">{pkg.packageNumber}</CardTitle>
            <Popover >
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 mb-2">
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-pink-300 p-4">
        <h2 className="text-xl font-bold mb-4">Packages, Not Shipped</h2>
        {renderPackages("not shipped")}
      </div>
      <div className="bg-yellow-300 p-4 h-dvh"> 
        <h2 className="text-xl font-bold mb-4">Packages, Shipped</h2>
        {renderPackages("shipped")}
      </div>
      <div className="bg-green-300 p-4">
        <h2 className="text-xl font-bold mb-4">Packages, Delivered</h2>
        {renderPackages("delivered")}
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