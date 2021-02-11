<template>
    <div class="base-card">
        <img class="base-card__image" :src="imageSrc"/>
        <div class="base-card__category">Category: {{categoryName}}</div>
        <div class="base-card__title">{{title}}</div>
        <div class="base-card__description">{{description}}</div>
    </div>
</template>

<script>
import defaultSrc from '@/assets/luminary-logo.png'
export default {
    name: 'BaseCard',
    props: {
        title: String,
        categoryName: String,
        description: String,
        images: {
            validator: function (value) {
                return ['default', 'featured', 'thumbnail', 'wide'].every(k => k in value) || true; // disabled for now
            }
        },
    },
    computed: {
        imageSrc() {
            return this.images && this.images.wide || defaultSrc
        }
    },
    methods: {

    }
}
</script>
<style scoped lang="css">
    .base-card {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        background-color: rgba(0,0,0,0.03);
        padding: 10px;
        box-shadow: 1px 2px 4px 0 rgba(0,0,0,0.2);
    }
    .base-card__image {
        max-width: 225px;
        max-height: 140px;
    }
    .base-card__category {
        font-style: italic;
    }
    .base-card__title {
        font-weight: bold;
    }
    .base-card__description {
        height: 12.4em;
        line-height: 1.6em;
        overflow: hidden;
    }
</style>
