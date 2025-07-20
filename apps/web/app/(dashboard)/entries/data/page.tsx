import { Metadata } from "next";
import dynamic from "next/dynamic";

const DataTable = dynamic(() =>
  import("../../../../components/data-table").then((mod) => ({
    default: mod.DataTable,
  }))
);

// Data dummy untuk entries
const entriesData = [
  {
    id: 1,
    header: "John Doe",
    type: "Individual",
    status: "Active",
    target: "ENT001",
    limit: "john.doe@example.com",
    reviewer: "+62 812-3456-7890",
  },
  {
    id: 2,
    header: "Jane Smith",
    type: "Individual",
    status: "Pending",
    target: "ENT002",
    limit: "jane.smith@example.com",
    reviewer: "+62 812-3456-7891",
  },
  {
    id: 3,
    header: "Bob Johnson",
    type: "Individual",
    status: "Active",
    target: "ENT003",
    limit: "bob.johnson@example.com",
    reviewer: "+62 812-3456-7892",
  },
  {
    id: 4,
    header: "Alice Brown",
    type: "Individual",
    status: "Inactive",
    target: "ENT004",
    limit: "alice.brown@example.com",
    reviewer: "+62 812-3456-7893",
  },
  {
    id: 5,
    header: "Charlie Wilson",
    type: "Individual",
    status: "Active",
    target: "ENT005",
    limit: "charlie.wilson@example.com",
    reviewer: "+62 812-3456-7894",
  },
  {
    id: 6,
    header: "Diana Davis",
    type: "Individual",
    status: "Pending",
    target: "ENT006",
    limit: "diana.davis@example.com",
    reviewer: "+62 812-3456-7895",
  },
  {
    id: 7,
    header: "Edward Miller",
    type: "Individual",
    status: "Active",
    target: "ENT007",
    limit: "edward.miller@example.com",
    reviewer: "+62 812-3456-7896",
  },
  {
    id: 8,
    header: "Fiona Garcia",
    type: "Individual",
    status: "Inactive",
    target: "ENT008",
    limit: "fiona.garcia@example.com",
    reviewer: "+62 812-3456-7897",
  },
  {
    id: 9,
    header: "George Martinez",
    type: "Individual",
    status: "Active",
    target: "ENT009",
    limit: "george.martinez@example.com",
    reviewer: "+62 812-3456-7898",
  },
  {
    id: 10,
    header: "Helen Rodriguez",
    type: "Individual",
    status: "Pending",
    target: "ENT010",
    limit: "helen.rodriguez@example.com",
    reviewer: "+62 812-3456-7899",
  },
];

export const metadata: Metadata = {
  title: "Entries Data - Redbox Digital",
  description: "Entries data management page",
};

export default function EntriesDataPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-3xl font-bold mb-6">Entries Data</h1>
          </div>
          <DataTable data={entriesData} />
        </div>
      </div>
    </div>
  );
}
