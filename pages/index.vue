<script setup lang="ts">
import Works from '~/components/Works.vue';
</script>

<template lang="pug">
#content
  #main-content.container
    section.row.justify-content-center
      .col-md-3

      .col-md-6
        p(style="font-size: 24px") Hi, I'm a fullstack developer with extensive experience in building and maintaining web applications. I ensure seamless integration and optimal user experiences. As a problem-solver and team player, I communicate effectively to align technical and business goals.

        p#sign arman adhitama
        //- p(style="font-size: 24px") Hi, I'm <span class="hightlight">Arman Adhitama</span>, a full stack developer with extensive experience in designing and maintaining web applications. Skilled in HTML, CSS/Sass, JavaScript (jQuery, Nuxt), PHP (Wordpress, CodeIgniter, OpenCart), and Ruby (Ruby on Rails, Sinatra, Padrino, Middleman), I build dynamic, scalable solutions. Proficient in database management (SQL, MongoDB), and RESTful APIs, I ensure seamless integration and optimal user experiences. Experienced in authentication, Agile development, and cloud platforms (AWS, Heroku), I leverage Docker for efficiency. A problem-solver and team player, I communicate effectively to align technical and business goals.

    Works

    #copy Built with <a href="https://nuxt.com" target="_blank">Nuxt</a> and hosted on <a href="https://github.com/pakMann/pakmann.github.io" target="_blank">GitHub</a>.
#footer
  a(href="/cv.pdf") Download CV (PDF)
</template>
