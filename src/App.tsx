import React, { useRef, useState } from "react";
import { Button, Typography, Form, Tabs } from "antd";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { todoListData } from "./mock/data";
import { MenuKey } from "./TodoList";
import logo from './logo.svg';
import './App.css';
import './todo.css';

const { Title } = Typography;
const { TabPane } = Tabs;

function App() {
  const [todoList, setTodoList] = useState(todoListData);

  const callback = () => {};

  const onFinish = (values: any) => {
    const newTodo = { ...values.todo, isCompleted: false };
    setTodoList(todoList.concat(newTodo));
  };
  const ref = useRef(null);

  const activeTodoList = todoList.filter(todo => !todo.isCompleted);
  const completedTodoList = todoList.filter(todo => todo.isCompleted);

  const onClick = (todoId: string, key: MenuKey) => {
    if (key === "complete") {
      const newTodoList = todoList.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
      });

      setTodoList(newTodoList);
    } else if (key === "delete") {
      const newTodoList = todoList.filter(todo => todo.id !== todoId);
      setTodoList(newTodoList);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="todo" ref={ref}>
        <div className="container header">
          <img src={logo} alt="" />
          <Title level={3}>图雀社区：汇聚精彩的免费实战教程</Title>
        </div>
        <div className="container">
          <Form onFinish={onFinish}>
            <Form.Item name="todo">
              <TodoInput />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="container">
          <Tabs onChange={callback} type="card">
            <TabPane tab="所有" key="1">
              <TodoList todoList={todoList} onClick={onClick} />
            </TabPane>
            <TabPane tab="进行中" key="2">
              <TodoList todoList={activeTodoList} onClick={onClick} />
            </TabPane>
            <TabPane tab="已完成" key="3">
              <TodoList todoList={completedTodoList} onClick={onClick} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
