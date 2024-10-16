import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const items = [
  {
    id: "1",
    name: "Sun Chips",
    shelfId: "SC-001-A",
    warehouse: ["Gerji", "Jemo"],
    stock: 1500,
    date: "2023-06-23",
    sku: "SUN001",
    barcode: "123456789",
    price: 10.99,
    description: "Crunchy and flavorful chips.",
    reorderLevel: 100,
  },
  {
    id: "2",
    name: "Doritos",
    shelfId: "DR-001-B",
    warehouse: ["Gerji"],
    stock: 1200,
    date: "2023-07-12",
    sku: "DOR002",
    barcode: "987654321",
    price: 12.5,
    description: "Bold and spicy chips.",
    reorderLevel: 150,
  },
];

export const ItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const item = items.find((item) => item.id === itemId);
  const [editedItem, setEditedItem] = useState(item || {});
  const [isEditing, setIsEditing] = useState(false);

  if (!item) {
    return <p>Item not found</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const index = items.findIndex((item) => item.id === itemId);
    items[index] = editedItem;
    setIsEditing(false);
    console.log("Updated Item:", items[index]);
    navigate(`/inventory/items/${itemId}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {isEditing ? `Edit ${item.name}` : `${item.name}`}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={handleCopy} className="flex items-center">
                    <Copy size={20} strokeWidth={2.75} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-[10px] left-10">
                  <p>Copy item details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>Date: {item.date}</CardDescription>
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
                value={editedItem.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={editedItem.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                type="text"
                name="sku"
                value={editedItem.sku}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                type="text"
                name="barcode"
                value={editedItem.barcode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                type="number"
                name="stock"
                value={editedItem.stock}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                step="0.01"
                name="price"
                value={editedItem.price}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <div className="grid gap-3">
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>SKU: {item.sku}</p>
            <p>Barcode: {item.barcode}</p>
            <p>Stock: {item.stock}</p>
            <p>Price: ${item.price}</p>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </div>
        )}
      </CardContent>

      <Separator className="my-4" />

      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime={item.date}>{item.date}</time>
        </div>
      </CardFooter>
    </Card>
  );
};
