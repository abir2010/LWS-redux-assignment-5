const store = require("./app/store");
const {
    fetchVideos,
    fetchRelatedVideos,
} = require("./features/video/videoSlice");

store.subscribe(() => {
    // console.log(store.getState().video.relatedVideos);
    // for (let i = 0; i < store.getState().video.relatedVideos.length; i++) {
    //     console.log(store.getState().video.relatedVideos[i]);
    // }
});

store.dispatch(fetchVideos()).then(() => {
    store.dispatch(fetchRelatedVideos(store.getState().video.tags));
});
