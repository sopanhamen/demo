export default {
    getPaginationData: (state) => (module) =>
        state.modules[module]?.pagination?.data,
    getPaginationMeta: (state) => (module) =>
        state.modules[module]?.pagination?.meta,
    getPagination: (state) => (module) => state.modules[module]?.pagination,
    getOptions: (state) => (module) => state.modules[module]?.options,
    getLayout: (state) => (module) => state.modules[module]?.layout
}
