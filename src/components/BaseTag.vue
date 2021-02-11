<template>
    <div :class="{'base-tag': true, 'base-tag_active': isActive}" @click="() => click(value)">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: 'BaseTag',
        props: {
            text: String,
            value: String,
            isActive: Boolean,
            click: Function,
        },
        methods: {
            onInput(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>
<style scoped lang="css">
    .base-tag {
        background-color: cornflowerblue;
        color: white;
        cursor: pointer;
        display: inline-block;
        margin: 1px;
        padding: 1px 20px;
        border-radius: 3px;
    }
    .base-tag_active {
        background-color: darkblue;
    }
</style>
