<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Registrar</p>
      <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="userRules.name"
        />
        <q-input
          label="Email"
          type="email"
          v-model="form.email"
          lazy-rules
          :rules="userRules.email"
        />
        <q-input
          label="Senha"
          type="password"
          v-model="form.password"
          lazy-rules
          :rules="userRules.password"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Registrar"
            color="primary"
            class="full-width"
            outline
            type="submit"
          />
        </div>
        <div class="full-width">
          <q-btn
            label="Login"
            color="secondary"
            class="full-width"
            flat
            to="login"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'PageRegister',
  setup() {
    const router = useRouter();
    const { register, userRules } = useAuthUser();
    const form = ref({
      name: '',
      email: '',
      password: '',
    });
    const { notifySuccess, notifyError } = useNotify();
    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySuccess();
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };
    return { form, handleRegister, userRules };
  },
});
</script>
