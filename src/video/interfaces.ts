export interface IVideoData {
    id?: string;
    fileName: string;
    addData: Date;
    createdData: Date;
    videoFormat: string;
    duration: number;
    size: number;
    width: number;
    height: number;
    chapters: any[];
    image?: string;
}

export interface IVideoMetaData {
    streams: Stream[];
    format: Format;
    chapters: any[];
}

export interface Tags {
    BPS: string;
    DURATION: string;
    NUMBER_OF_FRAMES: string;
    NUMBER_OF_BYTES: string;
    _STATISTICS_WRITING_APP: string;
    _STATISTICS_WRITING_DATE_UTC: string;
    _STATISTICS_TAGS: string;
    language: string;
    filename: string;
    mimetype: string;
}

export interface Disposition {
    default: number;
    dub: number;
    original: number;
    comment: number;
    lyrics: number;
    karaoke: number;
    forced: number;
    hearing_impaired: number;
    visual_impaired: number;
    clean_effects: number;
    attached_pic: number;
    timed_thumbnails: number;
}

export interface Stream {
    index: number;
    codec_name: string;
    codec_long_name: string;
    profile: string;
    codec_type: string;
    codec_time_base: string;
    codec_tag_string: string;
    codec_tag: string;
    width: any;
    height: any;
    coded_width: number;
    coded_height: number;
    has_b_frames: number;
    sample_aspect_ratio: string;
    display_aspect_ratio: string;
    pix_fmt: string;
    level: number;
    color_range: string;
    color_space: string;
    color_transfer: string;
    color_primaries: string;
    chroma_location: string;
    field_order: string;
    timecode: string;
    refs: number;
    is_avc: string;
    nal_length_size: number;
    id: string;
    r_frame_rate: string;
    avg_frame_rate: string;
    time_base: string;
    start_pts: number;
    start_time: number;
    duration_ts: any;
    duration: any;
    bit_rate: string;
    max_bit_rate: string;
    bits_per_raw_sample: any;
    nb_frames: string;
    nb_read_frames: string;
    nb_read_packets: string;
    tags: Tags;
    disposition: Disposition;
    sample_fmt: string;
    sample_rate?: number;
    channels?: number;
    channel_layout: string;
    bits_per_sample?: number;
}

export interface Tags2 {
    encoder: string;
    creation_time: Date;
}

export interface Format {
    filename: string;
    nb_streams: number;
    nb_programs: number;
    format_name: string;
    format_long_name: string;
    start_time: number;
    duration: number;
    size: number;
    bit_rate: number;
    probe_score: number;
    tags: Tags2;
}



