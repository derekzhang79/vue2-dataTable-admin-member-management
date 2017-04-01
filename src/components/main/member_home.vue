<template lang="html">
   <div class="page-content-wrapper">
      <div class="page-content" :class="{'page-content-closed':menushirinkStatus}">
          <div class="page-bar">
              <div >会员管理</div>
          </div>
          <div class="row member">
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 member-border">
                  <div class="member-num">{{memberRealtimeCount.yesterday_add_member}}</div>
                  <div>昨日净增会员数</div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 member-border">
                  <div class="member-num">{{memberRealtimeCount.yesterday_recharge_amount}}</div>
                  <div>昨日充值金额数</div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 member-border">
                  <div class="member-num">{{memberRealtimeCount.total_recharge_member}}</div>
                  <div>充值会员总数</div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 member-border">
                  <div class="member-num">{{memberRealtimeCount.total_member}}</div>
                  <div>会员总数</div>
              </div>
          </div>
          <!--  -->
          <!-- <div class="search">
              <input type="text" placeholder="请输入用户ID、手机号" v-model="inputSearch">
              <i class="iconfont icon">&#xe67a;</i>
              <span class="search_button">搜索</span>
          </div> -->
          <!--  -->
          <div class="records public-title-two">
                  <div class="operating_history">所有会员用户 </div>
                  <ul id="tab" class="col-lg-11 col-md-11 col-sm-23 col-xs-47">
                      <li class="current">按时间</li>
                      <li>按余额</li>
                  </ul>
          </div>
          <!--  -->
          <div class="row" >
              <div class="col-md-12 col-sm-12">
                  <table id="member_home_member_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                      <thead>
                          <tr>
                            <th>会员ID</th>
                            <th>微信昵称</th>
                            <th>真实姓名</th>
                            <th>性别</th>
                            <th>等级</th>
                            <th>手机号</th>
                            <th>余额</th>
                            <th>创建时间</th>
                            <th>操作</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <!-- <td>Tiger Nixon</td>
                              <td>System Architect</td>
                              <td>Edinburgh</td>
                              <td>61</td>
                              <td>2011/04/25</td>
                              <td>$320,800</td> -->
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <!--  -->
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            storageSiteUrl:JSON.parse(localStorage.getItem('site_url')), // 本地配置好的站点地址,非常重要误删
            memberRealtimeCount: {},
            inputSearch: ''
        }
    },
    props: [ 'menushirinkStatus' ], // 是否显示缩放菜单栏
    watch: {
        inputSearch() {
            jQuery( 'input.form-control' ).val( this.inputSearch ).trigger( 'input' )
        }
    },
    created() {
        let $this = this
        jQuery.ajax( {
            url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
            type: 'GET',
            data: {
                member_realtime_count: true
            },
            success: function( res ) {
                $this.memberRealtimeCount = res.data
            }
        } );
    },
    mounted() {
        // 控制左边导航栏刷新的时候样式
        jQuery( '.public-home' ).removeClass( 'open' )
        jQuery( '.page-memberpage' ).addClass( 'open' )
        jQuery( '.public-home ul' ).hide();
        jQuery( '.memberMenu' ).show();
        //
        let moneyTb = jQuery( '#member_home_member_tb' )
            .on( 'preXhr.dt', function( e, settings, data ) {
                let order_number = data.order[ 0 ].column
                let order_dir = data.order[ 0 ].dir
                let order_column = data.columns[ order_number ].data

                settings.ajax.data = {
                    draw: data.draw,
                    start: data.start,
                    length: data.length,
                    search_value: data.search.value,
                    order_column: order_column,
                    order_dir: order_dir,
                    serviceSide_mode: true
                }
            } )
            .DataTable( {
                ajax: {
                    url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
                    type: 'GET',
                    data: {
                        serviceSide_mode: true
                    },
                    dataSrc: 'data',
                    // success: function(res) {
                    //   console.log(res)
                    // }
                },
                lengthMenu: [ 1, 2, 3, 5, 10 ],
                pageLength: 5,
                processing: true,
                serverSide: true,
                order: [
                    [ 7, 'desc' ]
                ],
                // simple - 只有上一页、下一页两个按钮
                // simple_numbers - 除了上一页、下一页两个按钮还有页数按钮，Datatables默认是这个
                // full - 有四个按钮首页、上一页、下一页、末页
                // full_numbers - 除首页、上一页、下一页、末页四个按钮还有页数按钮
                // pagingType: 'simple_numbers',
                language: {
                    url: 'Chinese.json'
                },
                initComplete: function() {
                  // dataTable 外围边框样式class
                  jQuery('#member_home_member_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                },
                preDrawCallback: function() {
                    jQuery( '.form-control' ).attr( 'placeholder', '请输入会员ID或手机号' )
                },
                columns: [ {
                        data: 'member_number'
                    },
                    {
                        data: 'wx_nickname',
                        render: function( data,type,full,meta ) {
                            return '<img width="48px" height="48px" style="border-radius:50px !important" src="' + full.wx_headimgurl + '">&nbsp;<span>' + data + '</span>'
                        }
                    },
                    {
                        data: 'user_real_name'
                    },
                    {
                        data: 'user_real_sex',
                        render: function( data ) {
                            if ( data ) {
                                if ( data == 1 ) {
                                    return '男'
                                }
                                if ( data == 2 ) {
                                    return '女'
                                }
                            }
                            return ''
                        }
                    },
                    {
                        data: 'member_level',
                        render: function( data ) {
                            if ( data ) {
                                if ( data == 1 ) return '普通会员'
                                if ( data == 2 ) return '白银会员'
                                if ( data == 3 ) return '黄金会员'
                                if ( data == 4 ) return '铂金会员'
                                if ( data == 5 ) return '钻石会员'
                            }
                            return ''
                        }
                    },
                    {
                        data: 'user_real_mobilephone'
                    },
                    {
                        data: 'money_balance',
                        render: function( data ) {
                            return '￥' + data
                        }
                    },
                    {
                        data: 'create_date'
                    },
                    {
                        data: 'id',
                        render: function( data, type, full, meta ) {
                            return '<div class="center">' +
                                '<a href="#/member_personalCenter/' + data + '" class="tb_btn_green"><i class="icon iconfont">&#xe60e;</i>个人中心</a>' +
                                '<a href="#/operating_personal/' + data + '" class="tb_btn_red"><i class="icon iconfont">&#xe6d9;</i> 操作台</a>' +
                                '</div>';
                        }
                    }
                ]
            } );
    }
}
</script>

<style lang="css" scoped>
  /*tab标签*/
  #tab {
      display: none;
      width:15rem;
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
  .search{
      margin-top:0.7rem;
  }
  .search input{
      width: 3.2rem;
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
  /**/
  .member{
      text-align: center;
      background: #eee;
      margin-top: 0.5rem;
      margin: 0.5rem 0;
      height: 1.6rem;
  }
  .member-border{
      border-right: 1px solid #fff;
      margin-top: 0.4rem;
  }
  .member-border:nth-child(4){
      border:0;
  }
  .member-num{
      color:#EA4D3C;
  }
  .records{
    margin-bottom: 6px;
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
 /* tbody tr td{
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

  /*#example_length{
      display:none;
  }
  #example_filter{
      display:none !important;
  }*/
  .dataTables_length{
    display:none;
  }
  .dataTables_filter{
    display:none;
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
