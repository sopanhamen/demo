<template>
  <div class="w-full h-full shadow text-gray-50 rounded">
    <div
      v-for="(item, index) of viewLikeContact"
      :key="item.id"
      class="relative flex justify-between items-center transition duration-300 ease-in-out transform hover:scale-105 shadow p-2 h-12 md:h-20"
      :class="[
        index == 0 ? 'bg-pink-600  ' : '',
        index == 1 ? 'bg-green-600 ' : '',
        index == 2 ? 'bg-indigo-600 ' : '',
        index == 3 ? 'bg-cyan-600 ' : '',
        index == 4 ? 'bg-yellow-600 ' : '',
        index == 5 ? 'bg-blue-600 ' : ''
      ]"
    >
      <div
        class="flex justify-center items-center md:block md:space-y-1 w-full text-center md:text-left"
      >
        <h3 class="md:text-base font-medium pr-5">
          {{ $t('dashboard.' + item.title) }}
          <span class="md:hidden"> :</span>
        </h3>
        <p class="md:text-lg font-medium">{{ item.num }}</p>
      </div>
      <div class="absolute top-2 md:top-5 right-5">
        <i
          :class="'text-lg md:text-3xl opacity-50 text-white pi ' + item.icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      TotalContacts: 'dashboard/getTotalContacts',
      TotalContactsInBranch: 'dashboard/getTotalContactsInBranch',
      TotalContactsInTeam: 'dashboard/getTotalContactsInTeam',
      TotalContactsByAssignee: 'dashboard/getTotalContactsByAssignee'
    }),
    viewLikeContact() {
      return [
        {
          num: '5000 static',
          title: 'view',
          icon: 'pi-eye'
        },
        {
          num: '6k static',
          title: 'favorite_and_like',
          icon: 'pi-heart'
        },
        {
          num: this.TotalContacts,
          title: 'contacted',
          icon: 'pi-phone'
        },
        {
          num: this.TotalContactsInBranch,
          title: 'total_contacts_to_branch',
          icon: 'pi-phone'
        },
        {
          num: this.TotalContactsInTeam,
          title: 'total_contacts_to_team',
          icon: 'pi-phone'
        },

        {
          num: this.TotalContactsByAssignee,
          title: 'total_contacts_by_assignee',
          icon: 'pi-phone'
        }
      ]
    }
  }
}
</script>
