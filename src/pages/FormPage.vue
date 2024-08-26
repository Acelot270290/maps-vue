<template>
  <q-page padding>
    <q-form class="row q-col-gutter-xs justify-center" @submit="handleSubmit">
      <q-input label="Descrição" outlined v-model="form.descricao" class="col-xs-12 col-sm-12 col-md-8 col-lg-7"
        :rules="requiredRule" />
      <q-input label="Latitude" outlined v-model="form.latitude" class="col-xs-12 col-sm-12 col-md-8 col-lg-7"
        :rules="requiredRule" />
      <q-input label="Longitude" outlined v-model="form.longitude" class="col-xs-12 col-sm-12 col-md-8 col-lg-7"
        :rules="requiredRule" />
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-7 q-mt-md">
        <q-btn :loading="loading" label="Salvar" color="primary" class="float-right" type="submit" />
        <q-btn label="Cancelar" color="white" class="float-right text-black q-mr-md" :to="{ name: 'lista' }" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default defineComponent({
  name: 'FormPage',
  setup() {
    const form = ref({
      descricao: '',
      latitude: '',
      longitude: '',
      author: 'Alan Diniz'
    })
    const loading = ref(false)
    const router = useRouter()

    const requiredRule = [
      val => (val && val.length > 0) || 'Campo obrigatório'
    ]

    const handleSubmit = async () => {
      loading.value = true
      try {
        await api.post('tourist-points', form.value)
        loading.value = false
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Dados inseridos com sucesso.',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push({ name: 'lista' })
        })
      } catch (error) {
        loading.value = false
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu um erro ao inserir os dados.',
          confirmButtonText: 'OK'
        })
      }
    }

    return {
      form,
      handleSubmit,
      requiredRule,
      loading
    }
  }
})
</script>
