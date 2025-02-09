<script setup lang="ts">
import Works from '~/components/Works.vue';
import Sign from '~/components/Sign.vue';

import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const pic = ref(null);
const about = ref(null);

onMounted(() => {
  // let l = gsap.timeline()

  // l.to(pic.value, {
  //   scale: 0.5,
  //   duration: 1,
  //   transformOrigin: 'top center',
  //   scrollTrigger: {
  //     trigger: pic.value,
  //     start: 'top top', // when the top of the element hits the top of the viewport
  //     // endTrigger: '#about', // end when #about enters the viewport
  //     end: '+=100%', // end when the top of #about hits the center of the viewport
  //     scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  //     markers: true, // add markers for debugging (optional)
  //     pin: true
  //   },
  // })

  // gsap.timeline({
  //   scrollTrigger: {
  //     trigger: pic.value,
  //     start: "top top",
  //     end: "100px top", // Adjust based on when you want scaling to stop
  //     scrub: true,
  //   }
  // })
  // .to(pic.value, {
  //   scale: 0.5, // Adjust scale as needed
  //   y: 0, // Ensures it stays at the top
  // });

  // ScrollTrigger.create({
  //   trigger: about.value,
  //   start: 'top bottom',
  //   end: 'top 128px',
  //   pin: true,
  //   markers: true
  // })

  // ScrollTrigger.create({
  //   trigger: '#about',
  //   start: 'top 128px',
  //   end: 'top bottom',
  //   pin: true
  // })
});
</script>

<template lang="pug">
#content
  #main-content.container
    #pic-container(ref="pic")
      #pic
        img(src="@/public/pakmann.png")

    section#about.row.justify-content-center(ref="about")
      .col-md-6
        h1 Hi! I'm Arman Adhitama,
        p.about a fullstack developer with extensive experience in building and maintaining web applications. I ensure seamless integration and optimal user experiences. As a problem-solver and team player, I communicate effectively to align technical and business goals.

        //- p#sign arman adhitama
        //- p(style="font-size: 24px") Hi, I'm <span class="hightlight">Arman Adhitama</span>, a full stack developer with extensive experience in designing and maintaining web applications. Skilled in HTML, CSS/Sass, JavaScript (jQuery, Nuxt), PHP (Wordpress, CodeIgniter, OpenCart), and Ruby (Ruby on Rails, Sinatra, Padrino, Middleman), I build dynamic, scalable solutions. Proficient in database management (SQL, MongoDB), and RESTful APIs, I ensure seamless integration and optimal user experiences. Experienced in authentication, Agile development, and cloud platforms (AWS, Heroku), I leverage Docker for efficiency. A problem-solver and team player, I communicate effectively to align technical and business goals.

    Works

    #copy Built with <a href="https://nuxt.com" target="_blank">Nuxt</a> and hosted on <a href="https://github.com/pakMann/pakmann.github.io" target="_blank">GitHub</a>.
#footer
  a(href="/cv.pdf") Download CV (PDF)
</template>
