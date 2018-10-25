
const config = require('../config/config');

/**
 * varifies if the values provided meets all the requirements
 * of the range specified along with its max and min provided value
 * @param {*} params  the query parameters
 * @param {*} rangeFrom rangefrom value provided in the request
 * @param {*} rangeTo rangeto value provided in the request
 * @param {*} maxValue configured max value for the specific filter
 * @param {*} minValue configured min value for the specific filter
 */
var checkRangeValidity = function (params, rangeFrom, rangeTo, maxValue, minValue) {
    let response = {};
    if (!isNaN(params[rangeFrom])) {
        let valueFrom = parseInt(params[rangeFrom]);
        let valueTo = parseInt(params[rangeTo]);

        if (valueFrom < minValue) {
            valueFrom = minValue;
        }

        if(valueTo > maxValue || isNaN(valueTo)){
            valueTo = maxValue;
        }

        if (valueFrom < valueTo) {
            response["valueFrom"] = valueFrom;
            response["valueTo"] = valueTo;
            response[config.considerQuery] = true;
            return response;
        }
    }
    response[config.considerQuery] = false;
    return response;
}

/**
 * Checks if distance provided in the request is as per our distance filter
 * if less than min is provided then min value is considered
 * If greater than max is provided max is considered
 * @param {*} value 
 * @param {*} min 
 * @param {*} max 
 */
var checkDistanceValidity = function(value,min,max){
    let response = {};
    if (!isNaN(value)) {
        let distance = parseInt(value);
        response[config.valueFrom] = (distance < min) ? min:(distance < max) ? distance:max;
        response[config.considerQuery] = true;
        return response;
    }
    response[config.considerQuery] = false;
    return response;
}

module.exports = {
    checkRangeValidity : checkRangeValidity,
    checkDistanceValidity : checkDistanceValidity
}