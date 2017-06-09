// readCSV
// # how many bytes each data type takes

//
// {
//   title:          varchar(100),  # 100 bit
//   movie_number:   integer,       # 32 bit
//   number_tickets: integer,       # 32 bit
//   show_time:      datetime       # 64 bit
// }



var row = { "title" : "title" };
// , "movie_number", "number_tickets", "show_time", "\n" };

// var movies = [ { "Inception", 3, 100, "2016-10-01 10:00:00" },
// { "Danny Darko", 4, 100, "2016-11-02 10:00:00" },
// { "Batman", 5, 100, "2016-05-01 10:00:00" },
// { "The Notebook", 6, 100, "2016-04-08 10:00:00" },
// { "Lion King", 7, 100, "2016-03-01 10:00:00" }
// ];

// var bitConversion = {
//   "varchar": varcharConverter,
//   "integer": 32,
//   "datetime": 64
// }

function readSchema(schema) {
  var totalLength = 0
  var schemaHash = {}
  var varCharMax = 1000;
  var getCountExact = curry(padDifference, asciiToBin, varCharMax);
  var getCount = curry(padDifference, asciiToBin, varCharMax);

  for(var key in schema){
   totalLength += schema[key];
   schemaHash[getCount(key)] = getCountExact(schema[key]);
  }
}

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

function padDifference(s) {
  s = s.slice(0, s.length - 2);
  s = s.split(",");
  // console.log(
  var slength = s.length;
  // );
  for(var i = slength; i < varCharMax; i++){
    s.push(00000);
  }

}

function curry(func1, func2, varCharMax) {
  return function(arg) {
    return (func1(func2(arg), varCharMax));
  };
}

var asciiToBin = (function () {
  var pad = '00000000';
    return function (str) {
      return str.replace(/./g, function (c) {
          var bin = c.charCodeAt(0).toString(2);
          return pad.substring(bin.length) + bin + ",";
      });
    };
})();

readSchema(row);
