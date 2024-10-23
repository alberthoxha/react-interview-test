import { Input, Table, TableColumnsType, Tooltip } from "antd";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { IStatusIndicator, Jobs } from "../../_shared/types";
import { statusTitleFormat } from "../../utils/status";
import { StatusIndicator } from "../_ui/statusIndicator/StatusIndicator";
import { ActionButton } from "../buttons/ActionButton";
import { JobModalForm } from "../jobModalForm/JobModalForm";
import styles from "./DataTable.module.css";

const columns: TableColumnsType = [
  {
    title: "Jobsite Name",
    dataIndex: "title",
    key: "2",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "3",
    render: (text: IStatusIndicator) => (
      <StatusIndicator key="3" status={text} type="tag">
        {statusTitleFormat(text)}
      </StatusIndicator>
    ),
  },
];

interface IProps {
  data: Jobs[] | undefined;
  search: string;
  setSearch: (param: string) => void;
}

export const DataTable = ({ data, search, setSearch }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleRoute(param: string) {
    console.log(param);
  }

  return (
    <div className={styles.container}>
      <p className={styles.titleHeader}>Jobs List</p>
      <div className={styles.infoSearchContainer}>
        <div className={styles.tooltipContainer}>
          <Tooltip title="This tootlip message contain information about table">
            <IoMdInformationCircle color={"var(--flex-bg-blue)"} size={30} />
          </Tooltip>
          <p>
            Informative piece of text that can be used regarding this modal.
            <h1>{status}</h1>
          </p>
        </div>
        <div className={styles.searchButtonContainer}>
          <Input
            type="text"
            id="search"
            placeholder="Search a driver"
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

      <Table
        pagination={false}
        scroll={{ y: 600 }}
        size="small"
        onRow={(row) => {
          return {
            onClick: () => {
              handleRoute(row.id);
            },
          };
        }}
        dataSource={data}
        columns={columns}
      ></Table>

      <JobModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};
