<script setup lang="ts">
import { marked } from 'marked'
import dayjs from 'dayjs'

// Configure marked to disable paragraph wrapping
marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: false,
  gfm: true
})

const works = await queryCollection('works').order('start_date', 'DESC').all()
works.forEach(work => {
  work.objectives = work.objectives.replace(/\\n/g, '\n')
  work.period = `${dayjs(work.start_date).format('MMM YYYY')} - ${dayjs(work.end_date).format('MMM YYYY')}`
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
    .work
      position: relative

      &:before
        position: absolute
        z-index: -1
        background: white
        border-radius: 1rem
        top: -1rem
        right: -1rem
        bottom: -1rem
        left: -1rem
        content: ""
        box-shadow: 2px 2px 10px rgba(black, .1)
        opacity: 0
        transition: all 1s

      &:hover:before
        opacity: 1

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
      padding-left: 1rem
      padding-right: 1rem
</style>

<template lang="pug">
  section#works
    .container
      .row.justify-content-center
        .col-md-3
          h2.position-sticky Work Experience

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
