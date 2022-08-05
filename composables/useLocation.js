import { useContext, useStore } from '@nuxtjs/composition-api'
import { DirectionLabel } from '@/enums/Direction'
import { RoadConditionLabel } from '@/enums/RoadCondition'
function useLocation() {
    const store = useStore()
    const { i18n } = useContext()

    const countryName = (countryId) => {
        const country = store.getters['country/getCountryById'](countryId)
        if (!country) {
            return ''
        }

        return i18n.locale === 'km' ? country.name_km : country.name
    }

    const provinceName = (provinceId) => {
        const province = store.getters['province/getProvinceById'](provinceId)
        if (!province) {
            return ''
        }

        return i18n.locale === 'km' ? province.name_km : province.name_en
    }

    const districtName = (districtId) => {
        const district = store.getters['district/getDistrictById'](districtId)
        if (!district) {
            return ''
        }

        return i18n.locale === 'km' ? district.name_km : district.name_en
    }

    const communeName = (communeId) => {
        const commune = store.getters['commune/getCommuneById'](communeId)
        if (!commune) {
            return ''
        }

        return i18n.locale === 'km' ? commune.name_km : commune.name_en
    }

    const directionLabel = (direction) => {
        const label = DirectionLabel[direction]

        if (!label) {
            return ''
        }

        return i18n.t('direction.model.' + label)
    }

    const roadConditionLabel = (roadCondition) => {
        const label = RoadConditionLabel[roadCondition]

        if (!label) {
            return ''
        }

        return i18n.t('road_condition.model.' + label)
    }

    const fullAddress = (options) => {
        const address = {}

        if (!options) {
            return ''
        }

        if (options.village) {
            address.village = options.village
        }

        const communeId = options.commune_id
        if (communeId) {
            const commune = communeName(communeId)
            if (commune) {
                address.commune = commune
            }
        }

        const districtId = options.district_id
        if (districtId) {
            const district = districtName(districtId)
            if (district) {
                address.district = district
            }
        }

        const provinceId = options.province_id
        if (provinceId) {
            const province = provinceName(provinceId)
            if (province) {
                address.province = province
            }
        }

        // const countryId = options.country_id
        // if (countryId) {
        //   const country = countryName(countryId)
        //   if (country) {
        //     address.country = country
        //   }
        // }

        return Object.values(address).join(', ')
    }

    return {
        countryName,
        provinceName,
        districtName,
        communeName,
        directionLabel,
        roadConditionLabel,
        fullAddress
    }
}

export default useLocation
