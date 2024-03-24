<template>
    <div>
        <h1 class="text-red-100">
            {{ $t('welcome') }} {{ locale }}
        </h1>

        <a
            v-for="l in availableLocales"
            :key="l"
            href="#"
            @click.prevent.stop="setLocale(l)"
        >{{ l }}</a>
    </div>
</template>

<script setup lang="ts">
const { locale, setLocale, availableLocales } = useI18n();
</script>
