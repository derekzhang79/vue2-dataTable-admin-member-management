<template lang="html">
   <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-bar">
                <div>创建服务</div>
            </div>
            <!--  -->
            <div id="coupon_message">
                <div class="build_coupon">
                    <div class="alreadyuse">
                        <div class="stamp row">
                            <div class="par par_use col-xs-6">
                                <img src="../../assets/images/service.png" alt="">
                            </div>
                            <div class="use col-xs-6">
                                <ul class="serviceinfo">    
                                    <li>{{service_title}}小快 </li>
                                    <li>{{service_type}}计次</li>
                                    <li>100元/次</li>
                                </ul>
                            </div>
                        </div>
                        <div class="service_preview">切换至详情信息预览</div>
                    </div>
                </div>
                <div class="build_preview">
                    <div class="preview_details">
                        <!--  -->
                        <div class="preview_info">
                            <div class="preview_content">
                                <div class="preview_head">E</div>
                                <ul>
                                    <li>小小英语课程</li>
                                    <li>服务类型 : 计次消费</li>
                                    <li>服务费用 : 100元/10次</li>
                                    <li>原价积分兑换 : 10000积分</li>
                                    <li>促销价积分兑换 : 5000积分</li>
                                    <li>再次订阅</li>
                                    <li>服务生效日 : 购买日起</li>
                                    <li>服务失效日 : 购买日起的两个月</li>
                                    <li>&nbsp;</li>
                                </ul>
                                <div></div>
                            </div>
                            <div class="preview_show">更多展示</div>
                            <div class="preview_explain">
                                <img src="../../assets/images/subject.png" alt="">
                                <div class="preview_description">的的的的的的的的的 的的的的的的的的的的的的的的 的的的的的的的</div>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                   
                </div>
                <!--  -->
                <div class="row records">
                    <div class="col-lg-12 col-md-12 col-sm-24 col-xs-48 ">
                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 operating_history">基本信息</div>
                    </div>
                </div>
                <div class="row setting">
                    <div class="col-lg-12 col-md-12 col-sm-24 col-xs-48 setting_info"></div>
                    <form action="" method="" class="">
                        <label>
                            <span class="validity">商户 :</span>
                            <img src="http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/01/xk_logo.png" class="merchant">
                            <span>墨嘉</span>
                        </label>
                        <label>
                            <span class="validity">服务名称 :</span>
                            <div class="validitytype">
                                <input v-model="service_title" type="text" name="" placeholder="" maxlength="8" />
                                <div class="explain"> 填写服务名称</div>
                            </div>
                        </label>
                        <label>
                            <span class="validity">头像 :</span>
                            <!-- <input type="file"> -->
                            <img src="" alt="" class="merchant">
                            <a href="">点击上传</a>
                        </label>
                        <label>
                            <span class="validity">类型 :</span>
                            <select  v-model="service_type">
                                <option value="计次消费">计次</option>
                                <option value="计时消费">计时</option>
                            </select>
                        </label>
                        <label>
                            <span class="validity">费用次数 :</span>
                            <input  type="text" name=""  placeholder="" />元
                            <input  type="text" name=""  placeholder="" />次
                        </label>
                    </form>
                </div>
                <!--  -->
                <div class="row records">
                    <div class="col-lg-12 col-md-12 col-sm-24 col-xs-48 ">
                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 operating_history">详细信息</div>
                    </div>
                </div>
                <div class="row setting">
                    <div class="col-lg-12 col-md-12 col-sm-24 col-xs-48 setting_info"></div>
                    <form action="" method="" class="">
                        <label>
                            <span class="validity">背景色 :</span>
                            <input id="full" type="text"/>
                        </label>
                        <label>
                            <span class="validity">服务原价 :</span>
                            <div class="validitytype">
                                <input type="number" name="" placeholder="" maxlength="8" />元
                                <div class="explain"> 可不填</div>
                            </div>
                        </label>
                        <label>
                            <span class="validity">促销价 :</span>
                            <div class="validitytype">
                                <input type="number" name="" placeholder="" maxlength="8" />元
                                <div class="explain"> 可不填</div>
                            </div>
                        </label>
                        <label>
                            <span class="validity">生效日期 :</span>
                            <span class="effect">购买即生效</span>
                        </label>
                        <label>
                            <span class="validity"> 有效期 :</span>
                            <div class="validitytype">
                                <label class="mt-radio">
                                    <input type="radio" name="timeRadios" id="optionsRadios1" value="option1" > 用完失效
                                    <span></span>
                                </label>
                                <br>
                                <label class="mt-radio">
                                    <input type="radio" name="timeRadios" id="optionsRadios2" value="option1" > 购买后,
                                    <span></span>
                                </label>
                                <select name="" id=""></select>失效
                            </div>
                        </label>
                        <label>
                            <span class="validity">详情图文 :</span>
                            <div class="validitytype">
                                <span class="effect">图片建议尺寸 : 600像素 * 500像素,大小不超过2M。可以只添加图片或文字</span>
                                <div class="graphic">
                                    <img src="" alt="">
                                    <textarea name="" id="" cols="36" rows="5" maxlength="100">
                                        
                                    </textarea>
                                    <!-- <img src="" id="file0"> -->
                                    <textarea name="" id="" cols="36" rows="5" maxlength="100">
                                        
                                    </textarea>
                                    <div>
                                        <a href="javascript:;" class="a-upload">
                                            <!-- <input type="file" id="file0">添加一组 -->
                                            <!-- <input type="file" name="file0" id="file0" multiple="multiple" /> -->
                                        </a> 
                                    </div>
                                   
                                </div>
                            </div>
                        </label>
                    </form>
                </div>
                <!--  -->
            </div>
            <!--  -->
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
   jQuery(function(){
        window.onload = function()
        {
            var $li = $('#tab li');
            var $ul = $('#content ul');
            $li.click(function(){
                var $this = $(this);
                var $t = $this.index();
                $li.removeClass();
                $this.addClass('current');
                $ul.css('display','none');
                $ul.eq($t).css('display','block');
            })
        }
    });
    //设置信息预览 
    var coupon_message = new Vue({
        el:"#coupon_message",
        data: {
            service_title: '',
            service_type : ''
           
        }
    })
    // 修改预览卡片背景色  
    jQuery(function(){
        var changeBgcolor = null;
        jQuery('#full').change(function(){
            changeBgcolor=jQuery('.sp-preview-inner').css('background-color');
            // console.log(changeBgcolor);
        })
        jQuery('.service_preview').click(function(){
            jQuery('.build_preview').show();
            jQuery('.preview_info ').css('background-color',changeBgcolor);
        })
        
    })
  }
}
</script>

<style lang="css" scoped>
   /*中间部分样式*/
    .build_coupon{
        background:#eee;
        height:3rem;
        margin:0.7rem 0 0.2rem 0;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .build_preview{
        display:none;
    }
    .preview_details{
        background:#eee;
        margin:0.7rem 0 0.2rem 0;
        display:none;
        display:flex;
        justify-content:center;
        align-items: center;
    }
    .preview_info{
        width:400px;
        background-color: rgb(238, 204, 204);
    }
    .preview_content{
        width:300px;
        margin: 40px auto 0 auto;
        background: #fff;
    }
  
    .preview_content ul{
        text-align: center;
        margin-top:-16px;
    }
    .preview_content ul li:nth-child(1){
        font-size:18px;
        font-weight:bold;
    }
    .preview_content ul li:nth-child(6){
        width: 150px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        background-color: rgb(238, 204, 204);
        margin: 10px auto;
        font-size:16px;
    }
    .preview_head{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(238, 204, 204);
        margin: auto;
        position: relative;
        top: -25px;
        border: 1px solid #fff;
        display: flex;
        align-items: center;
        font-size:38px;
        font-style: oblique;
        color:#fff;
        padding-left:8px;
    }
    .preview_show{
        text-align: center;
        font-size:16px;
        color:#fff;
        margin:10px;
    }
    .preview_explain{
        width:300px;
        margin: 0 auto;
        background: #fff;
        margin-bottom:20px;
    }
    .preview_explain img{
        width:300px;
        height:200px;
    }
    .preview_description{
        padding-bottom:20px;
    }
    /*优惠券格式*/
    /*优惠券*/
    /*已使用*/
    .alreadyuse{
        /*background:#fff;*/
        width:100%;
        position:relative;
    }
    .service_preview{
        text-decoration: underline;
        color: #E94C3B;
        position:absolute;
        top:48%;
        right:10%;
    }
    .stamp{
        width:400px;
        height:130px;
        margin:0 auto;
        background: #fff;
    }
    .par{
        width:130px;
        height:130px;
        text-align:center;
        color:white;
        padding:0;
        display:flex;
        justify-content: center;
        align-items:center;
    }
    .sign{
        font-size: 22px;
    }
    .par span{
        font-size:36px;
    }
    .par img{
        width:80px;
        height:80px;
    }
    .copy{
        display:inline-block;
    }
    .limit{
        margin-top:26px;
    }
    .use{
        width:270px;
        height:130px;
        color:#9A9A9A;
        padding:0;
        display:flex;
        align-items:center;
    }
    .serviceinfo{
        margin:0;
    }
    .serviceinfo li{
        font-size:14px;
    }
    .serviceinfo li:nth-child(1){
        font-size:26px;
        color:#000;
    }
    .usetype{
        position:absolute;
        top:1.4rem;
        width:92%;
        height:0.6rem;
    }
    .date{
        position: absolute;
        bottom: 0;
        color: #D6D6D6;
        display: inline-block;
        padding: 0;
        margin: 0
    }
    .immediatelyuse{
        background-color: #F8908F;
        color: white;
        position: absolute;
        right: 0;
        bottom:0;
        font-size: 12px;
        line-height: 0.5rem;
        width: 28%;
        text-align: center;
        border-radius:2px;
        display:inline-block;

    }
    .line{
        border: 1px dotted #E9E9E9;
        position: absolute;
        top: 2rem;
        left: 0;
        width: 100%;
    }
    .publicnumber{
        position: absolute;
        top: 2.1rem;
        padding: 0;
        color: #D6D6D6;
    }
    /**/
    .records{
        background: #eee;
        height: 1rem;
        margin:0.5rem 0 0.2rem 0;
    }
     .operating_history{
        line-height: 0.4rem;
        padding: 0;
        margin-top: 0.3rem;
        font-size: 15px;
        font-weight: bold;
    }
    .setting{
        background:#fff;
        margin:0;
        border:1px solid #eee;
    }
    .setting_info{
        background:#eee;
        height:0.5rem;
    }
    /**/
    form{
        margin-left:auto;
        margin-right:auto;
        max-width:500px;
        background: #fff;
        padding: 20px 20px 20px 20px;
        font: 12px Arial, Helvetica, sans-serif;
        margin-top:20px;
    }
    label{
        display: block;
        margin: 0px 0px 20px;
    }
    .merchant{
        width:33px;
        height:33px;
    }
    /*用户信息左边*/
    .validity{
        float: left;
        width: 150px;
        text-align: right;
        padding-right: 30px;
        margin-top: 10px;
        font-weight: bold;
    }
    /*用户信息右边*/
   .validitytype{
        display:inline-block;
        width:300px;
    }
    .validitytype>a{
        margin-left:30px;
        text-decoration:underline; 
    }
    input[type="text"], input[type="number"],select {
        color: #888;
        width: 120px;
        padding: 0px 0px 0px 5px;
        border: 2px solid #EEE;
        /*background: #FBFBFB;*/
        outline: 0;
        font: 200 12px/25px Arial, Helvetica, sans-serif;
        height: 30px;
        line-height:15px;
        margin: 2px 6px 0px 0px;
        border-radius: 5px;
    }
    select{
        width:120px;
    }
    .explain{
        font-size:12px;
        color:#B1B1B1;
        margin-top:4px;
        font-weight: normal;
    }
    /*radio*/
   .mt-radio {
        position: relative;
        padding-left: 30px;
        padding-top:9px;
        margin-bottom: 3px;
        cursor: pointer;
        /*font-size: 14px;*/
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
    }
    .mt-checkbox, .mt-radio,.mt-checkbox,.mt-radio {
        display: inline-block;
        margin-right: 15px;
    }
    .mt-checkbox>input, .mt-radio>input {
        position: absolute;
        z-index: -1;
        opacity: 0;
        filter: alpha(opacity=0);
    }
    .mt-checkbox>span, .mt-radio>span {
        border: 1px solid #000;
        position: absolute;
        top: 7px;
        left: 0;
        height: 18px;
        width: 18px;
        /*background: #E6E6E6;*/
    }
    input[type=checkbox], input[type=radio] {
        margin: 4px 0 0;
        margin-top: 1px\9;
        line-height: normal;
    }
    .mt-radio>span {
        -ms-border-radius: 50%!important;
        -o-border-radius: 50%!important;
        border-radius: 50%!important; 
    }
    .input-icon>i, .mt-checkbox-list .mt-checkbox, .mt-checkbox-list .mt-radio, .mt-checkbox>input:checked~span:after, .mt-radio-list .mt-checkbox, .mt-radio-list .mt-radio, .mt-radio>input:checked~span:after {
        display: block;
    }
    .mt-radio>span:after {
        left: 3px;
        top: 3px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #E84C3A;
    }
    .mt-radio>span:after {
        content: '';
        position: absolute;
        display: none;
    }
    .store{
        font-size:12px;
        color:#B1B1B1;
        margin-top:3px;
        font-weight: normal;
    }
    .discount{
        width:30% !important;
    }

    form a{
        text-decoration: underline;
        color:#000;
    }
    .effect{
        display:inline-block;
        width: 300px;
        margin-top: 10px;
        font-weight: bold;
    }
   
    /*颜色选择器样式修改*/
    .sp-picker-container{
        display:none;
    }
    .sp-replacer{
        border:2px solid #eee;
        border-radius:5px;
    }
    .sp-palette-container {
        border-right: solid 1px #eee;
    }
    .sp-replacer{
        background:#fff;
    }
    .sp-replacer:hover, .sp-replacer.sp-active {
        border-color: #eee;
        color: #111;
    }
    .sp-container {
        border-radius: 0;
        background-color: #eee;
        border: solid 1px #fff;
        padding: 0;
    }
    .sp-preview{
        border:0;
    }
    /*日历插件样式修改*/
    .ta_date {
        border: 2px solid #eee;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 5px;
        background-color: #fff;
        background-image: none;
        background-image: none;
        background-image: none;
        background-image: none;
        /* background-repeat: repeat-x; */
        box-shadow:none; 
        -webkit-box-shadow:none; 
        -moz-box-shadow: none;
        /* box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); */
        /* box-shadow: 0px 1px 1px rgba(218,218,218,0.8); */
        float: none; 
        display: inline-block;
    }
    /*上传图片*/
    .graphic{
        border:1px solid #eee;
        border-radius:3px;
        width:300px;
        text-align: center;
    }
    .graphic img{
        width:270px;
        height:100px;
        margin:10px auto;
    }
    /*选择文件上传按钮*/
    /*a  upload */
    .a-upload {
        margin:0;
        position: relative;
        padding: 4px 10px;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
        color: #888;
        overflow: hidden;
        display: inline-block;
        display: inline;
        zoom: 1;

    }
    .a-upload  input {
        position: absolute;
        /*font-size: 100px;*/
        width:100%;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer
    }
    .a-upload:hover {
        color: #444;
        text-decoration: underline;
        text-decoration: none
    }
</style>
