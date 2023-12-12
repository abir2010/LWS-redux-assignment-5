const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

const initialState = {
    video: {},
    loading: false,
    error: "",
    relatedVideos: [],
    tags: [],
};

const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
    const url = "http://localhost:9000/videos";
    const res = await fetch(url);
    const video = await res.json();

    return video;
});

const fetchRelatedVideos = createAsyncThunk(
    "relatedVideos/fetchRelatedVideos",
    async (tags) => {
        let url = "http://localhost:9000/videos";
        if (tags.length) {
            for (let i = 0; i < tags.length; i++) {
                if (i === 0) {
                    url += `?tags_like=${tags[i]}`;
                } else {
                    url += `&tags_like=${tags[i]}`;
                }
            }
        }

        const res = await fetch(url);
        const videos = await res.json();

        const sortedVideos = videos?.sort((a, b) =>
            parseFloat(a?.views) > parseFloat(b?.views) ? -1 : 1
        );

        return sortedVideos;
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideos.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.video = action.payload;
            state.tags = action.payload.tags;
        });

        builder.addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.video = {};
        });

        builder.addCase(fetchRelatedVideos.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.relatedVideos = action.payload;
        });

        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.relatedVideos = [];
        });
    },
});

module.exports.fetchVideos = fetchVideos;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
module.exports.videoReducer = videoSlice.reducer;
