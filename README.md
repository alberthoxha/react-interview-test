import { LoadingOutlined } from "@ant-design/icons";
import { Input, Spin, Table, TableColumnsType, Tooltip } from "antd";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IStatusIndicator, Jobs } from "../../_shared/types";
import { statusTitleFormat } from "../../utils/status";
import { StatusIndicator } from "../_ui/statusIndicator/StatusIndicator";
import { ActionButton } from "../buttons/ActionButton";
import { JobModalForm } from "../jobModalForm/JobModalForm";
import styles from "./DataTable.module.css";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../services/jobServices";
import useDebounce from "../../hooks/useDebounce"; // Adjust path accordingly

const columns: TableColumnsType<Jobs> = [
  {
    title: "Jobsite Name",
    dataIndex: "title",
    key: "title",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: IStatusIndicator) => (
      <StatusIndicator status={status} type="tag">
        {statusTitleFormat(status)}
      </StatusIndicator>
    ),
  },
];

export const DataTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useQuery<Jobs[]>({
    queryKey: ["jobs", debouncedSearch],
    queryFn: () => getJobs(debouncedSearch),
    refetchInterval: 0,
    staleTime: 0,
  });

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleRoute(id: string) {
    navigate(`inventory/${id}`);
  }

  return (
    <div className={styles.container}>
      <p className={styles.titleHeader}>Jobs List</p>
      <div className={styles.infoSearchContainer}>
        <div className={styles.tooltipContainer}>
          <Tooltip title="This tooltip message contains information about the table">
            <IoMdInformationCircle color={"var(--flex-bg-blue)"} size={30} />
          </Tooltip>
          <p>
            Informative piece of text that can be used regarding this modal.
          </p>
        </div>
        <div className={styles.searchButtonContainer}>
          <Input
            type="text"
            id="search"
            placeholder="Search a job"
            size="small"
            prefix={<FaMagnifyingGlass style={{ color: "#c7c7c7" }} />}
            value={search}
            onChange={handleSearch}
          />
          <ActionButton onClick={() => setIsModalOpen(true)} action="create">
            Create
          </ActionButton>
        </div>
      </div>

      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          style={{
            width: "100%",
            height: "500px",
          }}
        />
      ) : (
        <Table
          pagination={false}
          scroll={{ y: 135 * 5 }}
          size="small"
          onRow={({ id }) => ({
            onClick: () => handleRoute(id!),
          })}
          dataSource={data}
          columns={columns}
          rowKey="id"
        />
      )}

      <JobModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

