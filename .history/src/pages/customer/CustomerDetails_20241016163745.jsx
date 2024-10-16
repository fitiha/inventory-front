import * as React from "react";
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
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useNavigate, useParams } from "react-router-dom";

const customers = [
  {
    id: "1",
    type: "INDIVIDUAL",
    name: "John Doe",
    remarks: "Regular customer",
    address: "123 Main St",
    contactPerson: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    salesOrders: 5,
    createdAt: "2023-06-23",
  },
  {
    id: "2",
    type: "CORPORATE",
    name: "Acme Corp",
    remarks: "Bulk orders",
    address: "456 Corporate Blvd",
    contactPerson: {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      phone: "987-654-3210",
      address: "456 Corporate Blvd",
    },
    salesOrders: 10,
    createdAt: "2023-07-12",
  },
];

export const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const customer = customers.find((customer) => customer.id === customerId);
  const [editedCustomer, setEditedCustomer] = useState(customer || {});
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!customer) {
    return <p>Customer not found</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const index = customers.findIndex((customer) => customer.id === customerId);
    customers[index] = editedCustomer;
    setIsEditing(false);
    console.log("Updated Customer:", customers[index]);
    navigate(`/customers/${customerId}`);
  };

  const handleCopy = (id) => {
    const customerToCopy = customers.find((customer) => customer.id === id);

    if (!customerToCopy) {
      console.error("Customer not found");
      return;
    }

    const contentToCopy = `
      Name: ${customerToCopy.name}
      Type: ${customerToCopy.type}
      Address: ${customerToCopy.address}
      Contact Person: ${customerToCopy.contactPerson.name}
      Contact Email: ${customerToCopy.contactPerson.email}
      Contact Phone: ${customerToCopy.contactPerson.phone}
      Contact Address: ${customerToCopy.contactPerson.address}
      Sales Orders: ${customerToCopy.salesOrders}
      Created At: ${customerToCopy.createdAt}
    `;

    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        console.log("Customer details copied to clipboard:", contentToCopy);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {isEditing ? `Edit ${customer.name}` : `${customer.name}`}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleCopy(customer.id)}
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
                  <p>Copy customer details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>Created At: {customer.createdAt}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6 text-sm">
        {isEditing ? (
          <div className="grid gap-4">
            <div>
              <Label className="font-extrabold" htmlFor="name">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                value={editedCustomer.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                type="text"
                name="type"
                value={editedCustomer.type}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                type="text"
                name="remarks"
                value={editedCustomer.remarks}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                name="address"
                value={editedCustomer.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="contactPersonName">Contact Person Name</Label>
              <Input
                type="text"
                name="contactPersonName"
                value={editedCustomer.contactPerson.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="contactPersonEmail">Contact Person Email</Label>
              <Input
                type="email"
                name="contactPersonEmail"
                value={editedCustomer.contactPerson.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="contactPersonPhone">Contact Person Phone</Label>
              <Input
                type="text"
                name="contactPersonPhone"
                value={editedCustomer.contactPerson.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="contactPersonAddress">Contact Person Address</Label>
              <Input
                type="text"
                name="contactPersonAddress"
                value={editedCustomer.contactPerson.address}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
              <CardDescription>Details of the selected customer.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-1.5">
                  <Label>Name</Label>
                  <Input value={customer.name} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Type</Label>
                  <Input value={customer.type} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Remarks</Label>
                  <Input value={customer.remarks} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Address</Label>
                  <Input value={customer.address} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Person</Label>
                  <Input value={customer.contactPerson.name} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Email</Label>
                  <Input value={customer.contactPerson.email} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Phone</Label>
                  <Input value={customer.contactPerson.phone} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact Address</Label>
                  <Input value={customer.contactPerson.address} readOnly />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Sales Orders</Label>
                  <Input value={customer.salesOrders} readOnly />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="hover:" variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
            </CardFooter>
          </Card>
        )}
      </CardContent>

      <Separator className="my-4" />

      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime={customer.createdAt}>{customer.createdAt}</time>
        </div>
      </CardFooter>
    </Card>
  );
};