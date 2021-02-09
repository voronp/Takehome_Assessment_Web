<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>Please see README.md for instructions</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>
