export const MonthNames = (vm) => [
    { value: 'JANAURY', text: vm.$t('common.months.january') },
    { value: 'FEBRUARY', text: vm.$t('common.months.february') },
    { value: 'MARCH', text: vm.$t('common.months.march') },
    { value: 'APRIL', text: vm.$t('common.months.april') },
    { value: 'MAY', text: vm.$t('common.months.may') },
    { value: 'JUNE', text: vm.$t('common.months.june') },
    { value: 'JULY', text: vm.$t('common.months.july') },
    { value: 'AUGUST', text: vm.$t('common.months.august') },
    { value: 'SEPTEMBER', text: vm.$t('common.months.september') },
    { value: 'OCTOBER', text: vm.$t('common.months.october') },
    { value: 'NOVEMBER', text: vm.$t('common.months.november') },
    { value: 'DECEMBER', text: vm.$t('common.months.december') }
]

export const SpeedDialItems = (vm) => [
    {
        label: vm.$t('common.new_property'),
        icon: 'fa fa-home',
        detail: 'Data Added',
        command: () => {
            vm.$router.push(vm.localePath('/admin/properties/listings/create'))
            vm.$toast.add({
                severity: 'info',
                summary: vm.$t('common.create'),
                detail: vm.$t('common.new_property'),
                life: 3000
            })
        }
    },

    {
        label: vm.$t('common.new_project'),
        icon: 'fa fa-users',
        detail: 'Data Added',
        command: () => {
            vm.$router.push(vm.localePath('/admin/projects/create'))
            vm.$toast.add({
                severity: 'success',
                summary: vm.$t('common.create'),
                detail: vm.$t('common.new_project'),
                life: 3000
            })
        }
    },
    {
        label: vm.$t('common.new_client'),
        icon: 'fa fa-building',
        detail: 'Data Added',
        command: () => {
            vm.$router.push(vm.localePath('/admin/clients/create'))
            vm.$toast.add({
                severity: 'warn',
                summary: vm.$t('common.create'),
                detail: vm.$t('common.new_client'),
                life: 3000
            })
        }
    },
    {
        label: vm.$t('common.note'),
        icon: 'fa fa-sticky-note-o',
        detail: 'Data Added',
        command: () => {
            vm.$toast.add({
                severity: 'error',
                summary: vm.$t('common.create'),
                detail: vm.$t('common.note'),
                life: 3000
            })
        }
    }
]

export const YearsBetween = (start, end) => {
    return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx)
}

export const MOBILE_SCREEN_SIZE = 767
