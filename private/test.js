
var fs = require("fs")

var identifier = "14010-Bildschirmfoto2015-10-10um134344png",
    original_filename = "image-1234.png"

var oldPath = __dirname + "/../tmp/" +"flow-" + identifier + ".1",
    newPath = "images/" + original_filename

fs.writeFile(newPath, "test", function(err){
    if(err){
        console.log(err)
    }else{

        var source = fs.createReadStream(oldPath);
        var dest = fs.createWriteStream(newPath);

        source.pipe(dest);
        source.on('end', function() { console.log("end") });
        source.on('error', function(err) { console.log(error)});


    }
})
