<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import gsap from "gsap";

  const text = "Download CV";
  const formattedText = ref(text.split("").map(char => `<span>${char}</span>`).join(""));
  const contentRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    gsap.from(".stagger-text span", {
      opacity: 0.1,
      x: -50,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.05,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: contentRef.value,
        start: () => "bottom " + window.innerHeight*0.75,
        end: "bottom center",
        scrub: true
      }
    });
  });
</script>

<style lang="sass">
  @import "bootstrap/scss/functions"
  @import "@/assets/variables"
  @import "bootstrap/scss/variables-dark"
  @import "bootstrap/scss/maps"
  @import "bootstrap/scss/mixins"
  @import "bootstrap/scss/utilities"

  #footer
    position: fixed
    z-index: 1
    background: $body-bg
    bottom: 0
    left: 0
    right: 0
    height: $footer-height
    display: flex
    justify-content: center
    align-items: center

    a
      text-decoration: none
      font-weight: 300
      font-size: 3vw
      text-transform: uppercase
      letter-spacing: 0.1em
      display: block
      padding-right: 0

      &:after
        content: none

      span
        color: #555
        display: inline-block
        min-width: 1vw
        transition: color 0.3s
        font-family: 'Londrina Solid', cursive, sans-serif

      &:hover
        span
          color: #999

      @include media-breakpoint-down(sm)
        font-size: 6vw
</style>

<template lang="pug">
  #footer
    a(href="/cv.pdf" target="_blank")
      span.stagger-text(v-html="formattedText")
</template>
