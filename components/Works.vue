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

<template lang="pug">
section#works.row.justify-content-center
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
