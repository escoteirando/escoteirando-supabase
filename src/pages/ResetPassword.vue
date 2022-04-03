<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Redefinir senha</p>
      <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nova senha"
          type="password"
          v-model="password"
          lazy-rules
          :rules="userRules.password"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Confirmar"
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
import { useRouter, useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'PageResetPassword',
  setup() {
    const { resetPassword, userRules } = useAuthUser();
    const route = useRoute();
    const router = useRouter();
    const token = route.query.token;

    const password = ref('');
    const { notifySuccess, notifyError } = useNotify();
    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value);
        notifySuccess();
        router.push({ name: 'login' });
      } catch (error) {
        notifyError(error.message);
      }
    };
    return { password, handlePasswordReset, userRules };
  },
});
</script>
