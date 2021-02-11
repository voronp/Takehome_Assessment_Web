<template>
    <div class="podcast-list">
        <template v-for="item in items">
            <div :key="item.id" class="podcast-list__wrapper">
                <slot name="item" v-bind="item"></slot>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'PodcastList',
        props: {
            items: Array,
            isLoading: Boolean,
        },
        methods: {

        }
    }
</script>
<style scoped lang="css">
    .podcast-list {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
    }
    .podcast-list__wrapper {
        flex: 0 1 30%;
        margin: 10px 0;
    }
</style>
