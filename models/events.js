/**
 * Created by janschmutz on 04.04.17.
 */
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    attending_count: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    location: {
        type: {
            type: String
        },
        coordinates: []
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
eventSchema.index({location: '2dsphere'});

var Events = module.exports = mongoose.model('event', eventSchema, 'event');

module.exports.getEvents = function(callback, limit) {
    Events.find(callback).limit(limit);
};
module.exports.getEventbyId = function(id, callback) {
    Events.findById(id, callback);
};
module.exports.addEvent = function(event, callback) {
    Events.create(event, callback);
};
module.exports.updateEvent = function (id, event, options, callback) {
    var query = {_id : id};
    var update = {
        name: event.name,
        cover: event.cover,
        description: event.description,
        attending_count: event.attending_count,
        city: event.city,
        location: {
            type: "Point",
            coordinates: [event.latitude,event.longitude]
        },
        start_time: new Date(event.start_time),
        end_time: new Date(event.end_time)
    };

    Events.findOneAndUpdate(query, update, options, callback);
};
module.exports.getEventsbyLocation = function(location, callback) {
    var longitude = parseFloat(location.long);
    var latitude = parseFloat(location.lat);
    var now = new Date();
    var tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    console.log(tomorrow);
    var query = {
        location: {
            $near : {
            $geometry: { type: "Point",  coordinates: [longitude,latitude] },
            $maxDistance: 10000
            }
        },
        $and: [
            { end_time : {$gte: now, $lt: tomorrow} }
        ]
    }
    Events.find(query, callback);
};
module.exports.deleteEvents = function (callback) {
    var today = new Date();
    var tt = today.toISOString();
    console.log(tt);
    var query = {
        end_time: {
            $lt : new Date(tt)
        }
    }
    Events.remove(query, callback);
};