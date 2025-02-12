<template lang="pug">
section#works
  .container
    .row.justify-content-center
      .col-md-3
        h2.position-sticky Projects

      .col-md-6
        //- div.work.mb-5(v-for="work in works" :key="work.company")
        //-   .header
        //-     .left-header
        //-       h3.role {{ work.role }}
        //-       h3.company(v-html="marked(work.company)")

        //-     .dots

        //-     .right-header
        //-       h3.period {{ work.period }}
        //-       h3.location {{ work.location }}

        //-   //- div(v-html="marked(work.about)")
        //-   div.desc(v-html="marked(work.objectives)")
</template>
