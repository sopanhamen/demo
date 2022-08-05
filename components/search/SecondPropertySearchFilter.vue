<template>
  <div class="bg-primary">
    <form class="container mx-auto px-10">
      <div class="px-4 md:px-9 py-8">
        <p
          class="text-center pt-0 text-2xl sm:text-4xl font-extrabold tracking-wide uppercase"
        >
          {{ $t(item.title) }}
        </p>
        <!-- category -->
        <div class="flex flex-wrap justify-evenly py-5">
          <div>
            <input
              :value="value.property_type_id"
              @input="
                $emit('input', {
                  ...value,
                  property_type_id: $event.target.value
                })
              "
            />
            <input
              :value="value.code"
              @input="$emit('input', { ...value, code: $event.target.value })"
            />
          </div>
          <div
            v-for="row in item.categories"
            :key="row.id"
            class="flex items-center h-10"
          >
            <input
              :id="row.for"
              hidden
              :checked="row.checked"
              name="propType"
              class="bg-primary border-white border-2 p-2 mr-1 checked:bg-primary focus:ring-0"
              type="radio"
            />
            <label
              :for="row.for"
              class="font-bold text-lg sm:text-2xl text-gray-800 tracking-wide cursor-pointer"
              >{{ $t(row.text) }}</label
            >
          </div>
        </div>
        <!-- input  -->
        <div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4"
          >
            <div></div>

            <div v-for="row in item.inputs" :key="row.id">
              <input
                type="text"
                :list="row.name"
                :placeholder="$t(row.placeholder)"
                class="bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-700 leading-tight tracking-wider rounded w-full py-4"
              />
              <datalist :id="row.name">
                <option
                  v-for="row2 in row.data_list"
                  :key="row2.id"
                  :value="row2"
                />
              </datalist>
            </div>
          </div>
        </div>
        <!-- search and clear button  -->
        <div class="flex space-x-8">
          <button type="button" @click="$emit('search', value)">Search</button>
          <nuxt-link
            :to="localePath('/properties')"
            class="tracking-widest text-center w-full py-3 text-xl bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-md mt-4"
          >
            <li class="fa fa-search mr-2" />
            {{ $t(item.search) }}
          </nuxt-link>
          <button
            type="reset"
            class="tracking-widest text-center w-full py-3 text-xl bg-pink-700 hover:bg-pink-800 text-white font-bold rounded-md mt-4"
          >
            <li class="fa fa-undo mr-2" />
            {{ $t(item.clear) }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
