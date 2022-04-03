<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          type="email"
          lazy-rules
          :rules="userRules.email"
        />
        <q-input
          label="Senha"
          v-model="form.password"
          type="password"
          lasy-rules
          :rules="userRules.password"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-md-y-sm">
          <q-btn
            label="Registrar"
            color="primary"
            class="full-width"
            flat
            to="/register"
            size="sm"
          />

          <q-btn
            label="Esqueci a senha"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'forgot-password' }"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageLogin',
  setup() {
    const router = useRouter();
    const { login, userRules, isLoggedIn } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      email: '',
      password: '',
    });
    onMounted(() => {
      if (isLoggedIn()) {
        router.push({ name: 'me' });
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess();
        router.push({ name: 'me' });
      } catch (error) {
        notifyError(error.message);
      }
    };
    return { form, handleLogin, userRules };
  },
});
</script>
