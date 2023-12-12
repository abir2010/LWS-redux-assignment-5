const { configureStore } = require("@reduxjs/toolkit");
const { videoReducer } = require("../features/video/videoSlice");
const { default: logger } = require("redux-logger");

const store = configureStore({
    reducer: {
        video: videoReducer,
    },
    middleware: (getDefaultMW) => getDefaultMW().concat(logger),
});

module.exports = store;
