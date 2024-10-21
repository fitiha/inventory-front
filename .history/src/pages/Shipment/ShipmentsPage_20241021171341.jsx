import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

  const renderShipments = (status) => {
    return shipments
      .filter((shipment) => shipment.status === status)
      .map((shipment) => (
        <TableRow key={shipment.id}>
          <TableCell>{shipment.shipmentOrder}</TableCell>
          <TableCell>{shipment.packageNumber}</TableCell>
          <TableCell>{shipment.customer}</TableCell>
          <TableCell>{format(shipment.shipDate, "PPP")}</TableCell>
          {shipment.deliveryDate && (
            <TableCell>{format(shipment.deliveryDate, "PPP")}</TableCell>
          )}
          <TableCell>{shipment.carrier}</TableCell>
          <TableCell>${shipment.shippingCharges}</TableCell>
          <TableCell>{shipment.notes}</TableCell>
        </TableRow>
      ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shipments</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Shipped Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment Order</TableHead>
                <TableHead>Package Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Ship Date</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Shipping Charges</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderShipments("shipped")}</TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Delivered Shipments</CardTitle>
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
              </TableRow>
            </TableHeader>
            <TableBody>{renderShipments("delivered")}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentsPage;