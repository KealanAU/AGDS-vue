import{_ as r}from"./BpKGNSF3.js";import{_ as p}from"./IUsWvESh.js";import{a as i}from"./D8MhwIxN.js";import{e as d,f as m,w as l,o as f,a as t,d as o,b as u,_ as a}from"./Czyq2uHh.js";const A={class:"prose-page"},g={class:"callout"},S=d({__name:"installation",setup(v){return i({title:"Installation — AGDS-vue",description:"How to install and set up AGDS-vue in your Vue 3 project."}),(y,n)=>{const e=r,s=p;return f(),m(s,null,{default:l(()=>[t("article",A,[n[5]||(n[5]=t("h1",null,"Installation",-1)),n[6]||(n[6]=t("h2",null,"Requirements",-1)),n[7]||(n[7]=t("ul",null,[t("li",null,"Vue 3.5+"),t("li",null,"Node 20+")],-1)),n[8]||(n[8]=t("h2",null,"Install the package",-1)),n[9]||(n[9]=t("pre",null,[t("code",null,"pnpm add AGDS-vue")],-1)),n[10]||(n[10]=t("h2",null,"Register globally (recommended)",-1)),n[11]||(n[11]=t("p",null,[o("Register all components and import the stylesheet once in "),t("code",null,"main.ts"),o(":")],-1)),n[12]||(n[12]=t("pre",null,[t("code",null,`import { createApp } from 'vue'
import AgDSVue from 'AGDS-vue'
import 'AGDS-vue/styles'
import App from './App.vue'

createApp(App).use(AgDSVue).mount('#app')`)],-1)),n[13]||(n[13]=t("h2",null,"Import individually",-1)),n[14]||(n[14]=t("p",null,[o(" For better tree-shaking, import only the components you need. Still import the stylesheet once in "),t("code",null,"main.ts"),o(" — not per-component: ")],-1)),n[15]||(n[15]=t("pre",null,[t("code",null,`// main.ts
import 'AGDS-vue/styles'`)],-1)),n[16]||(n[16]=t("pre",null,[t("code",null,`<!-- MyComponent.vue -->
<script setup>
import { AgDSButton } from 'AGDS-vue'
<\/script>`)],-1)),n[17]||(n[17]=t("h2",null,"Nuxt 3",-1)),n[18]||(n[18]=t("p",null,[o("Create a plugin at "),t("code",null,"plugins/AGDS-vue.ts"),o(":")],-1)),n[19]||(n[19]=t("pre",null,[t("code",null,`import AgDSVue from 'AGDS-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(AgDSVue)
})`)],-1)),n[20]||(n[20]=t("p",null,[o("Add the stylesheet in "),t("code",null,"nuxt.config.ts"),o(":")],-1)),n[21]||(n[21]=t("pre",null,[t("code",null,`export default defineNuxtConfig({
  css: ['AGDS-vue/styles'],
  plugins: ['~/plugins/AGDS-vue.ts'],
})`)],-1)),n[22]||(n[22]=t("h2",null,"Design tokens",-1)),n[23]||(n[23]=t("p",null,[o(" All styles use "),t("code",null,"--agds-*"),o(" CSS custom properties. The stylesheet imported above includes all tokens. To override any token, declare it in your own CSS after the import: ")],-1)),n[24]||(n[24]=t("pre",null,[t("code",null,`/* your-overrides.css */
:root {
  --agds-color-brand: #your-brand-colour;
  --agds-color-focus: #your-focus-colour;
}`)],-1)),t("div",g,[n[2]||(n[2]=t("strong",null,"Next:",-1)),u(e,{to:"/foundations/tokens"},{default:l(()=>[...n[0]||(n[0]=[o("Explore the full token reference",-1)])]),_:1}),n[3]||(n[3]=o(" or ",-1)),u(e,{to:"/components"},{default:l(()=>[...n[1]||(n[1]=[o("browse all components",-1)])]),_:1}),n[4]||(n[4]=o(". ",-1))])])]),_:1})}}}),N=a(S,[["__scopeId","data-v-271f3deb"]]);export{N as default};
