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
       mode:'hash',
       routes:[
           {
            path:'/channel/show/:channelId/videos',
            name:'channelVideos',
            component:videosComponent
           },
           {
            path:'/channel/show/:channelId/channels',
            name:'channels',
            component:channelsComponent
           },
           {
            path:'/channel/show/:channelId/about',
            name:'about',
            component:aboutComponent
           },
           {
            path:'/channel/show/:channelId/playlists',
            name:'playlists',
            component:playlistsComponent
           },
           {
            path:'/channel/show/:channelId/community',
            name:'community',
            component:communityComponent
           },
           {
            path:'/channel/show/:channelId/search',
            name:'search',
            component:searchComponent
           }   
       ]
});
export default router;