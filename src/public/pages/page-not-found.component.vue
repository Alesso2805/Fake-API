<template>
  <div class="page-not-found">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la ruta <strong>{{ route }}</strong> no se encontró.</p>
    <router-link to="/" class="home-button">
      <button>Volver a Home</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  computed: {
    route() {
      return this.$route.path; // Obtiene la ruta actual
    },
  },
};
</script>

<style scoped>
.page-not-found {
  text-align: center;
  margin-top: 50px;
}

.home-button {
  margin-top: 20px;
}
</style>
