import express from "express";
import { configDotenv } from "dotenv";
import connetDB from "./src/config/dbConfig.js";
import Task from "./src/models/Task.js";

configDotenv();

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Srvidor rodando em localhost:3000"));

connetDB();

app.post("/tasks", async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    const task = new Task({ nome, descricao });

    await task.save();

    res.status(201).send(task);
  } catch (err) {
    res.status(500).send({ message: "Erro ao criar tarefa", error: err.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send({ message: "Erro ao buscar tarefas", error: err.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send({ message: "Tarefa não encontrada" });
    }

    res.status(200).send({ message: "Tarefa excluída com sucesso" });
  } catch (err) {
    res.status(500).send({ message: "Erro ao excluir tarefa", error: err.message });
  }
});
