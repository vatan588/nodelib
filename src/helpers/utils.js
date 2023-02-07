"use strict"
    // ---------------------------------------------------------
    //      Common Helper to send response and manage errors
    // ---------------------------------------------------------

module.exports = {
    success: async function(req, res){
        let data = req.responseData
        req.responseData = ''
        data.success = true
        data.status = (req.statusCode)? req.statusCode : 200
        return res.status(200).send(data)
    },
    failure: async function(req, res){
        let statusCode = (req.statusCode)? req.statusCode : 403
        let errorMsg = (req.errorMsg)? req.errorMsg : 'Network Failure'
        return res.status(statusCode).send({
            success: false,
            status: statusCode,
            message: errorMsg
        })
    },
    error: async function(req, res){
        let errorMsg = (req.errorMsg)? req.errorMsg : 'Network Failure'
        return res.status(400).send({
            success: false,
            status: 400,
            message: errorMsg
        })
    },
    noDataFound: async function(req, res){
        return res.status(400).send({
            success: false,
            status: 400,
            message: "No record found."
        })
    },
    pathNotFound: async function(req, res){
        return res.status(404).send({
            success: false,
            status: 404,
            message: "Not found."
        })
    }
};
