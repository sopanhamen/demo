<template>
  <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
    <div class="p-4 border-b">
      <p class="text-red-500 text-lg">{{ $t('project.image') }}</p>
    </div>
    <div class="pb-5">
      <div class="px-4 py-1">
        <h3 class="pb-2">{{ $t('project.images') }}</h3>
        <admin-form-upload-image
          :image="image_one ? image_one.url : null"
          @delete-image="image_one = null"
          @uploaded="image_one = $event"
        />
        <admin-form-upload-image
          :image="image_two ? image_two.url : null"
          @delete-image="image_two = null"
          @uploaded="image_two = $event"
        />
        <admin-form-upload-image
          :image="image_three ? image_three.url : null"
          @delete-image="image_three = null"
          @uploaded="image_three = $event"
        />
        <admin-form-upload-image
          :image="image_four ? image_four.url : null"
          @delete-image="image_four = null"
          @uploaded="image_four = $event"
        />
        <admin-form-upload-image
          :image="image_five ? image_five.url : null"
          @delete-image="image_five = null"
          @uploaded="image_five = $event"
        />
        <!-- <admin-form-upload-images :images="" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'project/getField',
  mutationType: 'project/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),
  computed: {
    ...mapFields({
      image_one: 'form.image_one',
      image_two: 'form.image_two',
      image_three: 'form.image_three',
      image_four: 'form.image_four',
      image_five: 'form.image_five'
    })
  },
  methods: {
    // ...mapActions({
    //   deleteProjectImage: 'project/deleteImage'
    // })
    // setImages(event) {
    //   this.$store.commit('project/SET_PROJECT_FORM', {
    //     image_one: [...this.images[0], ...event],
    //     image_two: [...this.images[1], ...event],
    //     image_three: [...this.images[2], ...event],
    //     image_four: [...this.images[3], ...event],
    //     image_five: [...this.images[4], ...event]
    //   })
    // },
    // confirmDeleteImage(imageUuid) {
    //   this.$confirm.require({
    //     message: this.$t('message.confirm_delete'),
    //     header: this.$t('common.confirmation'),
    //     icon: 'pi pi-exclamation-triangle',
    //     acceptClass: 'p-button-danger',
    //     accept: () => {
    //       this.deleteImage(imageUuid)
    //     }
    //   })
    // },
    // async deleteImage(imageUuid) {
    //   const propertyUuid = this.$route.params.id
    //   if (propertyUuid) {
    //     await this.deleteProjectImage({ propertyUuid, imageUuid })
    //     this.$toast.add({
    //       severity: 'success',
    //       summary: this.$t('common.success'),
    //       detail: this.$t('message.success_delete_image'),
    //       life: 3000
    //     })
    //   }
    // }
  }
}
</script>
