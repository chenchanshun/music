module.exports={
    //解除报警
    lintOnSave:false,
    // 新增的一个原生的配置
    configureWebpack:{
        module:{
            //新建一个规则
            rules:[
                {
                    //但凡遇到html就使用html-loader处理
                    test:/\.(html)$/,
                    exclude:/node_modules/,
                    use:{
                        loader:"html-loader",
                        options:{
                            minimize:true
                        }
                    }
                }
            ]
        }
        
    }
   

}