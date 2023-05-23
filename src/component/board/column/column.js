import css from "./column.module.scss";
import Select from "react-select";
import Scrollbars from "react-custom-scrollbars-2";
import { useLayout } from "../../../hooks/layout/use-layout";
import { useTasks } from "../../../hooks/tasks/use-tasks";
import { Card } from "./card/card";
import { useState } from "react";
import { IconAdd } from "../../general/icons/icon-add";

/**
 *
 * @param props { name: string, state: string, previousState: string}
 * @returns {JSX.Element}
 * @constructor
 */
export const Column = (props) => {
  const [isNewTaskInputShown, setIsNewTaskInputShown] = useState(false);
  const [inputCardName, setInputCardName] = useState();

  const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(undefined);

  const { mainContentHeight } = useLayout();

  const { getTasksByState, addTask, moveTask, removeTask } = useTasks();

  const tasks = getTasksByState(props.state);
  const isAddTaskBtnEnabled =
    props.state === "backlog" ||
    getTasksByState(props.previousState).length > 0;
  const hasTasks = tasks.length > 0;

  const onInputCard = (e) => {
    setInputCardName(e.target.value);
  };

  const NoopSeparator = () => null;
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      marginTop: "10px",
      height: "58px",
      boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25);",
      border: "none",
      "&:hover": {
        cursor: "pointer",
      },
    }),

    menu: (provided, state) => ({
      ...provided,
      display: "flex",
      flexDirection: "column",
      placeholder: "none",
    }),

    span: (provided, state) => ({
      ...provided,
      display: "none",
    }),

    option: (provided, state) => ({
      backgroundColor: state.isSelected ? "blue" : "white",
      color: state.isSelected ? "white" : "black",
      cursor: state.isSelected ? "pointer" : "pointer",
      marginLeft: "5px;",
      marginRight: "5px;",
      "&:hover": {
        backgroundColor: "#DEDEDE;",
        borderRadius: "4px",
      },
      "> *:not(:last-of-type)": {
        marginBottom: "10px",
      },
    }),
  };

  return (
    <div className={css.column}>
      <div className={css.header}>{props.name}</div>
      <div className={css.wrapper}>
        <div className={css.body}>
          {hasTasks && (
            <Scrollbars autoHeightMax={mainContentHeight} autoHide autoHeight>
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  onRemove={(id) => {
                    removeTask(id);
                  }}
                />
              ))}
            </Scrollbars>
          )}

          {isNewTaskInputShown && (
            <div>
              <input onInput={onInputCard} />
            </div>
          )}

          {isNewTaskSelectShown && (
            <Select
              isSearchable={false}
              placeholder=""
              styles={customStyles}
              onChange={(e) => setSelectedTaskId(e.value)}
              components={{
                IndicatorSeparator: NoopSeparator, // Используем пустой компонент для разделителя
              }}
              options={getTasksByState(props.previousState).map((task) => {
                return { value: task.id, label: task.name };
              })}
            />
          )}
        </div>
        <div className={css.footer}>
          {!isNewTaskInputShown && !isNewTaskSelectShown && (
            <button
              className={css.btn}
              onClick={() =>
                props.state === "backlog"
                  ? setIsNewTaskInputShown(true)
                  : setIsNewTaskSelectShown(true)
              }
              disabled={!isAddTaskBtnEnabled}
            >
              <IconAdd></IconAdd>Add card
            </button>
          )}

          {(isNewTaskInputShown || isNewTaskSelectShown) && (
            <button
              className={css.btn_select}
              onClick={() => {
                if (props.state === "backlog") {
                  if (!inputCardName) {
                    setIsNewTaskInputShown(false);
                  } else {
                    setIsNewTaskInputShown(false);
                    addTask(inputCardName);
                    setInputCardName(undefined);
                  }
                } else {
                  setIsNewTaskSelectShown(false);
                  moveTask(selectedTaskId, props.state);
                }
              }}
            >
              Submit
            </button>
          )}
          {(isNewTaskInputShown || isNewTaskSelectShown) && (
            <button
              className={css.btn_select}
              onClick={() => {
                if (props.state === "backlog") {
                  setIsNewTaskInputShown(false);
                } else {
                  setIsNewTaskSelectShown(false);
                }
              }}
            >
              {" "}
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
