
"use client";

import { Link, Outlet } from "react-router-dom";
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
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Active items</CardTitle>
          <CardDescription>Active items from your Warehouse .</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/inventory/items/add">
            Add item
            <SquarePlus size={20} strokeWidth={2.75} />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Shelf ID</TableHead>
              <TableHead className="hidden sm:table-cell">Warehouse</TableHead>
              <TableHead>Stock on hand</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Sun Chips</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  2023-06-23
                </div>
              </TableCell>
              <TableCell>SC-001-A</TableCell>
              <TableCell className="gap-1 hidden sm:table-cell">
                <Badge
                  className="text-xs bg-primary text-gray-100"
                  variant="outline"
                >
                  Gerji
                </Badge>
                <Badge
                  className="text-xs bg-primary text-gray-100"
                  variant="outline"
                >
                  Jemo
                </Badge>
              </TableCell>
              <TableCell>1500</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
    </Card>
  );
}
