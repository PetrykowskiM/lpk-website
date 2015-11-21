var fs = require("fs");
var file = "data.db";
var exists = fs.existsSync(file);
var q = require("q")

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
    if(!exists) {
        setUpDatabase()
    }
});



function setUpDatabase(){
    db.run("CREATE TABLE Entry (headline TEXT, subheadline TEXT, content TEXT, images TEXT, custom INTEGER, customHtml TEXT, type TEXT, date INTEGER)");
    db.run("CREATE TABLE BoardMember (name TEXT, imagePath TEXT, title TEXT, email TEXT, isLeader INTEGER)");
    db.run("CREATE TABLE Event (place TEXT, title TEXT, description TEXT, date INTEGER)");
}

exports.addEntry = function(entry){
    var deferred = q.defer()

    db.serialize(function() {

        var stmt = db.prepare("INSERT INTO Entry (headline, subheadline, content, images, custom, customHtml, type, date) VALUES  (?,?,?,?,?,?,?,?)")

        stmt.run(entry.headline, entry.subheadline, entry.content, entry.images, entry.custom, entry.customHtml, entry.type, entry.date)

        deferred.resolve()
    });

    return deferred.promise

}

exports.updateEntry = function(entry){
    var deferred = q.defer()

    db.serialize(function() {

        var stmt = db.prepare("UPDATE Entry SET headline=?, subheadline=?, content=?, images=?, custom=?, customHtml=?, date=? WHERE type=? AND date=? ")

        stmt.run(entry.headline, entry.subheadline, entry.content, entry.images, entry.custom, entry.customHtml, entry.date, entry.type, entry.oldDate)

        deferred.resolve()
    });

    return deferred.promise

}

exports.deleteEntry = function(entry){
    var deferred = q.defer()

    db.serialize(function() {
        //var news = []
        var stmt = db.prepare("DELETE FROM Entry WHERE type=? AND date=? ")

        stmt.run(entry.type, entry.date)

        deferred.resolve()


    });

    return deferred.promise
}

exports.getAllNews = function(){
    var deferred = q.defer()

    db.serialize(function() {
        //var news = []
        db.all("SELECT * FROM Entry Where type='news'", function(err, rows) {

            deferred.resolve(rows)

        });


    });

    return deferred.promise
}

exports.getAllDates = function(){
    var deferred = q.defer()

    db.serialize(function() {
        //var news = []
        db.all("SELECT * FROM Event", function(err, rows) {

            deferred.resolve(rows)

        });


    });

    return deferred.promise
}

exports.getAllEvents = function(){
    var deferred = q.defer()

    db.serialize(function() {
        //var news = []
        db.all("SELECT * FROM Entry Where type='event'", function(err, rows) {

            deferred.resolve(rows)

        });


    });

    return deferred.promise
}

exports.addEvent = function(event){

    db.serialize(function() {

        db.run("INSERT INTO Entry (place, title, date) VALUES  (" +
        "'" + event.place + "'," +
        "'" + event.title + "'," +
        "" + event.date + "" +
        ")")

    });

}

exports.addDate = function(date){
    var deferred = q.defer()

    db.serialize(function() {

        var stmt = db.prepare("INSERT INTO Event (place, title, description, date) VALUES  (?,?,?,?)")

        stmt.run(date.place, date.title,date.description, date.date)

        deferred.resolve()
    });

    return deferred.promise

}

exports.deleteDate = function(date){
    var deferred = q.defer()

    db.serialize(function() {
        //var news = []
        var stmt = db.prepare("DELETE FROM Event WHERE date=? ")

        stmt.run(date.date)

        deferred.resolve()


    });

    return deferred.promise
}

exports.updateDate = function(date){
    var deferred = q.defer()

    db.serialize(function() {

        var stmt = db.prepare("UPDATE Event SET place=?, title=?, description=?, date=? WHERE date=? ")

        stmt.run(date.place, date.title, date.description, date.date, date.oldDate)

        deferred.resolve()
    });

    return deferred.promise

}

exports.addBoardMember = function(board){
    var deferred = q.defer()

    db.serialize(function() {

        var stmt = db.prepare("INSERT INTO BoardMember (name, imagePath, title, email, isLeader) VALUES  (?,?,?,?,?)")

        if(board.isLeader)
            board.isLeader = 1
        else
            board.isLeader = 0

        stmt.run(board.name, board.imagePath, board.title, board.email, board.isLeader)

        deferred.resolve()
    });

    return deferred.promise

}

exports.updateBoardMember = function(board){
    var deferred = q.defer()

    db.serialize(function() {

        var stmt = db.prepare("UPDATE BoardMember SET name=?, imagePath=?, title=?, email=?, isLeader=? WHERE email=?")

        if(board.isLeader)
            board.isLeader = 1
        else
            board.isLeader = 0

        stmt.run(board.name, board.imagePath, board.title, board.email, board.isLeader, board.oldEmail)

        deferred.resolve()
    });

    return deferred.promise

}

exports.deleteBoardMember = function(board){
    var deferred = q.defer()

    db.serialize(function() {

        var stmt = db.prepare("DELETE FROM BoardMember WHERE email=?")

        stmt.run(board.email)

        deferred.resolve()
    });

    return deferred.promise

}

exports.getBoard = function(){
    var deferred = q.defer()

    db.serialize(function() {
        //var news = []
        db.all("SELECT * FROM BoardMember", function(err, rows) {

            for(var i=0; i<rows.length; i++){
                if(rows[i].isLeader == 0)
                    rows[i].isLeader = false
                else
                    rows[i].isLeader = true
            }

            deferred.resolve(rows)

        });


    });

    return deferred.promise
}