<template>
    <div
        v-if="data"
        class="fixed h-screen w-screen top-0 left-0 bg-gray-800"
        style="z-index: 1010"
    >
        <div class="bg-gray-900 px-12 flex justify-between">
            <div>
                <div v-if="type === 'pdf'" class="flex items-center">
                    <pv-button
                        class="p-button-text text-white shadow-none"
                        icon="pi pi-angle-left"
                        :disabled="page < 2"
                        @click="page--"
                    />
                    <span class="text-base text-white"
                        >{{ page }} / {{ numPages }}
                    </span>
                    <pv-button
                        class="p-button-text text-white shadow-none"
                        icon="pi pi-angle-right"
                        :disabled="page >= numPages"
                        @click="page++"
                    />
                </div>
            </div>
            <div>
                <pv-button
                    class="p-button-text text-white"
                    icon="pi pi-download shadow-none"
                    :disabled="!downloadable"
                    @click="download"
                />
                <pv-button
                    class="p-button-text text-white shadow-none"
                    icon="pi pi-times"
                    @click="$document.close()"
                />
            </div>
        </div>
        <div class="overflow-auto h-full w-full box-border py-4 px-12">
            <div class="mb-12 mx-auto shadow-md">
                <pdf v-if="type === 'pdf'" :src="data" :page="page">
                    <template slot="loading"> Loading... </template>
                </pdf>
                <img v-else-if="type === 'image'" :src="data" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PdfViewer',

    data() {
        return {
            document: null,
            data: null,
            type: 'pdf',
            name: null,
            page: 1,
            numPages: 1,
            downloadable: true
        }
    },

    created() {
        this.$nuxt.$on('openDoc', (event) => {
            this.document = event

            if (event.type === 'pdf') {
                this.data = this.setPDF(event)
            } else if (event.type === 'image') {
                this.data = event.data
            } else {
                this.data = null
                this.download()
                this.downloadable = false
            }

            this.name = event.name
            this.type = event.type
            this.page = 1
        })

        this.$nuxt.$on('closeDoc', (event) => {
            this.data = null
            this.document = null
        })
    },

    methods: {
        download() {
            if (!this.downloadable) {
                return
            }

            this.downloadable = false

            const link = document.createElement('a')
            link.href = this.document.data
            link.setAttribute('download', this.document.name || 'file')
            document.body.appendChild(link)
            link.click()

            setTimeout(() => {
                this.downloadable = true
            }, 3000)
        },
        setPDF(event) {
            if (!event?.data || event.type !== 'pdf') {
                return
            }

            const pdf = this.$document.pdfInstance()
            if (!pdf) {
                return
            }

            const data = pdf.createLoadingTask(event.data)
            data.then((res) => {
                this.numPages = res.numPages
                this.data = data
            })
        }
    }
}
</script>
