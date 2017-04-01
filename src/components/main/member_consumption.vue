<template lang="html">
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-bar">
                <div>消费记录</div>
            </div>
            <div class="records public-title-two">
                <ul id="tab">
                    <li class="current">金额</li>
                    <li>服务</li>
                </ul>
            </div>
            <!--  -->
            <div id="content">  
                <ul  class="row" style="display:block;">    
                    <div class="col-md-12 col-sm-12">
                        <table id="example" class="table table-bordered table-hover datatables_center " cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>消费金额</th>
                                    <th>优惠折扣</th>
                                    <th>使用时间</th>
                                    <th>使用门店</th>
                                    <th>实付金额</th>
                                    <th>操作员</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tiger Nixon</td>
                                    <td>System Architect</td>
                                    <td>Edinburgh</td>
                                    <td>61</td>
                                    <td>2011/04/25</td>
                                    <td>2011/04/25</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ul> 
                <ul class="row" style="display:none"> 
                    <div class="col-md-12 col-sm-12"> 
                        <table id="service" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>服务名称</th>
                                    <th>使用时间</th>
                                    <th>服务类型</th>
                                    <th>使用门店</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tiger Nixon</td>
                                    <td>System Architect</td>
                                    <td>Edinburgh</td>
                                    <td>61</td>
                                    <td>2011/04/25</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ul>
            </div>
            <!--  -->
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    // 控制左边导航栏刷新的时候样式
    jQuery( '.public-home' ).removeClass( 'open' )
    jQuery( '.page-memberpage' ).addClass( 'open' )
    jQuery( '.public-home ul' ).hide();
    jQuery( '.memberMenu' ).show();
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
                {"data":"balance"},
                {"data":"name"}
            ]
        });
        jQuery('#service').DataTable( {
            "ajax": "consumption.txt",
            "pagingType": "simple_numbers",
            "language": {
                url: 'Chinese.json'
                },
            "columns": [
                { "data": "user_id" },
                { "data": "user_wxnickname" },
                { "data": "user_wxheadimgurl" },
                { "data": "grade" },
                { "data": "balance"},
            ]
        });
    })
   // tab切换
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
  }
}
</script>

<style lang="css" scoped>
   /*tab标签*/
    #tab {
        overflow:hidden;
        zoom:1;
        font-weight: normal;
        font-size: 14px;
    }
    #tab li {
        float:left;
        cursor: pointer; 
        line-height: 20px;
        padding: 0 20px;
        margin-top: 12.5px;
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
        margin:0.5rem 0 6px;
    }
    /**/
    thead{
        background:#F6F6F6;
    }
    thead tr th{
        /*border:0 !important;*/
        border-bottom:0 !important;
        text-align:center;
    }
  /*  tbody tr td{
        border-color: #F6F6F6 !important;
    }
    table.dataTable.no-footer{
        border-bottom: 1px solid #f6f6f6;
    }*/
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
</style>
