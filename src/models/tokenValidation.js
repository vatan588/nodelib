// grab the things we need
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// create a schema
var tokenValidationSchema = new Schema({
  user_id: {type:mongoose.Types.ObjectId,index : true},
  user_token: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// on every save, add the date
tokenValidationSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var TokenValidation = mongoose.model('TokenValidation', tokenValidationSchema);

module.exports = TokenValidation;
