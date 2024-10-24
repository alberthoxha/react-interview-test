import { Link, useParams } from "react-router-dom";
import styles from "./InventoryView.module.css";
import { Input } from "antd";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { ActionButton } from "../../components/buttons/ActionButton";
import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../../services/jobServices";
import { Jobs } from "../../_shared/types";
import noItem from "../../assets/images/noItem.svg";
import { JobModalForm } from "../../components/jobModalForm/JobModalForm";

export const InventoryView = () => {
  const [search, setSearch] = useState();
  const param = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery<Jobs>({
    queryKey: ["job"],
    queryFn: () => getJobById(param.id!),
    refetchInterval: 0,
    staleTime: 0,
  });

  return (
    <div className={styles.container}>
      <div className={styles.aside}>
        <div>
          <div className={styles.titleContainer}>
            <h4>{data?.title}</h4>
          </div>

          {data?.categories.map((item) => {
            return (
              <p
                key={item}
                className={styles.categories}
                onDoubleClick={() => setIsModalOpen(true)}
              >
                {item}
              </p>
            );
          })}
        </div>

        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ActionButton action="navigate">Go Back</ActionButton>
        </Link>
      </div>

      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <h4>Data Grid</h4>
          <Input
            style={{ width: 400, background: "white" }}
            type="text"
            id="search"
            placeholder="Search a driver"
            prefix={<FaMagnifyingGlass style={{ color: "#c7c7c7" }} />}
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.mainInside}>
          <div className={styles.noItemContainer}>
            <img src={noItem} />
            <h4>No Service Selected</h4>
            <p>Please select a service on yourisModalOpen left to proceed.</p>
          </div>
        </div>
      </div>

      <JobModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={data}
      />
    </div>
  );
};
