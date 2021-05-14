import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import videosComponent from './components/channel/videosComponent.vue';
import channelsComponent from './components/channel/channelsComponent.vue';
import aboutComponent from './components/channel/aboutComponent.vue';
import playlistsComponent from './components/channel/playlistsComponent.vue';
import communityComponent from './components/channel/communityComponent.vue';
import searchComponent from './components/channel/searchComponent.vue';

const router=new VueRouter({
       mode:'hash',
       routes:[
           {path:'/videos',component:videosComponent},
           {path:'/channels',component:channelsComponent},
           {path:'/about',component:aboutComponent},
           {path:'/playlists',component:playlistsComponent},
           {path:'/community',component:communityComponent},
           {path:'/search',component:searchComponent}   
       ]
});
export default router;