import { Router } from "express";
import path from 'path';
import formidable from "express-formidable";
import jwt from "jsonwebtoken";

const router = Router();

router.use(formidable({
  encoding: 'utf-8',
  uploadDir: path.join(path.resolve(), 'uploads'),
  multiples: true,           // Allows multiple files
  keepExtensions: true
}));

router.post("/create", async (req, res) => {

  let token = req.headers["x-access-token"];
  let user_id = null;

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        console.log(err);
        res.send({message: "Token is not valid."})
      }
      if(decoded && decoded.id){
        user_id = decoded.id;
      }

    });
  }

  var input = req.fields;
  req.getConnection(function(err, connection){
    var data = {
      title: input.title,
      due_date: input.due_date,
      attachment: req.files,
      user_id
    };
    var query = connection.query("INSERT INTO tasks SET ?", data, function(err, rows, fields){
      if(err)
        console.log("Error in Inserting Data : %s", err);
      else{
        console.log(rows);
        const message = "Task was successfully created.";
        res.send({ data , message });
      }
    });
  });

})


router.get("/list", async(req, res) => {

  let token = req.headers["x-access-token"];
  let user_id = null;

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        console.log(err);
        res.send({message: "Token is not valid."})
      }
      if(decoded && decoded.id){
        user_id = decoded.id;
      }

    });
  }

  const input = req.fields;
  req.getConnection(function(err, connection){

    connection.query("SELECT title, due_date, attachment FROM tasks where user_id = ?", [user_id], function(err, rows, fields){
      if(err)
        console.log("No tasks associated with your account were found : %s", err);
      else{
        res.send(rows);
      }
    });
  });

})



router.put("/update/:id", async (req, res) => {

  let token = req.headers["x-access-token"];
  let user_id = null;

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        console.log(err);
        res.send({message: "Token is not valid."})
      }

      if(decoded && decoded.id){
        user_id = decoded.id;
      }

    });
  }

  var input = req.fields;
  req.getConnection(function(err, connection){
    connection.query("UPDATE tasks SET title = ?, due_date = ?, attachment = ? WHERE id = ? AND user_id = ?",
                [input.title, input.due_date, input.attachment, req.params.id, user_id], function(err, rows, fields){
      if(err)
        console.log("Error in Inserting Data : %s", err);
      else{
        console.log(rows);
        const message = "Task was updated successfully.";
        res.send({ message });
      }
    });
  });

})


router.delete("/delete/:id", async (req, res) => {

  let token = req.headers["x-access-token"];
  let user_id = null;

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        console.log(err);
        res.send({message: "Token is not valid."})
      }

      if(decoded && decoded.id){
        user_id = decoded.id;
      }

    });
  }

  req.getConnection(function(err, connection){
    connection.query("DELETE FROM tasks WHERE id = ? AND user_id = ?",
                [req.params.id, user_id], function(err, rows, fields){
      if(err)
        console.log("Error in Deleting Data : %s", err);
      else{
        console.log(rows);
        const message = "Task was deleted successfully.";
        res.send({ message });
      }
    });
  });

})


export default router;
