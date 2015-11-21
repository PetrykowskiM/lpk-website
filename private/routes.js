var db = require(__dirname + "/database.js")
var flow = require(__dirname + "/flow-node.js")('tmp')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var mkdirp = require('mkdirp');


module.exports = function(app) {

  /**
    *  GET: :return_to - either 'register' or 'settings'
    */
  app.route('/api/endpoint')
    .get(function(req, res) {

    })
    .post(function(req, res){

    })


  // Login User: Admin | Passwort: lpkAdmin2015
  // Token: YWRtaW5scGtBZG1pbjIwMTU==
  app.route("/login")
      .get(function(req, res){
          if(req.headers.auth == "YWRtaW5scGtBZG1pbjIwMTU="){
              res.send(200)
          }else{
              res.send(401)
          }
      })
      .post(function(req, res){
          if(req.body.token == "YWRtaW5scGtBZG1pbjIwMTU="){
              res.send(200)
          }else{
              res.send(401)
          }
      })

  /**
  * GET: redirect all requests with path not starting with api or # to the same link with #
  */

  app.route('/news')
      .get(function(req, res){
        db.getAllNews()
            .then(function(news){
              res.send(news)
            })
      })

    app.route('/entry/delete')
      .all(isAuthenticated)
      .post(function(req, res){
          var newsEntry = req.body

          db.deleteEntry(newsEntry)
              .then(function(){
                  res.sendStatus(200)
              })
              .catch(function(){
                  res.sendStatus(400)
              })
      })

  app.route('/news/add')
      .all(isAuthenticated)
      .post(function(req, res){
          var newsEntry = req.body
          newsEntry.type = "news"


          if(newsEntry.custom != null && newsEntry.custom == 0){
            newsEntry.customHtml = ""
          }

          db.addEntry(newsEntry)
              .then(function(){
                  res.sendStatus(200)
              })
      })


    app.route('/board')
        .get(function(req, res){
            db.getBoard()
                .then(function(news){
                    res.send(news)
                })
        })

    app.route('/board/delete')
        .all(isAuthenticated)
        .post(function(req, res){
            var boardMember = req.body

            db.deleteBoardMember(boardMember)
                .then(function(){
                    res.sendStatus(200)
                })
        })

    app.route('/board/update')
        .all(isAuthenticated)
        .post(function(req, res){
            var boardMember = req.body

            db.updateBoardMember(boardMember)
                .then(function(){
                    res.sendStatus(200)
                })
        })

    app.route('/board/add')
        .all(isAuthenticated)
        .post(function(req, res){
            var boardMember = req.body

            db.addBoardMember(boardMember)
                .then(function(){
                    res.sendStatus(200)
                })
        })

    app.route('/dates')
        .get(function(req, res){
            db.getAllDates()
                .then(function(dates){
                    res.send(dates)
                })
        })

    app.route('/dates/add')
        .all(isAuthenticated)
        .post(function(req, res){
            var dateEntry = req.body

            db.addDate(dateEntry)
                .then(function(){
                    res.sendStatus(200)
                })
        })

    app.route('/dates/update')
        .all(isAuthenticated)
        .post(function(req, res){
            var dateEntry = req.body

            db.updateDate(dateEntry)
                .then(function(){
                    res.sendStatus(200)
                })
        })

    app.route('/dates/delete')
        .all(isAuthenticated)
        .post(function(req, res){
            var dateEntry = req.body

            db.deleteDate(dateEntry)
                .then(function(){
                    res.sendStatus(200)
                })
        })

    app.route('/news/update')
        .all(isAuthenticated)
        .post(function(req, res){
            var newsEntry = req.body
            newsEntry.type = "news"


            if(newsEntry.custom != null && newsEntry.custom == 0){
                newsEntry.customHtml = ""
            }

            db.updateEntry(newsEntry)
                .then(function(){
                    res.sendStatus(200)
                })

        })

  app.route('/events')
      .get(function(req, res){
          db.getAllEvents()
              .then(function(news){
                  res.send(news)
              })
      })

  app.route('/events/update')
        .all(isAuthenticated)
        .post(function(req, res){
            var eventEntry = req.body
            eventEntry.type = "event"


            if(eventEntry.custom != null && eventEntry.custom == 0){
                eventEntry.customHtml = ""
            }

            db.updateEntry(eventEntry)
                .then(function(){
                    res.sendStatus(200)
                })

        })

   app.route('/events/add')
        .all(isAuthenticated)
        .post(function(req, res){
            var eventsEntry = req.body
            eventsEntry.type = "event"


            if(eventsEntry.custom != null && eventsEntry.custom == 0){
                eventsEntry.customHtml = ""
            }

            db.addEntry(eventsEntry)
                .then(function(){
                    res.sendStatus(200)
                })
        })

  app.route('/deleteImage')
      .post(function(req, res){
          fs.unlink("images" + req.body.path, function(err){
              if(err){
                  console.log(err)
                  res.sendStatus(400)
              }else{
                  res.sendStatus(200)
              }
          })
      })

  app.route('/uploadImage')
      .get(function(req,res){
          flow.get(req, function(status, filename, original_filename, identifier) {
              console.log('GET', status);

              if (status == 'found') {
                  status = 200;
              } else {
                  status = 204;
              }

              res.status(status).send();
          });
      })
      .post(multipartMiddleware, function(req, res){
          flow.post(req, function(status, filename, original_filename, identifier) {
              console.log('POST', status, original_filename, identifier, filename);

              var date = new Date(),
                  dateString = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()

              var oldPath = __dirname + "/../tmp/" +"flow-" + identifier + ".1",
                  newPath = "images/" + dateString + "/" + original_filename

              mkdirp('images/' + dateString, function(){
                  fs.writeFile(newPath, "test", function(err){
                      if(err){
                          console.log(err)
                      }else{

                          var source = fs.createReadStream(oldPath);
                          var dest = fs.createWriteStream(newPath);

                          source.pipe(dest);
                          source.on('end', function() {
                              fs.unlink(oldPath, function(err){})
                          });
                          source.on('error', function(err) {});

                          res.send({
                              path: "/images/" + original_filename
                          });

                      }
                  })
              })



          });
      })

  //
  //app.route('/*')
  //    .get(function(req, res) {
  //      //var querystring = "?"
  //      //for(var key in req.query){
  //      //  querystring += "key="+req.query[key]+"&"
  //      //}
  //      //res.writeHead(301, {'Location':  'http://localhost/index.html#' + req.originalUrl + querystring})
  //      //res.end()
  //
  //    })
}

function isAuthenticated(req, res, next){

  if(req.headers.auth == "YWRtaW5scGtBZG1pbjIwMTU="){
      return next()
  }else{
      res.send(401)
  }


  // if not: res.senStatus(401)
}