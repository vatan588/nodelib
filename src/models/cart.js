// grab the things we need
var mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
// create a schema
var cartSchema = new Schema({
  email: {type: String, default: null},
  passowrd: {type: String, default: null}
});
cartSchema.plugin(beautifyUnique);
//on every save, add the date
cartSchema.pre('save', async function(next) {
  // get the current date
  var currentDate = new Date();
  // this.is_active = true;
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at){
    this.created_at = currentDate;
  }

  //this.isActive = false;
  next();
});

var Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;