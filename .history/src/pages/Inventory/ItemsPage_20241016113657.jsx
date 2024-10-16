import { useNavigate } from "react-router-dom";

const Component = () => {
  const navigate = useNavigate();

  const items = [
    // Your items data...
  ];

  const handleRowClick = (itemId) => {
    navigate(`/inventory/items/${itemId}`);
  };

  return (
    <>
      {items.map((item) => (
        <TableRow
          key={item.id}
          onClick={() => handleRowClick(item.id)}
          className="cursor-pointer hover:bg-gray-100"
        >
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
    </>
  );
};
