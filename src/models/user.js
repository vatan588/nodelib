// grab the things we need
var mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
// create a schema
var userSchema = new Schema({
  name: { type: String, default: null },
  father_name: { type: String, default: null },
  email: { type: String, default: null, lowercase: true },
  mobile: { type: String, index: true, trim: true },
  study: { type: String, default: null },
  classes_for: { type: String, default: null },
  current_address: { type: String, default: null },
  permanent_address: { type: String, default: null },
  profile_img: { type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
  slot_start: { type: Number, default: null },
  slot_end: { type: Number, default: null },
  is_custom_slot: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  seat_no: { type: String, default: null },
  fees_start: { type: Date, default: Date.now },
  fees_expire: { type: Date, default: Date.now },
  user_type: { type: String, default: null },
  fees_status: { type: String, default: null },
  payment_type: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  account_type: { type: String, default: "active"}
}, {
  writeConcern: {
    j: true,
    wtimeout: 2500
  }
});

userSchema.plugin(beautifyUnique);
// on every save, add the date
userSchema.pre('save', async function (next) {
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

var User = mongoose.model('User', userSchema);

module.exports = User;
