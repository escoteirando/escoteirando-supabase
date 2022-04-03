<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">Redefinir senha</p>
      <div class="col-md4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          type="email"
          v-model="email"
          lazy-rules
          :rules="userRules.email"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Enviar e-mail"
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
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'PageRegister',
  setup() {
    const { sendPasswordRestEmail, userRules } = useAuthUser();
    const email = ref('');
    const { notifySuccess, notifyError } = useNotify();

    const handleForgotPassword = async () => {
      try {
        await sendPasswordRestEmail(email.value);
        notifySuccess(
          `Email de redefinição de senha enviado para ${email.value}`
        );
      } catch (error) {
        notifyError(error.message);
      }
    };
    return { email, handleForgotPassword, userRules };
  },
});
</script>
