// grab the things we need
var mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
// create a schema
var seatSchema = new Schema({
  seat_no: {type: String, default: null},
  booked_slots:[{
    start:{type: String, default: null},
    end:{type: String, default: null},
    student_id: {type: String, default: null},
    slot_hours:  {type: Number, default: 0},
    _id: false,
  }]
});
seatSchema.plugin(beautifyUnique);
//on every save, add the date
seatSchema.pre('save', async function(next) {
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

var Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;