
const config = require('../config/config');

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