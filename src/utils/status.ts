export const statusTitleFormat = (status: string) => {
  if (status === "completed") return "Completed";
  if (status === "onroad") return "On Road";
  if (status === "onhold") return "On Hold";
  if (status === "inprogress") return "In Progress";
};
