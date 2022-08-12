import { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";

import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import api from "../services/api";

import {Container, InputContainer, TasksContainer} from '../styles/Dashboard'

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

const Dashboard = ({ authenticated }) => {
  const [token] = useState(JSON.parse(localStorage.getItem("@Doit:token")) || "");
  const [tasks, setTasks] = useState();
  const { register, handleSubmit } = useForm();

  const loadTask = () => {
    api
      .get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params:{
          completed:false
        }
      })
      .then((response) => {
        const taskApi = response.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(taskApi);
      });
  };
  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar a tarefa");
    }
    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => loadTask());
  };
  const handleCompleted = (id) => {
  
    const newTasks = tasks.filter((task) => task._id !== id);

  api
    .put(
      `task/${id}`,
      { completed: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => setTasks(newTasks));
  };


  useEffect(() => {
    loadTask();
  }, [token]);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>7 de maio de 2021</time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks &&
          tasks.map((task) => (
            <Card
              key={task._id}
              title={task.description}
              date={task.createdAt}
              onClick={() => handleCompleted(task._id)}
            />
          ))}
      </TasksContainer>
    </Container>
  );
};
export default Dashboard;
