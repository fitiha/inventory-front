import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

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
  // Add other items similarly...
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
    navigate(`/inventory/items/${itemId}`);
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Item" : "Item Details"}</h2>
      {isEditing ? (
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleInputChange}
          />
          <br />
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={editedItem.description}
            onChange={handleInputChange}
          />
          <br />
          <label>SKU: </label>
          <input
            type="text"
            name="sku"
            value={editedItem.sku}
            onChange={handleInputChange}
          />
          <br />
          <label>Barcode: </label>
          <input
            type="text"
            name="barcode"
            value={editedItem.barcode}
            onChange={handleInputChange}
          />
          <br />
          <label>Stock: </label>
          <input
            type="number"
            name="stock"
            value={editedItem.stock}
            onChange={handleInputChange}
          />
          <br />
          <label>Price: </label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={editedItem.price}
            onChange={handleInputChange}
          />
          <br />
          <label>Reorder Level: </label>
          <input
            type="number"
            name="reorderLevel"
            value={editedItem.reorderLevel}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {item.name}</p>
          <p>Description: {item.description}</p>
          <p>SKU: {item.sku}</p>
          <p>Barcode: {item.barcode}</p>
          <p>Shelf ID: {item.shelfId}</p>
          <p>Warehouse: {item.warehouse.join(", ")}</p>
          <p>Stock: {item.stock}</p>
          <p>Price: ${item.price}</p>
          <p>Reorder Level: {item.reorderLevel}</p>
          <p>Expiry Date: {item.date}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};
