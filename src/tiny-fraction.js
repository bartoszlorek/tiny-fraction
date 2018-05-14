function gcd(num, den) {
    return den ? gcd(den, num % den) : num
}

function isFraction(value) {
    return value && value.__fraction === true
}

function applyFraction(self, num, den) {
    self.s = num * den < 0 ? -1 : 1
    self.n = Math.abs(num)
    self.d = Math.abs(den)
}

function numberToFraction(value) {
    let num = 0, //numerator
        den = 1, //denominator
        sign = 1

    if (value < 0) {
        sign = value
        value = -value
    }
    if (value % 1 === 0) {
        num = value
    } else {
        num = value.toString().replace(/\d+[.]/, '')
        den = Math.pow(10, num.length)

        if (value > 1) {
            num = +num + Math.floor(value) * den
        }
        let scale = gcd(num, den)
        num /= scale
        den /= scale
    }
    return {
        n: num,
        d: den,
        s: sign < 0 ? -1 : 1
    }
}

function baseFraction(value) {
    if (value == null) {
        return null
    }
    if (isFraction(value)) {
        return value
    }
    return numberToFraction(value)
}

const proto = {
    __fraction: true,
    valueOf: function() {
        return this.s * this.n / this.d
    },
    add: function(value) {
        let data = baseFraction(value)
        if (data !== null) {
            applyFraction(
                this,
                this.s * this.n * data.d + data.s * data.n * this.d,
                this.d * data.d
            )
        }
        return this
    },
    subtract: function(value) {
        let data = baseFraction(value)
        if (data !== null) {
            applyFraction(
                this,
                this.s * this.n * data.d - data.s * data.n * this.d,
                this.d * data.d
            )
        }
        return this
    },
    multiply: function(value) {
        let data = baseFraction(value)
        if (data !== null) {
            applyFraction(
                this,
                this.s * data.s * this.n * data.n,
                this.d * data.d
            )
        }
        return this
    },
    divide: function(value) {
        let data = baseFraction(value)
        if (data !== null && data.n !== 0) {
            applyFraction(
                this,
                this.s * data.s * this.n * data.d,
                this.d * data.n
            )
        }
        return this
    }
}

function createFraction(value) {
    let data = baseFraction(value),
        self = Object.create(proto)

    if (data === null) {
        throw new TypeError(`Cannot create fraction from '${value}'`)
    }
    self.n = data.n
    self.d = data.d
    self.s = data.s
    return self
}

export default createFraction
