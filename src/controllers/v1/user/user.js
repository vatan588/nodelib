"use strict"

//var config = require('../../../../config/config');
const utils = require('../../../helpers/utils');
//const notify = require('../../../utils/notification');
const User = require('../../../models/user');
const Login = require('../../../models/login');
const TokenValidation = require('../../../models/tokenValidation');
//const DeliveryLocation = require('../../../models/deliveryLocation');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var config = require('../../../../config.json');
//var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Payment = require('../../../models/payment');
const Seat = require('../../../models/seat');

class UserClass {

	check_role(usertype) {
		let user_type = usertype.toLowerCase();
		switch (user_type) {
			case 'superadmin':
				return "superadmin";
				break;
			case 'admin':
				return "admin";
				break;
			case 'merchant':
				return "merchant";
				break;
			case 'rider':
				return "rider";
				break;
			default:
				return "user";
		}
	}

}
// // common funtion for sending SMS
// async function sendotp(mobile, otp) {
// 	let message_body = config.notification.otp_sms.replace("otp_val", otp);
// 	let data = await notify.sendSms(mobile, message_body);
// 	if (data.status == 200) {
// 		return true
// 	} else {
// 		return false
// 	}
// }
// // common funtion for sending EMAIL
// async function sendemail(email, sub, body) {
// 	let data = await notify.sendEmail(email, sub, body);
// 	if (data.status == 200) {
// 		return true
// 	} else {
// 		return false
// 	}
// }
// common function to check login credentials
// function checkLogin(query, u_data) {
// 	return new Promise(function (resolve, reject) {

// 		User.findOne(query, function (err, result) {
// 			if (err) {
// 				resolve({ statusCode: 100, err: err })
// 			} else {
// 				if (result) {
// 					if (!result.is_active) {
// 						resolve({ statusCode: 400 })
// 					} else if (result.is_registered) {
// 						let allowed_access = result.allowed_access;
// 						let user_profile = {
// 							first_name: result.first_name,
// 							last_name: result.last_name,
// 							email: result.email,
// 							mobile: result.mobile,
// 							profile_img: result.profile_img
// 						}
// 						let user = ({
// 							userId: result._id,
// 							email: result.email,
// 							user_type: result.user_type
// 						})
// 						let is_registered = result.is_registered
// 						let password = result.password
// 						//let token = jwt.sign(user, config.secret, { expiresIn: "30 days" });
// 						let userValidateData = ({
// 							user_id: result._id,
// 							user_token: token
// 						})
// 						result.otp_attempt = 0;
// 						result.save();
// 						userValidateData = new TokenValidation(userValidateData)
// 						TokenValidation.findOneAndUpdate({ user_id: userValidateData.user_id }, { user_token: token }, { upsert: true }, function (err, result) {
// 							if (err) {
// 								resolve({ statusCode: 100, err: err })
// 							} else {
// 								u_data
// 								resolve({ statusCode: 200, token: token, password: password, is_registered: is_registered, data: user_profile, allowed_access: allowed_access })
// 							}
// 						});
// 					} else {
// 						if (u_data) {
// 							let tempUser = u_data;
// 							tempUser.is_registered = true;
// 							User.findOneAndUpdate(query, { $set: tempUser }, { new: true }, function (err, result) {
// 								if (err) {
// 									resolve({ statusCode: 100, err: err, is_registered: false })
// 								} else {
// 									let allowed_access = result.allowed_access;
// 									let user_profile = {
// 										first_name: result.first_name,
// 										last_name: result.last_name,
// 										email: result.email,
// 										mobile: result.mobile,
// 										profile_img: result.profile_img
// 									}
// 									let user = ({
// 										userId: result._id,
// 										email: result.email,
// 										user_type: result.user_type
// 									})
// 									let is_registered = result.is_registered
// 									let token = jwt.sign(user, config.secret, { expiresIn: "30 days" });
// 									let userValidateData = ({
// 										user_id: result._id,
// 										user_token: token
// 									})
// 									result.otp_attempt = 0;
// 									result.save();
// 									userValidateData = new TokenValidation(userValidateData)
// 									TokenValidation.findOneAndUpdate({ user_id: userValidateData.user_id }, { user_token: token }, { upsert: true }, function (err, result) {
// 										if (err) {
// 											resolve({ statusCode: 100, err: err })
// 										} else {
// 											resolve({ statusCode: 200, token: token, is_registered: is_registered, data: user_profile, allowed_access: allowed_access })
// 										}
// 									});
// 								}
// 							})
// 						} else {
// 							resolve({ statusCode: 200, is_registered: false })
// 						}
// 					}
// 				} else {
// 					resolve({ statusCode: 300 })
// 				}
// 			}
// 		})
// 	})
// }

// //common function used to add / register user
// function insertUserData(user) {
// 	return new Promise(function (resolve, reject) {
// 		let userData = User(user)
// 		userData.save(function (err, result) {
// 			if (err) {
// 				resolve({ statusCode: 400, data: err.errors.mobile ? err.errors.mobile.message : err })
// 			} else {
// 				let user = ({
// 					userId: result._id
// 				})
// 				//let token = jwt.sign(user, config.secret, { expiresIn: "30 days" });
// 				let userValidateData = ({
// 					user_id: result._id,
// 					user_token: token
// 				})
// 				userValidateData = new TokenValidation(userValidateData)
// 				userValidateData.save(function (err, result) {
// 					if (err) {
// 						resolve({ statusCode: 400, data: err })
// 					} else {
// 						let responseData = ({
// 							message: "New User has been added.",
// 							token: token
// 						})
// 						resolve({ statusCode: 200, data: responseData })
// 					}
// 				})
// 			}
// 		})
// 	})
// }
// // validate email id format
// function validateEmail(email) {
// 	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	return re.test(String(email).toLowerCase());
// }







function checkExistUser(query) {
	return new Promise(function (resolve, reject) {
		User.findOne(query, function (err, result) {
			if (err) {
				resolve({ statusCode: 100, err: err })
			} else if (result) {
				resolve({ statusCode: 200, err: err })
			} else {
				resolve({ statusCode: 300, err: err })
			}
		});
	})
}

// let userData = Login(req.body);
// userData.save((err, result) => {
// 	let responseData = ({
// 		message: "Login Successfully.",

// 	})
// 	req.responseData = responseData
// 	utils.success(req, res)
// })

//Login.find({email: req.body.email}).then(response => {
module.exports = {
	userAuthenticate: function (req, res, next) {
		const bToken = req.headers['x-token'];
		if (typeof bToken !== undefined) {
			const bearerToken = bToken.split(" ");
			const token = bearerToken[1];
			jwt.verify(token, config.secret, (err, authData) => {
				if (err) {
					utils.error(req, res)
				} else {
					next();
				}
			})

		}
	},
	userLogin: async function (req, res) {
		console.log("rescfdfff", req.body);
		Login.findOne({ email: req.body.email, password: req.body.password }).then(response => {
			console.log("rescfdfff", response);
			if (response) {
				jwt.sign({ response }, config.secret, { expiresIn: '60000s' }, (err, token) => {
					if (err) {
						return utils.error(req, res)
					}
					// console.log("token", token);
					let responseData = ({
						message: "Login Successfully.",
						token,
						data: response.email
					})
					req.responseData = responseData
					utils.success(req, res)
				})
			} else {
				utils.error(req, res)
			}


		}).catch(err => {
			utils.error(req, res)
			console.log("errpr");
		})
	},

	addUser: function (req, res) {
		// console.log("req", req);
		let userData = User(req.body);
		userData.save((err, result) => {

			let responseData = ({
				message: "User Added Successfully.",
			})
			req.responseData = responseData
			utils.success(req, res)
		})

	},
	seatBooking: async function (req, res) {
		// console.log("req", req);
		let seatBook = Seat(req.body);
		let seatInfo = await Seat.findOne({ seat_no: seatBook.seat_no });
		if (seatInfo) {
			// let seatForUpdation = mongoose.Types.ObjectId(seatInfo._id);
			Seat.findByIdAndUpdate({ _id: seatInfo._id }, { $addToSet: { booked_slots: seatBook.booked_slots } }, { new: true }, function (err, result) {
				let responseData = ({
					message: "Seat Updated Successfully.",

				})
				req.responseData = responseData
				utils.success(req, res);
			})
		} else {
			seatBook.save((err, result) => {
				let responseData = ({
					message: "Seat Booked Successfully.",
				})
				req.responseData = responseData
				utils.success(req, res)
			})
		}
		//console.log("aa", seatInfo);
		// await Seat.findOne({ seat_no: seatBook.seat_no }, (err, result) => {
		// 	if (err) {
		// 		console.log('err', err);
		// 	} else {
		// 		console.log("seatInfo", result);
		// 	}

		// });





	},
	paymentUpdate: function (req, res) {
		// console.log("req", req);
		let paymentData = Payment(req.body);
		paymentData.save((err, result) => {
			let responseData = ({
				message: "Payment Updated Successfully.",

			})
			req.responseData = responseData
			utils.success(req, res);

		})

	},
	userUpdate: function (req, res) {
		// console.log("req", req);
		let userForUpdation = mongoose.Types.ObjectId(req.body._id);
		User.findByIdAndUpdate({ _id: userForUpdation }, req.body, { new: true }, function (err, result) {
			let responseData = ({
				message: "User Updated Successfully.",

			})
			req.responseData = responseData
			utils.success(req, res);
		})


	},
	deleteUser: function (req, res) {
		// console.log("req", req);
		let id = mongoose.Types.ObjectId(req.params.id)
		

		User.findByIdAndDelete(id, function (err, result) {
			if (err) {
				req.errorMsg = err
				utils.error(req, res)
			} else {
				let responseData = ({
					message: "success"
				})
				Seat.updateOne({ booked_slots: { $elemMatch: { student_id: req.params.id } } }, { "$pull": { "booked_slots": { "student_id": req.params.id } } }, { safe: true, multi: true }, function (err, obj) {
					if (err) {
						req.errorMsg = err
						utils.error(req, res)
					} else {
						let responseData = ({
							message: "success"
						})
						req.responseData = responseData
						utils.success(req, res)
		
					}
				});
				req.responseData = responseData
				utils.success(req, res)

			}
		})
		

	},

	getAllSeats: function (req, res) {
		// console.log("req", req);
		Seat.find().sort({ _id: -1 }).then(response => {
			// console.log("res", response);
			let responseData = ({
				message: "All Seats.",
				data: response
			})
			req.responseData = responseData
			utils.success(req, res)

		}).catch(err => {
			utils.error(req, res)
			console.log("errpr");
		})
	},

	getAllusers: function (req, res) {
		// console.log("req", req);
		User.find().sort({ _id: -1 }).then(response => {
			// console.log("res", response);
			let responseData = ({
				message: "All Users.",
				data: response
			})
			req.responseData = responseData
			utils.success(req, res)

		}).catch(err => {
			utils.error(req, res)
			console.log("errpr");
		})
	},

	getAllPayments: function (req, res) {
		// console.log("req", req);
		Payment.find().then(response => {
			// console.log("res", response);
			let responseData = ({
				message: "All Payments.",
				data: response
			})
			req.responseData = responseData
			utils.success(req, res)

		}).catch(err => {
			utils.error(req, res)
			console.log("errpr");
		})
	},
}
	// User.find().then(response => {
	// 	console.log("res", response);
	// 	jwt.sign({ response }, config.secret, { expiresIn: '60000s' }, (err, token) => {
	// 		if (err) {
	// 			return utils.error(req, res)
	// 		}
	// 		console.log("token", token);
	// 		let responseData = ({
	// 			message: "Login Successfully.",
	// 			token
	// 		})
	// 		req.responseData = responseData
	// 		utils.success(req, res)
	// 	})

	// }).catch(err => {
	// 	utils.error(req, res)
	// 	console.log("errpr");
	// })
/// for generating TOKEN and update first_name and email of an user account
// requestToken: async function (req, res) {
// 	try {
// 		let mobile = req.body.mobile
// 		let otp = req.body.otp
// 		if (!mobile && !otp) {
// 			req.errorMsg = 'Mobile/OTP is required.'
// 			req.statusCode = 403
// 			utils.failure(req, res)
// 		} else {
// 			let query = { mobile: mobile, otp: otp };
// 			if (otp == config.master_otp) {
// 				query = { mobile: mobile };
// 			}
// 			let loginres = await checkLogin(query, { first_name: req.body.first_name, email: req.body.email });
// 			if (loginres.statusCode == 100) {
// 				req.errorMsg = loginres.err
// 				utils.error(req, res)
// 			} else if (loginres.statusCode == 200) {
// 				let responseData = ({
// 					message: "Login Successfully.",
// 					data: {
// 						token: loginres.token,
// 						is_registered: loginres.is_registered,
// 						user_profile: loginres.data
// 					}
// 				})
// 				req.responseData = responseData
// 				utils.success(req, res)
// 			} else if (loginres.statusCode == 300) {
// 				User.findOne({ mobile: mobile }, function (err, result) {
// 					if (result && result.otp_attempt >= 5) {
// 						result.otp_attempt = result.otp_attempt + 1;
// 						result.is_active = false;
// 						result.save();
// 						req.errorMsg = "User has been blocked after five failed login attempts."
// 						req.statusCode = 400
// 						utils.error(req, res)
// 					} else if (result && (new Date().getTime() - new Date(result.otp_generated_at).getTime()) >= 300000) {
// 						result.otp = 0;
// 						result.save();
// 						req.errorMsg = "OTP Expire"
// 						req.statusCode = 400
// 						utils.error(req, res)
// 					} else {
// 						req.errorMsg = "Invalid OTP/Mobile Number"
// 						req.statusCode = 400
// 						utils.error(req, res)
// 					}
// 				})
// 			} else if (loginres.statusCode == 400) {
// 				req.errorMsg = "Your account has been blocked, contact to administrator."
// 				req.statusCode = 400
// 				utils.error(req, res)
// 			}
// 		}
// 	} catch (e) {
// 		req.errorMsg = e
// 		utils.error(req, res)
// 	}
// },
/// user to match OTP sent to an user or seller account
// matchOtp: async function (req, res) {
// 	try {
// 		let mobile = req.body.mobile
// 		let otp = req.body.otp
// 		if (!mobile && !otp) {
// 			req.errorMsg = 'Mobile/OTP is required.'
// 			req.statusCode = 403
// 			utils.failure(req, res)
// 		} else {
// 			let query = { mobile: mobile, otp: otp };
// 			if (otp == config.master_otp) {
// 				query = { mobile: mobile };
// 			}
// 			let loginres = await checkLogin(query);

// 			if (loginres.statusCode == 100) {
// 				req.errorMsg = loginres.err
// 				utils.error(req, res)
// 			} else if (loginres.statusCode == 200) {
// 				let device_detail = req.body.device_details
// 				if (device_detail && device_detail.token) {
// 					query['device_details.token'] = { $ne: device_detail.token }
// 					User.findOneAndUpdate(query, { $addToSet: { device_details: device_detail } }, function (err, doc) {
// 						if (err) {
// 							req.errorMsg = err
// 							req.statusCode = 403
// 							utils.failure(req, res)
// 						} else {
// 							if (loginres.is_registered) {
// 								let responseData = ({
// 									message: "Login Successfully.",
// 									data: {
// 										token: loginres.token,
// 										is_registered: loginres.is_registered,
// 										user_profile: loginres.data
// 									}
// 								})
// 								req.responseData = responseData
// 								utils.success(req, res)
// 							} else {
// 								let responseData = ({
// 									message: "Login Successfully.",
// 									data: {
// 										is_registered: loginres.is_registered
// 									}
// 								})
// 								req.responseData = responseData
// 								utils.success(req, res)
// 							}
// 						}
// 					});
// 				} else {
// 					if (loginres.is_registered) {
// 						let responseData = ({
// 							message: "Login Successfully.",
// 							data: {
// 								token: loginres.token,
// 								is_registered: loginres.is_registered,
// 								user_profile: loginres.data
// 							}
// 						})
// 						req.responseData = responseData
// 						utils.success(req, res)
// 					} else {
// 						let responseData = ({
// 							message: "Login Successfully.",
// 							data: {
// 								is_registered: loginres.is_registered
// 							}
// 						})
// 						req.responseData = responseData
// 						utils.success(req, res)
// 					}
// 				}
// 			} else if (loginres.statusCode == 300) {
// 				User.findOne({ mobile: mobile }, function (err, result) {
// 					if (result && result.otp_attempt >= 5) {
// 						result.otp_attempt = result.otp_attempt + 1;
// 						result.is_active = false;
// 						result.save();
// 						req.errorMsg = "User has been blocked after five failed login attempts."
// 						req.statusCode = 400
// 						utils.error(req, res)
// 					} else if (result && (new Date().getTime() - new Date(result.otp_generated_at).getTime()) >= 300000) {
// 						result.otp = 0;
// 						result.save();
// 						req.errorMsg = "OTP Expire"
// 						req.statusCode = 400
// 						utils.error(req, res)
// 					} else {
// 						req.errorMsg = "Invalid OTP/Mobile Number"
// 						req.statusCode = 400
// 						utils.error(req, res)
// 					}
// 				})
// 			} else if (loginres.statusCode == 400) {
// 				req.errorMsg = "Your account has been blocked, contact to administrator."
// 				req.statusCode = 400
// 				utils.error(req, res)
// 			}
// 		}
// 	} catch (e) {
// 		req.errorMsg = e
// 		utils.error(req, res)
// 	}
// },
//  used to resend OTP after expiry or if did't get
// resendOtp: async function (req, res) {
// 	try {
// 		let mobile = req.body.mobile
// 		if (!mobile) {
// 			req.errorMsg = 'Mobile is required.'
// 			req.statusCode = 403
// 			utils.failure(req, res)
// 		} else {
// 			User.findOne({ mobile: mobile }, function (err, result) {
// 				if (err) {
// 					req.errorMsg = err
// 					utils.error(req, res)
// 				} else {
// 					result.otp = result.otp ? result.otp : Math.floor(100000 + Math.random() * 900000);
// 					result.save();
// 					let otpres = sendotp(mobile, result.otp);
// 					req.responseData = ({
// 						message: "OTP sent."
// 					})
// 					utils.success(req, res)
// 				}
// 			})
// 		}
// 	} catch (e) {
// 		req.errorMsg = e
// 		utils.error(req, res)
// 	}
// },
// // used if seller forgot their password
// forgotPassword: async function (req, res) {
// 	try {
// 		const identifier = req.query.identifier
// 		if (validateEmail(identifier)) {
// 			var query = { email: identifier }
// 		} else {
// 			var query = { mobile: identifier }
// 		}

// 		User.findOne(query)
// 			.then(function (user) {
// 				if (!user) {
// 					return throwFailed(res, 'No user found with this userid.')
// 				}
// 				if (user.email) {
// 					var baseUrl = req.protocol + "://" + req.headers.host + '/admin/pages/forgetpassword?userid=' + user.id;
// 					let email = user.email
// 					let sub = 'Reset your account password'
// 					let body = '<h4><b>Reset Password</b></h4>' +
// 						'<p>To reset your password, click on link:</p>' +
// 						'<a href="' + baseUrl + '">' + baseUrl + '</a>' +
// 						'<br><br>' +
// 						'<p>--Team</p>'

// 					let email_res = sendemail(email, sub, body);
// 					if (email_res) {
// 						req.responseData = ({
// 							message: "Check your mail to reset your password."
// 						})
// 						utils.success(req, res)
// 					} else {
// 						req.errorMsg = 'Something went wrong, Try again!'
// 						utils.error(req, res)
// 					}
// 				}
// 				else {
// 					req.errorMsg = 'For Mobile pending.'
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				}
// 			})
// 	} catch (e) {
// 		req.errorMsg = e
// 		utils.error(req, res)
// 	}
// },
// /// used to add new user by admin
// addNewUser: async function (req, res) {
// 	let email = req.body.email
// 	let password = req.body.password
// 	if ((!password) && (!email)) {
// 		req.errorMsg = 'Email/Password is required.'
// 		req.statusCode = 400
// 		utils.failure(req, res)
// 	} else {
// 		let exist = await checkExistUser({ $or: [{ email: email }, { mobile: mobile }] });
// 		if (exist.statusCode == 200) {
// 			req.errorMsg = 'User Already Exist.'
// 			req.statusCode = 400
// 			utils.failure(req, res)
// 		} else {
// 			let userData = User(req.body)
// 			userData.password = userData.password ? userData.password : "password"
// 			bcrypt.hash(userData.password, saltRounds).then(function (hash) {
// 				userData.password = hash
// 				userData.save(function (err, result) {
// 					if (err) {
// 						let validationError = err.errors.mobile ? err.errors.mobile.message : ''
// 						validationError = validationError ? validationError : err
// 						req.errorMsg = err.errors.email ? err.errors.email.message : validationError
// 						utils.error(req, res)
// 					} else {
// 						let responseData = ({
// 							message: "New User has been added."
// 						})
// 						req.responseData = responseData
// 						utils.success(req, res)
// 					}
// 				})
// 			})
// 		}
// 	}
// },
// // user can check thier profile
// userProfile: async function (req, res) {
// 	let id = req.decoded.userId
// 	if (!id) {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	} else {
// 		User.find({ _id: id })
// 			.then(function (user) {
// 				if (!user) {
// 					req.errorMsg = "Invalid User"
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				}
// 				else {
// 					let responseData = ({
// 						message: "success",
// 						data: user
// 					})
// 					req.responseData = responseData
// 					utils.success(req, res)
// 				}
// 			})
// 	}
// },

// // admin can chage user's profile
// updateProfile: async function (req, res) {
// 	try {
// 		let userData = req.body;
// 		if (req.body.user_id) {
// 			let exist = await checkExistUser({ $and: [{ _id: { $ne: req.body.user_id } }, { $or: [{ email: userData.email }, { mobile: userData.mobile }] }] });
// 			if (exist.statusCode == 200) {
// 				req.errorMsg = "User Already Exist, please use unique email & mobile"
// 				req.statusCode = 400
// 				utils.failure(req, res)
// 			} else {
// 				let userId = req.body.user_id
// 				User.findOne({ _id: req.body.user_id }, function (err, result) {
// 					if (err) {
// 						req.errorMsg = err
// 						req.statusCode = 403
// 						utils.failure(req, res)
// 					} else {
// 						if (result) {
// 							if (result.password != userData.password) {
// 								bcrypt.hash(userData.password, saltRounds).then(function (hash) {
// 									userData.password = hash
// 									User.findOneAndUpdate({ _id: req.body.user_id }, userData, { new: true }, function (err, doc) {
// 										if (err) {
// 											req.errorMsg = err
// 											req.statusCode = 403
// 											utils.failure(req, res)
// 										} else {
// 											let responseData = ({
// 												message: "success",
// 												data: doc
// 											})
// 											req.responseData = responseData
// 											utils.success(req, res)
// 										}
// 									});
// 								})
// 							} else {
// 								User.findOneAndUpdate({ _id: req.body.user_id }, userData, { new: true }, function (err, doc) {
// 									if (err) {
// 										req.errorMsg = err
// 										req.statusCode = 403
// 										utils.failure(req, res)
// 									} else {
// 										let responseData = ({
// 											message: "success",
// 											data: doc
// 										})
// 										req.responseData = responseData
// 										utils.success(req, res)
// 									}
// 								});
// 							}
// 						}
// 					}
// 				})
// 			}
// 		} else {
// 			req.errorMsg = 'User ID is required.'
// 			req.statusCode = 403
// 			utils.failure(req, res)
// 		}
// 	} catch (e) {
// 		req.errorMsg = e
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },
// /// used for add new address
// addAddress: async function (req, res) {
// 	if (req.decoded) {
// 		let userId = req.decoded.userId
// 		let userAdd = req.body
// 		if (userAdd.is_default_shipping) {
// 			User.findOneAndUpdate({ _id: userId }, { $set: { "user_address.$[elem].is_default_shipping": false } }, { arrayFilters: [{ "elem.is_default_shipping": true }] }, function (err, doc) {
// 				if (err) {
// 					req.errorMsg = err
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				} else {
// 					User.findOneAndUpdate({ _id: userId }, { $addToSet: { user_address: userAdd } }, function (err, doc) {
// 						if (err) {
// 							req.errorMsg = err
// 							req.statusCode = 403
// 							utils.failure(req, res)
// 						} else {
// 							let responseData = ({
// 								message: "success"
// 							})
// 							req.responseData = responseData
// 							utils.success(req, res)
// 						}
// 					});
// 				}
// 			});
// 		} else {
// 			User.findOneAndUpdate({ _id: userId }, { $addToSet: { user_address: userAdd } }, function (err, doc) {
// 				if (err) {
// 					req.errorMsg = err
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				} else {
// 					let responseData = ({
// 						message: "success"
// 					})
// 					req.responseData = responseData
// 					utils.success(req, res)
// 				}
// 			});
// 		}
// 	} else {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },
// /// used for change default address
// changeDefaultAddress: async function (req, res) {
// 	if (req.decoded) {
// 		let userId = req.decoded.userId
// 		let defaultAddID = req.params.id
// 		if (defaultAddID) {
// 			User.findOneAndUpdate({ _id: userId }, { $set: { "user_address.$[elem].is_default_shipping": false } }, { arrayFilters: [{ "elem.is_default_shipping": true }] }, function (err, doc) {
// 				if (err) {
// 					req.errorMsg = err
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				} else {
// 					User.updateOne({}, { $set: { "user_address.$[elem].is_default_shipping": true } }, {
// 						multi: true,
// 						arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(defaultAddID) }]
// 					}, function (err, doc) {
// 						if (err) {
// 							req.errorMsg = err
// 							req.statusCode = 403
// 							utils.failure(req, res)
// 						} else {
// 							let responseData = ({
// 								message: "success"
// 							})
// 							req.responseData = responseData
// 							utils.success(req, res)
// 						}
// 					});
// 				}
// 			});
// 		} else {
// 			req.errorMsg = 'Invalid Address ID.'
// 			req.statusCode = 403
// 			utils.failure(req, res)
// 		}
// 	} else {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },
// /// used for edit address
// editAddress: async function (req, res) {
// 	if (req.decoded) {
// 		let userId = req.decoded.userId
// 		let addressId = req.params.id//mongoose.Types.ObjectId
// 		let userAdd = req.body
// 		if (userAdd.is_default_shipping) {
// 			User.findOneAndUpdate({ _id: userId }, { $set: { "user_address.$[elem].is_default_shipping": false } }, { arrayFilters: [{ "elem.is_default_shipping": true }] }, function (err, doc) {
// 				if (err) {
// 					req.errorMsg = err
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				} else {
// 					User.updateMany({}, { $set: { "user_address.$[elem]": userAdd } }, {
// 						multi: true,
// 						arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(addressId) }]
// 					}, function (err, doc) {
// 						if (err) {
// 							req.errorMsg = err
// 							req.statusCode = 403
// 							utils.failure(req, res)
// 						} else {
// 							let responseData = ({
// 								message: "success"
// 							})
// 							req.responseData = responseData
// 							utils.success(req, res)
// 						}
// 					});
// 				}
// 			});
// 		} else {
// 			User.updateMany({}, { $set: { "user_address.$[elem]": userAdd } }, {
// 				multi: true,
// 				arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(addressId) }]
// 			}, function (err, doc) {
// 				if (err) {
// 					req.errorMsg = err
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				} else {
// 					let responseData = ({
// 						message: "success"
// 					})
// 					req.responseData = responseData
// 					utils.success(req, res)
// 				}
// 			});
// 		}
// 	} else {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },
// /// used for remove address
// removeAddress: async function (req, res) {
// 	if (req.decoded) {
// 		let userId = req.decoded.userId
// 		let addressId = req.params.id//mongoose.Types.ObjectId
// 		let userAdd = req.body
// 		User.updateOne({ _id: mongoose.Types.ObjectId(userId) }, { $pull: { "user_address": { _id: mongoose.Types.ObjectId(addressId) } } }, { multi: true }, function (err, doc) {
// 			if (err) {
// 				req.errorMsg = err
// 				req.statusCode = 403
// 				utils.failure(req, res)
// 			} else {
// 				let responseData = ({
// 					message: "success"
// 				})
// 				req.responseData = responseData
// 				utils.success(req, res)
// 			}
// 		});
// 	} else {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },
// ///  used for change account password
// resetPassword: async function (req, res) {
// 	if (req.decoded.userId) {
// 		let old_password = req.body.old_password
// 		let new_password = req.body.new_password
// 		let confirm_password = req.body.confirm_password
// 		if (old_password && new_password && confirm_password) {
// 			if (!old_password && !new_password) {
// 				req.errorMsg = 'Password is required.'
// 				req.statusCode = 403
// 				utils.failure(req, res)
// 			} else if (confirm_password !== new_password) {
// 				req.errorMsg = "Confirm password doesn't match."
// 				req.statusCode = 400
// 				utils.failure(req, res)
// 			} else {
// 				let userData = {}
// 				bcrypt.hash(req.body.new_password, saltRounds).then(function (hash) {
// 					userData.password = hash
// 					User.findOne({ _id: req.decoded.userId, is_active: true }, function (err, resultUser) {
// 						if (err) {
// 							req.errorMsg = err
// 							req.statusCode = 403
// 							utils.failure(req, res)
// 						} else {
// 							if (resultUser) {
// 								let isValidPass = bcrypt.compareSync(old_password, resultUser.password ? resultUser.password : 'null')
// 								if (isValidPass) {
// 									User.findOneAndUpdate({ _id: req.decoded.userId, is_active: true }, userData, function (err, doc) {
// 										if (err) {
// 											req.errorMsg = err
// 											req.statusCode = 403
// 											utils.failure(req, res)
// 										} else {
// 											let responseData = ({
// 												message: "success"
// 											})
// 											req.responseData = responseData
// 											utils.success(req, res)
// 										}
// 									})
// 								} else {
// 									req.errorMsg = "Invalid Old Password."
// 									req.statusCode = 400
// 									utils.failure(req, res)
// 								}
// 							} else {
// 								req.errorMsg = "Invalid User Account."
// 								req.statusCode = 400
// 								utils.failure(req, res)
// 							}
// 						}
// 					})
// 				})
// 			}
// 		} else {
// 			req.errorMsg = 'Password is required.'
// 			req.statusCode = 403
// 			utils.failure(req, res)
// 		}
// 	} else {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },
// // add device details
// addDeviceDetail: async function (req, res) {
// 	if (req.decoded.userId) {
// 		let device_detail = req.body
// 		User.findOneAndUpdate({ _id: req.decoded.userId, is_active: true, 'device_details.token': { $ne: device_detail.token } }, { $addToSet: { device_details: device_detail } }, { new: true }, function (err, doc) {
// 			if (err) {
// 				req.errorMsg = err
// 				req.statusCode = 403
// 				utils.failure(req, res)
// 			} else {
// 				let responseData = ({
// 					message: "success"
// 				})
// 				req.responseData = responseData
// 				utils.success(req, res)
// 			}
// 		})
// 	} else {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },

// changeUserAccountStatus: async function (req, res) {
// 	if (req.decoded) {
// 		let userId = req.body.user_id
// 		let status = (req.body.status) ? (req.body.status) : false
// 		if (userId) {

// 			User.updateOne({ _id: userId }, { $set: { "is_active": status } }, function (err, doc) {
// 				if (err) {
// 					req.errorMsg = err
// 					req.statusCode = 403
// 					utils.failure(req, res)
// 				} else {
// 					let responseData = ({
// 						message: "success"
// 					})
// 					req.responseData = responseData
// 					utils.success(req, res)
// 				}
// 			});
// 		} else {
// 			req.errorMsg = 'User ID is required.'
// 			req.statusCode = 403
// 			utils.failure(req, res)
// 		}

// 	} else {
// 		req.errorMsg = 'User ID is required.'
// 		req.statusCode = 403
// 		utils.failure(req, res)
// 	}
// },

