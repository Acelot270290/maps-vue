<template>
  <q-page padding>
    <q-table title="Meus lugares" :rows="lugares" :columns="columns" row-key="uid" :loading="loading">
      <template v-slot:top-right>
        <q-btn label="Novo" icon="add" color="primary" :to="{ name: 'form' }" />
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td>
          <q-btn :loading="loadingDelete[props.row.uid]" color="negative" icon="delete" class="float-right" dense
            @click="confirmDelete(props.row.uid)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import Swal from 'sweetalert2' // Importa o SweetAlert2

const columns = [
  {
    name: 'uid',
    label: 'Id',
    align: 'left',
    field: row => row.uid,
    sortable: true
  },
  {
    name: 'descricao',
    label: 'Descrição',
    align: 'left',
    field: row => row.descricao,
    sortable: true
  },
  {
    name: 'latitude',
    label: 'Latitude',
    align: 'left',
    field: row => row.latitude,
    sortable: true
  },
  {
    name: 'longitude',
    label: 'Longitude',
    align: 'left',
    field: row => row.longitude,
    sortable: true
  },
  {
    name: 'acoes',
    label: 'Ações',
    align: 'right',
    field: row => row.acoes
  }
]

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const lugares = ref([])
    const loading = ref(true)
    const loadingDelete = ref({})

    onMounted(() => {
      handleGetList()
    })

    const handleGetList = async () => {
      try {
        loading.value = true
        const { data } = await api.get('tourist-points')
        lugares.value = data
        loading.value = false
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    const confirmDelete = (uid) => {
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Esta ação não pode ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          loadingDelete.value[uid] = true
          try {
            await handleDelete(uid)
            Swal.fire('Deletado!', 'O item foi deletado com sucesso.', 'success')
          } catch (error) {
            Swal.fire('Erro!', 'Ocorreu um erro ao deletar o item.', 'error')
          } finally {
            loadingDelete.value[uid] = false
          }
        }
      })
    }

    const handleDelete = async (uid) => {
      try {
        await api.delete(`tourist-points/${uid}`)
        handleGetList()
      } catch (error) {
        console.error(error)
        throw error
      }
    }

    return {
      columns,
      lugares,
      loading,
      loadingDelete,
      confirmDelete
    }
  }
})
</script>
