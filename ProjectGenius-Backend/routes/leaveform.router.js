const leave = require('../controller/leaveform.controller')
const express = require('express')
const router = express.Router();



router.post("/leaveapplication",leave.leaveapplication)
router.get("/leaveDisplay",leave.leaveDisplay)
router.delete("/leaveapplicationDelete/:id",leave.leaveapplicationDelete)
router.put("/LeavestatusEdit/:id",leave.leaveapplicationupdate)
module.exports = router;