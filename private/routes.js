

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

  app.route('/*')
      .get(function(req, res) {
        var querystring = "?"
        for(var key in req.query){
          querystring += "key="+req.query[key]+"&"
        }
        res.writeHead(301, {'Location':  'http://localhost/index.html#' + req.originalUrl + querystring})
        res.end()

      })

}