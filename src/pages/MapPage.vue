<template>
  <q-page>
    <l-map v-if="!loading" :markers="markers" />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import LMap from 'components/LMap.vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'MapPage',
  components: {
    LMap
  },
  setup() {
    const markers = ref([])
    const loading = ref(true)

    onMounted(() => {
      handleGetList()
    })

    const handleGetList = async () => {
      try {
        loading.value = true
        const { data } = await api.get('tourist-points')
        markers.value = data.map((lugar) => {
          return {
            uid: lugar.uid,
            latitude: lugar.latitude,
            longitude: lugar.longitude,
            descricao: lugar.descricao
          }
        })
        loading.value = false
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    return {
      markers,
      loading
    }
  }
})
</script>
