
import { useParams, useLocation } from 'react-router-dom';
import AddSalesOrder from './AddSalesOrder'; // Adjust the path as necessary
import SalesDetails from './SalesDetails'; // Adjust the path as necessary

const SalesPage = () => {
  const { salesOrderId } = useParams();
  const location = useLocation();

  const isAddSalesOrderPage = !salesOrderId && location.pathname === "/sales/add";
  const isSalesDetailsPage = !!salesOrderId;

  return (
    <div>
      {isAddSalesOrderPage && <AddSalesOrder />}
      {isSalesDetailsPage && <SalesDetails salesOrderId={salesOrderId} />}
      {!isAddSalesOrderPage && !isSalesDetailsPage && <div>Select a sales order to view details or add a new sales order.</div>}
    </div>
  );
};

export default SalesPage;