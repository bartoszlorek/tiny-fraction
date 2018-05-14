import f from '../src/tiny-fraction'

describe('constructor', () => {
    it('should handle falsy values', () => {
        const falsy = { n: NaN, d: NaN, s: 1 }
        expect(f()).toEqual(falsy)

        expect(f(null)).toEqual(falsy)
        expect(f(null, null)).toEqual(falsy)
        expect(f(null, 1)).toEqual(falsy)

        expect(f(NaN)).toEqual(falsy)
        expect(f(NaN, NaN)).toEqual(falsy)
        expect(f(NaN, 2)).toEqual(falsy)
    })

    it('should handle division by zero', () => {
        expect(() => f(4, null)).toThrow()
        expect(() => f(4, 0)).toThrow()
    })

    it('should accept second argument', () => {
        expect(f(0, 4)).toEqual({ n: 0, d: 4, s: 1 })
        expect(f(1, 3)).toEqual({ n: 1, d: 3, s: 1 })
        expect(f(1.33, 2)).toEqual({ n: 1.33, d: 2, s: 1 })
        expect(f(2, NaN)).toEqual({ n: 2, d: NaN, s: 1 })
    })

    it('should return fraction object', () => {
        expect(f(2).__fraction).toBe(true)
    })

    it('should clone fraction object', () => {
        let val = f(2)
        expect(val).not.toBe(f(val))
    })
})

describe('instance', () => {
    it('should have a methods', () => {
        let methods = expect.objectContaining({
            __fraction: true,
            valueOf: expect.any(Function),
            add: expect.any(Function),
            subtract: expect.any(Function),
            multiply: expect.any(Function),
            divide: expect.any(Function)
        })
        expect(f(3)).toEqual(methods)
    })

    it('should have a properties', () => {
        let props = expect.objectContaining({
            d: expect.any(Number),
            n: expect.any(Number),
            s: expect.any(Number)
        })
        expect(f(3)).toEqual(props)
    })
})

describe('.valueOf', () => {
    it('should return number', () => {
        let val = f(3)
        expect(val.valueOf()).toBe(3)
    })

    it('should not modify fraction', () => {
        let val = f(4)
        expect(val.valueOf()).toBe(4)
        expect(val.valueOf()).toBe(4)
        expect(val.valueOf()).toBe(4)
    })
})

describe('.add', () => {
    it('should return new fraction object', () => {
        let a = f(0.25),
            b = a.add(0.33)
        expect(a).not.toBe(b)
        expect(a.valueOf()).toBe(0.25)
        expect(b.valueOf()).toBe(0.58)
    })

    it('should accept number or another fraction object', () => {
        let number = f(0.44).add(0.2),
            object = f(0.44).add(f(0.2))
        expect(number.valueOf()).toBe(0.64)
        expect(object.valueOf()).toBe(0.64)
    })

    it('should be chainable', () => {
        let val = f(0.1)
            .add(0.2)
            .add(0.7)
        expect(val.valueOf()).toBe(1)
    })

    it('should handle correct sign', () => {
        let a = f(0.33).add(0.22),
            b = f(0.33).add(-0.22),
            c = f(0.33).add(-0.66)
        expect(a.valueOf()).toBe(0.55)
        expect(b.valueOf()).toBe(0.11)
        expect(c.valueOf()).toBe(-0.33)
    })

    it('should handle small numbers', () => {
        let val = f(0.0000033).add(0.0000112)
        expect(val.valueOf()).toBe(0.0000145)
    })

    it('should handle big numbers', () => {
        let val = f(43345.33).add(34460.012)
        expect(val.valueOf()).toBe(77805.342)
    })

    it('should handle binary floating point numbers', () => {
        let a = f(0.1).add(0.2),
            b = f(0.3).add(0.6)
        expect(a.valueOf()).toBe(0.3)
        expect(b.valueOf()).toBe(0.9)
    })

    it('should handle integers', () => {
        let val = f(0.1).add(11)
        expect(val.valueOf()).toBe(11.1)
    })

    it('should handle zero', () => {
        let val = f(0.33).add(0)
        expect(val.valueOf()).toBe(0.33)
    })

    it('should handle complex addition', () => {
        let fragA = f(1).divide(3),
            fragB = f(1).divide(7)

        let valA = f(0)
            .add(fragA)
            .add(fragA)
            .add(fragA)

        let valB = f(0)
            .add(fragB)
            .add(fragB)
            .add(fragB)
            .add(fragB)
            .add(fragB)
            .add(fragB)
            .add(fragB)

        expect(valA.valueOf()).toBe(1)
        expect(valB.valueOf()).toBe(1)
    })
})

describe('.subtract', () => {
    it('should return new fraction object', () => {
        let a = f(0.25),
            b = a.subtract(0.33)
        expect(a).not.toBe(b)
        expect(a.valueOf()).toBe(0.25)
        expect(b.valueOf()).toBe(-0.08)
    })

    it('should accept number or another fraction object', () => {
        let number = f(0.66).subtract(0.22),
            object = f(0.66).subtract(f(0.22))
        expect(number.valueOf()).toBe(0.44)
        expect(object.valueOf()).toBe(0.44)
    })

    it('should be chainable', () => {
        let val = f(0.1)
            .subtract(0.2)
            .subtract(0.7)
        expect(val.valueOf()).toBe(-0.8)
    })

    it('should handle correct sign', () => {
        let a = f(0.33).subtract(0.22),
            b = f(0.33).subtract(-0.22),
            c = f(5.12).subtract(16.66)
        expect(a.valueOf()).toBe(0.11)
        expect(b.valueOf()).toBe(0.55)
        expect(c.valueOf()).toBe(-11.54)
    })

    it('should handle small numbers', () => {
        let val = f(0.0000033).subtract(0.0000112)
        expect(val.valueOf()).toBe(-0.0000079)
    })

    it('should handle big numbers', () => {
        let val = f(4335.33).subtract(3460.012)
        expect(val.valueOf()).toBe(875.318)
    })

    it('should handle binary floating point numbers', () => {
        let a = f(0.1).subtract(0.2),
            b = f(0.3).subtract(0.6)
        expect(a.valueOf()).toBe(-0.1)
        expect(b.valueOf()).toBe(-0.3)
    })

    it('should handle integers', () => {
        let a = f(5.33).subtract(11),
            b = f(5.33).subtract(-11)
        expect(a.valueOf()).toBe(-5.67)
        expect(b.valueOf()).toBe(16.33)
    })

    it('should handle zero', () => {
        let val = f(0.33).subtract(0)
        expect(val.valueOf()).toBe(0.33)
    })
})

describe('.multiply', () => {
    it('should return new fraction object', () => {
        let a = f(0.25),
            b = a.multiply(0.33)
        expect(a).not.toBe(b)
        expect(a.valueOf()).toBe(0.25)
        expect(b.valueOf()).toBe(0.0825)
    })

    it('should accept number or another fraction object', () => {
        let number = f(0.66).multiply(0.22),
            object = f(0.66).multiply(f(0.22))
        expect(number.valueOf()).toBe(0.1452)
        expect(object.valueOf()).toBe(0.1452)
    })

    it('should be chainable', () => {
        let val = f(0.1)
            .multiply(0.2)
            .multiply(0.7)
        expect(val.valueOf()).toBe(0.014)
    })

    it('should handle correct sign', () => {
        let a = f(0.33).multiply(0.22),
            b = f(0.33).multiply(-0.22)
        expect(a.valueOf()).toBe(0.0726)
        expect(b.valueOf()).toBe(-0.0726)
    })

    it('should handle small numbers', () => {
        let val = f(0.0000033).multiply(0.0000112)
        expect(val.valueOf()).toBe(0.00000000003696)
    })

    it('should handle big numbers', () => {
        let val = f(4335.33).multiply(3460.012)
        expect(val.valueOf()).toBe(15000293.82396)
    })

    it('should handle binary floating point numbers', () => {
        let a = f(0.1).multiply(0.2),
            b = f(0.3).multiply(0.6)
        expect(a.valueOf()).toBe(0.02)
        expect(b.valueOf()).toBe(0.18)
    })

    it('should handle integers', () => {
        let a = f(5.33).multiply(11),
            b = f(5.33).multiply(-11)
        expect(a.valueOf()).toBe(58.63)
        expect(b.valueOf()).toBe(-58.63)
    })

    it('should handle zero', () => {
        let val = f(0.33).multiply(0)
        expect(val.valueOf()).toBe(0)
    })
})

describe('.divide', () => {
    it('should return new fraction object', () => {
        let a = f(0.66),
            b = a.divide(0.2)
        expect(a).not.toBe(b)
        expect(a.valueOf()).toBe(0.66)
        expect(b.valueOf()).toBe(3.3)
    })

    it('should accept number or another fraction object', () => {
        let number = f(0.66).divide(0.22),
            object = f(0.66).divide(f(0.22))
        expect(number.valueOf()).toBe(3)
        expect(object.valueOf()).toBe(3)
    })

    it('should be chainable', () => {
        let val = f(0.1)
            .divide(0.2)
            .divide(0.5)
        expect(val.valueOf()).toBe(1)
    })

    it('should handle correct sign', () => {
        let a = f(0.33).divide(0.22),
            b = f(0.33).divide(-0.22)
        expect(a.valueOf()).toBe(1.5)
        expect(b.valueOf()).toBe(-1.5)
    })

    it('should handle small numbers', () => {
        let val = f(0.0000033).divide(0.0000112)
        expect(val.valueOf()).toBe(0.29464285714285715)
    })

    it('should handle big numbers', () => {
        let val = f(4335.33).divide(3460.012)
        expect(val.valueOf()).toBe(1.2529812035333983)
    })

    it('should handle binary floating point numbers', () => {
        let a = f(0.1).divide(0.2),
            b = f(0.3).divide(0.6)
        expect(a.valueOf()).toBe(0.5)
        expect(b.valueOf()).toBe(0.5)
    })

    it('should handle integers', () => {
        let a = f(5.33).divide(11),
            b = f(5.33).divide(-11)
        expect(a.valueOf()).toBe(0.48454545454545456)
        expect(b.valueOf()).toBe(-0.48454545454545456)
    })

    it('should handle zero', () => {
        let val = f(0).divide(0.33)
        expect(val.valueOf()).toBe(0)
        expect(() => f(0.33).divide(0)).toThrow()
    })

    it('should handle a repeating decimal places', () => {
        let a = f(1).divide(3),
            b = f(7).divide(3),
            c = f(5).divide(6),
            d = f(31).divide(12),
            e = f(2).divide(7)
        expect(a.valueOf()).toBe(0.3333333333333333)
        expect(b.valueOf()).toBe(2.3333333333333335)
        expect(c.valueOf()).toBe(0.8333333333333334)
        expect(d.valueOf()).toBe(2.5833333333333335)
        expect(e.valueOf()).toBe(0.2857142857142857)
    })

    it('complex calculation', () => {
        let val = f(1)
            .divide(98)
            .multiply(98)
        expect(val.valueOf()).toBe(1)
    })
})
