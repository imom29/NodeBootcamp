const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse');

// To get All BootCamps
// Route : GET /api/v1/bootcamps
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    let reqQuery = { ...req.query };

    let exclude = ['select', 'sort'];

    exclude.forEach(param => delete reqQuery[param]);

    // console.log(reqQuery);
    //Advance Query in Mongo 
    // DOing the averagecost comparison per the url query given.

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = Bootcamp.find(JSON.parse(queryStr));

    if (req.query.select) {
        // In mongooose to select we have to pass fields like "name description" but we are getting like "name,description"
        const fields = req.query.select.replace(',', ' ');
        query = query.select(fields);
    }

    // Sorting by field given in paramas or else by date created
    if (req.query.sort) {
        const sortBy = req.query.sort.replace(',', ' ');
        query = query.sort(sortBy);
    }
    else {
        query = query.sort('-CreatedAt');
    }


    // Now We can pass select = fields and then only get those fields in result

    const bootcamps = await query;
    res.status(200).json({ success: true, data: bootcamps, count: bootcamps.length })
})

// To get one BootCamp
// Route : GET /api/v1/bootcamps/:id
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Can't Find Bootcamp with id ${id}`, 404));
    }
    res.status(200).json({ success: true, data: bootcamp })
})

// Create a bootcamp
// Route : POST /api/v1/bootcamps
exports.createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp })
})

// To Update BootCamp
// Route : PUT /api/v1/bootcamps/:id
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!bootcamp) {
        return next(new ErrorResponse(`Can't Find Bootcamp with id ${id}`, 404));
    }

    res.status(200).json({ success: true, data: req.body })
})

// To delete a BootCamp
// Route : DELETE /api/v1/bootcamps/:id
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Can't Find Bootcamp with id ${id}`, 404));
    }

    res.status(200).json({ success: true, data: {} })
})