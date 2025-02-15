<script setup lang="ts">
import { marked } from 'marked';
import dayjs from 'dayjs';

import { ref, onMounted } from 'vue';
import gsap from "gsap";

// Configure marked to disable paragraph wrapping
marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: false,
  gfm: true
});

const works = await queryCollection('works').order('start_date', 'DESC').all();
works.forEach(work => {
  work.objectives = work.objectives.replace(/\\n/g, '\n')
  work.period = `${dayjs(work.start_date).format('MMM YYYY')} - ${dayjs(work.end_date).format('MMM YYYY')}`
});

const workRef = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.to('#content', {
    background: '#F1ECDF',
    duration: 1,
    scrollTrigger: {
      trigger: workRef.value,
      start: "top top+=128px",
      end: "bottom top",
      toggleActions: "play reverse play reverse",
    }
  });

  gsap.to(workRef.value, {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: workRef.value,
      start: () => "top " + window.innerHeight*0.75,
      end: "top top",
      scrub: true,
    }
  });

  const elements = document.querySelectorAll<HTMLElement>(".work");

  elements.forEach((el) => {
    gsap.to(el, {
      "--opacity-before": 1,
      scrollTrigger: {
        trigger: el,
        start: "top 50%",  // Enter center of viewport
        end: "bottom 50%", // Leave center of viewport
        toggleActions: "play reverse play reverse",
      },
    });
  });
})
</script>

<style lang="sass">
  @import "bootstrap/scss/functions"
  @import "@/assets/variables"
  @import "bootstrap/scss/variables-dark"
  @import "bootstrap/scss/maps"
  @import "bootstrap/scss/mixins"
  @import "bootstrap/scss/utilities"

  #works
    padding-left: 1rem
    padding-right: 1rem
    opacity: 0

    .work
      position: relative

      &:before
        position: absolute
        z-index: -1
        border-image: url('@/public/box.png') 180 fill stretch
        border-image-width: 60px
        top: -1rem
        right: -1rem
        bottom: -1rem
        left: -1rem
        content: ""
        opacity: var(--opacity-before, 0)
        transition: all .2s

    .header
      display: flex
      align-items: center
      margin-bottom: 1rem

      .right-header
        text-align: right

      .dots
        flex: 1
        height: 1px
        border-bottom: 2px dotted #ccc
        margin: 0 1rem

      h3.role
        font-size: 1rem
        margin: 0

      h3.company
        margin: 0

        p
          font-size: 1rem
          font-style: italic
          color: #999
          margin: 0

      h3.period
        font-size: .8rem
        color: #999
        margin: 0

      h3.location
        font-size: .8rem
        color: #999
        margin: 0

    .desc *
      font-size: .9rem

    @include media-breakpoint-down(sm)
      h2
        margin-bottom: 3rem

</style>

<template lang="pug">
  section#works(ref="workRef")
    .container
      .row.justify-content-center
        .col-md-3
          h2.position-sticky
            span //
            | Work History

        .col-md-6
          div.work.mb-5(v-for="work in works" :key="work.company")
            .header
              .left-header
                h3.role {{ work.role }}
                h3.company(v-html="marked(work.company)")

              .dots

              .right-header
                h3.period {{ work.period }}
                h3.location {{ work.location }}

            //- div(v-html="marked(work.about)")
            div.desc(v-html="marked(work.objectives)")
</template>
