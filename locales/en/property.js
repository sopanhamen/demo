/* eslint-disable camelcase */
export const property = {
  label: 'Property',
  title: {
    facility: 'Facilities',
    building_description: 'Building Description',
    business_description: 'Business Description',
    edit_property: 'Edit Property',
    edit_listing: 'Edit Listing',
    edit_unlisting: 'Edit Unlisting',
    edit_exclusive: 'Edit Exclusive',
    land_description: 'Land Description',
    new_property: 'New Property',
    new_listing: 'New Listing',
    new_unlisting: 'New Unlisting',
    detail: 'Property Detail',
    owner_contact: 'Owner Contact',
    sale_contact: 'Sale Contact',
    sale_and_rent_info: 'Sale/Rent Information',
    sale_info: 'Sale Information',
    rent_info: 'Rent Information',
    publishing: 'Publishing Option',
    property_location: 'Property Location',
    description: 'Property Description',
    overview: 'Overview',
    documents: 'Property Documents',
    my_listing_only: 'My Listing Only',
    imports: 'Import Properties From Excel'
  },
  model: {
    expired: 'Expired',
    code: 'Property Code',
    assignee: 'Assign To',
    type: 'Property Type',
    purpose: 'Purpose',
    developer: 'Developer',
    project: 'Project',
    listing_date: 'Listing Date',
    expired_listing_date: 'Expired Listing Date',
    selling_price: 'Selling Price',
    renting_price: 'Renting Price',
    valuation_report_number: 'Valuation Report Number',
    start_listing_date: 'Start Listing Date',
    title_deed_number: 'Title Deed Number',
    renting_terms: 'Rent Term',
    renting_deposit: 'Deposit Month',
    commission: 'Commission',
    tax_note: 'Tax Note',
    land: {
      width: 'Land Width',
      length: 'Land Length',
      size: 'Land Size',
      size_min: 'Start Land Size',
      size_max: 'End Land Size',
      current_used: 'Current Used',
      surrounding_land_used: 'Surrounding Land Used'
    },
    building: {
      width: 'Building Width',
      length: 'Building Length',
      size: 'Building Size',
      number_of_stories: 'Number of Stories',
      gross_building_area: 'Gross Building Area (GBA)',
      year_of_construction: 'Year of construction',
      estimated_years_usable: 'Estimated years usable',
      actual_age: 'Actual age',
      effective_age: 'Effective age',
      estimated_cost: 'Estimated cost',
      number_of_mezzanines: 'Number of mezzanines',
      number_of_bedrooms: 'Number of bedrooms',
      number_of_bathrooms: 'Number of bathrooms',
      main_wall: 'Main wall'
    },
    total_size: 'Total Size',
    business: {
      stock_value: 'Inventory/Stock Value',
      fixture_value: 'Furniture/Fixtures Value',
      sale_revenue: 'Sale Revenue',
      number_of_employees: 'Number of Employees',
      trading_hours: 'Working/Trading Hours',
      expansion_potential: 'Expansion Potential',
      year_establish: 'Years Established',
      selling_reason: 'Reasons For Selling'
    },
    publishing: {
      active: 'Active',
      published_on_website: 'Publish On Website',
      exclusive: 'Exclusive',
      featured: 'Featured',
      show_map: 'Show Map'
    }
  }
}

export const banner = {
  label: 'Banner',
  model: {
    no_banner: 'No Banner',
    banner_with_stand: 'Banner With Stand',
    banner_no_stand: 'Banner No Stand'
  }
}

export const listing = {
  label: 'Listing',
  model: {},
  title: {
    all_listing: 'All Listing'
  }
}

export const listing_status = {
  label: 'Status',
  model: {
    available: 'Available',
    sold: 'Sold',
    rented: 'Rented',
    stop_selling: 'Stopped Selling',
    stop_renting: 'Stopped Renting'
  }
}

export const listing_purpose = {
  label: 'Purpose',
  model: {
    sale: 'Sale',
    rent: 'Rent',
    rent_or_sale: 'Rent or Sale'
  },
  title: {
    sale: 'Property For Sales',
    rent: 'Property For Rents',
    rent_or_sale: 'Property For Rents or Sales'
  }
}

export const deed_type = {
  label: 'Title Deed Type',
  model: {
    hard_lmap: 'Hard (LMAP)',
    hard_sporadic_registration: 'Hard (Sporadic Registration)',
    soft_certificate_possession: 'Soft(Certificate of Possession)',
    soft_letter_possession: 'Soft(Letter of Possession)',
    feather_title: 'Feather Title',
    others: 'Others'
  }
}

export const data_source = {
  label: 'Data Source',
  model: {
    owner: 'Owner',
    agent: 'Agent',
    broker: 'Broker'
  }
}

export const road_condition = {
  label: 'Road Condition',
  model: {
    main_road: 'Main Road',
    sub_main_road: 'Sub Main Road',
    concrete_road: 'Concrete Road',
    others: 'Others'
  }
}

export const electricity_supply = {
  label: 'Electricity',
  model: {
    public: 'Public',
    private: 'Private',
    none: 'None'
  }
}

export const water_supply = {
  label: 'Water',
  model: {
    public: 'Public',
    private: 'Private',
    none: 'None'
  }
}

export const land_shape = {
  label: 'Land Shape',
  model: {
    irregular: 'Irregular',
    regular: 'Regular',
    rectangular: 'Rectangular',
    square: 'Square'
  }
}

export const zoning = {
  label: 'Zoning',
  model: {
    agricultural: 'Agricultural',
    commercial: 'Commercial',
    historic: 'Historic',
    industrial: 'Industrial',
    residential: 'Residential',
    residential_commercial: 'Residential Commercial',
    unused_land: 'Unused Land'
  }
}

export const topography = {
  label: 'Topography',
  model: {
    levelled: 'Levelled',
    unlevelled: 'Unlevelled'
  }
}

export const sewerage = {
  label: 'Sewerage',
  model: {
    appear_adequate: 'Appear Adequate',
    appear_inadequate: 'Appear Inadequate',
    unknown: 'Unknown'
  }
}

export const drainage = {
  label: 'Drainage',
  model: {
    appear_adequate: 'Appear Adequate',
    appear_inadequate: 'Appear Inadequate',
    unknown: 'Unknown'
  }
}

export const location_appeal = {
  label: 'Location Appeal',
  model: {
    poor: 'Poor',
    average: 'Average',
    good: 'Good',
    very_good: 'Very Good',
    excellent: 'Excellent'
  }
}

export const design_appeal = {
  label: 'Design Appeal',
  model: {
    average: 'Average',
    good: 'Good',
    poor: 'Poor'
  }
}

export const wall_material = {
  label: 'Wall material',
  model: {
    plastered_brick: 'Plastered brick',
    plastered_concrete: 'Plastered concrete',
    metal_sheet: 'Metal sheet',
    smart_board: 'Smart board',
    galvanized_iron_aluminum: 'Galvanized iron aluminum'
  }
}

export const ceiling = {
  label: 'Ceiling',
  model: {
    suspended_ceiling: 'Suspended ceiling',
    smart_board: 'Smart board',
    plastered_concrete: 'Plastered concrete',
    metal: 'Decor Metal',
    hardwood: 'Hardwood',
    laminated_wood: 'Laminated wood'
  }
}

export const flooring_material = {
  label: 'Flooring material',
  model: {
    ceramic_tiles: 'Ceramic tiles',
    plain_tile: 'Plain_tile',
    plastered_concrete: 'Plastered concrete',
    laminated_wood: 'Laminated_wood',
    vinyl: 'Vinyl',
    polished_stone_marble: 'Polished_stone_marble'
  }
}

export const roofing = {
  label: 'Roofing',
  model: {
    tiles: 'Tiles',
    plastered_concrete: 'Plastered concrete',
    corrugated_zinc: 'Corrugated zinc',
    metal: 'Metal',
    cpac_monier: 'Cpac monier',
    other: 'Other'
  }
}

export const window_frame = {
  label: 'Window frame',
  model: {
    aluminum_frame: 'Aluminum frame',
    aluminum_frame_with_sliding_glasses: 'Aluminum frame with sliding glasses',
    wood: 'Wood',
    iron: 'Iron'
  }
}

export const property_search = {
  title: 'Find Your Property',
  found_result_title: 'Found Results',
  property_code: 'Enter Property Code',
  property_type: 'Property Type',
  city_province: 'City or Province',
  khan_district: 'Khan or Districts',
  sangkat_commune: 'Sangkat or Communes',
  price_range: 'Price Ranges',
  size_range: 'Size Ranges',
  direction: 'Direction',
  road_condition: 'Road Condition',
  min_start_listing_date: 'Min Listing Date',
  max_start_listing_date: 'Max Listing Date',
  start_listing_date: 'Start Listing Date',
  end_listing_date: 'End Listing Date',
  valuation_report_iD: 'Valuation Report ID'
}

export const exclusive = {
  my_exclusive_property: 'My Exclusive Property',
  title: 'Exclusive Availability',
  start_date: 'Start Date',
  end_date: 'End Date'
}

export const admin_property_card = {
  exclusive: 'Exclusive',
  price: 'Price',
  renting_price: 'Renting Price',
  land: 'Land',
  address: 'Address',
  listing: 'Listing',
  status: 'Status',
  post: 'Post',
  respond: 'Respond',
  document: 'Document'
}

export const facility = {
  electricity_supply: 'Electricity Supply',
  water_supply: 'Water Supply',
  label: 'Facility',
  title: {
    list: 'Facility List',
    create: 'New Facility',
    edit: 'Edit Facility'
  },
  model: {
    code: 'Facility Code',
    name: 'Facility Name'
  }
}

export const property_visit = {
  label: 'Property Visit',
  title: {
    list: 'Property Visit List'
  },
  model: {
    code: 'Property Code',
    visited_at: 'Visit Date',
    assignee: 'Assignee',
    status: 'Status',
    note: 'Note'
  },
  message: {
    success_create: 'New property visit has been created successfully.',
    error_create: 'Failed to create a new property visit.'
  }
}

export const property_visit_status = {
  model: {
    canceled: 'Canceled',
    pending: 'Pending',
    visited: 'Visited'
  }
}

export const property_negotiation = {
  label: 'Property Negotiation',
  title: {
    list: 'Property Negotiation List'
  },
  model: {
    code: 'Property Code',
    negotiated_at: 'Negotiate Date',
    assignee: 'Assignee',
    status: 'Status',
    last_owner_price: 'Last Owner Price',
    last_buyer_price: 'Last Buyer Price',
    last_agreed_price: 'Last Agreed Price',
    note: 'Note'
  },
  message: {
    success_create: ' Negotiation have been create successfully',
    no_visited: 'There is no visited yet.'
  }
}

export const property_negotiation_status = {
  model: {
    canceled: 'Canceled',
    pending: 'Pending',
    agreed: 'Agreed',
    disagreed: 'Disagreed'
  }
}

export const upload = {
  message: {
    instruct_drag_and_drop_photos: 'Drag and drop photos to here to upload.',
    instruct_drag_and_drop_documents:
      'Drag and drop documents to here to upload.',
    instruct_upload_photos:
      'Please click on the "Upload" button to save your chosen photos.',
    instruct_upload_documents:
      'Please click on the "Upload" button to save your chosen documents.'
  }
}

export const transfer = {
  title: 'Transfer Properties',
  transfer_from: 'Transfer from',
  transfer_to: 'Transfer to',
  message: {
    confirm: 'Are you sure to transfer the properties? ',
    success: 'properties has transferred successfully ',
    error: 'Transfer failed'
  }
}

export const list_option = {
  all: 'All',
  listing: 'Listing',
  unlisting: 'Unlisting'
}
