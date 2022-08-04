/* eslint-disable camelcase */
export const location = {
    label: 'ទីតាំង',
    commune: 'ឃុំ',
    country: 'ប្រទេស',
    district: 'ស្រុក',
    province: 'ខេត្ត',
    village: 'ភូមិ',
    specific_place: 'ទីតាំងជាក់លាក់',
    address: 'អាស័យដ្ឋាន',
    street: 'ផ្លូវលេខ',
    direct_street: 'ផ្លូវផ្ទាល់(ម)',
    house: 'ផ្ទះលេខ/អាគារលេខ',
    floor: 'ជាន់',
    lat_lng: 'រយៈទទឹង, រយៈបណ្ដោយ',
    my_location: 'ទីតាំង',
    direction: 'ទិសដៅ',
    road_condition: 'ស្ថានភាពផ្លូវ',
    cornered_with: 'ជ្រុងជាមួយ',
    direct_road_width: 'ទំហំផ្លូវ(ម)'
}

export const direction = {
    label: 'ទិសដៅ',
    model: {
        unknown: 'មិនស្គាល់',
        north: 'ខាងជើង',
        east: 'ខាងកើត',
        west: 'ខាងលិច',
        south: 'ខាងត្បូង',
        north_east: 'ភាគឦសាន (ខាងជើងឈៀងខាងកើត)',
        south_east: 'ភាគអាគ្នេយ៍ (ខាងត្បូងឈៀងខាងកើត)',
        north_west: 'ភាគពាយ័ព្យ (ខាងជើងឈៀងខាងលិច)',
        south_west: 'ភាគនិរតី (ខាងត្បូងឈៀងខាងលិច)'
    }
}

export const country = {
    name: 'ប្រទេស',
    iso_code: 'កូដអាយអេសអូ',
    code: 'កូដ'
}

export const commune_form = {
    name: 'ឈ្មោះ',
    title: {
        create: 'បង្កើតព័ត៌មានឃុំថ្មី',
        edit: 'កែសម្រួលព័ត៌មានឃុំ'
    },
    new_commune: 'ព័ត៌មានឃុំថ្មី',
    message: {
        success_create: 'ព័ត៌មានឃុំថ្មីបានរក្សាទុកជោគជ័យ',
        success_update: 'ព័ត៌មានឃុំបានរក្សាទុកជោគជ័យ',
        success_delete: 'ព័ត៌មានឃុំបានរលុបចោលជោគជ័យ',
        error_create: 'ព័ត៌មានឃុំថ្មីមិនបានរក្សាទុកជោគជ័យទេ',
        error_update: 'ព័ត៌មានឃុំមិនបានរក្សាទុកជោគជ័យទេ',
        error_delete: 'ព័ត៌មានឃុំមិនបានរក្សាទុកជោគជ័យទេ'
    }
}

export const district_form = {
    name: 'ឈ្មោះ',
    title: {
        create: 'បង្កើតព័ត៌មានស្រុកថ្មី',
        edit: 'កែសម្រួលព័ត៌មានស្រុក'
    },
    message: {
        success_create: 'ព័ត៌មានស្រុកថ្មីបានរក្សាទុកជោគជ័យ',
        success_update: 'ព័ត៌មានស្រុកបានរក្សាទុកជោគជ័យ',
        success_delete: 'ព័ត៌មានស្រុកបានរលុបចោលជោគជ័យ',
        error_create: 'ព័ត៌មានស្រុកថ្មីមិនបានរក្សាទុកជោគជ័យទេ',
        error_update: 'ព័ត៌មានស្រុកមិនបានរក្សាទុកជោគជ័យទេ',
        error_delete: 'ព័ត៌មានស្រុកមិនបានរក្សាទុកជោគជ័យទេ'
    }
}

export const province_form = {
    new_province: 'បង្កើតព័ត៌មានខេត្តថ្មី',
    message: {
        success_create: 'ព័ត៌មានខេត្តថ្មីបានរក្សាទុកជោគជ័យ',
        success_update: 'ព័ត៌មានខេត្តបានរក្សាទុកជោគជ័យ',
        success_delete: 'ព័ត៌មានខេត្តបានរលុបចោលជោគជ័យ',
        error_create: 'ព័ត៌មានខេត្តថ្មីមិនបានរក្សាទុកជោគជ័យទេ',
        error_update: 'ព័ត៌មានខេត្តមិនបានរក្សាទុកជោគជ័យទេ',
        error_delete: 'ព័ត៌មានខេត្តមិនបានរក្សាទុកជោគជ័យទេ'
    }
}

export const country_form = {
    new_country: 'បង្កើតព័ត៌មានប្រទេសថ្មី',
    country_name: 'ឈ្មោះប្រទេស...',
    message: {
        success_create: 'ព័ត៌មានប្រទេសថ្មីបានរក្សាទុកជោគជ័យ',
        success_update: 'ព័ត៌មានប្រទេសបានរក្សាទុកជោគជ័យ',
        success_delete: 'ព័ត៌មានប្រទេសបានរលុបចោលជោគជ័យ',
        error_create: 'ព័ត៌មានប្រទេសថ្មីមិនបានរក្សាទុកជោគជ័យទេ',
        error_update: 'ព័ត៌មានប្រទេសមិនបានរក្សាទុកជោគជ័យទេ',
        error_delete: 'ព័ត៌មានប្រទេសមិនបានរក្សាទុកជោគជ័យទេ'
    }
}

export const simple_card = {
    id: 'អត្តលេខ',
    name: 'ឈ្មោះ',
    district: 'ស្រុក',
    province: 'ខេត្ត',
    country: 'ប្រទេស',
    entry_by: 'បញ្ចូលដោយ',
    entry_date: 'កាលបរិច្ឆេទចុងក្រោយ',
    last_updated: 'ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ',
    published: 'បោះផ្សាយ'
}
