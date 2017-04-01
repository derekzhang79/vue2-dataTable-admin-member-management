<template lang="html">
<div class="page-content-wrapper">
  <div v-show="showBgShadow" class="bg_shadow">
    <div class="dialog" v-show="showDialog.delete">
      <div class="dialog_content">
        <span>你确定要删除这张优惠券吗？</span>
      </div>
      <div class="dialog_footer">
        <span @click="execDelete">确定</span><span @click="execCancel">取消</span>
      </div>
    </div>
  </div>
  <div class="page-content" :class="{'page-content-closed':menushirinkStatus}">
    <div class="page-bar">
      <div>优惠券管理</div>
    </div>
    <div class="build" @click="pickedCouponType()">+ 新建优惠卡券</div>
    <!-- 点击查看全部的浮层 -->
    <div class="floating_layer" v-show="showCouponType">
      <div class="layerInfo">
        <div class='layer_frame'>
            <div class="layer_title">
              <div>新建优惠卡券</div>
              <img src="../../assets/images/layer_close.png" aimgslt="" @click="showCouponType = !showCouponType">
            </div>
            <form class="recharge_records">
              <div class="coupon_type">
                <div class="coupon_select">选择优惠券类型</div>
                <div>
                  <label class="mt-radio">
                                      <input type="radio" name="optionsRadios" id="optionsRadios1" value="1" v-model="picked"> 代金券
                                      <span></span>
                                      <div class="explain">可为用户提供抵扣现金服务，可设置成"满~元,减~元"</div>
                                  </label>
                </div>
                <div>
                  <label class="mt-radio">
                                      <input type="radio" name="optionsRadios" id="optionsRadios2" value="2" v-model="picked"> 折扣券
                                      <span></span>
                                      <div class="explain">可为用户提供消费折扣</div>
                                  </label>
                </div>
                <div>
                  <label class="mt-radio">
                                        <input type="radio" name="optionsRadios" id="optionsRadios3" value="3" v-model="picked"> 兑换券
                                        <span></span>
                                        <div class="explain">可为用户提供消费送赠品服务</div>
                                    </label>
                </div>
              </div>
              <div class='layer_confirm' @click="showAddCouponPage">确认</div>
            </form>
        </div>
      </div>
     
    </div>
    <!--  -->
    <div class="records public-title-two more-index-title">
      <div class="operating_history">优惠卡券</div>
      <ul id="tab" class="nav nav-tabs">
        <li :class="{current:couponRel}" @click="getCouponRel"><a>已发布</a></li>
        <li :class="{current:couponUnRel}" @click="getCouponUnRel"><a>未发布</a></li>
        <li :class="{current:couponExp}" @click="getCouponExp"><a>已过期</a></li>
      </ul>
    </div>
    <div id="content">
      <ul class="row" style="display:block;">
        <div class="col-md-12 col-sm-12">
          <table id="coupon_home_coupon_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>失效日期</th>
                <th>已领取数量</th>
                <th>已使用数量</th>
                <th>总库存</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="7">加载中...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ul>
      <!-- <ul class="row" style="display:none">
                    <div class="col-md-12 col-sm-12">
                        <table id="service" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>优惠券类型</th>
                                    <th>名称</th>
                                    <th>有效时间</th>
                                    <th>已领取数量</th>
                                    <th>已使用数量</th>
                                    <th>总库存</th>
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
                 <ul class="row" style="display:none">
                    <div class="col-md-12 col-sm-12">
                        <table id="coupon" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>优惠券类型</th>
                                    <th>名称</th>
                                    <th>有效时间</th>
                                    <th>已领取数量</th>
                                    <th>已使用数量</th>
                                    <th>总库存</th>
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
                </ul> -->
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
            currentOperatorUserId: sessionStorage.getItem( 'user_id' ), // 当前登陆的操作员
            showBgShadow: false,
            showDialog: {
                delete: false,
            },
            showCouponType: false, // 是否显示优惠券类型选择框
            inputSearch: '',
            tableShowIdx: this.$route.query.tableShowIdx ? this.$route.query.tableShowIdx : 0, // 默认显示的table索引
            couponRel: false,
            couponUnRel: false,
            couponExp: false,
            couponTb: {},
            stateSave: [ {
                    couponRelState: '',
                },
                {
                    couponUnRelState: '',
                },
                {
                    couponExpState: '',
                }
            ], // 保存不同状态的优惠券的表格状态数据
            picked: '', // 优惠券类型选择单选按钮数据
            currentCouponId: '', // 当前操作的couponid-用于删除操作等
        }
    },
    props: [ 'menushirinkStatus' ], // 是否显示缩放菜单栏
    methods: {
        getCouponRel() {
            this.couponTb.on( 'preXhr.dt', function( e, settings, data ) {
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
                    coupon_status: {
                        code: 1,
                        title: '已发布'
                    },
                    serviceSide_mode: true
                }
            } )
            this.couponTb.ajax.reload()
            this.tableShowIdx = 0
        },
        getCouponUnRel() {
            this.couponTb.on( 'preXhr.dt', function( e, settings, data ) {
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
                    coupon_status: {
                        code: 2,
                        title: '未发布'
                    },
                    serviceSide_mode: true
                }
            } )
            this.couponTb.ajax.reload()
            this.tableShowIdx = 1
        },
        getCouponExp() {
            this.couponTb.on( 'preXhr.dt', function( e, settings, data ) {
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
                    coupon_status: {
                        code: 5,
                        title: '已过期'
                    },
                    serviceSide_mode: true
                }
            } )
            this.couponTb.ajax.reload()
            this.tableShowIdx = 2
        },
        pickedCouponType() {
            this.showCouponType = true
        },
        showAddCouponPage() {
            if(this.picked > 0 ){
              this.$router.push( '/coupon_add/' + this.picked )
            }else{
              this.showCouponType = false
            }
        },
        execDelete() {
            let $this = this
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v2/coupon/' + this.currentCouponId,
                type: 'DELETE',
                data: {},
                success: function( res ) {
                  // console.log(res)
                    $this.couponTb.ajax.reload()
                }
            } )
            this.showBgShadow = false
            this.showDialog.delete = false
        },
        execCancel() {
            this.showBgShadow = false
            this.showDialog.delete = false
        }
    },
    watch: {
        inputSearch() {
            jQuery( 'input.form-control' ).val( this.inputSearch ).trigger( 'input' )
        },
        tableShowIdx( val ) {
            if ( val == 0 ) {
                this.couponRel = true
                this.couponUnRel = false
                this.couponExp = false
            }
            if ( val == 1 ) {
                this.couponRel = false
                this.couponUnRel = true
                this.couponExp = false
            }
            if ( val == 2 ) {
                this.couponRel = false
                this.couponUnRel = false
                this.couponExp = true
            }
        }
    },
    mounted() {
        jQuery( '.public-home' ).removeClass( 'open' )
        jQuery( '.page-couponpage' ).addClass( 'open' )
        jQuery( '.public-home ul' ).hide()
        jQuery( '.couponMenu' ).show()
        let $this = this
        let couponTb = jQuery( '#coupon_home_coupon_tb' )
            .on( 'preXhr.dt', function( e, settings, data ) {
                let order_number = data.order[ 0 ].column
                let order_dir = data.order[ 0 ].dir
                let order_column = data.columns[ order_number ].data

                if ( $this.tableShowIdx == 0 ) {
                    $this.couponRel = true
                    var coupon_status = {
                        code: 1,
                        title: '已发布'
                    }
                }
                if ( $this.tableShowIdx == 1 ) {
                    $this.couponUnRel = true
                    var coupon_status = {
                        code: 2,
                        title: '未发布'
                    }
                }
                if ( $this.tableShowIdx == 2 ) {
                    $this.couponExp = true
                    var coupon_status = {
                        code: 5,
                        title: '已过期'
                    }
                }

                settings.ajax.data = {
                    draw: data.draw,
                    start: data.start,
                    length: data.length,
                    search_value: data.search.value,
                    order_column: order_column,
                    order_dir: order_dir,
                    coupon_status: coupon_status,
                    serviceSide_mode: true
                }
            } )
            .DataTable( {
                ajax: {
                    url: this.storageSiteUrl+'/api-json/xkhy/v2/coupon',
                    type: 'GET',
                    data: {
                        coupon_status: {
                            code: 1,
                            title: '已发布'
                        },
                        serviceSide_mode: true
                    },
                    dataSrc: 'data',
                },
                lengthMenu: [ 5, 10, 20, 30, 50 ],
                pageLength: 5,
                processing: true,
                serverSide: true,
                stateSave: true,
                initComplete: function() {
                  // dataTable 外围边框样式class
                  jQuery('#coupon_home_coupon_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                },
                preDrawCallback: function() {
                    // jQuery('.dataTables_filter').css('display', 'none');
                    jQuery( '.form-control' ).attr( 'placeholder', '请输入类型或名称' )
                },
                drawCallback: function() {
                    jQuery( '.coupon-delete-btn' ).unbind( 'click' )
                    jQuery( '.coupon-delete-btn' ).click( function() {
                        $this.showBgShadow = true
                        $this.showDialog.delete = true
                        $this.currentCouponId = jQuery( this ).attr( 'data-id' ) // 当前操作的couponid
                    } )
                },
                stateSaveCallback: function( settings, data ) {
                    if ( $this.tableShowIdx == 0 ) {
                        let dataObj = {
                            couponRel: data,
                            couponUnRel: '',
                            couponExp: ''
                        }
                        sessionStorage.setItem( 'dataTable_stateSave', JSON.stringify( dataObj ) )
                    }
                    if ( $this.tableShowIdx == 1 ) {
                        let dataObj = {
                            couponRel: '',
                            couponUnRel: data,
                            couponExp: ''
                        }
                        sessionStorage.setItem( 'dataTable_stateSave', JSON.stringify( dataObj ) )
                    }
                    if ( $this.tableShowIdx == 2 ) {
                        let dataObj = {
                            couponRel: '',
                            couponUnRel: '',
                            couponExp: data
                        }
                        sessionStorage.setItem( 'dataTable_stateSave', JSON.stringify( dataObj ) )
                    }
                },
                stateLoadCallback: function( settings ) {
                    if ( $this.tableShowIdx == 0 ) {
                        return JSON.parse( sessionStorage.getItem( 'dataTable_stateSave' ) ) || {}.couponRel
                    }
                    if ( $this.tableShowIdx == 1 ) {
                        return JSON.parse( sessionStorage.getItem( 'dataTable_stateSave' ) ) || {}.couponUnRel
                    }
                    if ( $this.tableShowIdx == 2 ) {
                        return JSON.parse( sessionStorage.getItem( 'dataTable_stateSave' ) ) || {}.couponExp
                    }
                },
                "order": [
                    [ 1, 'desc' ]
                ],
                "pagingType": "simple_numbers",
                "language": {
                    url: 'Chinese.json'
                },
                "columns": [
                    {
                      "data": "coupon_name"
                    },
                    {
                        "data": "type",
                        render: function( data ) {
                            let jsonObj = JSON.parse( data )
                            return jsonObj.title
                        }
                    },
                    {
                        "data": "coupon_expiration_type_value",
                        render: function( data, type, full, meta ) {
                            if ( data ) {
                                if ( full.coupon_expiration_type == 1 ) {
                                    let jsonObj = JSON.parse( data )
                                    if ( jsonObj.sUnit == 'day' ) {
                                        jsonObj.sUnit = '天'
                                    } else if ( jsonObj.sUnit == 'month' ) {
                                        jsonObj.sUnit = '月'
                                    } else if ( jsonObj.sUnit == 'year' ) {
                                        jsonObj.sUnit = '年'
                                    }
                                    if ( jsonObj.eUnit == 'day' ) {
                                        jsonObj.eUnit = '天'
                                    } else if ( jsonObj.eUnit == 'month' ) {
                                        jsonObj.eUnit = '月'
                                    } else if ( jsonObj.eUnit == 'year' ) {
                                        jsonObj.eUnit = '年'
                                    }
                                    if ( jsonObj.sDay == 0 ) {
                                        jsonObj.sDay = '当'
                                    }
                                    return '领取后' + jsonObj.sDay + jsonObj.sUnit + '生效,有效期' + jsonObj.eDay + jsonObj.eUnit
                                }
                                if ( full.coupon_expiration_type == 2 ) {
                                    return data
                                }
                            }
                            return ''
                        }
                    },
                    {
                        "data": "coupon_sended_count"
                    },
                    {
                        "data": "coupon_used_count"
                    },
                    {
                        "data": "coupon_stock"
                    },
                    {
                        "data": 'id',
                        render: function( data, type, full, meta ) {
                            let couponUseStatusObj = JSON.parse( full.coupon_status )
                            if ( couponUseStatusObj.code == 1 ) {
                                return '<div class="center">' +
                                    '<a class="tb_btn_green" href="#/coupon_detail/' + data + '/?tableShowIdx=0" ><i class="icon iconfont">&#xe63d;</i> 详情</a>' +
                                    '<a class="tb_btn_red coupon-delete-btn" data-id="' + data + '" ><i class="icon iconfont">&#xe63e;</i> 删除</a>' +
                                    '</div>'
                            }
                            if ( couponUseStatusObj.code == 2 ) {
                                return '<div class="center">' +
                                    '<a class="tb_btn_green" href="#/coupon_detail/' + data + '/?tableShowIdx=1"><i class="icon iconfont">&#xe63d;</i> 详情</a>' +
                                    '<a class="tb_btn_green" href="#/coupon_update/' + data + '/?tableShowIdx=1"><i class="icon iconfont">&#xe682;</i> 编辑</a>' +
                                    '<a class="tb_btn_red coupon-delete-btn" data-id="' + data + '"><i class="icon iconfont">&#xe63e;</i> 删除</a>' +
                                    '</div>'
                            }
                            if ( couponUseStatusObj.code == 5 ) {
                                return '<div class="center">' +
                                    '<a class="tb_btn_green" href="#/coupon_detail/' + data + '/?tableShowIdx=2"><i class="icon iconfont">&#xe63d;</i> 详情</a>' +
                                    '<a class="tb_btn_red coupon-delete-btn" data-id="' + data + '"><i class="icon iconfont">&#xe63e;</i> 删除</a>' +
                                    '</div>'
                            }
                        }
                    }
                ]
            } );
        this.couponTb = couponTb
        // 点击新建优惠券
        // jQuery('.build').click(function() {
        //   jQuery('.floating_layer').show();
        //   //弹出浮层时禁止底部页面滚动
        //   document.documentElement.style.overflowY = "hidden";
        // })
        // jQuery('.layer_title').click(function() {
        //   jQuery('.floating_layer').hide();
        //   // 关闭浮层时页面可以滚动
        //   document.documentElement.style.overflowY = "scroll";
        // })
        // 确认
        // jQuery('.layer_confirm').click(function(){
        //   jQuery('.floating_layer').hide();
        // })
        // 判断radio是否选中
        // var v = null;
        // jQuery('input:radio[name="optionsRadios"]').click(function(e) {
        //   v = jQuery(this).val();
        // })
        // jQuery('.layer_confirm').click(function() {
        //   // alert(v)
        //   // jQuery('.floating_layer').hide();
        //   window.location.href = 'backstage_buildcoupon.html';
        // })

    }
}
</script>

<style lang="css" scoped>
/**
* 浮层阴影
*/

.bg_shadow {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  padding-left: 235px;
}

.dialog {
  background: #fff;
  width: 5rem;
  height: 2rem;
  color: #000;
  margin: 0 auto;
  margin-top: 5rem;
  text-align: center;
  border-radius: 5px;
}

.dialog_content {
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 14px;
}

.dialog_footer {
  height: .8rem;
  line-height: .8rem;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
  border-radius: 0 0 5px 5px;
}

.dialog_footer span {
  padding: 3px 15px;
  color: #fff;
  background: #E94C3B;
  border-radius: 3px;
  cursor: pointer;
}

.dialog_footer span:first-child {
  margin-right: 10px;
}


/*tab标签*/

#content {
  border-top-width: 0;
}


/**/

.records {
  margin: 0.2rem 0 6px 0;
}


/*datatables样式*/

thead {
  background: #F6F6F6;
}

thead tr th {
  /*border:0 !important;*/
  border-bottom: 0 !important;
  text-align: center;
}


/*  tbody tr td{
        border-color: #F6F6F6 !important;
    }*/


/* table.dataTable.no-footer{
        border-bottom: 1px solid #f6f6f6;
    }*/

.center {
  text-align: center;
  width: 100%;
}

.center a {
  color: #000;
  text-decoration: underline;
}

.operation {
  width: 50%;
  display: inline-block;
}

.datatables_center {
  text-align: center;
}

.pagination>li>a,
.pagination>li>span {
  color: #777;
  border: 0;
}

.pagination>li:nth-child(1)>a,
.pagination>li>span {
  border: 0;
}

.pagination>.active>a,
.pagination>.active>a:focus,
.pagination>.active>a:hover,
.pagination>.active>span,
.pagination>.active>span:focus,
.pagination>.active>span:hover {
  color: #E94C3B;
  background-color: #fff;
  border-color: #fff;
}

.pagination>li>a:focus,
.pagination>li>a:hover,
.pagination>li>span:focus,
.pagination>li>span:hover {
  color: #777;
  background-color: #eee;
  border-color: #eee;
}


/**/

.edit {
  position: absolute;
  background: #fff;
  right: 5.5%;
  border-radius: 5px;
  width: 4%;
  text-align: center;
}


/**/

.growthgrade {
  width: 100%;
  text-align: center;
}

.growthgrade>div {
  display: inline-block;
  margin-left: 3.3%;
}

.growthgrade>div:nth-child(1) {
  margin-left: 1.2%;
}


/**/

.search {
  margin-top: 0.7rem;
}

.search input {
  width: 3.2rem;
  height: 0.6rem;
  border: 2px solid #eee;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

.search i {
  color: #eee;
  position: relative;
  left: -.5rem;
  top: 0.06rem;
  font-size: 20px;
}

.operating_history {
  display: inline-block;
}


/**/
.build {
  width: 125px;
  height: 0.6rem;
  line-height: 0.6rem;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  margin-left:auto;
  margin-right:0;
  margin-top:0.2rem;
}
/*点击查看全部的浮层*/
.layer_frame {
  width: 12rem;
  background: #fff;
  border-radius: 5px;
}
.layer_title {
  line-height: 1rem;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  position: relative;
}

.layer_title>img {
  position: absolute;
  right: 4px;
  top: 15%;
}

.layer_confirm {
  width: 60px;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  cursor: pointer;
}


/*浮层选择按钮*/

form {
  padding-bottom: 15px;
}

.mt-checkbox,
.mt-radio {
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

.mt-checkbox,
.mt-radio,
.mt-checkbox,
.mt-radio {
  display: inline-block;
  margin-right: 15px;
}

.mt-checkbox>input,
.mt-radio>input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  filter: alpha(opacity=0);
}

.mt-checkbox>span,
.mt-radio>span {
  border: 1px solid #000;
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  /*background: #E6E6E6;*/
}

input[type=checkbox],
input[type=radio] {
  margin: 4px 0 0;
  margin-top: 1px\9;
  line-height: normal;
}

.mt-radio>span {
  -ms-border-radius: 50%!important;
  -o-border-radius: 50%!important;
  border-radius: 50%!important;
}

.input-icon>i,
.mt-checkbox-list .mt-checkbox,
.mt-checkbox-list .mt-radio,
.mt-checkbox>input:checked~span:after,
.mt-radio-list .mt-checkbox,
.mt-radio-list .mt-radio,
.mt-radio>input:checked~span:after {
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

.coupon_type {
  margin-left: 0.8rem;
}

.coupon_select {
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 15px;
}

.explain {
  color: #B4B4B4;
  font-weight: normal;
}

.operation {
  width: 50%;
  display: inline-block;
}

.operation_width {
  width: 33%;
  display: inline-block;
}
</style>
