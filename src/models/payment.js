// grab the things we need
var mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
// create a schema
var paymentSchema = new Schema({
  name: {type: String, default: null},
  mobile: {type: String, default: null},
  fees: {type: String, default: null},
  student_id: {type: String, default:null},
  payment_type: {type: String, default: null},
  payment_month:{type: String, default:null},
  payment_year:{type: String, default:null},
  payment_date: {type: Date, default: new Date()},
});
paymentSchema.plugin(beautifyUnique);
//on every save, add the date
paymentSchema.pre('save', async function(next) {
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

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;