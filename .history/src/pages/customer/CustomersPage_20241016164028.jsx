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


const CustomersPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const customers = [
    {
      id: "1",
      type: "INDIVIDUAL",
      name: "John Doe",
      remarks: "Regular customer",
      address: "123 Main St",
      contactPerson: "Jane Doe",
      contactPersonId: "CP-001",
      salesOrders: 5,
      createdAt: "2023-06-23",
    },
    {
      id: "2",
      type: "CORPORATE",
      name: "Acme Corp",
      remarks: "Bulk orders",
      address: "456 Corporate Blvd",
      contactPerson: "Alice Smith",
      contactPersonId: "CP-002",
      salesOrders: 10,
      createdAt: "2023-07-12",
    },
    // Add more customer data as needed
  ];

  function handleRowClick(customerId) {
    navigate(`/customers/${customerId}`);
  }

  const isAddCustomerPage =
    !customerId && window.location.pathname === "/customers/add";
  const isCustomerDetailsPage = !!customerId;

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>
            {isAddCustomerPage
              ? "Add New Customer"
              : "isCustomerDetailsPage
              ? "Customer Details"
              : "Active Customers""}
          </CardTitle>
          <CardDescription>
            {isAddCustomerPage
              ? "Add a new customer to your database."
              : ""}
          </CardDescription>
        </div>
        {!isAddCustomerPage && !isCustomerDetailsPage && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link to="/customers/add">
              Add customer
              <SquarePlus size={20} strokeWidth={2.75} />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAddCustomerPage || isCustomerDetailsPage ? (
          <Outlet />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Sales Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  onClick={() => handleRowClick(customer.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {customer.createdAt}
                    </div>
                  </TableCell>
                  <TableCell>{customer.type}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.contactPerson}</TableCell>
                  <TableCell>{customer.salesOrders}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default CustomersPage;