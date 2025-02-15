<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import gsap from "gsap";

  const picRef = ref<HTMLElement | null>(null);
  const picScroller = ref<HTMLElement | null>(null);
  const textRef = ref<HTMLElement | null>(null);
  const endRef = ref<HTMLElement | null>(null);

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
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        scrollTrigger: {
          trigger: picScroller.value,
          start: "top top",
          endTrigger: picScroller.value,
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(picScroller.value, {
        height: '50vh',
        marginTop: 0,
        duration: 1,
        scrollTrigger: {
          trigger: picScroller.value,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  });
</script>

<style lang="sass">
  @import "bootstrap/scss/functions"
  @import "@/assets/variables"
  @import "bootstrap/scss/variables-dark"
  @import "bootstrap/scss/maps"
  @import "bootstrap/scss/mixins"
  @import "bootstrap/scss/utilities"

  @keyframes rotate
    from
      transform: translate(-50%, -50%) rotate(0deg)
    to
      transform: translate(-50%, -50%) rotate(360deg)

  @keyframes rotatecclockwise
    from
      transform: translate(-50%, -50%) rotate(0deg)
    to
      transform: translate(-50%, -50%) rotate(-360deg)

  h1
    font-size: 2rem
    font-family: 'DM Sans', sans-serif
    font-weight: 700
    margin-bottom: 1rem

    @include media-breakpoint-down(sm)
      font-size: 1.5rem

  .intro-container
    height: 300vh

    .intro
      position: sticky
      top: 0
      padding-left: 1rem
      padding-right: 1rem

      .about-container
        .pic-scroll-container
          height: 100vh
          margin-top: -128px
          display: flex
          justify-content: center
          align-items: center

        .pic
          width: 384px
          max-width: 100%
          aspect-ratio: 1/1
          scale: 1
          transform-origin: center
          // margin: 0 auto
          // margin-top: -128px
          // padding-top: calc(50vh - 192px)
          // padding-bottom: calc(50vh - 192px)
          box-sizing: content-box
          // padding-top: 50vh
          // padding-bottom: 50%
          overflow: hidden

          &:before,
          &:after
            position: absolute
            content: ""
            aspect-ratio: 1/1
            width: 75%
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            z-index: -1
            // border-radius: 50%
            // background: #E5533D
            // border: 8px solid #231f20
            transform-origin: center

          &:before
            background: url(@/public/round.svg) no-repeat center center
            animation: rotate 10s linear infinite

          &:after
            background: url(@/public/roundborder.svg) no-repeat center center
            animation: rotatecclockwise 15s linear infinite

          &:hover:before
            animation: rotate 10s linear infinite, pulse 1.25s infinite

          &:hover:after
            animation: rotatecclockwise 15s linear infinite, pulse 1.25s infinite

          img
            width: 100%

        .about
          font-size: 1.5rem
          margin-bottom: 128px

          @include media-breakpoint-down(sm)
            font-size: 1.25rem
</style>

<template lang="pug">
  .intro-container(ref="endRef")
    .intro
      .about-container.row.justify-content-center
        .pic-scroll-container(ref="picScroller")
          //- .pic-container(ref="picRef")
          .pic(ref="picRef")
            img(src="@/public/pakmann.png")

        .col-md-6
          .about(ref="textRef")
            h1 Hi! I'm Arman Adhitama,
            p a fullstack developer with extensive experience in building and maintaining web applications. I ensure seamless integration and optimal user experiences. As a problem-solver and team player, I communicate effectively to align technical and business goals.
</template>
