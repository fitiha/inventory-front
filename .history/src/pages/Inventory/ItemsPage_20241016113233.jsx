"use client";

import { Link, Outlet, useParams } from "react-router-dom";
import { SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Component() {
  const { itemId } = useParams();
  
  const items = [
    {
      id: "1",
      name: "Sun Chips",
      shelfId: "SC-001-A",
      warehouse: ["Gerji", "Jemo"],
      stock: 1500,
      date: "2023-06-23",
    },
    {
      id: "2",
      name: "Doritos",
      shelfId: "DR-001-B",
      warehouse: ["Gerji"],
      stock: 1200,
      date: "2023-07-12",
    },
    {
      id: "3",
      name: "Lays",
      shelfId: "LY-003-C",
      warehouse: ["Jemo"],
      stock: 800,
      date: "2023-05-14",
    },
    {
      id: "4",
      name: "Cheetos",
      shelfId: "CH-002-D",
      warehouse: ["Gerji", "Jemo", "Summit"],
      stock: 950,
      date: "2023-08-09",
    },
    {
      id: "5",
      name: "Pringles",
      shelfId: "PR-004-E",
      warehouse: ["Gerji"],
      stock: 600,
      date: "2023-09-01",
    },
    {
      id: "6",
      name: "Kettle Chips",
      shelfId: "KC-001-F",
      warehouse: ["Jemo"],
      stock: 700,
      date: "2023-10-05",
    },
    {
      id: "7",
      name: "Ruffles",
      shelfId: "RF-002-G",
      warehouse: ["Gerji", "Summit"],
      stock: 500,
      date: "2023-09-18",
    },
    {
      id: "8",
      name: "Tostitos",
      shelfId: "TS-003-H",
      warehouse: ["Summit"],
      stock: 1000,
      date: "2023-08-25",
    },
  ];

  const isAddItemPage = !itemId && window.location.pathname === "/inventory/items/add";
  const isItemDetailsPage = !!itemId; 

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>
            {isAddItemPage ? "Add New Item" : isItemDetailsPage ? "Item Details" : "Active Items"}
          </CardTitle>
          <CardDescription>
            {isAddItemPage
              ? "Add a new item to your Warehouse."
              : isItemDetailsPage
              ? "Details of the selected item."
              : "Active items from your Warehouse."}
          </CardDescription>
        </div>
        {!isAddItemPage && !isItemDetailsPage && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link to="/inventory/items/add">
              Add item
              <SquarePlus size={20} strokeWidth={2.75} />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAddItemPage || isItemDetailsPage ? (
          <Outlet />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Shelf ID</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Warehouse
                </TableHead>
                <TableHead>Stock on hand</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <Link to={`/inventory/items/${item.id}`}></Link>
                <TableRow key={item.id}>
                  <TableCell>
                    
                      <div className="font-medium">{item.name}</div>
                    
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {item.date}
                    </div>
                  </TableCell>
                  <TableCell>{item.shelfId}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.warehouse.join(", ")}
                  </TableCell>
                  <TableCell>{item.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
