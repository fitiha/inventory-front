import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
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

const SalesPage = () => {
  const { salesOrderId } = useParams();
  const navigate = useNavigate();

  const salesOrders = [
    {
      id: "1",
      customerName: "John Doe",
      expectedShipmentDate: "2023-08-01",
      salesPersonName: "Alice Smith",
      invoiceId: "INV-001",
      createdAt: "2023-06-23",
    },
    {
      id: "2",
      customerName: "Acme Corp",
      expectedShipmentDate: "2023-08-15",
      salesPersonName: "Bob Johnson",
      invoiceId: "INV-002",
      createdAt: "2023-07-12",
    },
    // Add more sales order data as needed
  ];

  function handleRowClick(salesOrderId) {
    navigate(`/sales/${salesOrderId}`);
  }

  const isAddSalesOrderPage =
    !salesOrderId && window.location.pathname === "/sales/add";
  const isSalesOrderDetailsPage = !!salesOrderId;

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          {isAddSalesOrderPage && (
            <>
              <CardTitle>Add New Sales Order</CardTitle>
              <CardDescription>
                Add a new sales order to your database.
              </CardDescription>
            </>
          )}
        </div>
        {!isAddSalesOrderPage && !isSalesOrderDetailsPage && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link to="/sales/add">
              Add Sales Order
              <SquarePlus size={20} strokeWidth={2.75} />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAddSalesOrderPage || isSalesOrderDetailsPage ? (
          <Outlet />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Expected Shipment Date</TableHead>
                <TableHead>Sales Person</TableHead>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesOrders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => handleRowClick(order.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                  </TableCell>
                  <TableCell>{order.expectedShipmentDate}</TableCell>
                  <TableCell>{order.salesPersonName}</TableCell>
                  <TableCell>{order.invoiceId}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesPage;