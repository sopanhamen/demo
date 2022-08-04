import { form, formRequirement } from './-default'

/* eslint-disable camelcase */
export default () => ({
    clients: [],
    formName: 'create',
    form: {
        ...form
    },
    requirementFormName: 'create',
    formRequirement: {
        ...formRequirement
    }
})
