import css from "./footer.module.scss";
import { useTasks } from "../../hooks/tasks/use-tasks";

export const Footer = (props) => {
  const { getActiveTaskCount, getFinishedTaskCount } = useTasks();

  return (
    <footer className={css.footer}>
      <span>
        Active task: {getActiveTaskCount()}
        <span>Finished task: {getFinishedTaskCount()}</span>
      </span>
      <span>Kanban board by Ya_Sidneva, 2023 </span>
    </footer>
  );
};
