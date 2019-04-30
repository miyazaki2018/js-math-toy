import mathGen from '../../../lib/math-generator'

describe('模拟完整试卷输出', ()=> {
    //因为有随机数这里会暴力测试
    for(var i=0;i<25;i++) {
        mathGen.generateFormula(2,mathGen.operator.add,2,2,2,{
            ignoreNegativeResults:true,
            showResults:true,
            showVerboseLog:true
        });
        mathGen.generateFormula(2,mathGen.operator.subtract,2,1,2,{
            ignoreNegativeResults:true,
            showResults:true,
            showVerboseLog:true
        });
    }
})

describe('指定位数的数字生成测试', ()=> {
    it('测试指定位数的最大值', ()=> {
        expect(mathGen._maxIntegerInDigits(1)).toBe(9);
        expect(mathGen._maxIntegerInDigits(2)).toBe(99);
        expect(mathGen._maxIntegerInDigits(10)).toBe(9999999999);
    });

    it('测试指定位数的最小值', ()=> {
        expect(mathGen._minIntegerInDigits(1)).toBe(0);
        expect(mathGen._minIntegerInDigits(2)).toBe(10);
        expect(mathGen._minIntegerInDigits(10)).toBe(1000000000);
    });

    it('测试指定范围的随机数', ()=> {
        expect(mathGen._randomInteger(1,1)).toBe(1);
        expect(mathGen._randomInteger(1000000000,1000000000)).toBe(1000000000);
        expect(mathGen._randomInteger(2,3)).toBeGreaterThan(1);
        expect(mathGen._randomInteger(2,3)).toBeLessThan(4);
    })

    it('测试指定位数范围下的随机数', ()=> {
        expect(mathGen._randomIntegerInDigits(2)).toBeGreaterThan(9);
        expect(mathGen._randomIntegerInDigits(2)).toBeLessThan(100);
    })
})

describe('算式生成测试', ()=> {
    it('计算结果值', ()=> {
        expect(mathGen._resultInteger(11,mathGen.operator.add,22)).toBe(33);
        expect(mathGen._resultInteger(22,mathGen.operator.subtract,12)).toBe(10);
        expect(mathGen._resultInteger(11,mathGen.operator.multiply,11)).toBe(121);
        expect(mathGen._resultInteger(18,mathGen.operator.divide,3)).toBe(6);
    })

    it('根据数值计算位数', ()=> {
        expect(mathGen._digitsInValueInteger(0)).toBe(1);
        expect(mathGen._digitsInValueInteger(9)).toBe(1);
        expect(mathGen._digitsInValueInteger(10)).toBe(2);
        expect(mathGen._digitsInValueInteger(99)).toBe(2);
        expect(mathGen._digitsInValueInteger(100)).toBe(3);
        expect(mathGen._digitsInValueInteger(999)).toBe(3);
        expect(mathGen._digitsInValueInteger(9999999999)).toBe(10);
    })

    it('获取算式字符串', ()=> {
        expect(mathGen._stringFormula(1,mathGen.operator.add,1)).toBe('1 + 1 = ');
        expect(mathGen._stringFormula(1,mathGen.operator.subtract,1)).toBe('1 - 1 = ');
        expect(mathGen._stringFormula(1,mathGen.operator.multiply,1)).toBe('1 x 1 = ');
        expect(mathGen._stringFormula(1,mathGen.operator.divide,1)).toBe('1 ÷ 1 = ');
    })

    it('获取算式结果值', ()=> {
        expect(mathGen._filterByCondition(1,mathGen.operator.subtract,2,{ignoreNegativeResults:true}).lVal).toBe(2);
        expect(mathGen._filterByCondition(1,mathGen.operator.subtract,2,{ignoreNegativeResults:true}).rVal).toBe(1);
        expect(mathGen._filterByCondition(1,mathGen.operator.subtract,2,0).lVal).toBe(1);
        expect(mathGen._filterByCondition(1,mathGen.operator.subtract,2,0).rVal).toBe(2);
    })
    
})
  