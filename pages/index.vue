<script setup lang="ts">
import Intro from '~/components/Intro.vue';
import Works from '~/components/Works.vue';
import Projects from '~/components/Projects.vue';
</script>

<template lang="pug">
  #content
    #main-content.container
      Intro

      Works

      Projects

      #copy Built with <a href="https://nuxt.com" target="_blank">Nuxt</a> and hosted on <a href="https://github.com/pakMann/pakmann.github.io" target="_blank">GitHub</a>.

  #footer
    a(href="/cv.pdf") Download CV (PDF)
</template>
