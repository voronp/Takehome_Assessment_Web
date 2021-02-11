<template>
    <div class="search-input">
        <input :value="value" @input="onInput" />
    </div>
</template>

<script>
    export default {
        name: 'BaseSearch',
        props: {
            value: String
        },
        methods: {
            onInput(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>
<style scoped lang="css">
.search-input {

}
</style>
