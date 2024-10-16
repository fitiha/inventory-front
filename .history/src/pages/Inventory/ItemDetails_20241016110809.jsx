import { useParams } from "react-router-dom";

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

export const ItemDetails = () => {
  const { itemId } = useParams();
  
  return (
    <div>ItemDetails</div>
  )
}
