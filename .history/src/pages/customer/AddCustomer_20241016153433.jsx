import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddCustomer() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    type: "INDIVIDUAL",
    remarks: "",
    address: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    contactPersonAddress: "",
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
          <div className="grid grid-cols-2 gap-4 m-6">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Customer name"
                required
              />
            </div>

            {/* Type */}
            <div className="grid gap-2">
              <Label htmlFor="type">Customer Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              >
                <option value="INDIVIDUAL">Individual</option>
                <option value="CORPORATE">Corporate</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Remarks */}
            <div className="grid gap-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Remarks (optional)"
              />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                required
              />
            </div>

            {/* Contact Person Name */}
            <div className="grid gap-2">
              <Label htmlFor="contactPersonName">Contact Person Name</Label>
              <Input
                id="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleInputChange}
                placeholder="Contact person name"
                required
              />
            </div>

            {/* Contact Person Email */}
            <div className="grid gap-2">
              <Label htmlFor="contactPersonEmail">Contact Person Email</Label>
              <Input
                id="contactPersonEmail"
                value={formData.contactPersonEmail}
                onChange={handleInputChange}
                type="email"
                placeholder="Contact person email"
                required
              />
            </div>

            {/* Contact Person Phone */}
            <div className="grid gap-2">
              <Label htmlFor="contactPersonPhone">Contact Person Phone</Label>
              <Input
                id="contactPersonPhone"
                value={formData.contactPersonPhone}
                onChange={handleInputChange}
                placeholder="Contact person phone"
                required
              />
            </div>

            {/* Contact Person Address */}
            <div className="grid gap-2">
              <Label htmlFor="contactPersonAddress">
                Contact Person Address
              </Label>
              <Input
                id="contactPersonAddress"
                value={formData.contactPersonAddress}
                onChange={handleInputChange}
                placeholder="Contact person address"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="w-[400px]">
              Add Customer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
