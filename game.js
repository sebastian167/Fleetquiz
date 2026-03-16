/* ================================================
   DELTA FLEET QUIZ — GAME ENGINE
   ================================================ */

// ── Real Delta Fleet Data (extracted from ShipAttributes CSV) ──
// Each entry: { ship: "SHIP #", type: "Aircraft Type" }
// Total: 1041 aircraft across 10 types
const FLEET_DATA = [
  // 220
  { ship: "8101", type: "220" },
  { ship: "8102", type: "220" },
  { ship: "8103", type: "220" },
  { ship: "8104", type: "220" },
  { ship: "8105", type: "220" },
  { ship: "8106", type: "220" },
  { ship: "8107", type: "220" },
  { ship: "8108", type: "220" },
  { ship: "8109", type: "220" },
  { ship: "8110", type: "220" },
  { ship: "8111", type: "220" },
  { ship: "8112", type: "220" },
  { ship: "8113", type: "220" },
  { ship: "8114", type: "220" },
  { ship: "8115", type: "220" },
  { ship: "8116", type: "220" },
  { ship: "8117", type: "220" },
  { ship: "8118", type: "220" },
  { ship: "8119", type: "220" },
  { ship: "8120", type: "220" },
  { ship: "8121", type: "220" },
  { ship: "8122", type: "220" },
  { ship: "8123", type: "220" },
  { ship: "8124", type: "220" },
  { ship: "8125", type: "220" },
  { ship: "8126", type: "220" },
  { ship: "8127", type: "220" },
  { ship: "8128", type: "220" },
  { ship: "8129", type: "220" },
  { ship: "8130", type: "220" },
  { ship: "8131", type: "220" },
  { ship: "8132", type: "220" },
  { ship: "8133", type: "220" },
  { ship: "8134", type: "220" },
  { ship: "8135", type: "220" },
  { ship: "8136", type: "220" },
  { ship: "8137", type: "220" },
  { ship: "8138", type: "220" },
  { ship: "8139", type: "220" },
  { ship: "8140", type: "220" },
  { ship: "8141", type: "220" },
  { ship: "8142", type: "220" },
  { ship: "8143", type: "220" },
  { ship: "8144", type: "220" },
  { ship: "8145", type: "220" },
  { ship: "8301", type: "220" },
  { ship: "8302", type: "220" },
  { ship: "8303", type: "220" },
  { ship: "8304", type: "220" },
  { ship: "8305", type: "220" },
  { ship: "8306", type: "220" },
  { ship: "8307", type: "220" },
  { ship: "8308", type: "220" },
  { ship: "8309", type: "220" },
  { ship: "8310", type: "220" },
  { ship: "8311", type: "220" },
  { ship: "8312", type: "220" },
  { ship: "8313", type: "220" },
  { ship: "8314", type: "220" },
  { ship: "8315", type: "220" },
  { ship: "8316", type: "220" },
  { ship: "8317", type: "220" },
  { ship: "8318", type: "220" },
  { ship: "8319", type: "220" },
  { ship: "8320", type: "220" },
  { ship: "8321", type: "220" },
  { ship: "8322", type: "220" },
  { ship: "8323", type: "220" },
  { ship: "8324", type: "220" },
  { ship: "8325", type: "220" },
  { ship: "8326", type: "220" },
  { ship: "8327", type: "220" },
  { ship: "8328", type: "220" },
  { ship: "8329", type: "220" },
  { ship: "8330", type: "220" },
  { ship: "8331", type: "220" },
  { ship: "8332", type: "220" },
  { ship: "8333", type: "220" },
  { ship: "8334", type: "220" },
  { ship: "8335", type: "220" },
  { ship: "8336", type: "220" },
  { ship: "8337", type: "220" },
  { ship: "8338", type: "220" },
  { ship: "8339", type: "220" },
  { ship: "8340", type: "220" },
  // 319
  { ship: "3101", type: "319" },
  { ship: "3102", type: "319" },
  { ship: "3114", type: "319" },
  { ship: "3115", type: "319" },
  { ship: "3116", type: "319" },
  { ship: "3117", type: "319" },
  { ship: "3118", type: "319" },
  { ship: "3119", type: "319" },
  { ship: "3120", type: "319" },
  { ship: "3121", type: "319" },
  { ship: "3122", type: "319" },
  { ship: "3123", type: "319" },
  { ship: "3124", type: "319" },
  { ship: "3125", type: "319" },
  { ship: "3126", type: "319" },
  { ship: "3127", type: "319" },
  { ship: "3128", type: "319" },
  { ship: "3129", type: "319" },
  { ship: "3130", type: "319" },
  { ship: "3131", type: "319" },
  { ship: "3132", type: "319" },
  { ship: "3133", type: "319" },
  { ship: "3134", type: "319" },
  { ship: "3135", type: "319" },
  { ship: "3136", type: "319" },
  { ship: "3137", type: "319" },
  { ship: "3138", type: "319" },
  { ship: "3139", type: "319" },
  { ship: "3140", type: "319" },
  { ship: "3141", type: "319" },
  { ship: "3142", type: "319" },
  { ship: "3143", type: "319" },
  { ship: "3144", type: "319" },
  { ship: "3145", type: "319" },
  { ship: "3146", type: "319" },
  { ship: "3147", type: "319" },
  { ship: "3148", type: "319" },
  { ship: "3149", type: "319" },
  { ship: "3151", type: "319" },
  { ship: "3152", type: "319" },
  { ship: "3153", type: "319" },
  { ship: "3154", type: "319" },
  { ship: "3155", type: "319" },
  { ship: "3157", type: "319" },
  { ship: "3158", type: "319" },
  { ship: "3159", type: "319" },
  { ship: "3160", type: "319" },
  { ship: "3161", type: "319" },
  { ship: "3162", type: "319" },
  { ship: "3163", type: "319" },
  { ship: "3164", type: "319" },
  { ship: "3165", type: "319" },
  { ship: "3166", type: "319" },
  { ship: "3168", type: "319" },
  { ship: "3169", type: "319" },
  { ship: "3170", type: "319" },
  { ship: "3171", type: "319" },
  // 320
  { ship: "3221", type: "320" },
  { ship: "3225", type: "320" },
  { ship: "3228", type: "320" },
  { ship: "3229", type: "320" },
  { ship: "3234", type: "320" },
  { ship: "3235", type: "320" },
  { ship: "3236", type: "320" },
  { ship: "3237", type: "320" },
  { ship: "3238", type: "320" },
  { ship: "3239", type: "320" },
  { ship: "3240", type: "320" },
  { ship: "3241", type: "320" },
  { ship: "3242", type: "320" },
  { ship: "3243", type: "320" },
  { ship: "3244", type: "320" },
  { ship: "3245", type: "320" },
  { ship: "3247", type: "320" },
  { ship: "3248", type: "320" },
  { ship: "3249", type: "320" },
  { ship: "3250", type: "320" },
  { ship: "3251", type: "320" },
  { ship: "3252", type: "320" },
  { ship: "3253", type: "320" },
  { ship: "3254", type: "320" },
  { ship: "3255", type: "320" },
  { ship: "3256", type: "320" },
  { ship: "3257", type: "320" },
  { ship: "3258", type: "320" },
  { ship: "3259", type: "320" },
  { ship: "3260", type: "320" },
  { ship: "3261", type: "320" },
  { ship: "3262", type: "320" },
  { ship: "3263", type: "320" },
  { ship: "3264", type: "320" },
  { ship: "3265", type: "320" },
  { ship: "3266", type: "320" },
  { ship: "3267", type: "320" },
  { ship: "3268", type: "320" },
  { ship: "3269", type: "320" },
  { ship: "3270", type: "320" },
  { ship: "3271", type: "320" },
  { ship: "3272", type: "320" },
  { ship: "3273", type: "320" },
  { ship: "3274", type: "320" },
  { ship: "3275", type: "320" },
  { ship: "3276", type: "320" },
  { ship: "3277", type: "320" },
  { ship: "3278", type: "320" },
  // 321
  { ship: "1001", type: "321" },
  { ship: "1002", type: "321" },
  { ship: "1003", type: "321" },
  { ship: "1004", type: "321" },
  { ship: "1005", type: "321" },
  { ship: "1006", type: "321" },
  { ship: "1007", type: "321" },
  { ship: "1008", type: "321" },
  { ship: "1009", type: "321" },
  { ship: "1010", type: "321" },
  { ship: "1011", type: "321" },
  { ship: "1012", type: "321" },
  { ship: "1013", type: "321" },
  { ship: "1014", type: "321" },
  { ship: "1015", type: "321" },
  { ship: "1016", type: "321" },
  { ship: "1017", type: "321" },
  { ship: "1018", type: "321" },
  { ship: "1019", type: "321" },
  { ship: "1020", type: "321" },
  { ship: "1021", type: "321" },
  { ship: "1022", type: "321" },
  { ship: "1023", type: "321" },
  { ship: "1024", type: "321" },
  { ship: "1025", type: "321" },
  { ship: "1026", type: "321" },
  { ship: "1027", type: "321" },
  { ship: "1028", type: "321" },
  { ship: "1029", type: "321" },
  { ship: "3001", type: "321" },
  { ship: "3002", type: "321" },
  { ship: "3003", type: "321" },
  { ship: "3004", type: "321" },
  { ship: "3005", type: "321" },
  { ship: "3006", type: "321" },
  { ship: "3007", type: "321" },
  { ship: "3008", type: "321" },
  { ship: "3009", type: "321" },
  { ship: "3010", type: "321" },
  { ship: "3011", type: "321" },
  { ship: "3012", type: "321" },
  { ship: "3013", type: "321" },
  { ship: "3014", type: "321" },
  { ship: "3015", type: "321" },
  { ship: "3016", type: "321" },
  { ship: "3017", type: "321" },
  { ship: "3018", type: "321" },
  { ship: "3019", type: "321" },
  { ship: "3020", type: "321" },
  { ship: "3021", type: "321" },
  { ship: "3022", type: "321" },
  { ship: "3023", type: "321" },
  { ship: "3024", type: "321" },
  { ship: "3025", type: "321" },
  { ship: "3026", type: "321" },
  { ship: "3027", type: "321" },
  { ship: "3028", type: "321" },
  { ship: "3029", type: "321" },
  { ship: "3030", type: "321" },
  { ship: "3031", type: "321" },
  { ship: "3032", type: "321" },
  { ship: "3033", type: "321" },
  { ship: "3034", type: "321" },
  { ship: "3035", type: "321" },
  { ship: "3036", type: "321" },
  { ship: "3037", type: "321" },
  { ship: "3038", type: "321" },
  { ship: "3039", type: "321" },
  { ship: "3040", type: "321" },
  { ship: "3041", type: "321" },
  { ship: "3042", type: "321" },
  { ship: "3043", type: "321" },
  { ship: "3044", type: "321" },
  { ship: "3045", type: "321" },
  { ship: "3046", type: "321" },
  { ship: "3047", type: "321" },
  { ship: "3048", type: "321" },
  { ship: "3049", type: "321" },
  { ship: "3050", type: "321" },
  { ship: "3051", type: "321" },
  { ship: "3052", type: "321" },
  { ship: "3053", type: "321" },
  { ship: "3054", type: "321" },
  { ship: "3055", type: "321" },
  { ship: "3056", type: "321" },
  { ship: "3057", type: "321" },
  { ship: "3058", type: "321" },
  { ship: "3059", type: "321" },
  { ship: "3060", type: "321" },
  { ship: "3061", type: "321" },
  { ship: "3062", type: "321" },
  { ship: "3063", type: "321" },
  { ship: "3064", type: "321" },
  { ship: "3065", type: "321" },
  { ship: "3066", type: "321" },
  { ship: "3067", type: "321" },
  { ship: "3068", type: "321" },
  { ship: "3069", type: "321" },
  { ship: "3070", type: "321" },
  { ship: "3071", type: "321" },
  { ship: "3072", type: "321" },
  { ship: "3073", type: "321" },
  { ship: "3074", type: "321" },
  { ship: "3075", type: "321" },
  { ship: "3076", type: "321" },
  { ship: "3077", type: "321" },
  { ship: "3078", type: "321" },
  { ship: "3079", type: "321" },
  { ship: "3080", type: "321" },
  { ship: "3081", type: "321" },
  { ship: "3082", type: "321" },
  { ship: "3083", type: "321" },
  { ship: "3084", type: "321" },
  { ship: "3085", type: "321" },
  { ship: "3086", type: "321" },
  { ship: "3087", type: "321" },
  { ship: "3088", type: "321" },
  { ship: "3089", type: "321" },
  { ship: "3090", type: "321" },
  { ship: "3091", type: "321" },
  { ship: "3092", type: "321" },
  { ship: "3093", type: "321" },
  { ship: "3094", type: "321" },
  { ship: "3095", type: "321" },
  { ship: "3096", type: "321" },
  { ship: "3097", type: "321" },
  { ship: "3098", type: "321" },
  { ship: "5001", type: "321" },
  { ship: "5002", type: "321" },
  { ship: "5003", type: "321" },
  { ship: "5004", type: "321" },
  { ship: "5005", type: "321" },
  { ship: "5006", type: "321" },
  { ship: "5007", type: "321" },
  { ship: "5008", type: "321" },
  { ship: "5009", type: "321" },
  { ship: "5010", type: "321" },
  { ship: "5011", type: "321" },
  { ship: "5012", type: "321" },
  { ship: "5013", type: "321" },
  { ship: "5014", type: "321" },
  { ship: "5015", type: "321" },
  { ship: "5016", type: "321" },
  { ship: "5017", type: "321" },
  { ship: "5018", type: "321" },
  { ship: "5019", type: "321" },
  { ship: "5020", type: "321" },
  { ship: "5021", type: "321" },
  { ship: "5022", type: "321" },
  { ship: "5023", type: "321" },
  { ship: "5024", type: "321" },
  { ship: "5025", type: "321" },
  { ship: "5026", type: "321" },
  { ship: "5027", type: "321" },
  { ship: "5028", type: "321" },
  { ship: "5029", type: "321" },
  { ship: "5030", type: "321" },
  { ship: "5031", type: "321" },
  { ship: "5032", type: "321" },
  { ship: "5033", type: "321" },
  { ship: "5034", type: "321" },
  { ship: "5035", type: "321" },
  { ship: "5036", type: "321" },
  { ship: "5037", type: "321" },
  { ship: "5038", type: "321" },
  { ship: "5039", type: "321" },
  { ship: "5040", type: "321" },
  { ship: "5041", type: "321" },
  { ship: "5042", type: "321" },
  { ship: "5043", type: "321" },
  { ship: "5044", type: "321" },
  { ship: "5045", type: "321" },
  { ship: "5046", type: "321" },
  { ship: "5047", type: "321" },
  { ship: "5048", type: "321" },
  { ship: "5049", type: "321" },
  { ship: "5050", type: "321" },
  { ship: "5051", type: "321" },
  { ship: "5052", type: "321" },
  { ship: "5053", type: "321" },
  { ship: "5054", type: "321" },
  { ship: "5055", type: "321" },
  { ship: "5056", type: "321" },
  { ship: "5057", type: "321" },
  { ship: "5058", type: "321" },
  { ship: "5059", type: "321" },
  { ship: "5060", type: "321" },
  { ship: "5061", type: "321" },
  { ship: "5062", type: "321" },
  { ship: "5063", type: "321" },
  { ship: "5064", type: "321" },
  { ship: "5065", type: "321" },
  { ship: "5066", type: "321" },
  { ship: "5067", type: "321" },
  { ship: "5068", type: "321" },
  { ship: "5069", type: "321" },
  { ship: "5070", type: "321" },
  { ship: "5071", type: "321" },
  { ship: "5072", type: "321" },
  { ship: "5073", type: "321" },
  { ship: "5074", type: "321" },
  { ship: "5075", type: "321" },
  { ship: "5076", type: "321" },
  { ship: "5077", type: "321" },
  { ship: "5078", type: "321" },
  { ship: "5079", type: "321" },
  { ship: "5080", type: "321" },
  { ship: "5081", type: "321" },
  { ship: "5082", type: "321" },
  { ship: "5083", type: "321" },
  { ship: "5084", type: "321" },
  { ship: "5085", type: "321" },
  { ship: "5086", type: "321" },
  { ship: "5087", type: "321" },
  { ship: "5088", type: "321" },
  { ship: "5089", type: "321" },
  { ship: "5090", type: "321" },
  { ship: "5091", type: "321" },
  { ship: "5092", type: "321" },
  { ship: "5093", type: "321" },
  { ship: "5094", type: "321" },
  { ship: "5095", type: "321" },
  { ship: "5096", type: "321" },
  { ship: "5097", type: "321" },
  { ship: "5098", type: "321" },
  { ship: "5099", type: "321" },
  { ship: "5100", type: "321" },
  { ship: "5101", type: "321" },
  { ship: "5102", type: "321" },
  { ship: "5103", type: "321" },
  { ship: "5104", type: "321" },
  { ship: "5105", type: "321" },
  { ship: "5106", type: "321" },
  { ship: "5107", type: "321" },
  { ship: "5108", type: "321" },
  { ship: "5109", type: "321" },
  { ship: "5110", type: "321" },
  // 330
  { ship: "3301", type: "330" },
  { ship: "3302", type: "330" },
  { ship: "3303", type: "330" },
  { ship: "3304", type: "330" },
  { ship: "3305", type: "330" },
  { ship: "3306", type: "330" },
  { ship: "3307", type: "330" },
  { ship: "3308", type: "330" },
  { ship: "3309", type: "330" },
  { ship: "3310", type: "330" },
  { ship: "3311", type: "330" },
  { ship: "3312", type: "330" },
  { ship: "3313", type: "330" },
  { ship: "3314", type: "330" },
  { ship: "3315", type: "330" },
  { ship: "3316", type: "330" },
  { ship: "3317", type: "330" },
  { ship: "3318", type: "330" },
  { ship: "3319", type: "330" },
  { ship: "3320", type: "330" },
  { ship: "3321", type: "330" },
  { ship: "3322", type: "330" },
  { ship: "3323", type: "330" },
  { ship: "3324", type: "330" },
  { ship: "3325", type: "330" },
  { ship: "3326", type: "330" },
  { ship: "3327", type: "330" },
  { ship: "3328", type: "330" },
  { ship: "3329", type: "330" },
  { ship: "3330", type: "330" },
  { ship: "3331", type: "330" },
  { ship: "3351", type: "330" },
  { ship: "3352", type: "330" },
  { ship: "3353", type: "330" },
  { ship: "3354", type: "330" },
  { ship: "3355", type: "330" },
  { ship: "3356", type: "330" },
  { ship: "3357", type: "330" },
  { ship: "3358", type: "330" },
  { ship: "3359", type: "330" },
  { ship: "3360", type: "330" },
  { ship: "3361", type: "330" },
  { ship: "3401", type: "330" },
  { ship: "3402", type: "330" },
  { ship: "3403", type: "330" },
  { ship: "3404", type: "330" },
  { ship: "3405", type: "330" },
  { ship: "3406", type: "330" },
  { ship: "3407", type: "330" },
  { ship: "3408", type: "330" },
  { ship: "3409", type: "330" },
  { ship: "3410", type: "330" },
  { ship: "3411", type: "330" },
  { ship: "3412", type: "330" },
  { ship: "3413", type: "330" },
  { ship: "3414", type: "330" },
  { ship: "3415", type: "330" },
  { ship: "3416", type: "330" },
  { ship: "3417", type: "330" },
  { ship: "3418", type: "330" },
  { ship: "3419", type: "330" },
  { ship: "3420", type: "330" },
  { ship: "3421", type: "330" },
  { ship: "3422", type: "330" },
  { ship: "3423", type: "330" },
  { ship: "3424", type: "330" },
  { ship: "3425", type: "330" },
  { ship: "3426", type: "330" },
  { ship: "3427", type: "330" },
  { ship: "3428", type: "330" },
  { ship: "3429", type: "330" },
  { ship: "3430", type: "330" },
  { ship: "3431", type: "330" },
  { ship: "3432", type: "330" },
  { ship: "3433", type: "330" },
  { ship: "3434", type: "330" },
  { ship: "3435", type: "330" },
  { ship: "3436", type: "330" },
  { ship: "3437", type: "330" },
  { ship: "3438", type: "330" },
  { ship: "3439", type: "330" },
  // 350
  { ship: "3501", type: "350" },
  { ship: "3502", type: "350" },
  { ship: "3503", type: "350" },
  { ship: "3504", type: "350" },
  { ship: "3505", type: "350" },
  { ship: "3506", type: "350" },
  { ship: "3507", type: "350" },
  { ship: "3508", type: "350" },
  { ship: "3509", type: "350" },
  { ship: "3510", type: "350" },
  { ship: "3511", type: "350" },
  { ship: "3512", type: "350" },
  { ship: "3513", type: "350" },
  { ship: "3514", type: "350" },
  { ship: "3515", type: "350" },
  { ship: "3516", type: "350" },
  { ship: "3517", type: "350" },
  { ship: "3518", type: "350" },
  { ship: "3519", type: "350" },
  { ship: "3520", type: "350" },
  { ship: "3521", type: "350" },
  { ship: "3522", type: "350" },
  { ship: "3523", type: "350" },
  { ship: "3524", type: "350" },
  { ship: "3525", type: "350" },
  { ship: "3526", type: "350" },
  { ship: "3527", type: "350" },
  { ship: "3528", type: "350" },
  { ship: "3529", type: "350" },
  { ship: "3530", type: "350" },
  { ship: "3531", type: "350" },
  { ship: "3532", type: "350" },
  { ship: "3533", type: "350" },
  { ship: "3534", type: "350" },
  { ship: "3535", type: "350" },
  { ship: "3568", type: "350" },
  { ship: "3569", type: "350" },
  { ship: "3570", type: "350" },
  { ship: "3571", type: "350" },
  { ship: "3572", type: "350" },
  { ship: "3573", type: "350" },
  { ship: "3574", type: "350" },
  { ship: "3575", type: "350" },
  { ship: "3576", type: "350" },
  // 717
  { ship: "9500", type: "717" },
  { ship: "9501", type: "717" },
  { ship: "9502", type: "717" },
  { ship: "9503", type: "717" },
  { ship: "9504", type: "717" },
  { ship: "9505", type: "717" },
  { ship: "9506", type: "717" },
  { ship: "9507", type: "717" },
  { ship: "9508", type: "717" },
  { ship: "9509", type: "717" },
  { ship: "9510", type: "717" },
  { ship: "9511", type: "717" },
  { ship: "9512", type: "717" },
  { ship: "9513", type: "717" },
  { ship: "9514", type: "717" },
  { ship: "9516", type: "717" },
  { ship: "9518", type: "717" },
  { ship: "9519", type: "717" },
  { ship: "9520", type: "717" },
  { ship: "9521", type: "717" },
  { ship: "9522", type: "717" },
  { ship: "9523", type: "717" },
  { ship: "9524", type: "717" },
  { ship: "9525", type: "717" },
  { ship: "9526", type: "717" },
  { ship: "9527", type: "717" },
  { ship: "9528", type: "717" },
  { ship: "9529", type: "717" },
  { ship: "9532", type: "717" },
  { ship: "9533", type: "717" },
  { ship: "9535", type: "717" },
  { ship: "9536", type: "717" },
  { ship: "9538", type: "717" },
  { ship: "9539", type: "717" },
  { ship: "9540", type: "717" },
  { ship: "9541", type: "717" },
  { ship: "9542", type: "717" },
  { ship: "9543", type: "717" },
  { ship: "9544", type: "717" },
  { ship: "9545", type: "717" },
  { ship: "9546", type: "717" },
  { ship: "9547", type: "717" },
  { ship: "9548", type: "717" },
  { ship: "9549", type: "717" },
  { ship: "9550", type: "717" },
  { ship: "9551", type: "717" },
  { ship: "9552", type: "717" },
  { ship: "9553", type: "717" },
  { ship: "9554", type: "717" },
  { ship: "9555", type: "717" },
  { ship: "9556", type: "717" },
  { ship: "9557", type: "717" },
  { ship: "9558", type: "717" },
  { ship: "9559", type: "717" },
  { ship: "9560", type: "717" },
  { ship: "9561", type: "717" },
  { ship: "9562", type: "717" },
  { ship: "9563", type: "717" },
  { ship: "9564", type: "717" },
  { ship: "9565", type: "717" },
  { ship: "9566", type: "717" },
  { ship: "9567", type: "717" },
  { ship: "9568", type: "717" },
  { ship: "9569", type: "717" },
  { ship: "9570", type: "717" },
  { ship: "9571", type: "717" },
  { ship: "9572", type: "717" },
  { ship: "9573", type: "717" },
  { ship: "9574", type: "717" },
  { ship: "9575", type: "717" },
  { ship: "9576", type: "717" },
  { ship: "9577", type: "717" },
  { ship: "9578", type: "717" },
  { ship: "9579", type: "717" },
  { ship: "9580", type: "717" },
  { ship: "9581", type: "717" },
  { ship: "9582", type: "717" },
  { ship: "9584", type: "717" },
  { ship: "9585", type: "717" },
  { ship: "9586", type: "717" },
  { ship: "9594", type: "717" },
  // 737
  { ship: "3701", type: "737" },
  { ship: "3702", type: "737" },
  { ship: "3703", type: "737" },
  { ship: "3704", type: "737" },
  { ship: "3705", type: "737" },
  { ship: "3706", type: "737" },
  { ship: "3707", type: "737" },
  { ship: "3708", type: "737" },
  { ship: "3709", type: "737" },
  { ship: "3710", type: "737" },
  { ship: "3711", type: "737" },
  { ship: "3712", type: "737" },
  { ship: "3713", type: "737" },
  { ship: "3714", type: "737" },
  { ship: "3715", type: "737" },
  { ship: "3716", type: "737" },
  { ship: "3717", type: "737" },
  { ship: "3718", type: "737" },
  { ship: "3719", type: "737" },
  { ship: "3720", type: "737" },
  { ship: "3721", type: "737" },
  { ship: "3722", type: "737" },
  { ship: "3723", type: "737" },
  { ship: "3724", type: "737" },
  { ship: "3725", type: "737" },
  { ship: "3726", type: "737" },
  { ship: "3727", type: "737" },
  { ship: "3728", type: "737" },
  { ship: "3729", type: "737" },
  { ship: "3730", type: "737" },
  { ship: "3731", type: "737" },
  { ship: "3732", type: "737" },
  { ship: "3733", type: "737" },
  { ship: "3734", type: "737" },
  { ship: "3735", type: "737" },
  { ship: "3736", type: "737" },
  { ship: "3737", type: "737" },
  { ship: "3738", type: "737" },
  { ship: "3739", type: "737" },
  { ship: "3740", type: "737" },
  { ship: "3741", type: "737" },
  { ship: "3742", type: "737" },
  { ship: "3743", type: "737" },
  { ship: "3744", type: "737" },
  { ship: "3745", type: "737" },
  { ship: "3746", type: "737" },
  { ship: "3747", type: "737" },
  { ship: "3748", type: "737" },
  { ship: "3749", type: "737" },
  { ship: "3750", type: "737" },
  { ship: "3751", type: "737" },
  { ship: "3752", type: "737" },
  { ship: "3753", type: "737" },
  { ship: "3754", type: "737" },
  { ship: "3755", type: "737" },
  { ship: "3756", type: "737" },
  { ship: "3757", type: "737" },
  { ship: "3758", type: "737" },
  { ship: "3759", type: "737" },
  { ship: "3760", type: "737" },
  { ship: "3761", type: "737" },
  { ship: "3762", type: "737" },
  { ship: "3763", type: "737" },
  { ship: "3764", type: "737" },
  { ship: "3765", type: "737" },
  { ship: "3766", type: "737" },
  { ship: "3767", type: "737" },
  { ship: "3768", type: "737" },
  { ship: "3769", type: "737" },
  { ship: "3770", type: "737" },
  { ship: "3771", type: "737" },
  { ship: "3772", type: "737" },
  { ship: "3773", type: "737" },
  { ship: "3774", type: "737" },
  { ship: "3775", type: "737" },
  { ship: "3776", type: "737" },
  { ship: "3777", type: "737" },
  { ship: "3801", type: "737" },
  { ship: "3802", type: "737" },
  { ship: "3803", type: "737" },
  { ship: "3804", type: "737" },
  { ship: "3805", type: "737" },
  { ship: "3806", type: "737" },
  { ship: "3807", type: "737" },
  { ship: "3808", type: "737" },
  { ship: "3809", type: "737" },
  { ship: "3810", type: "737" },
  { ship: "3811", type: "737" },
  { ship: "3812", type: "737" },
  { ship: "3813", type: "737" },
  { ship: "3814", type: "737" },
  { ship: "3815", type: "737" },
  { ship: "3816", type: "737" },
  { ship: "3817", type: "737" },
  { ship: "3818", type: "737" },
  { ship: "3819", type: "737" },
  { ship: "3820", type: "737" },
  { ship: "3821", type: "737" },
  { ship: "3822", type: "737" },
  { ship: "3823", type: "737" },
  { ship: "3824", type: "737" },
  { ship: "3825", type: "737" },
  { ship: "3826", type: "737" },
  { ship: "3827", type: "737" },
  { ship: "3828", type: "737" },
  { ship: "3829", type: "737" },
  { ship: "3830", type: "737" },
  { ship: "3831", type: "737" },
  { ship: "3832", type: "737" },
  { ship: "3833", type: "737" },
  { ship: "3834", type: "737" },
  { ship: "3835", type: "737" },
  { ship: "3836", type: "737" },
  { ship: "3837", type: "737" },
  { ship: "3838", type: "737" },
  { ship: "3839", type: "737" },
  { ship: "3840", type: "737" },
  { ship: "3841", type: "737" },
  { ship: "3842", type: "737" },
  { ship: "3843", type: "737" },
  { ship: "3844", type: "737" },
  { ship: "3845", type: "737" },
  { ship: "3846", type: "737" },
  { ship: "3847", type: "737" },
  { ship: "3848", type: "737" },
  { ship: "3849", type: "737" },
  { ship: "3850", type: "737" },
  { ship: "3851", type: "737" },
  { ship: "3852", type: "737" },
  { ship: "3853", type: "737" },
  { ship: "3854", type: "737" },
  { ship: "3855", type: "737" },
  { ship: "3856", type: "737" },
  { ship: "3857", type: "737" },
  { ship: "3858", type: "737" },
  { ship: "3859", type: "737" },
  { ship: "3860", type: "737" },
  { ship: "3861", type: "737" },
  { ship: "3862", type: "737" },
  { ship: "3863", type: "737" },
  { ship: "3864", type: "737" },
  { ship: "3865", type: "737" },
  { ship: "3866", type: "737" },
  { ship: "3867", type: "737" },
  { ship: "3868", type: "737" },
  { ship: "3869", type: "737" },
  { ship: "3870", type: "737" },
  { ship: "3871", type: "737" },
  { ship: "3872", type: "737" },
  { ship: "3873", type: "737" },
  { ship: "3874", type: "737" },
  { ship: "3875", type: "737" },
  { ship: "3876", type: "737" },
  { ship: "3877", type: "737" },
  { ship: "3878", type: "737" },
  { ship: "3879", type: "737" },
  { ship: "3880", type: "737" },
  { ship: "3881", type: "737" },
  { ship: "3882", type: "737" },
  { ship: "3883", type: "737" },
  { ship: "3884", type: "737" },
  { ship: "3885", type: "737" },
  { ship: "3886", type: "737" },
  { ship: "3887", type: "737" },
  { ship: "3888", type: "737" },
  { ship: "3889", type: "737" },
  { ship: "3890", type: "737" },
  { ship: "3891", type: "737" },
  { ship: "3892", type: "737" },
  { ship: "3893", type: "737" },
  { ship: "3894", type: "737" },
  { ship: "3895", type: "737" },
  { ship: "3896", type: "737" },
  { ship: "3897", type: "737" },
  { ship: "3898", type: "737" },
  { ship: "3899", type: "737" },
  { ship: "3900", type: "737" },
  { ship: "3901", type: "737" },
  { ship: "3902", type: "737" },
  { ship: "3903", type: "737" },
  { ship: "3904", type: "737" },
  { ship: "3905", type: "737" },
  { ship: "3906", type: "737" },
  { ship: "3907", type: "737" },
  { ship: "3908", type: "737" },
  { ship: "3909", type: "737" },
  { ship: "3910", type: "737" },
  { ship: "3911", type: "737" },
  { ship: "3912", type: "737" },
  { ship: "3913", type: "737" },
  { ship: "3914", type: "737" },
  { ship: "3915", type: "737" },
  { ship: "3916", type: "737" },
  { ship: "3917", type: "737" },
  { ship: "3918", type: "737" },
  { ship: "3919", type: "737" },
  { ship: "3920", type: "737" },
  { ship: "3921", type: "737" },
  { ship: "3922", type: "737" },
  { ship: "3923", type: "737" },
  { ship: "3924", type: "737" },
  { ship: "3925", type: "737" },
  { ship: "3926", type: "737" },
  { ship: "3927", type: "737" },
  { ship: "3928", type: "737" },
  { ship: "3929", type: "737" },
  { ship: "3930", type: "737" },
  { ship: "3931", type: "737" },
  { ship: "3932", type: "737" },
  { ship: "3933", type: "737" },
  { ship: "3934", type: "737" },
  { ship: "3935", type: "737" },
  { ship: "3936", type: "737" },
  { ship: "3937", type: "737" },
  { ship: "3938", type: "737" },
  { ship: "3939", type: "737" },
  { ship: "3940", type: "737" },
  { ship: "3941", type: "737" },
  { ship: "3942", type: "737" },
  { ship: "3943", type: "737" },
  { ship: "3944", type: "737" },
  { ship: "3945", type: "737" },
  { ship: "3946", type: "737" },
  { ship: "3947", type: "737" },
  { ship: "3948", type: "737" },
  { ship: "3949", type: "737" },
  { ship: "3950", type: "737" },
  { ship: "3951", type: "737" },
  { ship: "3952", type: "737" },
  { ship: "3953", type: "737" },
  { ship: "3954", type: "737" },
  { ship: "3955", type: "737" },
  { ship: "3956", type: "737" },
  { ship: "3957", type: "737" },
  { ship: "3958", type: "737" },
  { ship: "3959", type: "737" },
  { ship: "3960", type: "737" },
  { ship: "3961", type: "737" },
  { ship: "3962", type: "737" },
  { ship: "3963", type: "737" },
  // 757
  { ship: "1307", type: "757" },
  { ship: "5639", type: "757" },
  { ship: "5640", type: "757" },
  { ship: "5641", type: "757" },
  { ship: "5642", type: "757" },
  { ship: "5643", type: "757" },
  { ship: "5644", type: "757" },
  { ship: "5645", type: "757" },
  { ship: "5647", type: "757" },
  { ship: "5648", type: "757" },
  { ship: "5649", type: "757" },
  { ship: "5650", type: "757" },
  { ship: "5651", type: "757" },
  { ship: "5652", type: "757" },
  { ship: "5653", type: "757" },
  { ship: "5654", type: "757" },
  { ship: "5655", type: "757" },
  { ship: "5656", type: "757" },
  { ship: "5657", type: "757" },
  { ship: "5801", type: "757" },
  { ship: "5802", type: "757" },
  { ship: "5803", type: "757" },
  { ship: "5804", type: "757" },
  { ship: "5805", type: "757" },
  { ship: "5806", type: "757" },
  { ship: "5807", type: "757" },
  { ship: "5808", type: "757" },
  { ship: "5809", type: "757" },
  { ship: "5810", type: "757" },
  { ship: "5811", type: "757" },
  { ship: "5812", type: "757" },
  { ship: "5813", type: "757" },
  { ship: "5814", type: "757" },
  { ship: "5815", type: "757" },
  { ship: "5816", type: "757" },
  { ship: "649", type: "757" },
  { ship: "650", type: "757" },
  { ship: "651", type: "757" },
  { ship: "652", type: "757" },
  { ship: "654", type: "757" },
  { ship: "655", type: "757" },
  { ship: "658", type: "757" },
  { ship: "659", type: "757" },
  { ship: "660", type: "757" },
  { ship: "661", type: "757" },
  { ship: "662", type: "757" },
  { ship: "663", type: "757" },
  { ship: "664", type: "757" },
  { ship: "666", type: "757" },
  { ship: "668", type: "757" },
  { ship: "669", type: "757" },
  { ship: "6700", type: "757" },
  { ship: "6701", type: "757" },
  { ship: "6702", type: "757" },
  { ship: "6703", type: "757" },
  { ship: "6704", type: "757" },
  { ship: "6705", type: "757" },
  { ship: "6706", type: "757" },
  { ship: "6707", type: "757" },
  { ship: "6708", type: "757" },
  { ship: "6709", type: "757" },
  { ship: "6710", type: "757" },
  { ship: "6711", type: "757" },
  { ship: "6712", type: "757" },
  { ship: "6713", type: "757" },
  { ship: "6714", type: "757" },
  { ship: "6715", type: "757" },
  { ship: "6716", type: "757" },
  { ship: "6717", type: "757" },
  { ship: "672", type: "757" },
  { ship: "678", type: "757" },
  { ship: "6804", type: "757" },
  { ship: "6805", type: "757" },
  { ship: "6806", type: "757" },
  { ship: "6807", type: "757" },
  { ship: "6808", type: "757" },
  { ship: "6809", type: "757" },
  { ship: "6810", type: "757" },
  { ship: "6811", type: "757" },
  { ship: "6812", type: "757" },
  { ship: "6813", type: "757" },
  { ship: "6814", type: "757" },
  { ship: "6815", type: "757" },
  { ship: "6816", type: "757" },
  { ship: "6817", type: "757" },
  { ship: "6819", type: "757" },
  { ship: "682", type: "757" },
  { ship: "6820", type: "757" },
  { ship: "6821", type: "757" },
  { ship: "6822", type: "757" },
  { ship: "6823", type: "757" },
  { ship: "683", type: "757" },
  { ship: "684", type: "757" },
  { ship: "685", type: "757" },
  { ship: "686", type: "757" },
  { ship: "687", type: "757" },
  { ship: "688", type: "757" },
  { ship: "689", type: "757" },
  { ship: "690", type: "757" },
  { ship: "691", type: "757" },
  { ship: "692", type: "757" },
  { ship: "693", type: "757" },
  { ship: "694", type: "757" },
  { ship: "695", type: "757" },
  { ship: "696", type: "757" },
  { ship: "697", type: "757" },
  { ship: "698", type: "757" },
  { ship: "699", type: "757" },
  // 767
  { ship: "1200", type: "767" },
  { ship: "1201", type: "767" },
  { ship: "1601", type: "767" },
  { ship: "1602", type: "767" },
  { ship: "1603", type: "767" },
  { ship: "1604", type: "767" },
  { ship: "1605", type: "767" },
  { ship: "1606", type: "767" },
  { ship: "1701", type: "767" },
  { ship: "1702", type: "767" },
  { ship: "1703", type: "767" },
  { ship: "1704", type: "767" },
  { ship: "1705", type: "767" },
  { ship: "1706", type: "767" },
  { ship: "1707", type: "767" },
  { ship: "1708", type: "767" },
  { ship: "171", type: "767" },
  { ship: "172", type: "767" },
  { ship: "174", type: "767" },
  { ship: "175", type: "767" },
  { ship: "177", type: "767" },
  { ship: "178", type: "767" },
  { ship: "179", type: "767" },
  { ship: "180", type: "767" },
  { ship: "1801", type: "767" },
  { ship: "1802", type: "767" },
  { ship: "1803", type: "767" },
  { ship: "1804", type: "767" },
  { ship: "1805", type: "767" },
  { ship: "1806", type: "767" },
  { ship: "1807", type: "767" },
  { ship: "1808", type: "767" },
  { ship: "1809", type: "767" },
  { ship: "1810", type: "767" },
  { ship: "1811", type: "767" },
  { ship: "1812", type: "767" },
  { ship: "1813", type: "767" },
  { ship: "1814", type: "767" },
  { ship: "1815", type: "767" },
  { ship: "1816", type: "767" },
  { ship: "1817", type: "767" },
  { ship: "1818", type: "767" },
  { ship: "1819", type: "767" },
  { ship: "1820", type: "767" },
  { ship: "1821", type: "767" },
  { ship: "185", type: "767" },
  { ship: "186", type: "767" },
  { ship: "187", type: "767" },
  { ship: "188", type: "767" },
  { ship: "189", type: "767" },
  { ship: "190", type: "767" },
  { ship: "191", type: "767" },
  { ship: "192", type: "767" },
  { ship: "193", type: "767" },
  { ship: "194", type: "767" },
  { ship: "195", type: "767" },
  { ship: "196", type: "767" },
  { ship: "197", type: "767" },
  { ship: "198", type: "767" },
  { ship: "199", type: "767" },
];

// Get all unique aircraft types for distractor generation
const ALL_TYPES = [...new Set(FLEET_DATA.map(d => d.type))];

// ── Difficulty Levels ──────────────────────────
const LEVELS = [
  { name: "EASY",    timer: 15, scoreMultiplier: 1,   altitudeGain: 12, altitudeLoss: 15 },
  { name: "MEDIUM",  timer: 12, scoreMultiplier: 1.5, altitudeGain: 10, altitudeLoss: 18 },
  { name: "HARD",    timer: 9,  scoreMultiplier: 2,   altitudeGain: 8,  altitudeLoss: 22 },
  { name: "EXTREME", timer: 6,  scoreMultiplier: 3,   altitudeGain: 6,  altitudeLoss: 28 },
  { name: "INSANE",  timer: 5,  scoreMultiplier: 4,   altitudeGain: 5,  altitudeLoss: 30 },
  { name: "LEGEND",  timer: 4,  scoreMultiplier: 5,   altitudeGain: 4,  altitudeLoss: 32 },
  { name: "GOD MODE",timer: 3,  scoreMultiplier: 6,   altitudeGain: 3,  altitudeLoss: 35 },
];

// ── DOM References ─────────────────────────────
const $ = id => document.getElementById(id);

const DOM = {
  sky:              $("sky"),
  plane:            $("plane"),
  exhaust:          $("exhaust"),
  particles:        $("particles"),
  stars:            $("stars"),

  startScreen:      $("start-screen"),
  startHighscore:   $("start-highscore"),
  startFleetCount:  $("start-fleet-count"),
  btnStart:         $("btn-start"),

  gameHud:          $("game-hud"),
  hudScore:         $("hud-score"),
  hudLevel:         $("hud-level"),
  hudStreak:        $("hud-streak"),
  altitudeBar:      $("altitude-bar"),
  altitudeValue:    $("altitude-value"),
  timerContainer:   $("timer-container"),
  timerRing:        $("timer-ring"),
  timerText:        $("timer-text"),

  questionPanel:    $("question-panel"),
  questionNumber:   $("question-number"),
  questionDifficulty: $("question-difficulty"),
  shipNumber:       $("ship-number"),
  answersGrid:      $("answers-grid"),
  questionFeedback: $("question-feedback"),
  feedbackIcon:     $("feedback-icon"),
  feedbackText:     $("feedback-text"),

  gameoverScreen:   $("gameover-screen"),
  goScore:          $("go-score"),
  goQuestions:      $("go-questions"),
  goStreak:         $("go-streak"),
  goLevel:          $("go-level"),
  goHighscore:      $("go-highscore"),
  btnRestart:       $("btn-restart"),
};

// ── Game State ─────────────────────────────────
let state = {};

function resetState() {
  state = {
    score: 0,
    altitude: 75,          // 0-100, start at 75%
    level: 0,              // index into LEVELS
    streak: 0,
    bestStreak: 0,
    questionIndex: 0,
    totalCorrect: 0,
    totalAsked: 0,
    correctForLevel: 0,    // correct answers in current level
    isPlaying: false,
    timerInterval: null,
    timeLeft: 0,
    answered: false,
    usedShips: [],          // track used ship indices to avoid repeats
    exhaustInterval: null,
  };
}

// ── High Score ──────────────────────────────────
function getHighScore() {
  return parseInt(localStorage.getItem("deltaFleetQuiz_highScore") || "0", 10);
}

function setHighScore(s) {
  localStorage.setItem("deltaFleetQuiz_highScore", String(s));
}

// ── Stars Generation ────────────────────────────
function generateStars() {
  DOM.stars.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 70 + "%";
    star.style.setProperty("--dur", (1.5 + Math.random() * 3) + "s");
    star.style.animationDelay = (Math.random() * 3) + "s";
    DOM.stars.appendChild(star);
  }
}

// ── Exhaust Particles ───────────────────────────
function startExhaust() {
  state.exhaustInterval = setInterval(() => {
    if (!state.isPlaying) return;
    const p = document.createElement("div");
    p.className = "exhaust-particle";
    p.style.top = (Math.random() * 6 - 3) + "px";
    DOM.exhaust.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }, 120);
}

function stopExhaust() {
  if (state.exhaustInterval) {
    clearInterval(state.exhaustInterval);
    state.exhaustInterval = null;
  }
}

// ── Score Particles ────────────────────────────
function spawnScoreParticle(text, isPositive) {
  const el = document.createElement("div");
  el.className = `score-particle ${isPositive ? "positive" : "negative"}`;
  el.textContent = text;
  el.style.left = "50%";
  el.style.top = "45%";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ── Update UI ──────────────────────────────────
function updateHud() {
  DOM.hudScore.textContent = state.score;
  DOM.hudLevel.textContent = state.level + 1;
  DOM.hudStreak.textContent = state.streak + " 🔥";
  updateAltitude();
}

function updateAltitude() {
  const alt = Math.max(0, Math.min(100, state.altitude));
  DOM.altitudeBar.style.height = alt + "%";
  DOM.altitudeValue.textContent = Math.round(alt) + "%";

  // Color shift
  if (alt > 60) {
    DOM.altitudeValue.style.color = "var(--success)";
  } else if (alt > 30) {
    DOM.altitudeValue.style.color = "var(--warning)";
  } else {
    DOM.altitudeValue.style.color = "var(--danger)";
  }

  // Move plane vertically based on altitude
  const topPos = 70 - (alt * 0.55); // range: 15% to 70%
  DOM.plane.style.top = topPos + "%";
}

function updateSkyTheme() {
  DOM.sky.className = `sky-level-${Math.min(state.level + 1, 7)}`;
}

// ── Timer ───────────────────────────────────────
const TIMER_CIRCUMFERENCE = 2 * Math.PI * 34; // r=34

function startTimer() {
  const level = LEVELS[state.level];
  state.timeLeft = level.timer;
  DOM.timerText.textContent = state.timeLeft;
  DOM.timerRing.style.strokeDasharray = TIMER_CIRCUMFERENCE;
  DOM.timerRing.style.strokeDashoffset = 0;
  DOM.timerContainer.classList.remove("urgent");

  state.timerInterval = setInterval(() => {
    state.timeLeft -= 1;
    if (state.timeLeft < 0) state.timeLeft = 0;

    DOM.timerText.textContent = Math.ceil(state.timeLeft);

    // Update ring
    const progress = 1 - (state.timeLeft / level.timer);
    DOM.timerRing.style.strokeDashoffset = TIMER_CIRCUMFERENCE * progress;

    // Urgent state
    if (state.timeLeft <= 3) {
      DOM.timerContainer.classList.add("urgent");
    }

    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      if (!state.answered) {
        handleTimeout();
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
}

// ── Question Generation ────────────────────────
function getRandomQuestion() {
  // Pick a random fleet entry we haven't used recently
  let available = FLEET_DATA.map((_, i) => i).filter(i => !state.usedShips.includes(i));
  if (available.length === 0) {
    state.usedShips = [];
    available = FLEET_DATA.map((_, i) => i);
  }

  const idx = available[Math.floor(Math.random() * available.length)];
  state.usedShips.push(idx);
  if (state.usedShips.length > Math.floor(FLEET_DATA.length * 0.7)) {
    state.usedShips.shift();
  }

  const correct = FLEET_DATA[idx];

  // Generate 3 wrong answers (different types)
  const wrongTypes = ALL_TYPES.filter(t => t !== correct.type);
  shuffleArray(wrongTypes);
  const distractors = wrongTypes.slice(0, 3);

  // All choices
  const choices = [correct.type, ...distractors];
  shuffleArray(choices);

  return {
    ship: correct.ship,
    correctType: correct.type,
    choices,
  };
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ── Show Question ──────────────────────────────
function showQuestion() {
  state.answered = false;
  state.totalAsked++;

  const q = getRandomQuestion();
  state.currentQuestion = q;

  DOM.questionNumber.textContent = `Q${state.totalAsked}`;
  const level = LEVELS[state.level];
  DOM.questionDifficulty.textContent = level.name;
  DOM.questionDifficulty.className = `question-difficulty ${level.name.toLowerCase()}`;
  DOM.shipNumber.textContent = `SHIP ${q.ship}`;

  // Clear feedback
  DOM.questionFeedback.classList.add("hidden");
  DOM.questionFeedback.className = "question-feedback hidden";

  // Build answer buttons
  DOM.answersGrid.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.id = `answer-btn-${i}`;
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(choice, btn));
    DOM.answersGrid.appendChild(btn);
  });

  // Show panel with animation
  DOM.questionPanel.classList.remove("hidden");

  // Re-trigger card animation
  const card = DOM.questionPanel.querySelector(".question-card");
  card.style.animation = "none";
  card.offsetHeight; // force reflow
  card.style.animation = "";

  startTimer();
}

// ── Handle Answer ──────────────────────────────
function handleAnswer(choice, btn) {
  if (state.answered || !state.isPlaying) return;
  state.answered = true;
  stopTimer();

  const isCorrect = choice === state.currentQuestion.correctType;
  const level = LEVELS[state.level];

  // Disable all buttons
  document.querySelectorAll(".answer-btn").forEach(b => b.classList.add("disabled"));

  // Highlight correct answer
  document.querySelectorAll(".answer-btn").forEach(b => {
    if (b.textContent === state.currentQuestion.correctType) {
      b.classList.add("correct");
    }
  });

  if (isCorrect) {
    // Correct!
    const timeBonus = Math.round(state.timeLeft * 2);
    const points = Math.round((100 + timeBonus) * level.scoreMultiplier);
    state.score += points;
    state.totalCorrect++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.correctForLevel++;

    // Altitude boost
    state.altitude = Math.min(100, state.altitude + level.altitudeGain);

    // Plane animation
    DOM.plane.classList.remove("boost", "drop");
    void DOM.plane.offsetWidth;
    DOM.plane.classList.add("boost");

    // Feedback
    DOM.questionFeedback.classList.remove("hidden");
    DOM.questionFeedback.className = "question-feedback correct-feedback";
    DOM.feedbackIcon.textContent = "✅";
    DOM.feedbackText.textContent = `+${points} points!`;

    spawnScoreParticle(`+${points}`, true);

    // Level up check
    if (state.correctForLevel >= 5 && state.level < LEVELS.length - 1) {
      state.level++;
      state.correctForLevel = 0;
      updateSkyTheme();

      setTimeout(() => {
        spawnScoreParticle("⬆ LEVEL UP!", true);
      }, 400);
    }
  } else {
    // Wrong!
    btn.classList.add("wrong");
    state.streak = 0;

    // Altitude loss
    state.altitude -= level.altitudeLoss;

    // Plane animation
    DOM.plane.classList.remove("boost", "drop");
    void DOM.plane.offsetWidth;
    DOM.plane.classList.add("drop");

    // Feedback
    DOM.questionFeedback.classList.remove("hidden");
    DOM.questionFeedback.className = "question-feedback wrong-feedback";
    DOM.feedbackIcon.textContent = "❌";
    DOM.feedbackText.textContent = `Correct: ${state.currentQuestion.correctType}`;

    spawnScoreParticle("-ALT", false);
  }

  updateHud();

  // Check for game over
  if (state.altitude <= 0) {
    setTimeout(() => gameOver(), 1200);
    return;
  }

  // Next question after delay
  setTimeout(() => {
    if (state.isPlaying) {
      showQuestion();
    }
  }, 1800);
}

// ── Handle Timeout ─────────────────────────────
function handleTimeout() {
  if (state.answered) return;
  state.answered = true;

  const level = LEVELS[state.level];
  state.streak = 0;
  state.altitude -= level.altitudeLoss;

  // Disable all buttons
  document.querySelectorAll(".answer-btn").forEach(b => {
    b.classList.add("disabled");
    if (b.textContent === state.currentQuestion.correctType) {
      b.classList.add("correct");
    }
  });

  // Plane drop
  DOM.plane.classList.remove("boost", "drop");
  void DOM.plane.offsetWidth;
  DOM.plane.classList.add("drop");

  // Feedback
  DOM.questionFeedback.classList.remove("hidden");
  DOM.questionFeedback.className = "question-feedback wrong-feedback";
  DOM.feedbackIcon.textContent = "⏱️";
  DOM.feedbackText.textContent = `Time's up! Answer: ${state.currentQuestion.correctType}`;

  spawnScoreParticle("TIME OUT", false);
  updateHud();

  if (state.altitude <= 0) {
    setTimeout(() => gameOver(), 1200);
    return;
  }

  setTimeout(() => {
    if (state.isPlaying) {
      showQuestion();
    }
  }, 2000);
}

// ── Game Over ──────────────────────────────────
function gameOver() {
  state.isPlaying = false;
  stopTimer();
  stopExhaust();

  // Crash animation
  DOM.plane.classList.remove("boost", "drop");
  DOM.plane.classList.add("crash");

  // Hide game UI
  DOM.questionPanel.classList.add("hidden");
  DOM.gameHud.classList.add("hidden");

  // Update high score
  const hs = getHighScore();
  if (state.score > hs) {
    setHighScore(state.score);
  }

  // Show game over screen
  setTimeout(() => {
    DOM.goScore.textContent = state.score;
    DOM.goQuestions.textContent = `${state.totalCorrect} / ${state.totalAsked}`;
    DOM.goStreak.textContent = state.bestStreak;
    DOM.goLevel.textContent = state.level + 1;
    DOM.goHighscore.textContent = Math.max(state.score, hs);
    DOM.gameoverScreen.classList.add("active");
  }, 1000);
}

// ── Start Game ─────────────────────────────────
function startGame() {
  resetState();
  state.isPlaying = true;

  // Reset plane
  DOM.plane.classList.remove("crash", "boost", "drop");
  DOM.plane.style.top = "40%";

  // Show/hide screens
  DOM.startScreen.classList.remove("active");
  DOM.gameoverScreen.classList.remove("active");
  DOM.gameHud.classList.remove("hidden");

  updateSkyTheme();
  updateHud();
  startExhaust();

  // First question after brief delay
  setTimeout(() => showQuestion(), 800);
}

// ── Initialization ─────────────────────────────
function init() {
  generateStars();

  // Display high score & fleet count on start screen
  DOM.startHighscore.textContent = `High Score: ${getHighScore()}`;
  DOM.startFleetCount.textContent = `Fleet Size: ${FLEET_DATA.length} aircraft`;

  // Event listeners
  DOM.btnStart.addEventListener("click", startGame);
  DOM.btnRestart.addEventListener("click", () => {
    DOM.gameoverScreen.classList.remove("active");
    startGame();
  });

  // Keyboard support (1-4 for answers)
  document.addEventListener("keydown", (e) => {
    if (!state.isPlaying || state.answered) return;
    const key = parseInt(e.key);
    if (key >= 1 && key <= 4) {
      const btn = document.getElementById(`answer-btn-${key - 1}`);
      if (btn && !btn.classList.contains("disabled")) {
        btn.click();
      }
    }
  });
}

// Start when DOM is ready
document.addEventListener("DOMContentLoaded", init);
