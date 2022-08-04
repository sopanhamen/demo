import { ListingPurpose } from '~/enums/ListingPurpose'
import { PropertyTypeGroup } from '~/enums/PropertyTypeGroup'

function propertyLink(purpose, propertyTypeGroup) {
    return `/properties?filtering=false&purpose=${purpose}&group=${propertyTypeGroup}`
}

export const MENU_ITEMS = [
    {
        title: 'menu.home',
        link: '/'
    },
    {
        title: 'menu.for_rent',
        subItems: [
            {
                title: 'property_type_group.model.homes',
                link: propertyLink(
                    ListingPurpose.RENT,
                    PropertyTypeGroup.HOMES
                ),
                listingPurpose: ListingPurpose.RENT,
                propertyTypeGroup: PropertyTypeGroup.HOMES,
                amount: 0
            },
            {
                title: 'property_type_group.model.lands_plots',
                link: propertyLink(
                    ListingPurpose.RENT,
                    PropertyTypeGroup.LANDS_PLOTS
                ),
                listingPurpose: ListingPurpose.RENT,
                propertyTypeGroup: PropertyTypeGroup.LANDS_PLOTS,
                amount: 0
            },
            {
                title: 'property_type_group.model.commercial',
                link: propertyLink(
                    ListingPurpose.RENT,
                    PropertyTypeGroup.COMMERCIAL
                ),
                listingPurpose: ListingPurpose.RENT,
                propertyTypeGroup: PropertyTypeGroup.COMMERCIAL,
                amount: 0
            },
            {
                title: 'property_type_group.model.business',
                link: propertyLink(
                    ListingPurpose.RENT,
                    PropertyTypeGroup.BUSINESS
                ),
                listingPurpose: ListingPurpose.RENT,
                propertyTypeGroup: PropertyTypeGroup.BUSINESS,
                amount: 0
            },
            {
                title: 'property_type_group.model.industrial',
                link: propertyLink(
                    ListingPurpose.RENT,
                    PropertyTypeGroup.INDUSTRIAL
                ),
                listingPurpose: ListingPurpose.RENT,
                propertyTypeGroup: PropertyTypeGroup.INDUSTRIAL,
                amount: 0
            },
            {
                title: 'property_type_group.model.petrol_station',
                link: propertyLink(
                    ListingPurpose.RENT,
                    PropertyTypeGroup.PETROL_STATION
                ),
                listingPurpose: ListingPurpose.RENT,
                propertyTypeGroup: PropertyTypeGroup.PETROL_STATION,
                amount: 0
            }
        ]
    },
    {
        title: 'menu.for_sale',
        subItems: [
            {
                title: 'property_type_group.model.homes',
                link: propertyLink(
                    ListingPurpose.SALE,
                    PropertyTypeGroup.HOMES
                ),
                listingPurpose: ListingPurpose.SALE,
                propertyTypeGroup: PropertyTypeGroup.HOMES,
                amount: 0
            },
            {
                title: 'property_type_group.model.lands_plots',
                link: propertyLink(
                    ListingPurpose.SALE,
                    PropertyTypeGroup.LANDS_PLOTS
                ),
                listingPurpose: ListingPurpose.SALE,
                propertyTypeGroup: PropertyTypeGroup.LANDS_PLOTS,
                amount: 0
            },
            {
                title: 'property_type_group.model.commercial',
                link: propertyLink(
                    ListingPurpose.SALE,
                    PropertyTypeGroup.COMMERCIAL
                ),
                listingPurpose: ListingPurpose.SALE,
                propertyTypeGroup: PropertyTypeGroup.COMMERCIAL,
                amount: 0
            },
            {
                title: 'property_type_group.model.business',
                link: propertyLink(
                    ListingPurpose.SALE,
                    PropertyTypeGroup.BUSINESS
                ),
                listingPurpose: ListingPurpose.SALE,
                propertyTypeGroup: PropertyTypeGroup.BUSINESS,
                amount: 0
            },
            {
                title: 'property_type_group.model.industrial',
                link: propertyLink(
                    ListingPurpose.SALE,
                    PropertyTypeGroup.INDUSTRIAL
                ),
                listingPurpose: ListingPurpose.SALE,
                propertyTypeGroup: PropertyTypeGroup.INDUSTRIAL,
                amount: 0
            },
            {
                title: 'property_type_group.model.petrol_station',
                link: propertyLink(
                    ListingPurpose.SALE,
                    PropertyTypeGroup.PETROL_STATION
                ),
                listingPurpose: ListingPurpose.SALE,
                propertyTypeGroup: PropertyTypeGroup.PETROL_STATION,
                amount: 0
            }
        ]
    },
    {
        title: 'menu.for_rent_sale',
        subItems: [
            {
                title: 'property_type_group.model.homes',
                link: propertyLink(
                    ListingPurpose.RENT_OR_SALE,
                    PropertyTypeGroup.HOMES
                ),
                listingPurpose: ListingPurpose.RENT_OR_SALE,
                propertyTypeGroup: PropertyTypeGroup.HOMES,
                amount: 0
            },
            {
                title: 'property_type_group.model.lands_plots',
                link: propertyLink(
                    ListingPurpose.RENT_OR_SALE,
                    PropertyTypeGroup.LANDS_PLOTS
                ),
                listingPurpose: ListingPurpose.RENT_OR_SALE,
                propertyTypeGroup: PropertyTypeGroup.LANDS_PLOTS,
                amount: 0
            },
            {
                title: 'property_type_group.model.commercial',
                link: propertyLink(
                    ListingPurpose.RENT_OR_SALE,
                    PropertyTypeGroup.COMMERCIAL
                ),
                listingPurpose: ListingPurpose.RENT_OR_SALE,
                propertyTypeGroup: PropertyTypeGroup.COMMERCIAL,
                amount: 0
            },
            {
                title: 'property_type_group.model.business',
                link: propertyLink(
                    ListingPurpose.RENT_OR_SALE,
                    PropertyTypeGroup.BUSINESS
                ),
                listingPurpose: ListingPurpose.RENT_OR_SALE,
                propertyTypeGroup: PropertyTypeGroup.BUSINESS,
                amount: 0
            },
            {
                title: 'property_type_group.model.industrial',
                link: propertyLink(
                    ListingPurpose.RENT_OR_SALE,
                    PropertyTypeGroup.INDUSTRIAL
                ),
                listingPurpose: ListingPurpose.RENT_OR_SALE,
                propertyTypeGroup: PropertyTypeGroup.INDUSTRIAL,
                amount: 0
            },
            {
                title: 'property_type_group.model.petrol_station',
                link: propertyLink(
                    ListingPurpose.RENT_OR_SALE,
                    PropertyTypeGroup.PETROL_STATION
                ),
                listingPurpose: ListingPurpose.RENT_OR_SALE,
                propertyTypeGroup: PropertyTypeGroup.PETROL_STATION,
                amount: 0
            }
        ]
    },
    {
        title: 'menu.about_us',
        subItems: [
            {
                title: 'menu.our_agent',
                link: '/agents'
            },
            {
                title: 'menu.submenu.company_profile',
                link: '/about'
            },
            {
                title: 'menu.submenu.contact_us',
                link: '/contact'
            }
        ]
    }
]
