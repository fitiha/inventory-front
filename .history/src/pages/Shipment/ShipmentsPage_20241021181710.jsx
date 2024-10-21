import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Minus } from "lucide-react";

// Sample JSON data for shipments
const shipmentsData = [
  {
    id: "1",
    status: "shipped",
    shipmentOrder: "SHIP-123456",
    packageNumber: "PKG-123456",
    customer: "John Doe",
    shipDate: new Date(),
    carrier: "UPS",
    shippingCharges: 50,
    notes: "Fragile",
  },
  {
    id: "2",
    status: "delivered",
    shipmentOrder: "SHIP-654321",
    packageNumber: "PKG-654321",
    customer: "Jane Smith",
    shipDate: new Date(),
    deliveryDate: new Date(),
    carrier: "FedEx",
    shippingCharges: 75,
    notes: "Handle with care",
  },
];

const ShipmentsPage = () => {
  const [shipments, setShipments] = useState([]);

  // Fetch shipments data
  useEffect(() => {
    // Simulate fetching shipments data
    setShipments(shipmentsData);
  }, []);

  const renderShipments = () => {
    return shipments.map((shipment) => (
      <TableRow key={shipment.id}>
        <TableCell>{shipment.shipmentOrder || <Minus />}</TableCell>
        <TableCell>{shipment.packageNumber || <Minus />}</TableCell>
        <TableCell>{shipment.customer || <Minus />}</TableCell>
        <TableCell>{shipment.shipDate ? format(shipment.shipDate, "PPP") : <Minus />}</TableCell>
        <TableCell>{shipment.deliveryDate ? format(shipment.deliveryDate, "PPP") : <Minus />}</TableCell>
        <TableCell>{shipment.carrier || <Minus />}</TableCell>
        <TableCell>{shipment.shippingCharges ? `$${shipment.shippingCharges}` : <Minus />}</TableCell>
        <TableCell>{shipment.notes || <Minus />}</TableCell>
        <TableCell>
          <Badge variant={shipment.status === "delivered" ? "success" : "warning"}>
            {shipment.status}a
          </Badge>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shipments</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment Order</TableHead>
                <TableHead>Package Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Ship Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Shipping Charges</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderShipments()}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentsPage;