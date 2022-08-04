import { computed, useContext } from '@nuxtjs/composition-api'
import { Permission } from '@/enums/Permission'
import { ListingPurpose } from '@/enums/ListingPurpose'
import { PropertyTypeGroup } from '@/enums/PropertyTypeGroup'

function propertyLink(purpose, propertyTypeGroup) {
    return `/properties?filtering=false&purpose=${purpose}&group=${propertyTypeGroup}`
}

export default function useMenu() {
    const { $config } = useContext()

    const WEBSITE_MENU_ITEMS = computed(() => {
        return [
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
    })

    const ADMIN_MENU_ITEMS = computed(() => {
        return [
            {
                title: '',
                menus: [
                    {
                        title: 'dashboard',
                        link: '/admin/dashboard',
                        icon: 'fa fa-tv'
                    }
                ]
            },
            {
                title: 'properties',
                menus: [
                    {
                        title: 'listing',
                        link: '/admin/properties/listings',
                        icon: 'fa fa-home',
                        permissions: [Permission.VIEW_PROPERTY]
                    },
                    {
                        title: 'unlisting',
                        link: '/admin/properties/unlistings',
                        icon: 'fa fa-house-circle-xmark',
                        permissions: [Permission.VIEW_PROPERTY]
                    },
                    {
                        title: 'exclusive',
                        link: '/admin/properties/exclusives',
                        icon: 'fa fa-star',
                        permissions: [
                            Permission.VIEW_EXCLUSIVE,
                            Permission.VIEW_TEAM_EXCLUSIVE,
                            Permission.VIEW_BRANCH_EXCLUSIVE,
                            Permission.VIEW_ANY_EXCLUSIVE
                        ]
                    },
                    {
                        title: 'maps',
                        link: '/admin/properties/maps',
                        icon: 'fa fa-location-dot',
                        badge: 'new',
                        permissions: [Permission.VIEW_PROPERTY]
                    },
                    // {
                    //   title: 'proposal',
                    //   link: '/admin/proposals',
                    //   icon: 'fa fa-print',
                    //   badge: 10,
                    //   permissions: [
                    //     Permission.VIEW_PROPOSAL,
                    //     Permission.VIEW_TEAM_PROPOSAL,
                    //     Permission.VIEW_BRANCH_PROPOSAL,
                    //     Permission.VIEW_ANY_PROPOSAL
                    //   ]
                    // },
                    {
                        title: 'development_projects',
                        icon: 'fa fa-building',
                        submenus: [
                            {
                                title: 'project',
                                icon: 'fa fa-building',
                                link: '/admin/projects',
                                permissions: [Permission.VIEW_PROJECT]
                            },
                            {
                                title: 'developers',
                                link: '/admin/developers',
                                icon: 'fa fa-building-user',
                                permissions: [Permission.VIEW_DEVELOPER]
                            }
                        ]
                    }
                    // {
                    //   title: 'coorperation',
                    //   icon: 'fa fa-handshake-o',
                    //   permissions: [Permission.VIEW_CLIENT_TYPE]
                    // }
                ]
            },

            {
                title: 'clients',
                menus: [
                    {
                        title: 'client_manager',
                        link: '/admin/clients',
                        icon: 'fa fa-user-tie',
                        permissions: [
                            Permission.VIEW_CLIENT,
                            Permission.VIEW_TEAM_CLIENT,
                            Permission.VIEW_BRANCH_CLIENT,
                            Permission.VIEW_COMPANY_CLIENT,
                            Permission.VIEW_ANY_CLIENT
                        ]
                    },
                    {
                        title: 'requirements',
                        link: '/admin/requirements',
                        icon: 'fa fa-book',
                        permissions: [Permission.VIEW_CLIENT]
                    },
                    {
                        title: 'mail_box',
                        link: '/admin/site-inquiry',
                        icon: 'fa fa-envelope'
                    },
                    {
                        title: 'client_type',
                        link: '/admin/client-types',
                        icon: 'fa fa-users',
                        permissions: [Permission.VIEW_CLIENT_TYPE]
                    }
                ]
            },

            // {
            //   title: 'appraisal',
            //   menus: [
            //     {
            //       title: 'indication',
            //       icon: 'fa fa-tags',
            //       permissions: [Permission.CREATE_VALUATION_REPORT]
            //     },
            //     {
            //       title: 'valuation_report',
            //       icon: 'fa fa-balance-scale',
            //       permissions: [Permission.VIEW_VALUATION_REPORT]
            //     },
            //     {
            //       title: 'valuated_report',
            //       icon: 'fa fa-file',
            //       permissions: [Permission.VIEW_EVALUATED_REPORT]
            //     },
            //     {
            //       title: 'banks',
            //       icon: 'fa fa-bank',
            //       submenus: [
            //         {
            //           title: 'bank',
            //           link: '/admin/banks',
            //           icon: 'fa fa-circle-thin',
            //           permissions: [Permission.VIEW_BANK]
            //         },
            //         {
            //           title: 'branches',
            //           link: '/admin/bank-branches',
            //           icon: 'fa fa-circle-thin',
            //           permissions: [Permission.VIEW_BANK_BRANCH]
            //         }
            //       ]
            //     }
            //   ]
            // },
            // {
            //   title: 'loan',
            //   menus: [
            //     {
            //       title: 'application_form',
            //       link: '/admin/loan',
            //       icon: 'fa fa-file-text',
            //       permissions: [Permission.VIEW_LOAN_APPLICATION]
            //     },
            //     {
            //       title: 'cash_flow',
            //       icon: 'fa fa-stack-overflow',
            //       permissions: [Permission.VIEW_CASH_FLOW]
            //     },
            //     {
            //       title: 'capital',
            //       icon: 'fa fa-money',
            //       permissions: [Permission.VIEW_CASH_FLOW]
            //     },
            //     {
            //       title: 'rate_setting',
            //       icon: 'fa fa-adjust',
            //       permissions: [Permission.VIEW_LOAN_RATE]
            //     }
            //   ]
            // },
            {
                title: 'settings',
                menus: [
                    {
                        title: 'users',
                        icon: 'fa fa-user',
                        submenus: [
                            {
                                title: 'user_manager',
                                link: '/admin/user-management/users',
                                icon: 'fa fa-user',
                                permissions: [
                                    Permission.VIEW_TEAM_USER,
                                    Permission.VIEW_BRANCH_USER,
                                    Permission.VIEW_COMPANY_USER,
                                    Permission.VIEW_ANY_USER
                                ]
                            },
                            {
                                title: 'teams',
                                link: '/admin/user-management/teams',
                                icon: 'fa fa-users',
                                permissions: [
                                    Permission.VIEW_BRANCH_TEAM,
                                    Permission.VIEW_COMPANY_TEAM,
                                    Permission.VIEW_ANY_TEAM
                                ]
                            },
                            {
                                title: 'user_roles',
                                link: '/admin/user-management/roles',
                                icon: 'fa fa-user-secret',
                                permissions: [Permission.VIEW_ROLE]
                            }
                        ]
                    },
                    {
                        title: 'location',
                        icon: 'fa fa-globe',
                        submenus: [
                            {
                                title: 'communes-sample',
                                link: '/admin/communes-sample',
                                icon: 'fa fa-globe',
                                permissions: [Permission.VIEW_LOCATION]
                            },
                            {
                                title: 'communes',
                                link: '/admin/communes',
                                icon: 'fa fa-globe',
                                permissions: [Permission.VIEW_LOCATION]
                            },
                            {
                                title: 'districts',
                                link: '/admin/districts',
                                icon: 'fa fa-globe',
                                permissions: [Permission.VIEW_LOCATION]
                            },
                            {
                                title: 'provinces',
                                link: '/admin/provinces',
                                icon: 'fa fa-globe',
                                permissions: [Permission.VIEW_LOCATION]
                            },
                            {
                                title: 'countries',
                                link: '/admin/countries',
                                icon: 'fa fa-globe',
                                permissions: [Permission.VIEW_LOCATION]
                            }
                        ]
                    },
                    {
                        title: 'companies',
                        icon: 'fa fa-university',
                        submenus: [
                            {
                                title: 'companies',
                                link: '/admin/companies',
                                icon: 'fa fa-university',
                                permissions: [Permission.VIEW_ANY_COMPANY]
                            },
                            {
                                title: 'company_branches',
                                link: '/admin/company-branches',
                                icon: 'fa fa-location-dot',
                                permissions: [
                                    Permission.VIEW_ANY_COMPANY_BRANCH
                                ]
                            }
                        ]
                    },
                    {
                        title: 'development_types',
                        link: '/admin/development-types',
                        icon: 'fa fa-cube',
                        permissions: [Permission.VIEW_DEVELOPMENT_TYPE]
                    },
                    {
                        title: 'property_types',
                        link: '/admin/property-types',
                        icon: 'fa fa-building-circle-check',
                        permissions: [Permission.VIEW_PROPERTY_TYPE]
                    },
                    {
                        title: 'facilities',
                        link: '/admin/facilities',
                        icon: 'fa fa-flag-checkered',
                        permissions: [Permission.VIEW_FACILITY]
                    },
                    {
                        title: 'settings',
                        icon: 'fa fa-gear',
                        submenus: [
                            {
                                link: '/admin/settings/general',
                                title: 'general_setting',
                                icon: 'fa fa-sliders',
                                permissions: [Permission.VIEW_GENERAL_SETTING]
                            },
                            {
                                link: '/admin/settings/theme',
                                title: 'theme_setting',
                                icon: 'fa fa-palette',
                                permissions: [Permission.VIEW_THEME_SETTING]
                            },
                            {
                                link: '/admin/settings/profile',
                                title: 'profile',
                                icon: 'fa fa-user-gear'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'other',
                menus: [
                    {
                        title: 'system_logs',
                        icon: 'fa fa-file-circle-exclamation',
                        link: `${$config.axios.baseURL}/logs`,
                        target: '_blank',
                        permissions: []
                    }
                ]
            }
        ]
    })

    return {
        ADMIN_MENU_ITEMS,
        WEBSITE_MENU_ITEMS
    }
}
