module.exports = {

    operator: {
        add:0,
        subtract:1,
        multiply:2,
        divide:3
    },

    generateFormula: function(leftDigits,operator,rightDigits,minResultsDigits,maxResultsDigits) {

        var isInRangeOfDigits = false;
        var returnFormula = '';

        while(!isInRangeOfDigits) {
            var leftInteger = this._randomIntegerInDigits(leftDigits);
            var rightInteger = this._randomIntegerInDigits(rightDigits);
            var resultInteger = this._resultInteger(leftInteger,operator,rightInteger);
            var resultIntegerDigits = this._digitsInValueInteger(resultInteger);

            console.log(leftInteger + ' ' + operator + ' ' + rightInteger + ' = ' +resultInteger);

            if (resultIntegerDigits >= minResultsDigits && resultIntegerDigits <= maxResultsDigits) {
                isInRangeOfDigits = true;
                returnFormula = this._stringFormula(leftInteger,operator,rightInteger);
            }
        }

        console.log('returnFormula: ' + returnFormula);
        return returnFormula;
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
            returnFormula = leftInteger + ' + ' + rightInteger + ' =';
        }
        else if (operator === this.operator.subtract) {
            returnFormula = leftInteger + ' - ' + rightInteger + ' =';
        }
        else if (operator === this.operator.multiply) {
            returnFormula = leftInteger + ' x ' + rightInteger + ' =';
        }
        else if (operator === this.operator.divide) {
            returnFormula = leftInteger + ' ÷ ' + rightInteger + ' =';
        }
        else {
            returnFormula = '';
        }
        return returnFormula;
    }

}

