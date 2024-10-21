import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample JSON data for packages
const packagesData = [
  {
    id: "1",
    status: "not shipped",
    packageNumber: "PKG-123456",
    customer: "John Doe",
    packedDate: new Date(),
    shipDate: new Date(),
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
    internalNotes: "Handle with care",
  },
  {
    id: "2",
    status: "shipped",
    packageNumber: "PKG-654321",
    customer: "Jane Smith",
    packedDate: new Date(),
    shipDate: new Date(),
    carrier: "UPS",
    shippingCharges: 50,
    notes: "Fragile",
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

const PackageDetails = () => {
  const { packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  // Fetch package details
  useEffect(() => {
    const selectedPackage = packagesData.find((pkg) => pkg.id === packageId);
    setPackageDetails(selectedPackage);
  }, [packageId]);

  if (!packageDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="mx-auto w-full max-w-4xl p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Package Details</CardTitle>
        <CardDescription className="text-muted-foreground">
          Detailed information about the package
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-bold">Package Number:</p>
            <p>{packageDetails.packageNumber}</p>
          </div>
          <div>
            <p className="font-bold">Customer:</p>
            <p>{packageDetails.customer}</p>
          </div>
          <div>
            <p className="font-bold">Packed Date:</p>
            <p>{format(packageDetails.packedDate, "PPP")}</p>
          </div>
          {packageDetails.shipDate && (
            <div>
              <p className="font-bold">Ship Date:</p>
              <p>{format(packageDetails.shipDate, "PPP")}</p>
            </div>
          )}
          {packageDetails.carrier && (
            <div>
              <p className="font-bold">Carrier:</p>
              <p>{packageDetails.carrier}</p>
            </div>
          )}
          {packageDetails.shippingCharges && (
            <div>
              <p className="font-bold">Shipping Charges:</p>
              <p>${packageDetails.shippingCharges}</p>
            </div>
          )}
          {packageDetails.notes && (
            <div>
              <p className="font-bold">Notes:</p>
              <p>{packageDetails.notes}</p>
            </div>
          )}
          {packageDetails.internalNotes && (
            <div>
              <p className="font-bold">Internal Notes:</p>
              <p>{packageDetails.internalNotes}</p>
            </div>
          )}
        </div>
        <Separator className="my-4" />
        <h3 className="text-lg font-bold mb-4">Items</h3>
        <ScrollArea className="h-64">
          <div className="grid grid-cols-4 gap-4 items-center mb-4 font-bold">
            <p>Item and Description</p>
            <p>Ordered Amount</p>
            <p>Packed Amount</p>
            <p>Quantity to Pack</p>
          </div>
          {packageDetails.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-center mb-4">
              <p>{`${item.productName} - ${item.productDescription}`}</p>
              <p>{item.orderedAmount}</p>
              <p>{item.packedAmount}</p>
              <p>{item.quantityToPack}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PackageDetails;