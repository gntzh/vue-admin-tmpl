<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent } from 'naive-ui'
import TheHeader from './TheHeader.vue'
import TheMenu from './TheMenu.vue'
import TheLogo from './TheLogo.vue'

const headerHeight = '48px'
const collapsed = ref(false)
</script>

<template>
  <n-layout has-sider class="h-screen layout">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :width="210"
      :collapsed-width="48"
      :collapsed="collapsed"
      :native-scrollbar="false"
      inverted
      @collapse="() => (collapsed = true)"
      @expand="() => (collapsed = false)"
      class="sider"
    >
      <the-logo :collapsed="collapsed"></the-logo>
      <the-menu :collapsed="collapsed"></the-menu>
    </n-layout-sider>
    <n-layout :native-scrollbar="false" class="layout-wrapper">
      <n-layout-header bordered position="absolute" class="header">
        <the-header v-model:collapsed="collapsed"></the-header>
      </n-layout-header>
      <n-layout-content
        :native-scrollbar="false"
        position="absolute"
        class="content"
        content-style="padding: 16px;"
      >
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="postcss">
.header {
  height: v-bind(headerHeight);
}
.content {
  margin-top: v-bind(headerHeight);
  @nest html:not(.dark) & {
    background-color: #f0f2f5;
  }
}
</style>
