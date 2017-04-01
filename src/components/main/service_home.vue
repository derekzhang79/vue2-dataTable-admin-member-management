<template lang="html">
   <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-bar">
                <div>服务管理</div>
            </div>
            <div class="search">
                <input type="text" placeholder="请输入服务编号或名称">
                <i class="iconfont icon">&#xe67a;</i>
                <span class="search_button">搜索</span>
                <span class="build">+新建服务</span>
            </div>
            <!--  -->
            <div class="row records">
                <div class="col-lg-12 col-md-12 col-sm-24 col-xs-48 ">
                    <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 operating_history">服务管理</div>
                </div>
            </div>
            <ul  class="row" style="display:block;">    
                <div class="col-md-12 col-sm-12">
                    <table id="example" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>服务编号</th>
                                <th>名称</th>
                                <th>有效日期</th>
                                <th>订阅新增</th>
                                <th>订阅总数</th>
                                <th>累计销售金额</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ul> 
            <!--  -->
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    jQuery(document).ready(function() {
        jQuery('#example').DataTable( {
            "ajax": "consumption.txt",
            "order": [[ 1, 'desc' ]],
            "pagingType": "simple_numbers",
            "language": {
                url: 'Chinese.json'
                },
            "columns": [
                { "data": "user_id" },
                { "data": "user_wxnickname" },
                { "data": "user_wxheadimgurl" },
                { "data": "grade" },
                { "data":"balance"},
                { "data":"name"},
                { "data" : "operation",
                    "render":function( data, type, full, meta) {
                        return '<div class="center">'
                                    +'<div class="operation"><a href="">详情</a></div>'
                                    +'<div class="operation"><a href="">删除</a></div>'
                                +'</div>'
                    }
                }
            ]
        });
    });
  }
}
</script>

<style lang="css" scoped>
    /*tab标签*/
    #tab {
        overflow:hidden;
        zoom:1;
    }
    #tab li {
        float:left;
        cursor:pointer; 
        line-height:0.4rem;
        padding:0 20px;
        margin-top:0.3rem;
    }
    #tab li.current {
        background: #fff;
        text-align: center;
        border-radius: 5px;
    }
    #content {
        border-top-width:0;
    }
    /**/
    .records{
        background: #eee;
        height: 1rem;
        margin:0.5rem 0 0.2rem 0;
    }
    /*datatables样式*/
    thead{
        background:#F6F6F6;
    }
    thead tr th{
        /*border:0 !important;*/
        border-bottom:0 !important;
        text-align:center;
    }
    .center{
        text-align:center;
        width:100%;
    }
    .center a{
        color:#000;
        text-decoration:underline;
    }
    .operation{
        width:50%;
        display: inline-block;
    }
    .datatables_center{
        text-align:center;
    }
    .pagination>li>a, .pagination>li>span {
        color:#777;
        border: 0;

     }
    .pagination>li:nth-child(1)>a, .pagination>li>span {
         border: 0;
     }
    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
        color: #E94C3B;
        background-color: #fff;
        border-color: #fff;
    }
    .pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover {
         color: #777; 
         background-color: #eee; 
         border-color: #eee; 
    }
    /**/
    .edit{
        position: absolute;
        background: #fff;
        right: 5.5%;
        border-radius: 5px;
        width: 4%;
        text-align: center;
    }
    /**/
    .growthgrade{
        width:100%;
        text-align:center;
    }
    .growthgrade>div{
        display:inline-block;
        margin-left:3.3%;
    }
    .growthgrade>div:nth-child(1){
        margin-left:1.2%;
    }
    /**/
    .search{
        margin-top:0.7rem;
    }
    .search input{
        width: 14%;
        height: 0.6rem;
        border:2px solid #eee;
        border-radius: 5px;
        outline: none;
        cursor:pointer;
    }
    .search i{
        color:#eee;
        position: relative;
        left: -3%;
        top: 0.06rem;
        font-size: 20px;
    }
    .operating_history{
        line-height: 0.4rem;
        padding: 0;
        margin-top: 0.3rem;
        font-size: 15px;
        font-weight: bold;
    }
    /**/
    #example_length{
        display:none;
    }
    #example_filter{
        display:none;
    }
    #service_length{
        display:none;
    }
    #service_filter{
        display:none;
    }
    #coupon_length{
        display:none;
    }
    #coupon_filter{
        display:none;
    }
    /**/
    .search_button{
        width: 50px;
        height:0.6rem;
        line-height:0.6rem;
        background: #E94C3A;
        border-radius: 5px;
        text-align: center;
        display:inline-block;
        color: #fff;
        cursor: pointer;
        margin-left:-2%;
    }
    .build{
        width: 100px;
        height:0.6rem;
        line-height:0.6rem;
        background: #E94C3A;
        border-radius: 5px;
        text-align: center;
        float:right;
        color: #fff;
        cursor: pointer;
    }
    /*点击查看全部的浮层*/
    .floating_layer{
        display:none;
        width:100%;
        height:100%;
        position:fixed;
        top:0;
        left:0;
        background:rgba(0,0,0,.5);
        z-index:99999;
    }
    .layer_frame{
        width:40%;
        background:#fff;
        margin:20% 36%;
    }
    .layer_title{
        line-height:1rem;
        font-size:20px;
        font-weight:bold;
        text-align:center;
        position:relative;
    }
    .layer_title>img{
        position:absolute;
        right:4px;
        top:15%;
    }
    .layer_confirm{
        width: 60px;
        height:0.5rem;
        line-height:0.5rem;
        background: #E94C3A;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
        color: #fff;
        cursor: pointer;
    }
    /*浮层选择按钮*/
    form{
        padding-bottom:15px;
    }
    .mt-checkbox, .mt-radio {
        display: inline-block;
        position: relative;
        padding-left: 30px;
        margin-bottom: 15px;
        cursor: pointer;
        font-size: 14px;
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
        top: 0;
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
    .coupon_type{
        width:80%;
        margin-left:15%;
    }
    .coupon_select{
        font-size:14px;
        font-weight:bold;
        padding-bottom:15px;
    }
    .explain{
        color:#B4B4B4;
        font-weight: normal;
    }
    .operation{
        width:50%;
        display: inline-block;
    }
    .operation_width{
        width:33%;
        display:inline-block;
    }
</style>
