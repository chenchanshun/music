module.exports={
    plugins:{
        autoprefixer:{},
        "postcss-pxtorem": {
            rootValue: 100, // 根元素字体大小
            propList: ['*'] // 可以从px更改到rem的属性
            // propList: ["height"]
        }

    },
}