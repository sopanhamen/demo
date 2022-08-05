<template>
  <div class="w-full mx-auto rounded-md border py-10">
    <!--UPLOAD-->
    <form v-if="isInitial || isSaving" enctype="multipart/form-data" novalidate>
      <div
        class="relative rounded-xl mx-auto w-10/12 bg-gray-100 hover:bg-gray-50 border-2 border-dashed border-gray-400"
      >
        <input
          type="file"
          :multiple="multiple"
          :name="uploadFieldName"
          :disabled="isSaving"
          class="absolute opacity-0 left-0 w-full h-full cursor-pointer"
          @change="
            filesChange($event.target.name, $event.target.files)
            fileCount = $event.target.files.length
          "
        />

        <p v-if="isInitial" class="text-lg py-6 text-center">
          <i class="fa fa-cloud-upload pr-2" />
          Drag your files here or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
      </div>
    </form>

    <!--SUCCESS-->
    <div v-if="isSuccess" class="w-10/12 mx-auto">
      <div
        class="border-2 border-dashed border-gray-400 bg-gray-100 rounded-xl"
      >
        <h2 class="pl-2 pt-2">
          Uploaded {{ uploadedFiles.length }} file(s) successfully.
        </h2>

        <!--File Previews-->
        <div
          class="flex flex-wrap justify-start mx-auto"
          :class="{
            'justify-center': imgCenter
          }"
        >
          <div
            v-for="item in uploadedFiles"
            :key="item.id"
            class="inline-block p-3 relative"
          >
            <!--File Preview-->
            <img
              v-if="typecheck(item.fileName)"
              :src="item.url"
              class="w-56 h-56 object-contain bg-white p-3 border"
              :alt="item.originalName"
            />
            <img
              v-else
              src="images/file.png"
              class="w-56 h-56 object-contain bg-white p-3 border"
              :alt="item.originalName"
            />
            <!--Remove btn to remove individual files-->
            <button
              class="absolute top-1 right-1 w-5"
              @click="removeFile(fileCount, uploadedFiles.indexOf(item))"
            >
              <i class="fa fa-trash fa-2x text-red-400" />
            </button>
            <!--File Name-->
            <p
              v-if="(fname = ftruncate(item.fileName))"
              class="text-center max-w-xs"
            >
              {{ fname }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="buttonSubmit"
        class="pt-8 flex justify-evenly items-center text-white font-bold"
      >
        <button
          class="tracking-widest text-center w-5/12 py-3 text-base sm:text-xl bg-pink-700 hover:bg-pink-800 rounded-md"
          @click="reset()"
        >
          <li class="fa fa-undo sm:mr-2" />

          {{ $t('common.clear') }}
        </button>
        <button
          class="tracking-widest text-center w-5/12 py-3 text-base sm:text-xl bg-gray-800 hover:bg-gray-900 rounded-md"
          @click="submit()"
        >
          <li class="fa fa-upload sm:mr-2" />
          {{ $t('common.submit') }}
        </button>
      </div>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<script>
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  props: {
    multiple: {
      type: Boolean
    },
    buttonSubmit: {
      type: Boolean
    },
    imgCenter: {
      type: Boolean
    }
  },
  data() {
    return {
      uploadedFiles: [],
      fileCount: 0,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      fname: ''
    }
  },
  computed: {
    // Upload Statuses
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    }
  },
  mounted() {
    this.reset()
  },
  methods: {
    submit() {
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    reset() {
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },

    save(formData) {
      this.currentStatus = STATUS_SAVING
      this.upload(formData)
        .then((x) => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch((err) => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    upload(formData) {
      const photos = formData.getAll('photos')
      const promises = photos.map((x) =>
        this.getImage(x).then((img) => ({
          id: img,
          originalName: x.name,
          fileName: x.name,
          url: img
        }))
      )
      return Promise.all(promises)
    },
    getImage(file) {
      return new Promise((resolve, reject) => {
        const fReader = new FileReader()
        const img = document.createElement('img')

        fReader.onload = () => {
          img.src = fReader.result
          resolve(this.getBase64Image(img))
        }

        fReader.readAsDataURL(file)
      })
    },
    getBase64Image(img) {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const dataURL = img.src
      return dataURL
    },
    typecheck(oInput) {
      const _validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png']
      if (oInput.length > 0) {
        let blnValid = false
        for (let j = 0; j < _validFileExtensions.length; j++) {
          const sCurExtension = _validFileExtensions[j]
          if (
            oInput
              .substr(
                oInput.length - sCurExtension.length,
                sCurExtension.length
              )
              .toLowerCase() === sCurExtension.toLowerCase()
          ) {
            blnValid = true
            break
          }
        }
        if (!blnValid) {
          return false
        }
      }
      return true
    },
    removeFile(fileCount, key) {
      fileCount = this.uploadedFiles.length
      if (fileCount === 1) {
        this.uploadedFiles.splice(key, 1)
        this.reset()
      } else {
        this.uploadedFiles.splice(key, 1)
      }
    },
    ftruncate(n) {
      const len = 7
      const ext = n.substring(n.lastIndexOf('.') + 1, n.length).toLowerCase()
      let filename = n.replace('.' + ext, '')
      if (filename.length <= len) {
        return n
      }
      filename = filename.substr(0, len) + (n.length > len ? '[...]' : '')
      return filename + '.' + ext
    },
    filesChange(fieldName, fileList) {
      this.$emit('UploadImage', this.uploadedFiles)
      const formData = new FormData()
      if (!fileList.length) {
        return
      }
      Array.from(Array(fileList.length).keys()).map((x) => {
        return formData.append(fieldName, fileList[x], fileList[x].name)
      })
      this.save(formData)
    }
  }
}
</script>
