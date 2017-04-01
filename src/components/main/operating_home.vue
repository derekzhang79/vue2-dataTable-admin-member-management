<template lang="html">
  <div class="page-content-wrapper">
    <div v-show="showBgShadow" class="bg_shadow">
        <div class="layerInfo">
            <div class="dialog" v-show="showDialog.undo">
                <div class="dialog_prompt">温馨提示</div>
                <div class="dialog_content">
                  <span>你确定要撤销这条操作记录吗？</span>
                </div>
                <div class="dialog_footer">
                  <span @click="execUndo">确定</span><span @click="execCancel">取消</span>
                </div>
            </div>
        </div>
        <div class="layerInfo">
            <div class="dialog" v-show="showDialog.chargeOff">
                <div class="dialog_prompt">温馨提示</div>
                <div class="dialog_content">
                    <span>你确定要核销这张优惠券吗？</span>
                </div>
                <div class="dialog_footer">
                    <span @click="execChargeOff">确定</span><span @click="execCancel('chargeOff')">取消</span>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content" :class="{'page-content-closed':menushirinkStatus}">
        <div class="page-bar">
            <div>操作台</div>
        </div>
        <div class="search">
            <input id="qrcode-input" type="text" placeholder="  请用扫码器扫描用户二维码" @keyup.enter="listenQrcodeInput(inputQrcode)" v-model="inputQrcode">
            <i class="iconfont icon">&#xe66a;</i>
        </div>
        <!--  -->
        <div class="public-title-two records more-index-title">
              <span class="">操作记录</span>
              <ul id="tab" class="nav nav-tabs">
                  <li :class="{current:tableShow[0].moneyTabActive}" @click="getMoneyLog"><a>金额消费</a></li>
                  <!-- <li :class="{current:tableShow[1].serviceTabActive}" @click="getServiceLog">服务消费</li> -->
                  <li :class="{current:tableShow[2].couponTabActive}" @click="getCouponLog"><a>优惠券核销</a></li>
              </ul>
        </div>
        <div id="content">
            <ul class="row" v-show="tableShow[0].moneyTbShow">
                <div class="col-md-12 col-sm-12">
                    <table id="operating_home_money_tb" class="table table-bordered  table-hover datatables_center" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>会员ID</th>
                                <th>微信昵称</th>
                                <th>余额</th>
                                <th>消费金额</th>
                                <th>优惠折扣</th>
                                <th>操作时间</th>
                                <th>操作状态</th>
                                <!-- <th>使用门店</th> -->
                                <th>实际变更金额</th>
                                <th>操作员</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colspan="11"></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
            <ul class="row" v-show="tableShow[1].serviceTbShow">
                <div class="col-md-12 col-sm-12">
                    <table id="oprating_home_service_tb" class="table table-bordered  table-hover datatables_center" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>会员ID</th>
                                <th>微信头像</th>
                                <th>服务名称</th>
                                <th>服务类型</th>
                                <th>操作时间</th>
                                <th>操作状态</th>
                                <!-- <th>使用门店</th> -->
                                <th>剩余次数</th>
                                <th>操作员</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </ul>
            <ul class="row" v-show="tableShow[2].couponTbShow">
                <div class="col-md-12 col-sm-12">
                    <table id="operating_home_coupon_tb" class="table table-bordered  table-hover datatables_center" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>会员ID</th>
                                <th>微信昵称</th>
                                <th>优惠券名称</th>
                                <th>优惠券类型</th>
                                <th>操作时间</th>
                                <th>操作状态</th>
                                <!-- <th>使用门店</th> -->
                                <th>操作员</th>
                            </tr>
                        </thead>
                        <tbody>
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
    data() {
        return {
            storageSiteUrl:JSON.parse(localStorage.getItem('site_url')), // 本地配置好的站点地址,非常重要误删
            showBgShadow: false,
            showDialog: {
                undo: false,
                chargeOff: false
            },
            inputQrcode: '',
            inputQrcodeArg: {}, // 输入的二维码url链接所带参数的对象
            inputFocus:true,
            tableShowIdx: this.$route.query.tableShowIdx ? this.$route.query.tableShowIdx : 0, // 默认显示的table索引
            tableShow: [ {
                    moneyTabActive: false,
                    moneyTbShow: false
                },
                {
                    serviceTabActive: false,
                    serviceTbShow: false
                },
                {
                    couponTabActive: false,
                    couponTbShow: false
                }
            ],
            currentMemberLogId: '', // 当前金额消费记录ID
            currentOperatorUserId: sessionStorage.getItem( 'user_id' ), // 当前登陆的操作员
            moneyTb: {}, // 金额消费dataTable对象
            couponTb: {}, // 优惠券消费dataTable对象
        }
    },
    props: [ 'menushirinkStatus' ], // 是否显示缩放菜单栏
    watch:{
      tableShowIdx(val){
        if(val == 0){
          this.tableShow[ 0 ].moneyTabActive = true;
          this.tableShow[ 1 ].serviceTabActive = false;
          this.tableShow[ 2 ].couponTabActive = false;
          this.tableShow[ 0 ].moneyTbShow = true;
          this.tableShow[ 1 ].serviceTbShow = false;
          this.tableShow[ 2 ].couponTbShow = false;
        }
        if(val == 1){
          this.tableShow[ 0 ].moneyTabActive = false;
          this.tableShow[ 1 ].serviceTabActive = true;
          this.tableShow[ 2 ].couponTabActive = false;
          this.tableShow[ 0 ].moneyTbShow = false;
          this.tableShow[ 1 ].serviceTbShow = true;
          this.tableShow[ 2 ].couponTbShow = false;
        }
        if(val == 2){
          this.tableShow[ 0 ].moneyTabActive = false;
          this.tableShow[ 1 ].serviceTabActive = false;
          this.tableShow[ 2 ].couponTabActive = true;
          this.tableShow[ 0 ].moneyTbShow = false;
          this.tableShow[ 1 ].serviceTbShow = false;
          this.tableShow[ 2 ].couponTbShow = true;
        }
      }
    },
    methods: {
        execUndo() {
            let $this = this
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v2/member_log/' + this.currentMemberLogId,
                type: 'PUT',
                data: {
                    exec_undo: true,
                    operator_user_id: this.currentOperatorUserId,
                },
                success: function( res ) {
                    console.log( res )
                    $this.moneyTb.ajax.reload()
                }
            } )
            this.showBgShadow = false;
        },
        execChargeOff() {
            let $this = this
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v1/userCoupon/' + this.inputQrcodeArg.coupon_id, // 这里的coupon_id指的是userCoupon表id
                type: 'PUT',
                data: {
                    exec_charge_off: true, // 执行核销优惠券动作
                    operator_user_id: this.currentOperatorUserId,
                },
                success: function( res ) {
                    console.log( res )
                    if(res.erron == 0){
                      // if(JSON.stringify($this.couponTb) != '{}'){
                      //   $this.couponTb.ajax.reload()
                      // }else{
                        $this.getCouponLog()
                      // }
                      $this.tableShowIdx = 2
                    }
                }
            } )
            this.showBgShadow = false
            this.showDialog.chargeOff = false
            this.inputQrcode = ''
            jQuery('#qrcode-input').focus()
        },
        execCancel(val) {
            if( val == 'chargeOff' ){
              this.inputQrcode = ''
              jQuery('#qrcode-input').focus()
            }
            this.showBgShadow = false;
        },
        listenQrcodeInput( val ) {
          // http://pw.demo.kaensoft.com/rest-api/mgr_operateview/?type_name=coupon&member_id=1&coupon_id=1,前端一定要传type_name，区分二维码类型
            let charsArr = this.storageSiteUrl.split('');
            let newCharsArr = charsArr.map(function(chars){
              if(chars == '/' || chars == '.'){
                return '\\'+chars;
              }else{
                return chars;
              }
            });
            let charsString = newCharsArr.join('');
            let regExp = new RegExp(charsString+'\\/mgr_operateview\\/\\?[\\w\\_]+=\\w+(&[\\w\\_]+=\\d+)*'); // 这类型的正则表达式反斜杠前需再加反斜杠
            let newVal = val.replace(/\s/g,''); //去除空格
            let ptnArr = regExp.exec( newVal )
            let argArr = ptnArr[ 0 ].split( '?' )[ 1 ].split( '&' )
            let newArgArr = Array()
            for ( let i = 0; i < argArr.length; i++ ) {
                let argName = argArr[ i ].split( '=' )[ 0 ]
                let argValue = argArr[ i ].split( '=' )[ 1 ]
                this.inputQrcodeArg[ argName ] = argValue
            }
            if ( this.inputQrcodeArg.type_name == 'member' )
                this.$router.push( '/operating_personal/' + this.inputQrcodeArg.member_id )
            if ( this.inputQrcodeArg.type_name == 'coupon' ) {
                this.showBgShadow = true
                this.showDialog.chargeOff = true
            }
        },
        getMoneyLog() {
            let $this = this
            if ( JSON.stringify( $this.moneyTb ) == '{}' ) {
                let moneyTb = jQuery( '#operating_home_money_tb' )
                    // 为了防止get请求参数过多导致请求失败，需要在发送请求之前对参数进行控制处理
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
                            url: this.storageSiteUrl+'/api-json/xkhy/v1/member_log',
                            type: 'GET',
                            data: {
                                serviceSide_mode: true
                            },
                            dataSrc: 'data',
                        },
                        lengthMenu: [ 5, 10, 20, 30, 50 ],
                        pageLength: 5,
                        order: [
                            [ 5, 'desc' ]
                        ],
                        processing: true,
                        serverSide: true,
                        destroy: true,
                        language: {
                            url: 'Chinese.json'
                        },
                        initComplete: function() {
                          // dataTable 外围边框样式class
                          jQuery('#operating_home_money_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                        },
                        preDrawCallback: function() {
                            jQuery( '.form-control' ).attr( 'placeholder', '请输入微信昵称' )
                        },
                        drawCallback: function() {
                            jQuery( '.money_tb_undo_btn' ).unbind( 'click' );
                            jQuery( '.money_tb_undo_btn' ).click( function() {
                                let member_log_id = jQuery( this ).attr( 'data_id' )
                                $this.currentMemberLogId = member_log_id
                                $this.showBgShadow = true
                                $this.showDialog.undo = true
                            } )
                        },
                        columns: [
                            {
                                data: 'member_number'
                            },
                            {
                                data: 'wx_nickname',
                                render: function( data, type, full, row ) {
                                    return '<img width="48px" height="48px" style="border-radius:50px !important" src="' + full.wx_headimgurl + '">&nbsp;<span style="white-space:nowrap;">' + data + '</span>'
                                }
                            },
                            {
                                data: 'money_balance',
                                render: function( data ) {
                                    return '￥' + data
                                }
                            },
                            {
                                data: 'money_change',
                                render: function( data, type, full, row ) {
                                  if ( full.type ) {
                                      let typeObj = JSON.parse( full.type )
                                      if ( typeObj.code == 1 || (typeObj.code == 3 && full.member_log_undo_type == 2) ){
                                        return '-' + data;
                                      }
                                      if ( typeObj.code == 2 || (typeObj.code == 3 && full.member_log_undo_type == 1) ){
                                        return '+' + data;
                                      }
                                  }
                                }
                            },
                            {
                                data: 'coupon_name'
                            },
                            {
                                data: 'create_date'
                            },
                            {
                                data: 'type',
                                render: function( data ) {
                                    if ( data ) {
                                        let jsonObj = JSON.parse( data )
                                         if(jsonObj.code == 1){
                                            return '<div class="tb_btn_red">'+jsonObj.title+'</div>'
                                        }
                                        if(jsonObj.code == 2){
                                            return '<div class="tb_btn_green">'+jsonObj.title+'</div>'
                                        }
                                        if(jsonObj.code == 3){
                                            return '<div class="">'+jsonObj.title+'</div>'
                                        }
                                    }
                                    return ''
                                }
                            },
                            // {
                            //   data: 'operator_store'
                            // },
                            {
                                data: 'money_real_change',
                                render: function( data, type, full, row ) {
                                    if ( full.type ) {
                                        let typeObj = JSON.parse( full.type )
                                        if ( typeObj.code == 1 || (typeObj.code == 3 && full.member_log_undo_type == 2) ){
                                          return '-' + data;
                                        }
                                        if ( typeObj.code == 2 || (typeObj.code == 3 && full.member_log_undo_type == 1) ){
                                          return '+' + data;
                                        }
                                    }
                                }
                            },
                            {
                                data: 'operator_name'
                            },
                            {
                                data: 'id',
                                render: function( data, type, full, row ) {
                                    if ( full.member_log_undo == 1 ){
                                      return '<div class="center">' +
                                          '<a class="tb_btn tb_btn_gray money_tb_btn money_tb_disabled_undo_btn"  data_id="' + data + '"><i class="icon iconfont">&#xe6ba;</i> 撤销</a>' +
                                          '</div>';
                                    }else{
                                      return '<div class="center">' +
                                          '<a class="tb_btn tb_btn_red money_tb_btn money_tb_undo_btn"  data_id="' + data + '"><i class="icon iconfont">&#xe6ba;</i> 撤销</a>' +
                                          '</div>';
                                    }
                                }
                            }
                        ]
                    } );
                $this.moneyTb = moneyTb
            }
            this.tableShowIdx = 0
        },
        // 暂时getServiceLog()注释，勿删除
        // getServiceLog() {
        //   let serviceTb = jQuery('#oprating_home_service_tb').DataTable({
        //     ajax: {
        //       url: 'http://pw.demo.kaensoft.com/rest-api/api-json/xkhy/v1/service',
        //       type: 'GET',
        //       data: {
        //         userService_log: true,
        //         serviceSide_mode: true
        //       },
        //       dataSrc: 'data'
        //     },
        //     // "pagingType": "simple_numbers",
        //     preDrawCallback: function() {
        //       jQuery('.form-control').attr('placeholder', '请输入姓名、手机号')
        //     },
        //     processing: true,
        //     serverSide: true,
        //     destroy: true,
        //     "language": {
        //       url: 'Chinese.json'
        //     },
        //     "columns": [{
        //         data: 'member_number'
        //       },
        //       {
        //         data: {},
        //         render: function(data) {
        //           return '<img width="48px" height="48px" style="border-radius:50px !important" src="' + data.wx_headimgurl + '">&nbsp;<span>' + data.wx_nickname + '</span>'
        //         }
        //       },
        //       {
        //         data: "service_name"
        //       },
        //       {
        //         data: "service_type",
        //         render: function(data) {
        //           let jsonObj = JSON.parse(data)
        //           return jsonObj.title
        //         }
        //       },
        //       {
        //         data: "create_date"
        //       },
        //       {
        //         data: "type",
        //         render: function(data) {
        //           let jsonObj = JSON.parse(data)
        //           return jsonObj.title
        //         }
        //       },
        //       {
        //         data: "operator_store"
        //       },
        //       {
        //         data: {},
        //         render: function(data) {
        //           let jsonObj = JSON.parse(data.service_type)
        //           if (jsonObj.code == 1) {
        //             return data.service_remain_minutes + '分钟'
        //           }
        //           if (jsonObj.code == 2) {
        //             return data.service_remain_count + '次'
        //           }
        //         }
        //       },
        //       {
        //         data: "operator_name"
        //       }
        //
        //     ]
        //   });
        // this.tableShowIdx = 1
        // },
        getCouponLog() {
            let $this = this
            if ( JSON.stringify( $this.couponTb ) == '{}' ) {
                let couponTb = jQuery( '#operating_home_coupon_tb' )
                    // 为了防止get请求参数过多导致请求失败，需要在发送请求之前对参数进行控制处理
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
                            url: this.storageSiteUrl+'/api-json/xkhy/v1/userCoupon_log',
                            type: 'GET',
                            data: {
                                serviceSide_mode: true
                            },
                            dataSrc: 'data',
                        },
                        lengthMenu: [ 5, 10, 20, 30, 50 ],
                        pageLength: 5,
                        order: [
                            [ 4, 'desc' ]
                        ],
                        processing: true,
                        serverSide: true,
                        destroy: true,
                        language: {
                            url: 'Chinese.json'
                        },
                        initComplete: function() {
                          // dataTable 外围边框样式class
                          jQuery('#operating_home_coupon_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                        },
                        preDrawCallback: function() {
                            jQuery( '.form-control' ).attr( 'placeholder', '请输入微信昵称' )
                        },
                        columns: [ {
                                data: 'member_number'
                            },
                            {
                                data: 'wx_nickname',
                                render: function( data, type, full, row ) {
                                    return '<img width="48px" height="48px" style="border-radius:50px !important" src="' + full.wx_headimgurl + '">&nbsp;<span>' + data + '</span>'
                                }
                            },
                            {
                                data: 'coupon_name'
                            },
                            {
                                data: "coupon_type",
                                render: function( data ) {
                                    if ( data ) {
                                        let jsonObj = JSON.parse( data )
                                        return jsonObj.title
                                    }
                                }
                            },
                            {
                                data: 'create_date'
                            },
                            {
                                data: 'type',
                                render: function( data ) {
                                    if ( data ) {
                                        let jsonObj = JSON.parse( data )
                                        return jsonObj.title
                                    }
                                }
                            },
                            // {
                            //   data: 'operator_store'
                            // },
                            {
                                data: 'operator_name'
                            }
                        ]
                    } );
                $this.couponTb = couponTb
            }
            this.tableShowIdx = 2
        }
    },
    mounted() {
        if ( this.tableShowIdx == 0 ) {
            this.getMoneyLog()
            this.tableShow[ 0 ].moneyTabActive = true;
            this.tableShow[ 0 ].moneyTbShow = true;
        } else if ( this.tableShowIdx == 1 ) {
            this.getServiceLog()
            this.tableShow[ 1 ].serviceTabActive = true;
            this.tableShow[ 1 ].serviceTbShow = true;
        } else if ( this.tableShowIdx == 2 ) {
            this.getCouponLog()
            this.tableShow[ 2 ].couponTabActive = true;
            this.tableShow[ 2 ].couponTbShow = true;
        }

        // 进入操作台页面二维码input自动聚焦
        jQuery('#qrcode-input').focus()

        // 控制左边导航栏页面点击刷新的时候样式保留
        jQuery( '.public-home' ).removeClass( 'open' )
        jQuery( '.page-operatepage' ).addClass( 'open' )
        jQuery( '.public-home ul' ).hide();
        jQuery( '.operateMenu' ).show();
    }
}
</script>

<style lang="css" scoped>
  /*@import '../../assets/css/dataTable.css';*/
  /**
   /*tab标签*/
    /*#tab {
        overflow:hidden;
        zoom:1;
        display: inline-block;
        font-weight: normal;
        font-size: 14px;
        vertical-align: middle;
        margin-left: 20px;
    }
    #tab li {
        float:left;
        cursor:pointer;
        line-height:0.4rem;
        padding:0 20px;
        width:100px;
        text-align: center;
        margin-left: 5px;
        background:#F5F5F5;
        color: rgba(64,67,72,.5)
    }
    #tab li.current {
        background: #fff;
        text-align: center;
        border-radius: 5px;
        color: rgb(64,67,72)
    }*/
    #content {
        border-top-width:0;
    }
    /**/
    .records{
        margin:0.5rem 0 6px 0;
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
    /*#example{
        text-align: center;
    }
    #service{
        text-align: center;
    }
    #coupon{
        text-align:center;
    }*/
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
        margin-top:0.5rem;
    }
    .search input{
        width: 268px;
        height: 0.8rem;
        border:1px solid rgba(0,0,0,.1);
        border-style:inset;
        border-radius: 5px;
        outline: none;
        padding-right:.5rem;
        background-color: #E94C3B;
        color:#fff;
        padding-left: 5px;
        -webkit-box-shadow:inset 3px 3px 2px rgba(0,0,0,.1);
        -moz-box-shadow:inset 3px 3px 2px rgba(0,0,0,.1);
        box-shadow:inset 3px 3px 2px rgba(0,0,0,.1)
    }
    .search i{
        display: inline-block;
        color: #fff;
        position: relative;
        left: -.6rem;
        top: 0.05rem;
        font-size: 20px;
        cursor: pointer;
        width: .5rem;
        text-align: center;
    }
    ::-webkit-input-placeholder {
      color:#fff;
    }
    :-moz-placeholder {
      color:#fff;
    }
    ::-moz-placeholder {
      color:#fff;
    }
    :-ms-input-placeholder {
      color:#fff;
    }
    /**/
    /*#example_length{
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
    }*/



</style>
