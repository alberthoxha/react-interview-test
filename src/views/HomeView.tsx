import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Jobs } from "../_shared/types";
import { InfoStatusHeader } from "../components/_ui/infoStatusHeader/InfoStatusHeader";
import { DataTable } from "../components/dataTable/DataTable";
import { getJobs } from "../services/jobServices";

export const HomeView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery<Jobs[]>({
    queryKey: ["jobs", searchTerm],
    queryFn: ({ queryKey }) => getJobs(queryKey[1]),
  });

  return (
    <div>
      <InfoStatusHeader data={data} />
      <DataTable data={data} search={searchTerm} setSearch={setSearchTerm} />
    </div>
  );
};
