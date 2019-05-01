module.exports = {

    operator: {
        add:0,
        subtract:1,
        multiply:2,
        divide:3
    },

    flag: {
        ignoreNegativeResults:  true,//忽略负数结果
        showResults:            false,//显示计算结果
        showVerboseLog:         false,//显示中间日志结果
    },

    config: {
        leftDigits: 1,
        operator: 0,//add
        rightDigits: 1,
        minResultsDigits: 1,
        maxResultsDigits: 2,
        flags:{ignoreNegativeResults: true}
    },

    generateFormula: function(config) {
        var returnFormula = '';
        var MaxCalcTimes = 100;
        var calcTimes = 0;

        while(++calcTimes <= MaxCalcTimes) {
            var filterLR = this._filterByCondition(this._randomIntegerInDigits(config.leftDigits), config.operator, this._randomIntegerInDigits(config.rightDigits), config.flags);
            var resultInteger = this._resultInteger(filterLR.lVal,config.operator,filterLR.rVal);
            var resultIntegerDigits = this._digitsInValueInteger(resultInteger);

            if (resultIntegerDigits >= config.minResultsDigits && resultIntegerDigits <= config.maxResultsDigits) {
                returnFormula = this._stringFormula(filterLR.lVal,config.operator,filterLR.rVal);
                if (config.flags.showResults) {
                    returnFormula += resultInteger;
                }

                if(config.flags.showVerboseLog) console.log(returnFormula);
                break;
            }
        }

        if (config.flags.showVerboseLog && calcTimes > MaxCalcTimes) console.log('error pararms to generate formula');

        return returnFormula;
    },

    //根据标志位过滤结果
    _filterByCondition: function(leftInteger,operator,rightInteger,flags) {
        var lVal = leftInteger;
        var rVal = rightInteger;

        if (operator === this.operator.subtract && (flags.ignoreNegativeResults)) {
            if (lVal < rVal) {
                var temp = lVal;
                lVal = rVal;
                rVal = temp;
            }
        }

        return {
            lVal:lVal,
            rVal:rVal
        };
    },

    //位数生成
    _randomIntegerInDigits: function(digits) {

        var MinDigits = 1;
        var MaxDigits = 10;
        var curDigits = 0;

        if (digits < MinDigits) {
            curDigits = MinDigits;
        }
        else if (digits > MaxDigits) {
            curDigits = MaxDigits;
        }
        else {
            curDigits = digits;
        }

        return this._randomInteger(
                this._minIntegerInDigits(curDigits),
                this._maxIntegerInDigits(curDigits));
    },

    //指定位数的最大数值
    _maxIntegerInDigits: function(digits) {
        return Math.pow(10,digits) - 1;
    },

    //指定位数的最小数值
    _minIntegerInDigits: function(digits) {
        if(digits === 1) {
            return 0; 
        }
        return Math.pow(10,digits-1);
    },

    //指定范围的随机数值
    _randomInteger: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    //计算数值结果
    _resultInteger: function(leftInteger,operator,rightInteger) {
        var resultInteger = 0;
        if(operator === this.operator.add) {
            resultInteger = leftInteger + rightInteger;
        }
        else if (operator === this.operator.subtract) {
            resultInteger = leftInteger - rightInteger;
        }
        else if (operator === this.operator.multiply) {
            resultInteger = leftInteger * rightInteger;
        }
        else if (operator === this.operator.divide) {
            resultInteger = leftInteger / rightInteger;
        }
        else {
            resultInteger = 0;
        }
        return resultInteger;
    },

    //计算数值的位数
    _digitsInValueInteger: function(valueInteger) {
        var curValue = valueInteger;
        var curDigits = 0;
        do {
            curValue /= 10;
            curDigits++;
        }
        while(curValue >= 1);
        return curDigits;
    },

    //产生算式字符串
    _stringFormula: function(leftInteger,operator,rightInteger) {
        var returnFormula = '';
        if(operator === this.operator.add) {
            returnFormula = leftInteger + ' + ' + rightInteger + ' = ';
        }
        else if (operator === this.operator.subtract) {
            returnFormula = leftInteger + ' - ' + rightInteger + ' = ';
        }
        else if (operator === this.operator.multiply) {
            returnFormula = leftInteger + ' x ' + rightInteger + ' = ';
        }
        else if (operator === this.operator.divide) {
            returnFormula = leftInteger + ' ÷ ' + rightInteger + ' = ';
        }
        else {
            returnFormula = '';
        }
        return returnFormula;
    }
}

