<template>
  <div id="app">
    <message>hello</message>
    <message>hello (again)</message>
  </div>
</template>

<script>
import Message from './components/Message.vue'

export default {
  name: 'app',
  components: { Message },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
