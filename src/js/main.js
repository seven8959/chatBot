import scrollSmooth from './helpers/smooth-scroll.js';
import menu from './modules/header.js';
import slider from './modules/slider.js';
import widget from './modules/widget.js';

function main() {
  slider();
}

scrollSmooth();
menu();
widget();

if (document.documentElement.clientWidth < 480) {
  window.addEventListener('scroll',
    function () {
      return setTimeout(main, 1000);
    }, {
      once: true
    });
} else {
  main();
};

// date
const months=["січень","лютий","березень","квітень","травень","червень","липень","серпень","вересень","жовтень","листопад","грудень",],monthMin=["","","","","","","","","","","",""],days=["неділя","понеділок","вівторок","середа","четвер","п'ятниця","субота",],daysMin=["","","","","","",""],seasons=["зима","весна","літо","осінь"];function postDate(t,e,n,o,r){for(let l=0;l<60;l++)u(l,"date-"),u(l,"date");function u(t,e){let n;n="date-"===e?-t:t;let o=new Date(Date.now()+864e5*n),r=o.getDate(),l=o.getMonth()+1,u=o.getFullYear(),i=s(r),c=s(l),d=i+"."+c+"."+u,$=document.querySelectorAll("."+(e+t));for(let y=0;y<$.length;y++){let f=$[y].dataset.format;void 0!==f&&""!==f?$[y].innerHTML=String(a(i,l,u,f,n)):$[y].innerHTML=d}}function a(e,o,r,l,u){var a,i,d,$,y,f,m;let g=l,h=["dd","mm","yyyy","dayFull","monthFull","year"],M={dd:e,mm:s(o),yyyy:r,dayFull:(a=e,i=o,d=r,$=t,y=!0,c(y,$[new Date(d,i-1,a).getDay()])),monthFull:function t(e,n,o,r){let l=0,u;return u=e+l>12?l-(12-e):e+l,c(o,n[(u=e+l<=0?12+l+1:e+l)-1])}(o,n,!0),year:(f=r,m=u,f+m)};for(let _=0;_<h.length;_++){let L=h[_],p=RegExp(L);g=g.replace(p,M[L])}return g.split(" ").join("\xa0")}function i(t,e){return t+e}function s(t){return t<10?"0"+t:t}function c(t,e){return t&&e&&e.length>0?e[0].toUpperCase()+e.slice(1):e}!function t(){let e=document.querySelectorAll(".time-today"),n=document.querySelectorAll(".time-current"),o=new Date,r=function t(e){let n=s(e.getHours()),o=s(e.getMinutes()),r=s(e.getSeconds());return`${n}:${o}:${r}`}(o);function l(){let t=new Date,n=function t(e){let n=s(e.getHours()),o=s(e.getMinutes());return`${n}:${o}`}(t);e.forEach(t=>{t.innerHTML=n})}n.forEach(t=>{t.innerHTML=r}),l(),setInterval(l,6e4)}()}document.body.classList.contains("ev-date")&&document.addEventListener("DOMContentLoaded",function(){postDate(days,daysMin,months,monthMin,seasons)});