import { useState} from "react";
import delpic from "./assets/delete.svg";

const storedTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
const storedCheck = JSON.parse(localStorage.getItem("check")) || [];

function ToDo() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(storedTaskList);
  const [check, setCheck] = useState(storedCheck);
  const [counter, setCounter] = useState(taskList.length);

  function addTask() {
    if (task.trim() === "") {
      return;
    }
    const newTask = { id: counter, text: task };
    const newTaskList = [newTask, ...taskList];
    setTaskList(newTaskList);
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    const newCheck = [false, ...check];
    setCheck(newCheck);
    localStorage.setItem("check", JSON.stringify(newCheck));
    setTask("");
    setCounter((n) => n + 1);
  }

  function del(index) {
    let removeItem = [...taskList];
    let removeCheck = [...check];
    removeItem.splice(index, 1);
    removeCheck.splice(index, 1);
    setTaskList(removeItem);
    localStorage.setItem("taskList", JSON.stringify(removeItem));
    setCheck(removeCheck);
    localStorage.setItem("check", JSON.stringify(removeCheck));
  }

  function handleChange({ target }) {
    setTask(target.value);
  }

  

  function changeCheck(index) {
    const ar = [...check];
    ar[index] = !ar[index];
    setCheck(ar);
    localStorage.setItem("check", JSON.stringify(ar));
  }
  

  function checkmeow(check) {
    let bhow = [...check];
    for (let i = 0; i < bhow.length; i++) {
      if (bhow[i] === false) {
        return "meow";
      }
    }
    return "meow1";
  }

  

  return (
    <div>
      <p className="text-4xl font-quicksand font-bold text-center text-purple-400 m-10">
        Task manager
      </p>

      <div className="m-10 mx-2 flex justify-center">
        <input
          type="text"
          placeholder="write new task here"
          value={task}
          onChange={(e) => handleChange(e)}
          onKeyUp={(e) => (e.key === "Enter" ? addTask() : null)}
          className="px-4 h-auto w-2/3 rounded-lg text-center py-3 text-xl font-quicksand  hover:ring-2 hover:ring-pink-200 drop-shadow-sm outline-none hover:outline-none"
        ></input>

        <button
          onClick={addTask}
          className="bg-purple-500 hover:bg-purple-600 h-14 w-24 lg:w-32 rounded-xl mr-2 ml-4 text-white text-xl transition font-quicksand ease-in-out hover:-translate-y-0.5 drop-shadow-md hover:drop-shadow-lg duration-300 "
        >
          add
        </button>
      </div>
      <div>
        {taskList.map((todo, index) => (
          <div key={todo.id} className="my-4 mx-2 flex justify-center">
            <input
  type="checkbox"
  onClick={() => changeCheck(index)}
  className={checkmeow(check)}
  checked={check[index]}
/>

            <div
              key={todo.id}
              className={check[index] === true ? "bar line-through" : "bar "}
            >
              {todo.text}
            </div>
            <img
              key={todo.id}
              onClick={() => del(index)}
              src={delpic}
              alt="delete"
              className="h-14 w-14 round mx-2 saturate-200 transition hover:-translate-y-1.5  lg:hover:-translate-y-2 duration-500 ease-in-out hover:scale-110 delay-75 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
