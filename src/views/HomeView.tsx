import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Jobs } from "../_shared/types";
import { InfoStatusHeader } from "../components/_ui/infoStatusHeader/InfoStatusHeader";
import { DataTable } from "../components/dataTable/DataTable";
import { getJobs } from "../services/jobServices";

export const HomeView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery<Jobs[]>({
    queryKey: ["jobs", searchTerm],
    queryFn: () => getJobs(searchTerm),
    refetchInterval: 0,
    staleTime: 0,
  });

  return (
    <div>
      <InfoStatusHeader data={data} />

      <DataTable
        data={data}
        isPending={isLoading}
        search={searchTerm}
        setSearch={setSearchTerm}
      />
    </div>
  );
};
