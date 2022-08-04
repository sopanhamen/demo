const endpoint = '/clients'

export default {
    async fetchAllClients({ commit }) {
        const { data } = await this.$axios.$get(
            `${endpoint}?no_pagination=true`
        )
        commit('SET_CLIENTS', data)
    },

    async storeNewClient({ commit, getters, state }) {
        const client = {
            ...getters.getFormData,
            requirement: getters.getFormDataRequirement
        }
        const { data } = await this.$axios.$post(`${endpoint}`, client)
        commit('ADD_CLIENT', {
            ...data,
            creator: state.auth ? state.auth.user : {}
        })

        return data
    },

    async storeNewClientRequirement({ commit, getters, state }, clientId) {
        const clientRequirement = {
            client_id: clientId,
            ...getters.getFormDataRequirement
        }

        const { data } = await this.$axios.$post(
            `/client-requirements`,
            clientRequirement
        )

        commit('ADD_CLIENT_REQUIREMENT', {
            ...data,
            creator: state.auth ? state.auth.user : {}
        })
        return data
    },

    async editClient({ commit }, uuid) {
        const { data } = await this.$service.client.find(uuid, {
            relations: 'contact,creator,requirements'
        })

        commit('SET_CLIENT_FORM', data)
        return data
    },

    async updateClient({ commit, getters }) {
        const client = getters.getFormData
        const { data } = await this.$service.client.update(client.id, client)
        commit('UPDATE_CLIENT', data)
    },

    async deleteClient({ commit }, uuid) {
        await this.$axios.$delete(`${endpoint}/${uuid}`)
        commit('REMOVE_CLIENT', uuid)
    },

    async editClientRequirement({ commit }, uuid) {
        const { data } = await this.$service.clientRequirement.find(uuid, {
            relations: [
                'client.creator',
                'creator',
                'client.contact',
                'property'
            ]
        })

        commit('SET_CLIENT_FORM', data.client)
        commit('SET_CLIENT_REQUIREMENT_FORM', data)
        return data
    },

    async updateRequirement({ commit, getters }) {
        const clientRequirement = getters.getFormDataRequirement
        await this.$service.clientRequirement.update(
            clientRequirement.id,
            clientRequirement
        )
    }
}
