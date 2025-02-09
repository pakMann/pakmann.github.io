<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const picRef = ref<HTMLElement | null>(null);
  const textRef = ref<HTMLElement | null>(null);
  const endRef = ref<HTMLElement | null>(null);
  const textScrollRef = ref<HTMLElement | null>(null);

  const splitText = (element: HTMLElement) => {
    const nodes = Array.from(element.childNodes);

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        let words = (node.textContent || "").split(" ");
        let spanWords = words.map(word => `<span style="opacity: 0.25;">${word}</span>`).join(" ");
        node.replaceWith(document.createRange().createContextualFragment(spanWords));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        splitText(node as HTMLElement);
      }
    });
  };

  const revealWords = (el: HTMLElement) => {
    splitText(el);
    const spans = el.querySelectorAll("span");
    gsap.set(spans, { opacity: 0.1 });

    gsap.to(spans, {
      opacity: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: el,
        endTrigger: endRef.value,
        start: "top top+=320px",
        end: "bottom bottom+=100vh",
        scrub: true
      },
    });
  };

  onMounted(() => {
    if (textRef.value) {
      revealWords(textRef.value);
    }

    if (picRef.value) {
      gsap.to(picRef.value, {
        scale: 0.5,
        duration: 1,
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        scrollTrigger: {
          trigger: picRef.value,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  });
</script>

<style lang="sass" scoped>
  @import "bootstrap/scss/functions"
  @import "@/assets/variables"

  .intro-container
    height: 500vh

    .intro
      position: sticky
      top: 0

      .about-container
        .pic
          height: 384px
          aspect-ratio: 1/1
          scale: 1
          transform-origin: center
          z-index: 3
          margin: 0 auto
          margin-top: -128px
          padding-top: calc(50vh - 192px)
          padding-bottom: calc(50vh - 192px)
          box-sizing: content-box

          &:before
            position: absolute
            content: ""
            aspect-ratio: 1/1
            width: 75%
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            z-index: -1
            border-radius: 50%
            background: $primary
            border: 8px solid #231f20

          &:hover:before
            animation: pulse 1.25s infinite

          img
            width: 100%

        .about
          font-size: 24px
          margin-bottom: 128px

</style>

<template lang="pug">
  .intro-container(ref="endRef")
    .intro
      .about-container.row.justify-content-center
        .pic-scroll-container
          //- .pic-container(ref="picRef")
          .pic(ref="picRef")
            img(src="@/public/pakmann.png")

        .col-md-6
          .about(ref="textRef")
            h1 Hi! I'm Arman Adhitama,
            p a fullstack developer with extensive experience in building and maintaining web applications. I ensure seamless integration and optimal user experiences. As a problem-solver and team player, I communicate effectively to align technical and business goals.
</template>
