import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../services/jobServices";
import { InfoStatusHeader } from "../components/Ui/infoStatusHeader/InfoStatusHeader";
import { Jobs } from "../_shared/types";

export const HomeView = () => {
  const { data } = useQuery<Jobs[]>({
    queryKey: ["jobs"],
    queryFn: getJobs,
    refetchInterval: 120000,
  });

  return (
    <>
      <InfoStatusHeader data={data} />
    </>
  );
};
