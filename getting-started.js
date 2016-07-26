var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});

Kitten.find({ name: /^Fluff/ }, callback);

// var Kitten = mongoose.model('Kitten', kittySchema);
//
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);
//
// var Tank = mongoose.model('Tank', yourSchema);
//
// var small = new Tank({ size: 'small' });
// small.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });
//
// // or
//
// Tank.create({ size: 'small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });
//
// //mongoose.connect('localhost', 'gettingstarted');
//
// var connection = mongoose.createConnection('mongodb://localhost:27017/test');
// var Tank = connection.model('Tank', yourSchema);
//
// Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
//
// Tank.remove({ size: 'large' }, function (err) {
//   if (err) return handleError(err);
//   // removed!
// });
//
// //Updating
// Tank.findById(id, function (err, tank) {
//   if (err) return handleError(err);
//
//   tank.size = 'large';
//   tank.save(function (err) {
//     if (err) return handleError(err);
//     res.send(tank);
//   });
// });
//
// Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);
// Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, function (err, tank) {
//   if (err) return handleError(err);
//   res.send(tank);
// });
