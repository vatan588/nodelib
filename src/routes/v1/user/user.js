"use strict"

var express = require('express')
var router = express.Router()

var controller = require('../../../controllers/v1/user/user')
// var orderController = require('../../../controllers/v1/user/order')
// var cartController = require('../../../controllers/v1/user/cart')
// var wishlistController = require('../../../controllers/v1/user/wishlist')
// var deliveryController = require('../../../controllers/v1/user/delivery')
// var notificationController = require('../../../controllers/v1/user/notification')
// var authenticate = require('../../../helpers/authenticate');
const multer = require('multer')
var storage = multer.diskStorage({
	constructor(fileSize) {
		this.fileSize = fileSize;
		this.storage = multer.diskStorage({
			destination(req, file, cb) {
				cb(null, `/home/Scanngo/uploads/`);
			}
		})
	}
})
const upload = multer({
	storage: this.storage,

}).any();

// router.put(
// 	'/upload_profile_pic',
// 	authenticate.userAuthenticate,
// 	upload,
// 	controller.uploadProfilePic
// )
router.post(
	'/login',
	controller.userLogin
)
// router.post(
// 	'/add_user',
// 	//authenticate.adminAuthenticate,
// 	controller.addNewUser
// )
router.get(
	'/allPayments',
	controller.userAuthenticate,
	controller.getAllPayments
)
router.post(
	'/addUser',
	controller.userAuthenticate,
	controller.addUser
)
router.post(
	'/userUpdate',
	controller.userAuthenticate,
	controller.userUpdate
)
router.post(
	'/userUpdate/:id',
	controller.userAuthenticate,
	controller.updateUserAndUpdateSeats
)
router.get(
	'/getAllSeats',
	controller.userAuthenticate,
	controller.getAllSeats
)
router.post(
	'/seatBooking',
	controller.userAuthenticate,
	controller.seatBooking
)
router.post(
	'/paymentUpdate',
	controller.userAuthenticate,
	controller.paymentUpdate
)
router.delete(
	'/deleteUser/:id',
	controller.userAuthenticate,
	controller.deleteUser
)
router.get(
	'/getAllUsers',
	controller.getAllusers
)

// router.post(
// 	'/match_otp',
// 	controller.matchOtp
// )
// router.post(
// 	'/request_token',
// 	controller.requestToken
// )
// router.post(
// 	'/resend_otp',
// 	controller.resendOtp
// )
// router.get(
// 	'/forgot_password',
// 	controller.forgotPassword
// )
// router.post(
// 	'/reset_password',
// 	authenticate.allRegisteredUserAuthenticate,
// 	controller.resetPassword
// )
// router.get(
// 	'/user_profile',
// 	authenticate.allRegisteredUserAuthenticate,
// 	controller.userProfile
// )
// router.post(
// 	'/edit_profile',
// 	upload,
// 	authenticate.allRegisteredUserAuthenticate,
// 	controller.editProfile
// )
// router.put(
// 	'/update_user',
// 	authenticate.adminAuthenticate,
// 	controller.updateProfile
// )
// router.post(
// 	'/add_address',
// 	authenticate.allRegisteredUserAuthenticate,
// 	controller.addAddress
// )
// router.post(
// 	'/edit_address/:id',
// 	authenticate.allRegisteredUserAuthenticate,
// 	controller.editAddress
// )
// router.put(
// 	'/change_default_address/:id',
// 	authenticate.allRegisteredUserAuthenticate,
// 	controller.changeDefaultAddress
// )
// router.delete(
// 	'/remove_address/:id',
// 	authenticate.allRegisteredUserAuthenticate,
// 	controller.removeAddress
// )
// router.post(
//  '/add_device_detail',
//  authenticate.allRegisteredUserAuthenticate,
//  controller.addDeviceDetail
// )
// //======================== Order Api's =====================
// router.post(
// 	'/create_order',
// 	authenticate.userAuthenticate,
// 	orderController.addNewOrder
// )
// router.get(
// 	'/order_list',
// 	authenticate.userAuthenticate,
// 	orderController.getAllOrder
// )
// router.get(
// 	'/order_list_by_date/:startdate/:enddate',
// 	authenticate.allRegisteredUserAuthenticate,
// 	orderController.getAllOrderbyDate
// )
// router.get(
// 	'/download_order_list/:start_date/:end_date',
// 	authenticate.allRegisteredUserAuthenticate,
// 	orderController.downloadAllOrders
// )
// router.get(
// 	'/order_by_mobile/:mobile',
// 	authenticate.allRegisteredUserAuthenticate,
// 	orderController.getAllOrderbyMobile
// )
// router.get(
// 	'/track_order/:order_id',
// 	authenticate.userAuthenticate,
// 	orderController.trackOrder
// )
// router.get(
// 	'/order_detail/:order_id',
// 	authenticate.userAuthenticate,
// 	orderController.getOrderById
// )
// router.put(
// 	'/change_order_status',
// 	authenticate.allRegisteredUserAuthenticate,
// 	orderController.changeOrderStatus
// )
// router.get(
// 	'/get_all_order_list',
// 	authenticate.adminAuthenticate,
// 	orderController.getAllOrderByAdmin
// )
// router.get(
// 	'/get_return_order_list',
// 	authenticate.adminAuthenticate,
// 	orderController.getAllReturnedOrderByAdmin
// )
// router.delete(
// 	'/remove_order/:order_id',
// 	authenticate.allRegisteredUserAuthenticate,
// 	orderController.removeOrder
// )
// //=======cart
// router.post(
// 	'/add_to_cart',
// 	authenticate.userAuthenticate,
// 	cartController.addNewCartall
// )
// router.post(
// 	'/add_to_cart_all',
// 	authenticate.userAuthenticate,
// 	cartController.addNewCartall
// )
// router.post(
// 	'/add_product_cart_count',
// 	authenticate.userAuthenticate,
// 	cartController.addProductCartCount
// )
// router.post(
// 	'/get_product_availiblity',
// 	 authenticate.userAuthenticate,
// 	 cartController.getProductAvailiblity
// )
// router.get(
// 	'/get_cart',
//   authenticate.userAuthenticate,
// 	cartController.getCartList
// )
// router.delete(
// 	'/remove_cart_item/:product_id',
// 	authenticate.userAuthenticate,
// 	cartController.removeCartItem
// )

// ///============ Wishlist / save for later
// router.get(
// 	'/add_to_save_for_later/:product_id',
// 	authenticate.userAuthenticate,
// 	wishlistController.addNewWishlist
// )
// router.get(
// 	'/save_for_later_list/',
// 	authenticate.userAuthenticate,
// 	wishlistController.getWishlistList
// )
// router.get(
// 	'/save_for_later_to_cart/:product_id',
// 	authenticate.userAuthenticate,
// 	wishlistController.wishlistToCart
// )
// router.delete(
// 	'/remove_item/:product_id',
// 	authenticate.userAuthenticate,
// 	wishlistController.removeWishlistItem
// )

// //========Delivery location and rates==========
// router.post(
// 	'/delivery_rates_with_location',
// 	deliveryController.addDeliveryLocationRate
// )
// router.get(
// 	'/delivery_locations_list',
// 	deliveryController.deliveryLocationList
// )

// //=========Delivery Threshold

// router.put(
// 	'/delivery_threshold',
// 	deliveryController.updateDeliveryThreshold
// )

// router.get(
// 	'/delivery_threshold',
// 	deliveryController.getDeliveryThreshold
// )

// //=============notification

// router.get(
// 	'/get_all_notification',
// 	authenticate.allRegisteredUserAuthenticate,
// 	notificationController.getNotifications
// )
// router.get(
// 	'/mark_as_read/:notification_id',
// 	authenticate.allRegisteredUserAuthenticate,
// 	notificationController.markAsRead
// )

// router.post(
// 	'/change_user_account_status',
// 	authenticate.adminAuthenticate,
// 	controller.changeUserAccountStatus
// )
// router.get(
// 	'/proceed_to_cart_reload',
//  	 authenticate.userAuthenticate,
// 	cartController.proceedToCartReload
// )
module.exports = router


