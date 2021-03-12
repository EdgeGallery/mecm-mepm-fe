<template>
  <nav>
    <v-app-bar
      color="blue-grey darken-3"
      dark
    >
      <v-spacer />
      <v-btn icon>
        <v-icon>fas fa-language</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      :mini-variant.sync="mini"
      v-model="drawer"
      permanent
      dark
      app
      class="blue-grey darken-3 py-0"
    >
      <v-list
        nav
        dense
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon
              small
              @click.stop="mini = !mini"
            >
              fas fa-bars
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title />
        </v-list-item>
        <v-spacer class="mt-5" />
        <v-list-item
          router
          to="/overview"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Overview</v-list-item-title>
        </v-list-item>
        <v-list-group
          :value="false"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>App management</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            router
            to="/package-management"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Package management</v-list-item-title>
          </v-list-item>
          <v-list-item
            router
            to="/app-instance-list"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>App instance list</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          router
          to="/edge-notes"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edge Notes</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
// import Popup from './Popup.vue'
import Router from 'vue-router'
export default {
  data: () => ({
    mini: true,
    group: null,
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline']
    ],
    cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete']
    ],
    watch: {
      group () {
        this.drawer = false
      }
    }
  }),
  components: {
    // Popup
  },
  beforeDestroy () {},
  mounted () {},
  methods: {
    onClick (location) {
      Router.push(location)
    }
  }
}
</script>
<style scoped></style>

Overview App management 1. Package management 2. Edge Notes
