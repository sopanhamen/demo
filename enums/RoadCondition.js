export const RoadCondition = Object.freeze({
    MAIN_ROAD: 0,
    SUB_MAIN_ROAD: 1,
    CONCRETE_ROAD: 2,
    OTHERS: 3
})

export const RoadConditionLabel = Object.freeze({
    [RoadCondition.MAIN_ROAD]: 'main_road',
    [RoadCondition.SUB_MAIN_ROAD]: 'sub_main_road',
    [RoadCondition.CONCRETE_ROAD]: 'concrete_road',
    [RoadCondition.OTHERS]: 'others'
})
