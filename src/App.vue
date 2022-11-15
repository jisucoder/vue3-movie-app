<!-- eslint-disable vue/no-reserved-component-names -->
<template>
  <Header />
  <RouterView />
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header
  }
}
</script>

<style lang="scss">
@import "~/scss/main";
</style>