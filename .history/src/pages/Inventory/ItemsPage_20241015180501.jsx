

// const ItemsPage = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ItemsPage


"use client"

import {Link} from "react-router-dom"
import { SquarePlus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Component() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Active items</CardTitle>
          <CardDescription>
            Active items from your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="">
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
              <TableHead ></TableHead>
              <TableHead >Status</TableHead>
              <TableHead >Date</TableHead>
              <TableHead >Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Sun chips</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  2023-06-23
                </div>
              </TableCell>
              <TableCell >Sk</TableCell>
              <TableCell >
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
