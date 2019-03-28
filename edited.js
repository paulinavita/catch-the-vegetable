
router.post("/join", async (req, res) => {
    try {
      const found = await Room.findOne({
        where: req.body
      });
      if (found) {
        count++;
        if (count > 2) {
          res.send("<h1> limited member </h1>");
        } else {
          res.send(found);
        }
      } else {
        let err = 'Room does not exist'
        res.redirect(`/rooms/join/?err=${err}`)
      }
    } catch (e) {
      res.send("errror");
    }
  });

  //////

  router.get("/join", ensureAuthenticated, (req, res) => {
    let error = null
    if (req.query.err) {
      error = req.query.err
    }
    res.render("rooms-join", { error});
  });

  
  /////
   
// EJS ///
  <% if (error) { %>
    <h2><%= error %></h2>
  <% } %>
