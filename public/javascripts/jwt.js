let jwt = require('jsonwebtoken');

function get_info(){
  var tokena = sessionStorage.getItem("access-token");
  jwt.verify(req.body.token, "my_secret", function(err, decoded) {
      if (err) {
      console.log("error");
      res.sendStatus(403);
      } else {
          let username = decoded.foo;
          document.getElementById("p2").innerHTML = username;
          // res.json({
          //     description: 'Protected information. Congrats!'
          // });
      }
  });
  // document.getElementById("p2").innerHTML = username;
}

get_info();
