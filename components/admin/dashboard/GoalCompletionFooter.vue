<template>
  <div
    class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 divide-x-2 text-center bg-gray-100 py-4"
  >
    <div
      v-for="item in data"
      :key="item.id"
      class="transition duration-300 ease-in-out transform hover:scale-105 text-gray-50"
    >
      <div
        :class="item.bgColor"
        class="flex rounded shadow items-center h-16 sm:h-20"
      >
        <i
          :class="
            'w-16 sm:w-20 text-center text-xl sm:text-3xl fa fa-' + item.icon
          "
        />
        <div>
          <p>{{ $t('dashboard.' + item.title) }}</p>
          <h2 class="sm:text-xl">{{ item.number }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      data: [
        {
          icon: 'info-circle',
          title: 'get_client_information',
          number: '32',
          bgColor: 'bg-red-600'
        },
        {
          icon: 'map-pin',
          title: 'find_and_visit_property',
          number: '17',
          bgColor: 'bg-blue-600'
        },
        {
          icon: 'refresh',
          title: 'negotiation',
          number: '8',
          bgColor: 'bg-pink-600'
        },
        {
          icon: 'usd',
          title: 'payment_step',
          number: '10',
          bgColor: 'bg-yellow-600'
        },
        {
          icon: 'heart',
          title: 'transaction_complete',
          number: '92,050',
          bgColor: 'bg-green-600'
        },
        {
          icon: 'map-pin',
          title: 'find_and_visit_property',
          number: '17',
          bgColor: 'bg-blue-600'
        },
        {
          icon: 'refresh',
          title: 'negotiation',
          number: '8',
          bgColor: 'bg-pink-600'
        },
        {
          icon: 'usd',
          title: 'payment_step',
          number: '10',
          bgColor: 'bg-yellow-600'
        }
      ]
    }
  }
}
</script>
