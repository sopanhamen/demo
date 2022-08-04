import * as validators from '@vuelidate/validators'

export default ({ app }, inject) => {
    const { createI18nMessage } = validators
    const { t } = app.i18n
    const withI18nMessage = createI18nMessage({ t })

    inject('validator', {
        required: withI18nMessage(validators.required),
        requiredIf: withI18nMessage(validators.requiredIf, {
            withArguments: true
        }),
        requiredUnless: withI18nMessage(validators.requiredUnless, {
            withArguments: true
        }),
        alpha: withI18nMessage(validators.alpha),
        alphaNum: withI18nMessage(validators.alphaNum),
        integer: withI18nMessage(validators.integer),
        decimal: withI18nMessage(validators.decimal),
        numeric: withI18nMessage(validators.numeric),
        between: withI18nMessage(validators.between, {
            withArguments: true
        }),
        email: withI18nMessage(validators.email),
        ipAddress: withI18nMessage(validators.ipAddress),
        macAddress: withI18nMessage(validators.macAddress),
        url: withI18nMessage(validators.url),
        sameAs: withI18nMessage(validators.sameAs, {
            withArguments: true
        }),
        minLength: withI18nMessage(validators.minLength, {
            withArguments: true
        }),
        maxLength: withI18nMessage(validators.maxLength, {
            withArguments: true
        }),
        minValue: withI18nMessage(validators.minValue, {
            withArguments: true
        }),
        maxValue: withI18nMessage(validators.maxValue, {
            withArguments: true
        })
    })
}
