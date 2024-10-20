import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const salesOrders = [
  {
    id: "1",
    customerId: "1",
    expectedShipmentDate: "2023-08-01",
    salesPersonId: "1",
    invoiceId: "INV-001",
    createdAt: "2023-06-23",
    items: [
      { productId: "1", quantity: 10, price: 100.0 },
      { productId: "2", quantity: 5, price: 50.0 },
    ],
  },
  {
    id: "2",
    customerId: "2",
    expectedShipmentDate: "2023-08-15",
    salesPersonId: "2",
    invoiceId: "INV-002",
    createdAt: "2023-07-12",
    items: [
      { productId: "3", quantity: 20, price: 200.0 },
      { productId: "4", quantity: 10, price: 100.0 },
    ],
  },
];

export const SalesDetail = () => {
  const { salesOrderId } = useParams();
  const navigate = useNavigate();

  const salesOrder = salesOrders.find((order) => order.id === salesOrderId);
  const [editedSalesOrder, setEditedSalesOrder] = useState(salesOrder || {});
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!salesOrder) {
    return <p>Sales Order not found</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSalesOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const index = salesOrders.findIndex((order) => order.id === salesOrderId);
    salesOrders[index] = editedSalesOrder;
    setIsEditing(false);
    console.log("Updated Sales Order:", salesOrders[index]);
    navigate(`/sales/${salesOrderId}`);
  };

  const handleCopy = (id) => {
    const orderToCopy = salesOrders.find((order) => order.id === id);

    if (!orderToCopy) {
      console.error("Sales Order not found");
      return;
    }

    const contentToCopy = `
      Customer ID: ${orderToCopy.customerId}
      Expected Shipment Date: ${orderToCopy.expectedShipmentDate}
      Sales Person ID: ${orderToCopy.salesPersonId}
      Invoice ID: ${orderToCopy.invoiceId}
      Items: ${orderToCopy.items.map(item => `Product ID: ${item.productId}, Quantity: ${item.quantity}, Price: ${item.price}`).join("; ")}
      Created At: ${orderToCopy.createdAt}
    `;

    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        console.log("Sales order details copied to clipboard:", contentToCopy);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const calculateTotalPrice = () => {
    return salesOrder.items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {isEditing ? `Edit Sales Order ${salesOrder.id}` : `Sales Order ${salesOrder.id}`}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleCopy(salesOrder.id)}
                    className={`flex items-center justify-center h-7 w-7 rounded-md transition-colors 
                      ${copied ? "bg-blue-200" : "bg-transparent"}
                      border-2 border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  >
                    {copied ? (
                      <Check size={17} strokeWidth={2.75} />
                    ) : (
                      <Copy size={17} strokeWidth={2.75} />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-[10px] left-10">
                  <p>Copy sales order details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>Created At: {salesOrder.createdAt}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6 text-sm">
        {isEditing ? (
          <div className="grid gap-4">
            <div>
              <Label className="font-extrabold" htmlFor="customerId">
                Customer ID
              </Label>
              <Input
                type="text"
                name="customerId"
                value={editedSalesOrder.customerId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="expectedShipmentDate">Expected Shipment Date</Label>
              <Input
                type="text"
                name="expectedShipmentDate"
                value={editedSalesOrder.expectedShipmentDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="salesPersonId">Sales Person ID</Label>
              <Input
                type="text"
                name="salesPersonId"
                value={editedSalesOrder.salesPersonId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="invoiceId">Invoice ID</Label>
              <Input
                type="text"
                name="invoiceId"
                value={editedSalesOrder.invoiceId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="items">Items</Label>
              {editedSalesOrder.items.map((item, index) => (
                <div key={index} className="grid gap-2">
                  <Label htmlFor={`productId-${index}`}>Product ID</Label>
                  <Input
                    type="text"
                    name={`productId-${index}`}
                    value={item.productId}
                    onChange={(e) => {
                      const newItems = [...editedSalesOrder.items];
                      newItems[index].productId = e.target.value;
                      setEditedSalesOrder((prev) => ({
                        ...prev,
                        items: newItems,
                      }));
                    }}
                    placeholder="Product ID"
                  />
                  <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                  <Input
                    type="number"
                    name={`quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...editedSalesOrder.items];
                      newItems[index].quantity = e.target.value;
                      setEditedSalesOrder((prev) => ({
                        ...prev,
                        items: newItems,
                      }));
                    }}
                    placeholder="Quantity"
                  />
                  <Label htmlFor={`price-${index}`}>Price</Label>
                  <Input
                    type="number"
                    name={`price-${index}`}
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...editedSalesOrder.items];
                      newItems[index].price = e.target.value;
                      setEditedSalesOrder((prev) => ({
                        ...prev,
                        items: newItems,
                      }));
                    }}
                    placeholder="Price"
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Sales Order Details</CardTitle>
              <CardDescription>Details of the selected sales order.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-1.5">
                  <Label>Customer ID</Label>
                  <Input value={salesOrder.customerId} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Expected Shipment Date</Label>
                  <Input value={salesOrder.expectedShipmentDate} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Sales Person ID</Label>
                  <Input value={salesOrder.salesPersonId} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Invoice ID</Label>
                  <Input value={salesOrder.invoiceId} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Items</Label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productId}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="hover:bg-primary" variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
            </CardFooter>
          </Card>
        )}
      </CardContent>

      <Separator className="my-4" />

      <CardFooter className="flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime={salesOrder.createdAt}>{salesOrder.createdAt}</time>
        </div>
        <div className="text-lg font-bold text-primary">
          Total Price: ${calculateTotalPrice()}
        </div>
      </CardFooter>
    </Card>
  );
};