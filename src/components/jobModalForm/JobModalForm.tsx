import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input, message, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { Jobs } from "../../_shared/types";
import { createJob, updateJob } from "../../services/jobServices";
import { ErrorFieldMessage } from "../_ui/errorField/ErrorFieldMessage";
import { ActionButton } from "../buttons/ActionButton";
import MultiSelectInput from "../multiSelect/MultiSelectInput";
import SelectInput from "../select/SelectInput";
import styles from "./JobModalForm.module.css";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (setIsModalOpen: boolean) => void;
  data?: Jobs;
  id?: string;
}

export const JobModalForm = ({ isModalOpen, setIsModalOpen, data }: IProps) => {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const [titleRequired, setTitleRequired] = useState(false);
  const [statusRequired, setStatusRequired] = useState(false);
  const [categoriesRequired, setCategoriesRequired] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  function validate() {
    const isTitleValid = title.trim() !== "";
    const isStatusValid = !!status;
    const isCategoriesValid = categories.length > 0;

    setTitleRequired(!isTitleValid);
    setStatusRequired(!isStatusValid);
    setCategoriesRequired(!isCategoriesValid);

    return isTitleValid && isStatusValid && isCategoriesValid;
  }

  const createMutation = useMutation({
    mutationFn: (data: Jobs) => createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      messageApi.open({
        type: "success",
        content: "New job was added successfully",
        style: { marginTop: "20vh" },
      });
      setIsModalOpen(false);
      resetPreviousFields();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Jobs) => updateJob(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job"] });
      messageApi.open({
        type: "success",
        content: "Job was updated successfully",
        style: { marginTop: "20vh" },
      });
      setIsModalOpen(false);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) {
      const jobData: Jobs = {
        id: data?.id,
        title,
        status,
        categories,
      };
      if (data) {
        updateMutation.mutate(jobData);
      } else {
        createMutation.mutate(jobData);
      }
    }
  }

  function resetPreviousFields() {
    setStatus("");
    setTitle("");
    setCategories([]);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setTitleRequired(false);
    setStatusRequired(false);
    setCategoriesRequired(false);
    if (!data) {
      resetPreviousFields();
    }
  }

  function handleAddCategories(param: string) {
    const exists = categories.includes(param);
    if (!exists) {
      setCategories((old) => [...old, param]);
    }
  }

  function handleRemoveCategories(param: string) {
    setCategories((prev) => prev.filter((item) => item !== param));
  }

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setStatus(data.status);
      setCategories(data.categories);
    }
  }, [data]);

  return (
    <Modal
      width={850}
      title={data ? "Update the job" : "Create new job"}
      open={isModalOpen}
      onCancel={() => handleCloseModal()}
      footer={false}
      confirmLoading={true}
    >
      {contextHolder}
      <div className={styles.tooltipContainer}>
        <Tooltip title="This tootlip message contain information about table">
          <IoMdInformationCircle color={"var(--flex-bg-blue)"} size={30} />
        </Tooltip>
        <p>Informative piece of text that can be used regarding this modal.</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <Input
            type="text"
            placeholder="Type the jobsite’s name"
            status={titleRequired ? "error" : undefined}
            value={title}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleRequired && <ErrorFieldMessage />}

          <div className={styles.inputContainer}>
            <div>
              <label>Categories Included</label>
              <MultiSelectInput
                value={categories}
                addCategory={handleAddCategories}
                removeCategory={handleRemoveCategories}
              />
              {categoriesRequired && <ErrorFieldMessage />}
            </div>

            <div>
              <label>Status</label>
              <SelectInput value={status} selectedItem={setStatus} />
              {statusRequired && <ErrorFieldMessage />}
            </div>
          </div>
        </div>

        <div className={styles.modalButtonsContainer}>
          <ActionButton
            type="button"
            action="cancel"
            onClick={() => handleCloseModal()}
          >
            Cancel Changes
          </ActionButton>
          <ActionButton action="save">Save Changes</ActionButton>
        </div>
      </form>
    </Modal>
  );
};
