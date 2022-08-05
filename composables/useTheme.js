import { computed, useStore } from '@nuxtjs/composition-api'

export default function useTheme() {
    const getSizeValue = (value) => {
        if (!value || value === '') {
            return 0
        }

        return value
    }

    const paddingClassBuilder = (paddings) => {
        const pTop = getSizeValue(paddings?.top)
        const pBottom = getSizeValue(paddings?.bottom)
        const pLeft = getSizeValue(paddings?.left)
        const pRight = getSizeValue(paddings?.right)

        return `${pTop} ${pLeft} ${pBottom} ${pRight} `
    }

    const marginClassBuilder = (margins) => {
        const mTop = getSizeValue(margins?.top)
        const mBottom = getSizeValue(margins?.bottom)
        const mLeft = getSizeValue(margins?.left)
        const mRight = getSizeValue(margins?.right)

        return `${mTop} ${mLeft} ${mBottom} ${mRight} `
    }
    const styleList = (props) => {
        const styleList = {}

        if (props.backgroundColor) {
            styleList.backgroundColor = '#' + props.backgroundColor
        }

        if (props.backgroundImage) {
            styleList.backgroundImage = 'url("' + props.backgroundImage + '")'
        }

        if (props.paddings) {
            styleList.padding = paddingClassBuilder(props.paddings)
        }

        if (props.margins) {
            styleList.margin = marginClassBuilder(props.margins)
        }

        return styleList
    }

    const store = useStore()
    const roundSize = computed(() => {
        const theme = store.getters['theme/getWebsiteTheme']
        if (theme?.roundSize) {
            return theme?.roundSize
        }

        return ''
    })

    return { roundSize, styleList }
}
