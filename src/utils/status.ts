export function statusTitleFormat(status: string) {
  if (status === "completed") return "Completed";
  if (status === "onroad") return "On Road";
  if (status === "onhold") return "On Hold";
  if (status === "inprogress") return "In Progress";
}

export function colorByStatus(status: string) {
  if (status === "completed") return "completed-color";
  if (status === "onroad") return "onroad-color";
  if (status === "onhold") return "onhold-color";
  if (status === "inprogress") return "inprogress-color";
}
