export default function useString() {
    const extractLetter = (value) => {
        if (!value) {
            return ''
        }

        const string = String(value).match(/[a-z]*[A-Z]*/g)
        return string ? string.join('') : ''
    }

    return {
        extractLetter
    }
}
