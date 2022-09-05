const { sqldb } = require("../../db");

const getTodos = (req, res) => {
  sqldb
    .query("select * from todos")
    .then(([result]) => {
      console.warn(result);
      res.status(200).json({ message: "response ok", data: result });
    })
    .catch((err) => {
      console.warn("err", err);
      res.status(500).send(`Erreur dans la requête: ${err}`);
    });
};

const postTodos = (req, res) => {
  const { description } = req.body;
  // res.send("Post route is working 🎉");
  sqldb
    .query("INSERT INTO todos (description) VALUES (?)", [description])
    .then(([result]) => {
      res.status(201).json({ id: result.insertId });
    })
    .catch((err) => {
      res.status(500).send(`Error in postTodos ${err}`);
    });
};

const deleteTodos = (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10); // ou Number(id)

  sqldb
    .query("DELETE FROM todos WHERE id = ?", [id])
    .then(([result]) => {
      console.warn(result);
      if (result.affectedRows === 0) {
        res.status(404).json({
          message: "task don't was not found in DB because id is wrong",
        });
      } else {
        res.status(201).json({ message: `Task ${id} was delete` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `task ${id} was not delete because ${err}` });
    });
};
const updateTodos = (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10); // ou Number(id)
  const { description } = req.body;

  sqldb
    .query("UPDATE todos SET description = ? where id = ?", [description, id])
    .then(() => {
      res.status(201).json({ message: `task ${id} was updated` });
    })
    .catch((err) => {
      res.status(500).json(`task ${id} was not update because ${err}`);
    });
};

module.exports = {
  getTodos,
  postTodos,
  updateTodos,
  deleteTodos,
};
