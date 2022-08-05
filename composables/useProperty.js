import { parseISO, getTime } from 'date-fns'
import { useContext, useStore } from '@nuxtjs/composition-api'
import useFormatter from './useFormatter'
import { LengthUnitLabel } from '@/enums/LengthUnit'
import { DataSourceLabel } from '@/enums/DataSource'
import { DeedTypeLabel } from '@/enums/DeedType'
import { ListingPurpose, ListingPurposeLabel } from '@/enums/ListingPurpose'
import { PropertyTypeGroup } from '@/enums/PropertyTypeGroup'
import { PriceType, PriceTypeLabel } from '@/enums/PriceType'
import { LandShapeLabel } from '@/enums/LandShape'
import { ZoningLabel } from '@/enums/Zoning'
import { TopographyLabel } from '@/enums/Topography'
import { SewerageLabel } from '@/enums/Sewerage'
import { DrainageLabel } from '@/enums/Drainage'
import { LocationAppealLabel } from '@/enums/LocationAppeal'
import { ElectricitySupplyLabel } from '@/enums/ElectricitySupply'
import { WaterSupplyLabel } from '@/enums/WaterSupply'
import { ListingStatusColor, ListingStatusLabel } from '@/enums/ListingStatus'
import { WindowFrameLabel } from '@/enums/WindowFrame'
import { VisitStatusLabel } from '@/enums/VisitStatus'
import { NegotiationStatusLabel } from '@/enums/NegotiationStatus'
import { RoofingLabel } from '@/enums/Roofing'
import { CeilingLabel } from '@/enums/Ceiling'
import { WallMaterialLabel } from '@/enums/WallMaterial'
import { DesignAppealLabel } from '@/enums/DesignAppeal'
import { FlooringMaterialLabel } from '@/enums/FloorMaterial'

export default function useProperty() {
    const store = useStore()
    const { i18n } = useContext()
    const { formatMoney } = useFormatter()

    const formatLandSize = (property) => {
        // eslint-disable-next-line camelcase
        const { land_width, land_length, land_size, land_size_unit } =
            property || {}

        // eslint-disable-next-line camelcase
        if (!land_width || !land_length) {
            return ''
        }

        const sizeUnit = i18n.t(
            // eslint-disable-next-line camelcase
            'length_unit.abbreviation.' + LengthUnitLabel[land_size_unit]
        )

        // eslint-disable-next-line camelcase
        return `(${land_width}m x ${land_length}m) = ${land_size}${sizeUnit}`
    }

    const formatBuildingSize = (property) => {
        // eslint-disable-next-line camelcase
        const { building_width, building_length } = property || {}

        // eslint-disable-next-line camelcase
        if (!building_width || !building_length) {
            return ''
        }

        // eslint-disable-next-line camelcase
        return `${building_width}m x ${building_length}m`
    }

    const formatPriceType = (type) => {
        if (type === PriceType.TOTAL) {
            return ''
        }
        return '/' + i18n.t('price_type.model.' + PriceTypeLabel[type])
    }

    const formatPrice = (price, type) => {
        return formatMoney(price, { digits: 0 }) + formatPriceType(type)
    }

    const electricitySupplyLabel = (waterSupply) => {
        const label = ElectricitySupplyLabel[waterSupply]
        if (!label) {
            return ''
        }

        return i18n.t('water_supply.model.' + label)
    }

    const waterSupplyLabel = (waterSupply) => {
        const label = WaterSupplyLabel[waterSupply]
        if (!label) {
            return ''
        }

        return i18n.t('water_supply.model.' + label)
    }

    const listingPurposeLabel = (listingPurpose) => {
        const label = ListingPurposeLabel[listingPurpose]
        if (!label) {
            return ''
        }

        return i18n.t('listing_purpose.model.' + label)
    }

    const deedTypeLabel = (deedType) => {
        const label = DeedTypeLabel[deedType]
        if (!label) {
            return ''
        }

        return i18n.t('deed_type.model.' + label)
    }

    const dataSourceLabel = (deedType) => {
        const label = DataSourceLabel[deedType]
        if (!label) {
            return ''
        }

        return i18n.t('data_source.model.' + label)
    }

    const landShapeLabel = (landShape) => {
        const label = LandShapeLabel[landShape]
        if (!label) {
            return ''
        }

        return i18n.t('land_shape.model.' + label)
    }

    const zoningLabel = (zoning) => {
        const label = ZoningLabel[zoning]
        if (!label) {
            return ''
        }

        return i18n.t('zoning.model.' + label)
    }

    const topographyLabel = (topography) => {
        const label = TopographyLabel[topography]
        if (!label) {
            return ''
        }

        return i18n.t('topography.model.' + label)
    }

    const sewerageLabel = (sewerage) => {
        const label = SewerageLabel[sewerage]
        if (!label) {
            return ''
        }

        return i18n.t('sewerage.model.' + label)
    }

    const drainageLabel = (drainage) => {
        const label = DrainageLabel[drainage]
        if (!label) {
            return ''
        }

        return i18n.t('drainage.model.' + label)
    }

    const locationAppealLabel = (locationAppeal) => {
        const label = LocationAppealLabel[locationAppeal]
        if (!label) {
            return ''
        }

        return i18n.t('location_appeal.model.' + label)
    }

    const wallMaterialLabel = (wallMaterial) => {
        const label = WallMaterialLabel[wallMaterial]
        if (!label) {
            return ''
        }

        return i18n.t('wall_material.model.' + label)
    }

    const ceilingLabel = (ceiling) => {
        const label = CeilingLabel[ceiling]
        if (!label) {
            return ''
        }

        return i18n.t('ceiling.model.' + label)
    }

    const flooringMaterialLabel = (floorMaterial) => {
        const label = FlooringMaterialLabel[floorMaterial]
        if (!label) {
            return ''
        }

        return i18n.t('flooring_material.model.' + label)
    }

    const roofingLabel = (roofing) => {
        const label = RoofingLabel[roofing]
        if (!label) {
            return ''
        }

        return i18n.t('roofing.model.' + label)
    }

    const visitStatusLabel = (visitStatus) => {
        const label = VisitStatusLabel[visitStatus]
        if (!label) {
            return ''
        }

        return i18n.t('property_visit_status.model.' + label)
    }

    const negotiationStatusLabel = (negotiationStatus) => {
        const label = NegotiationStatusLabel[negotiationStatus]
        if (!label) {
            return ''
        }

        return i18n.t('property_negotiation_status.model.' + label)
    }

    const windowFrameLabel = (windowFrame) => {
        const label = WindowFrameLabel[windowFrame]
        if (!label) {
            return ''
        }

        return i18n.t('window_frame.model.' + label)
    }

    const designAppealLabel = (designAppeal) => {
        const label = DesignAppealLabel[designAppeal]
        if (!label) {
            return ''
        }

        return i18n.t('design_appeal.model.' + label)
    }

    const listingStatusLabel = (listingStatus) => {
        const label = ListingStatusLabel[listingStatus]
        if (!label) {
            return ''
        }

        return i18n.t('listing_status.model.' + label)
    }

    const listingStatusColor = (listingStatus) => {
        const color = ListingStatusColor[listingStatus]
        if (!color) {
            return ''
        }

        return color
    }

    const valueWithLengthUnit = (value, unit = 1) => {
        const label = LengthUnitLabel[unit]
        if (!value || !label) {
            return ''
        }

        return value + ' ' + i18n.t('length_unit.abbreviation.' + label)
    }

    const isLandPropertyType = (propertyTypeId) => {
        const propertyType =
            store.getters['propertyType/getPropertyTypeById'](propertyTypeId)

        if (!propertyType) {
            return false
        }

        return (
            propertyType.property_type_group === PropertyTypeGroup.LANDS_PLOTS
        )
    }

    const isBusinessPropertyType = (propertyTypeId) => {
        const propertyType =
            store.getters['propertyType/getPropertyTypeById'](propertyTypeId)

        if (!propertyType) {
            return false
        }

        return propertyType.property_type_group === PropertyTypeGroup.BUSINESS
    }

    const isBuildingPropertyType = (propertyTypeId) => {
        const propertyType =
            store.getters['propertyType/getPropertyTypeById'](propertyTypeId)

        if (!propertyType) {
            return false
        }

        return propertyType.property_type_group === PropertyTypeGroup.HOMES
    }

    const isPropertyForSale = (property) => {
        return (
            ListingPurpose.SALE === property.listing_purpose ||
            ListingPurpose.RENT_OR_SALE === property.listing_purpose
        )
    }

    const isPropertyForRent = (property) => {
        return (
            ListingPurpose.RENT === property.listing_purpose ||
            ListingPurpose.RENT_OR_SALE === property.listing_purpose
        )
    }

    const hasSalePurpose = (property) => {
        if (!property) return

        return (
            property.listing_purpose === ListingPurpose.SALE ||
            property.listing_purpose === ListingPurpose.RENT_OR_SALE
        )
    }

    const hasRentPurpose = (property) => {
        if (!property) return

        return (
            property.listing_purpose === ListingPurpose.RENT ||
            property.listing_purpose === ListingPurpose.RENT_OR_SALE
        )
    }

    const isExpired = (property) => {
        if (!property) {
            return false
        }

        if (!property.expired_listing_date) {
            return true
        }

        return (
            getTime(parseISO(property.expired_listing_date)) <
            new Date().getTime()
        )
    }

    const findCenteredProperty = (properties) => {
        if (!properties || properties.length === 0) {
            return null
        }

        if (properties.length === 1) {
            return properties[0]
        }

        const arrLatLng = properties
            .map((property) => property.location.lat_lng)
            .filter((item) => item !== '' || item !== null)
            .sort()

        const middleValue = (arrLatLng[0] + arrLatLng[-1]) / 2
        return properties.reduce((prevProperty, currentProperty) => {
            if (!prevProperty || !prevProperty.location.lat_lng) {
                return currentProperty
            }

            const prevLatLng = prevProperty.location.lat_lng
            const currentLatLng = currentProperty.location.lat_lng
            if (
                Math.abs(currentLatLng - middleValue) <
                Math.abs(prevLatLng - middleValue)
            ) {
                return currentProperty
            }

            return prevProperty
        }, null)
    }

    const propertyListingPath = (property) => {
        if (property?.exclusive || property?.publishing?.exclusive) {
            return `/admin/properties/exclusives`
        }

        if (property?.published || property?.publishing?.published) {
            return `/admin/properties/listings`
        }

        return `/admin/properties/unlistings/`
    }

    const propertyDetailPath = (property, ref) => {
        const refPath = ref ? '?ref=' + ref : ''
        if (property?.exclusive || property?.publishing?.exclusive) {
            return `/admin/properties/exclusives/${property.id}/detail${refPath}`
        }

        if (property?.published || property?.publishing?.published) {
            return `/admin/properties/listings/${property.id}/detail${refPath}`
        }

        return `/admin/properties/unlistings/${property.id}/detail${refPath}`
    }

    const propertyEditPath = (property) => {
        if (property?.exclusive || property?.publishing?.exclusive) {
            return `/admin/properties/exclusives/${property.id}`
        }

        if (property?.published || property?.publishing?.published) {
            return `/admin/properties/listings/${property.id}`
        }

        return `/admin/properties/unlistings/${property.id}`
    }

    return {
        propertyListingPath,
        propertyDetailPath,
        propertyEditPath,
        isExpired,
        dataSourceLabel,
        deedTypeLabel,
        drainageLabel,
        formatBuildingSize,
        formatLandSize,
        formatPrice,
        formatPriceType,
        hasSalePurpose,
        hasRentPurpose,
        findCenteredProperty,
        isLandPropertyType,
        isBuildingPropertyType,
        isBusinessPropertyType,
        isPropertyForRent,
        isPropertyForSale,
        landShapeLabel,
        listingStatusColor,
        listingStatusLabel,
        listingPurposeLabel,
        locationAppealLabel,
        sewerageLabel,
        topographyLabel,
        valueWithLengthUnit,
        zoningLabel,
        waterSupplyLabel,
        electricitySupplyLabel,
        wallMaterialLabel,
        ceilingLabel,
        flooringMaterialLabel,
        roofingLabel,
        visitStatusLabel,
        negotiationStatusLabel,
        windowFrameLabel,
        designAppealLabel
    }
}
