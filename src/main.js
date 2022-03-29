import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/less/index.less'

import '@/mock'

import SvgIcon from '@/components/SvgIcon'
import './icons'
import './permission'

createApp(App).component('svg-icon',SvgIcon).use(store).use(router).mount('#app')


/* import {getInfo,logout} from '@/api/user'


logout('admin').then(response => {
  const data  = response.data
  
  console.log('data:',data);

})
getInfo('admin-token').then(response => {
  const data  = response.data
  
  console.log('data:',data);

}) */