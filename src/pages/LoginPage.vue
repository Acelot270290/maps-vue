<template>
    <q-page padding>
        <q-form class="row q-col-gutter-xs justify-center" @submit="handleLogin">
            <q-input label="Email" outlined v-model="form.email" class="col-xs-12 col-sm-12 col-md-8 col-lg-7"
                :rules="emailRules" type="email" />
            <q-input label="Senha" outlined v-model="form.password" class="col-xs-12 col-sm-12 col-md-8 col-lg-7"
                :rules="requiredRule" type="password" />
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-7 q-mt-md">
                <q-btn :loading="loading" label="Entrar" color="primary" class="float-right" type="submit" />
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import Swal from 'sweetalert2' // Importa o SweetAlert2

export default defineComponent({
    name: 'LoginPage',
    setup() {
        const form = ref({
            email: '',
            password: ''
        })
        const loading = ref(false)
        const router = useRouter()

        const requiredRule = [val => (val && val.length > 0) || 'Campo obrigatório']
        const emailRules = [
            val => !!val || 'Campo obrigatório',
            val => /^\S+@\S+\.\S+$/.test(val) || 'Email inválido'
        ]

        const handleLogin = async () => {
            loading.value = true
            try {
                // Faz a requisição para login
                const response = await api.post('login', form.value)
                loading.value = false

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Login realizado com sucesso.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redireciona para a página principal ou dashboard
                    router.push({ name: 'lista' })
                })
            } catch (error) {
                loading.value = false
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Email ou senha incorretos.',
                    confirmButtonText: 'OK'
                })
            }
        }

        return {
            form,
            loading,
            handleLogin,
            requiredRule,
            emailRules
        }
    }
})
</script>