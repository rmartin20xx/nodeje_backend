const emailRegex = /^\S+@\S+\.\S+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;


exports.index = function(req, res) {
    if (req.method === "POST") {
      const post = req.body;
      const name = post.user_name;
      const pass = post.password;
      const fname = post.first_name;
      const lname = post.last_name;
      const mob = post.mob_no;

      if (!usernameRegex.test(name)) {
        return res.status(400).send("Invalid username.");
      }
  
      if (!req.files || !req.files.uploaded_image) {
        return res.status(400).send("No image uploaded.");
      }
  
      const file = req.files.uploaded_image;
      const img_name = file.name;
  
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif"
      ) {
        file.mv("public/images/upload_images/" + file.name, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
  
          const sql =
            "INSERT INTO `tbl_users` (`first_name`, `last_name`, `mob_no`, `user_name`, `password`, `image`) VALUES (?, ?, ?, ?, ?, ?)";
          const values = [fname, lname, mob, name, pass, img_name];
  
          db.query(sql, values, function(err, result) {
            if (err) {
              return res.status(500).send(err);
            }
  
            res.redirect("profile/" + result.insertId);
          });
        });
      } else {
        const message =
          "This format is not allowed, please upload files with '.png', '.gif', or '.jpg' extensions.";
        res.status(400).render("index.ejs", { message });
      }
    } else {
      res.render("index");
    }
  };
  
  exports.profile = function(req, res){
    var message = '';
    var id = req.params.id;
    var sql = "SELECT * from `tbl_users` WHERE `id` = '"+id+"'";
    db.query(sql, function(err, result){
      if (result.length <=0)
      message = "Profile not Found!";
      res.render('profile.ejs', {data:result, message: message});
    });
  };