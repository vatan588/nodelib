// grab the things we need
var mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
// create a schema
var contactSchema = new Schema({
  name: { type: String, default: null },
  email: { type: String, default: null, lowercase: true },
  mobile: { type: String, index: true, trim: true },
  message: { type: String, default: null },
  status: { type: String, default: 'not-contacted' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  writeConcern: {
    j: true,
    wtimeout: 2500
  }
});

contactSchema.plugin(beautifyUnique);
// on every save, add the date
contactSchema.pre('save', async function (next) {
  // get the current date
  var currentDate = new Date();
  // this.is_active = true;
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }

  //this.isActive = false;
  next();
});

// userSchema.post('save', function(result) {
//   console.log(this instanceof mongoose.Query); // true
//   // prints returned documents
//   console.log('find() returned ' + JSON.stringify(result));
//   // prints number of milliseconds the query took
// });

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
