<template>
  <div>

    <v-navigation-drawer app width="256" elevation-3 :mini-variant.sync="$store.state.main.drawer" permanent>

      <template v-slot:prepend>
        <v-list-item class="barheight bggradient textcenter">
          <v-list-item-content>
            <v-list-item-title>
              <img src="../../assets/logodinaran-white.png" height="36px" style="margin: 0 auto"
                v-if="!$store.state.main.drawer" />
              <img src="../../assets/logodinaran.png" height="30 px" style="padding: 0 auto" v-else />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list>
        <template v-for="(item, i) in $store.state.user.sidebar">
          <v-list-group :prepend-icon="item.icon" class="active-group" :key="i">
            <template v-slot:activator>
              <v-list-item-title>{{ item.module }}</v-list-item-title>
            </template>
            <template v-for="(child, a) in item.children">
              <v-list-item :key="a" :to="link_to(child.to)" link class="pl-1" active-class="active-group"
                v-if="!checkChild(child.children)">
                <v-list-item-icon>
                  <v-icon color="black">{{ child.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title style="color: black">
                  {{ child.module }} <v-icon color="green" style="float:right;"
                    v-if="child.to !== null && child.to !== ''">mdi-check-circle</v-icon>
                </v-list-item-title>
              </v-list-item>
              <v-list-group :prepend-icon="child.icon" no-action sub-group :key="a" v-else>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ child.module }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="(gc, i) in child.children" :to="link_to(gc.to)" :key="i" link>
                  <v-list-item-icon>
                    <v-icon v-text="gc.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-title v-text="gc.module"></v-list-item-title>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profiles: "",
    };
  },
  mounted() {

    //this.$store.commit("main/setLoading", false);
  },
  methods: {
    checkChild(value) {
      if (typeof value != "undefined") {
        return true;
      } else {
        return false;
      }
    },
    link_to(params) {
      //console.log(params);
      if (params !== null && params !== '') {
        //console.log(params);
        this.$store.commit("member/setMemberPage", "list");
        return "../../panello/" + params;
      }
    }
  },
};
</script>

<style>
.barheight {
  height: 64px;
}

.active-group {
  background-color: #ffffff54;
}

.tile:hover {
  background-color: #ffffff30;
}

.v-list-group__items .v-list-item__icon {
  padding-left: 20px !important;
}
</style>