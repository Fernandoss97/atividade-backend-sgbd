import mongoose from "mongoose";

const connetDB = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Conectado ao MongoDB");
    })
    .catch(err => {
      console.error("Erro ao conectar ao MongoDB:", err);
    });
};

export default connetDB;
