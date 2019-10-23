import mongoose from "mongoose";
let Schema = mongoose.Schema;

let MovieSchema = new Schema({
    status: {type: String, trim: true, default: "Chưa xác định."},
    title_vn: {type: String, trim: true},
    title_en: {type: String, trim: true},
    time: {type: Number, default: 0},
    imdb: {type: Number, default: 0},
    directors: {type: [String], default: []},
    release_date: {type: Date, default: "1/1/2000"},
    resolution: {type: String, default: "HD 720p"},
    star_rating: {type: Number, default: 5},
    trailer_link: {type: String, default: "https://www.youtube.com/embed/H_Xr9yvgsaw"},
    trailer_views: {type: Number, default: 0},
    watch_link: {type: String, default: "https://www.youtube.com/embed/H_Xr9yvgsaw"},
    watch_views: {type: Number, default: 0},
    download_links: {type: Object, default: {"720p": "https://www.youtube.com/embed/H_Xr9yvgsaw"}},
    keywords: {type: [String], default: []},
    categories: {type: [String], default: []},
    countries: {type: [String], default: []},
    create_at: {type: Number, default: Date.now}
});

MovieSchema.statics = {
    createNew(item) {
        return this.create(item);
    }
}

module.exports = mongoose.model("movie", MovieSchema);