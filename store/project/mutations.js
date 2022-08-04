import { updateField } from 'vuex-map-fields'
import { unionBy } from 'lodash'
import { form } from './-default'

export default {
    SET_PROJECTS(state, projects) {
        state.projects = projects
    },
    ADD_PROJECT(state, project) {
        state.projects.push(project)
    },
    ADD_PROJECTS(state, projects) {
        state.projects = unionBy(state.projects, projects, 'id')
    },
    UPDATE_PROJECT(state, project) {
        const index = state.projects.findIndex((item) => item.id === project.id)
        state.projects[index] = project
    },
    SET_PROJECT_FORM(state, project) {
        state.form = {
            ...state.form,
            ...project
            // image_one: project.image_one.path ? project.image_one : null,
            // image_two: project.image_two.path ? project.image_two : null,
            // image_three: project.image_three.path ? project.image_three : null,
            // image_four: project.image_four.path ? project.image_four : null,
            // image_five: project.image_five.path ? project.image_five : null
        }
    },

    CLEAR_PROJECT_FORM(state) {
        state.form = { ...form }
    },

    REMOVE_PROJECT(state, id) {
        const index = state.projects.findIndex((o) => o.id === id)
        if (index !== -1) {
            state.projects.splice(index, 1)
        }
    },
    updateField
}
