<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: ['en', 'es'], // opciones de idioma
    };
  },
  methods: {
    switchLanguage(language) {
      this.$i18n.locale = language; // cambia el idioma actual
    },
  },
};
</script>

<template>
  <pv-select-button v-model="$i18n.locale" :options="languages">
    <template #option="slotProps">
      {{ slotProps.option.toUpperCase() }}
    </template>
  </pv-select-button>
</template>
