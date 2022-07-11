import "./App.css";
import React, { useState } from "react";

function App() {
  function saveInLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  let savedArray = JSON.parse(localStorage.getItem("todos"));
  if (savedArray===null){
    savedArray=[];
  }
  let [todos, setTodos] = useState([]);
  function Todoform() {
    return (
      <div className="formcase">
        <form
          onSubmit={function (e) {
            e.preventDefault();
            const arraycopy = [...savedArray];
            arraycopy.push({
              do: e.target.todo.value,
              id: Date.now(),
            });
            setTodos(arraycopy);
            saveInLocalStorage(arraycopy);
          }}
        >
          <h2>할 일 갯수 : {savedArray.length? savedArray.length:0}</h2>
            <input
            className="inputtext"
              type="text"
              name="todo"
              placeholder="할 일을 적으세요"
            ></input>
            <input className="button" id="todoInput" type="submit" value={"추가하기"} ></input>
        </form>
        {savedArray ? <Ul /> : <></>}
      </div>   
    );
  }
  function Ul() {
    function Li(props) {
      let [form, setForm] = useState(false);
      function Editform(props) {
                return (
            <form style={{display:"inline"}}
            onSubmit={(e) => {
              e.preventDefault();
              let arr1 = [...savedArray];
              let arr2 = [ {
                do: e.target.edit.value,
                id: parseInt(props.id),
              }];
              let arraycopy = arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
              setTodos(arraycopy);
              saveInLocalStorage(arraycopy);
            }}
          >
            <input className="inputtext" name="edit" placeholder={props.do}></input>
          </form>
        );
      }
      return (
        <li key={props.index}>
          {props.index + 1}번째 {props.data.do}
          <button className="button"
            onClick={() => {
              const arraycopy = props.savedArray.filter(
                (d) => d.id !== props.data.id
              );
              setTodos((todos = [...arraycopy]));
              saveInLocalStorage(arraycopy);
            }}
          >
            삭제
          </button>
          <button
          className="button"
            onClick={() => {
              setForm(form ? false : true);
            }}
          >
            수정
          </button>
          {form ? (
            <Editform obj={props.data} do={props.data.do} id={props.data.id} />
          ) : null}
        </li>
      );
    }
    return (
      <ul>
        {savedArray.map(function (data, index) {
          return (
            <Li index={index} data={data} savedArray={savedArray} key={index} />
          );
        })}
      </ul>
    );
  }
  return (
    <div className="App bigcase">
        <Todoform  />
    </div>
  );
}

export default App;
