import dynamic from "next/dynamic";
import data from "./data.json";
import { Metadata } from "next";
import { METADATA } from "../../../lib/constants";

const SectionCards = dynamic(() =>
  import("../../../components/section-cards").then((mod) => ({
    default: mod.SectionCards,
  }))
);
const ChartAreaInteractive = dynamic(() =>
  import("../../../components/chart-area-interactive").then((mod) => ({
    default: mod.ChartAreaInteractive,
  }))
);
const DataTable = dynamic(() =>
  import("../../../components/data-table").then((mod) => ({
    default: mod.DataTable,
  }))
);

export const metadata: Metadata = {
  title: METADATA.TITLE("Dashboard"),
  description: METADATA.DASHBOARD.description,
  keywords: METADATA.DASHBOARD.keywords,
  authors: [{ name: "Redbox Digital" }],
  openGraph: METADATA.DASHBOARD.openGraph,
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
