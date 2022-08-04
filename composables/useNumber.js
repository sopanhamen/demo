export default function useNumber() {
    const extractNumber = (value, integer = false) => {
        if (!value) {
            return ''
        }

        const number = String(value).match(/[0-9][.]*/g)
        if (integer) {
            return Number(number ? number.join('') : 0)
        }

        return number ? number.join('') : ''
    }

    const excludeNumber = (value) => {
        if (!value) {
            return ''
        }

        const string = String(value).match(/[^0-9]/g)
        return string ? string.join('') : ''
    }

    return {
        excludeNumber,
        extractNumber
    }
}
