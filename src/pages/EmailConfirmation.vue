<template>
  <q-page padding>
    <p class="text-body1">Obrigado por se registrar!</p>
    <p>
      Por favor, confirme seu email para finalizar o registro:
      <strong>{{ $route.query.email }}</strong
      >.
    </p>
    <q-btn
      label="Voltar ao login"
      class="full-width"
      flat
      :to="{ name: 'login' }"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageEmailConfirmation',

  setup() {
    return {};
  },
});
</script>
