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

  /**
  * GET: redirect all requests with path not starting with api or # to the same link with #
  */

  app.route('/news')
    .all(isAuthenticated)
      .get(function(req, res){
        db.getAllNews()
            .then(function(news){
              res.send(news)
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
                  dateString = date.getDay() + "." + (date.getMonth()+1) + "." + date.getFullYear()

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


  app.route('/*')
      .get(function(req, res) {
        //var querystring = "?"
        //for(var key in req.query){
        //  querystring += "key="+req.query[key]+"&"
        //}
        //res.writeHead(301, {'Location':  'http://localhost/index.html#' + req.originalUrl + querystring})
        //res.end()

      })
}

function isAuthenticated(req, res, next){
  return next()

  // if not: res.senStatus(401)
}