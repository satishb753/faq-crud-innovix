import { Router } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

router.post("/register", async (req, res) => {

  var input = req.body;
  req.getConnection(function(err, connection){
    var data = {
      name: input.name,
      email: input.email,
      password: bcrypt.hashSync(input.password, 8)
    };
    var query = connection.query("INSERT INTO users set ?", data, function(err, rows, fields){
      if(err)
        console.log("Error in Inserting Data : %s", err);
      else{
        const message = "Your account has been created. You can now login using login endpoint.";
        res.send({ data , message });
      }
    });
  });

})


router.post("/login", async(req, res) => {

  const input = req.body;
  req.getConnection(function(err, connection){
    var data = {
      name: input.email
    }

    var query = connection.query("SELECT id, name, email, password FROM users where email = ? LIMIT 1", data, function(err, rows, fields){
      if(err)
        console.log("No user with that email found : %s", err);
      else{
        let user = {};
        if(rows.length == 1){
          user = rows[0];
        }

        const authStatus = bcrypt.compare(input.password, user.password, (err, flag) => {
          //check the password is valid or not. flag is a true or false value
          if(flag){
            jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, (err, token) => {
              if (err) {
                  res.sendStatus(500);
              } else {
                  var updateUser = connection.query("UPDATE users SET token = ? where email = ?",
                                  [token, user.email],
                                  function(err, results){
                                    if(err){
                                      console.log(err);
                                    }
                                  })
                  res.json({ token, message: "Your account has been created. You can now login using login endpoint." })
              }
            });
          }else{
            res.send({ message: "Invalid credentials" });
          }
        });
      }
    });
  });

})

export default router;
