import { Input, Table, Tooltip } from "antd";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { IStatusIndicator, Jobs } from "../../_shared/types";
import { statusTitleFormat } from "../../utils/status";
import { StatusIndicator } from "../_ui/statusIndicator/StatusIndicator";
import { ActionButton } from "../buttons/ActionButton";
import styles from "./DataTable.module.css";

const columns = [
  {
    title: "Jobsite Name",
    dataIndex: "title",
    key: "2",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "3",
    render: (text: IStatusIndicator) => (
      <StatusIndicator key={text} status={text} type="tag">
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
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleRoute(param: string) {
    alert(param);
  }

  return (
    <div className={styles.container}>
      <p className={styles.titleHeader}>Jobs List</p>

      <div className={styles.infoSearchContainer}>
        <div className={styles.tooltipContainer}>
          <Tooltip title="This tootlip message contain information about table">
            <IoMdInformationCircle color="#1264A3" size={30} />
          </Tooltip>
          <p>
            Informative piece of text that can be used regarding this modal.
          </p>
        </div>

        <div className={styles.searchButtonContainer}>
          <Input
            type="text"
            id="search"
            placeholder="Search a driver"
            size="small"
            prefix={<FaMagnifyingGlass style={{ color: "#EAEAEA" }} />}
            value={search}
            onChange={handleSearch}
          />
          <ActionButton action="create">Create</ActionButton>
        </div>
      </div>

      <Table
        pagination={false}
        scroll={{ y: 650 }}
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
    </div>
  );
};
