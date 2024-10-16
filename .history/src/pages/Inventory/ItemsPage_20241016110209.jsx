"use client";

import { Link, Outlet, useLocation } from "react-router-dom";
import { SquarePlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  const location = useLocation();
  const [items, setItems] = useState([])l

  const isAddItemPage = location.pathname === "/inventory/items/add";

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>
            {isAddItemPage ? "Add New Item" : "Active items"}
          </CardTitle>
          <CardDescription>
            {isAddItemPage
              ? "Add a new item to your Warehouse."
              : "Active items from your Warehouse."}
          </CardDescription>
        </div>
        {!isAddItemPage && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link to="/inventory/items/add">
              Add item
              <SquarePlus size={20} strokeWidth={2.75} />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAddItemPage ? (
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
                <TableRow key={item.id}>
                  <TableCell>
                    <Link to={`/inventory/items/${item.id}`}>
                      <div className="font-medium">{item.name}</div>
                    </Link>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {item.date}
                    </div>
                  </TableCell>
                  <TableCell>{item.shelfId}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.warehouse}
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
