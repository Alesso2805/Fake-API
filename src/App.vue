<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default {
  name: 'App',
  components: {LanguageSwitcher},
  title: 'Hartford Institute for Geriatric Nursing',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Home', to: '/home' },
       {label: 'Examiner Performance Overview', to: '/nursing/examiner-performance-overview'}
      ]
    };
  },
}
</script>
<template>
  <pv-toast></pv-toast>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="bg-primary" fixed>
      <template #start>
        <img src="https://hign.org/sites/default/files/2022-01/HIGN-logo-1200.png" alt="" width="120">
        <h3>Hartford Institute for Geriatric Nursing</h3>
      </template>
      <template #center>
        <div class="flex-column">
          <router-link v-for="item in items" :key="item.label" v-slot="{ navigate, href}" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text" @click="navigate">{{ item.label }}</pv-button>
          </router-link>
        </div>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <router-view/>
  </main>
</template>