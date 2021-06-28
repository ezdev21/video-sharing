import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import videosComponent from './components/channel/channelVideosComponent.vue';
import channelsComponent from './components/channel/channelsComponent.vue';
import aboutComponent from './components/channel/aboutComponent.vue';
import playlistsComponent from './components/channel/playlistsComponent.vue';
import communityComponent from './components/channel/communityComponent.vue';
import searchComponent from './components/channel/searchComponent.vue';

const router=new VueRouter({
       mode:'history',
       base_url:'/channel/show/:channelId',
       routes:[
           {
            path:'/videos',
            name:'channelVideos',
            component:videosComponent
           },
           {
            path:'/channels',
            name:'channels',
            component:channelsComponent
           },
           {
            path:'/about',
            name:'about',
            component:aboutComponent
           },
           {
            path:'/playlists',
            name:'playlists',
            component:playlistsComponent
           },
           {
            path:'/community',
            name:'community',
            component:communityComponent
           },
           {
            path:'/search',
            name:'search',
            component:searchComponent
           }   
       ]
});
export default router;