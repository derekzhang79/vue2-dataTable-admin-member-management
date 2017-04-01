<template lang="html">
<div class="page-content-wrapper">
  <div v-show="showBgShadow" class="bg_shadow">
    <div class="layerInfo">
      <div class="dialog" v-show="showDialog[0].trade">
          <div class="dialog_prompt">温馨提示</div>
          <div class="dialog_content">
            <span>{{showDialog[0].tradeMsg}}</span>
          </div>
          <div class="dialog_footer">
            <span @click="execTradedGo">确认</span>
            <span @click="execTradedBack">取消</span>
          </div>
        </div>
    </div>
  </div>
  <!-- 核销优惠券的弹窗 -->
  <div v-show="showCodeShadow" class="bg_shadow">
    <div class="layerInfo">
      <div class="dialog" v-show="showCodeDialog[0].code">
        <div class="dialog_prompt">温馨提示</div>
        <div class="dialog_content">
          <span>{{showCodeDialog[0].codeMsg}}</span>
        </div>
        <div class="dialog_footer">
          <span @click="execCodeGo">确认</span>
          <span @click="execCodeBack">取消</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 此次操作失败或者没有选择优惠券的弹窗 -->
  <div v-show="showOperatingShadow" class="bg_shadow">
    <div class="layerInfo">
      <div class="dialog" v-show="showOperatingDialog[0].fail">
        <div class="dialog_prompt">温馨提示</div>
        <div class="dialog_content">
          <span>{{showOperatingDialog[0].failMsg}}</span>
        </div>
        <div class="dialog_footer">
          <span @click="execfailGo">确认</span>
        </div>
      </div>
    </div>
  </div>
  <!-- loading -->
  <div class="loading_layer" v-show="showloading">
    <div class="loadingInfo">
      <div class="loadingImg">
        <img src="http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/03/loading.gif">
      </div>
    </div>
  </div>
  <!--  -->
  <div class="page-content" :class="{'page-content-closed':menushirinkStatus}">
    <div class="page-bar">
      <div>操作台</div>
    </div>
    <div class="row membership">
      <div class="membership_head"><img :src="memberInfo.wx_headimgurl" alt=""></div>
      <!-- <div class="edit">编辑</div> -->
      <div class="ystep"></div>
      <div class="growthgrade">
        <div>普通会员</div>
        <div>白银会员</div>
        <div>黄金会员</div>
        <div>铂金会员</div>
        <div>钻石会员</div>
      </div>
      <div class="membership_line"></div>
      <div class="user_info">

      </div>
      <div class="row membership_space">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">会员ID</div>
          <div class=" membership_right">{{memberInfo.member_number}}</div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">微信昵称</div>
          <div class=" membership_right">{{memberInfo.wx_nickname}}</div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">真实姓名</div>
          <div class=" membership_right">{{memberInfo.user_real_name}}</div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">积分</div>
          <div class=" membership_right">0</div>
        </div>
      </div>
      <div class="row membership_space">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">手机号</div>
          <div class=" membership_right">{{memberInfo.user_real_mobilephone}}</div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">性别</div>
          <div class=" membership_right">{{memberInfo.user_real_sex | formatUserSex}}</div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">生日</div>
          <div class=" membership_right">{{memberInfo.user_real_birthday}}</div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
          <div class=" membership_left">地区</div>
          <div class=" membership_right"></div>
        </div>
      </div>
      <div class="row membership_space">
        <div class="col-lg-12 col-md-12 col-sm-24 col-xs-48 ">
          <div class=" membership_left">备注</div>
          <div class=" membership_right">{{memberInfo.vender_remark}}</div>
        </div>
      </div>
    </div>
    <div class="records">
      <ul id="tab">
        <li :class="{current:showTable[0].activeMoneyTab}" @click="activeMoneyTab">充值消费</li>
        <li :class="{current:showTable[1].activeCouponTab}" @click="activeCouponTab">优惠卡券</li>
        <!-- <li>服务列表</li> -->
      </ul>
    </div>
    <!--  -->
    <div id="content">
      <ul class="row" v-show="showTable[0].showMoneyContent">
        <div class="col-md-12 col-sm-12">
          <div id="recharge ">
            <div class="recharge_balance">余额</div>
            <div class="recharge_money ">
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24 recharge_right">
                <label class="symbol">￥</label><label>{{memberInfo.money_balance}}</label>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24 recharge_left">
                <input type="number" min="0" v-model="inputMoneyChange" @keyup.enter="getAvailableCoupon" @input="freshAvailableCoupon">
                <form class="recharge_records">
                  <div class="mt-radio-inline">
                    <label class="mt-radio">
                                          <input type="radio" name="optionsRadios" id="optionsRadios25" value="2" v-model="pickedOperateType"> 充值
                                          <span></span>
                                      </label>
                    <label class="mt-radio">
                                          <input type="radio" name="optionsRadios" id="optionsRadios26" value="1" v-model="pickedOperateType" > 扣减
                                          <span></span>
                                      </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="select_coupon row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24">智能筛选出下列可选优惠券</div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24 "><span class="selectcoupon_right" @click="showCouponLayerTb">查看全部 ></span></div>
          </div>
          <!-- 点击查看全部的浮层 -->
          <div class="floating_layer" v-show="showLayerTable">
            <div class="layerInfo">
              <div class='layer_frame'>
                  <div class="layer_title">
                    <div>全部可用优惠券</div>
                    <img src="../../assets/images/layer_close.png" alt="" @click="showLayerTable =! showLayerTable">
                  </div>
                  <div class="layer_table">
                    <table id="operating_personal_coupon_layer_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                      <thead>
                        <tr>
                          <th>优惠券名称</th>
                          <th>类型</th>
                          <th>使用条件</th>
                          <th>领取日期</th>
                          <th>失效日期</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colspan="6">暂无优惠券</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class='layer_confirm' @click="pickedLayerCoupon">确认</div>
              </div>
            </div>

          </div>
          <!--  -->
          <div class="available_coupon">
            <table id="operating_personal_coupon_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <!-- <th>ID</th> -->
                  <th>优惠券名称</th>
                  <th>类型</th>
                  <th>使用条件</th>
                  <th>领取日期</th>
                  <th>失效日期</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="6">暂无优惠券</td>
                </tr>
              </tbody>
            </table>
            <div class="calculation">已优惠 : {{parseFloat(inputMoneyChange-moneyChange).toFixed(2)}} </div>
            <div class="calculation">总计 : {{pickedOperateType==1?'-':'+'}}{{moneyChange}}</div>
            <div class="showcoupon_confirm" @click="execTrade">确认</div>
          </div>
        </div>
      </ul>
      <!-- <ul class="row" style="display:none">
        <div class="col-md-12 col-sm-12">
          <table id="service" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>服务名称</th>
                <th>类型</th>
                <th>剩余次数</th>
                <th>失效时间</th>
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
              </tr>
            </tbody>
          </table>
          <div class="row edit_service">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24 ">
              <div class="add_service">新增服务</div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-24">
              <div class="new_reduce">扣减</div>
              <div class="new_add">新增</div>
            </div>
          </div>
        </div>
      </ul> -->
      <ul class="row" v-show="showTable[1].showCouponContent">
        <div class="col-md-12 col-sm-12">
          <table id="operating_personal_coupon_all_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>优惠券名称</th>
                <th>类型</th>
                <th>使用条件</th>
                <th>领取日期</th>
                <th>失效日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="6">暂无优惠券</td>
              </tr>
            </tbody>
          </table>
          <div class='write_off' @click="execChangeOff">核销</div>
        </div>
      </ul>
    </div>
    <!--  -->
  </div>
</div>
</template>

<script>
import editStep from '../../assets/js/editystep.js';
export default {
    data() {
        return {
            storageSiteUrl:JSON.parse(localStorage.getItem('site_url')), // 本地配置好的站点地址,非常重要误删
            showBgShadow: false,
            showDialog: [ {
                trade: false, // 控制交易结算dialog框是否显示的属性
                tradeMsg: '', // dialog框显示的内容
            } ],
            showCodeShadow: false,
            showCodeDialog: [ {
                code: false, // 控制核销优惠券的dialog框是否显示的属性
                codeMsg: '', // 优惠券dialog框显示的内容
            } ],
            showOperatingShadow: false,
            showOperatingDialog: [ {
                fail: false, // 控制此次操作失败或者没有选择优惠券弹窗的属性
                failMsg: '', // 操作失败或者没有选择优惠券dialog框显示的内容
            } ],
            showTable: [ { // 整个操作区域的切换显示
                    activeMoneyTab: true,
                    showMoneyContent: true,
                },
                {
                    activeCouponTab: false,
                    showCouponContent: false,
                }
            ],
            showLayerTable: false, // 浮层table是否显示
            showloading:false,    //loading是否显示
            currentMemberId: this.$route.params.member_id, // 当前路由会员id
            currentOperatorUserId: sessionStorage.getItem( 'user_id' ), // 当前登陆的操作员
            memberInfo: {},
            inputMoneyChange: '', // 输入的金额变更额
            pickedOperateType: 1, // 金额操作类型默认为扣减
            inputDiscount: 0, // 可优惠的金额
            couponIsChecked: false, // 是否已选可用优惠券
            couponTb: {}, // 可用优惠券对象
            couponData: {}, // 可用优惠券的数据对象
            couponAllTb: {}, // 所有可用优惠券table对象
            couponChangeOffId: 0, // 所有可用优惠券table选择某一张优惠券，该优惠券的id（即将要核销的）
            couponLayerTb: {}, // 所有可用优惠券-浮层table对象
            couponLayerData: {}, // 从优惠券浮层选中行的数据
            couponPickedId: {}, // 从优惠券浮层选中的数据id
        }
    },
    props: [ 'menushirinkStatus' ], // 是否显示缩放菜单栏
    computed: {
        moneyChange() { // 总计金额变更额
            if ( this.inputMoneyChange == '' ) {
                var inputMoneyChange = 0 // 防止输入空值，导致总计金额为NaN
                this.inputDiscount = 0
            } else {
                var inputMoneyChange = this.inputMoneyChange
            }
            if ( this.pickedOperateType == 1 ) {
                let moneyChange = -parseFloat( inputMoneyChange )
                // 主要解决折扣的金额大于消费的金额时的bug
                // 这里总是使最终的moneyChange > 0
                if(moneyChange + parseFloat( this.inputDiscount )>0){
                  moneyChange = 0
                }else{
                  moneyChange = Math.abs( moneyChange + parseFloat( this.inputDiscount ) ).toFixed( 2 )
                }
                return moneyChange
            }
            if ( this.pickedOperateType == 2 ) {
                let moneyChange = parseFloat( inputMoneyChange ).toFixed( 2 )
                return moneyChange
            }
        }
    },
    watch: {
      pickedOperateType(val){
        if(val == 2){
          if(JSON.stringify(this.couponTb) != '{}'){
            this.couponTb.clear();
            this.couponTb.draw();
          }
        }
      }
    },
    methods: {
        activeMoneyTab() {
            this.showTable[ 0 ].activeMoneyTab = true
            this.showTable[ 0 ].showMoneyContent = true
            this.showTable[ 1 ].activeCouponTab = false
            this.showTable[ 1 ].showCouponContent = false
        },
        activeCouponTab() {
            this.showTable[ 0 ].activeMoneyTab = false
            this.showTable[ 0 ].showMoneyContent = false
            this.showTable[ 1 ].activeCouponTab = true
            this.showTable[ 1 ].showCouponContent = true
            if ( JSON.stringify( this.couponAllTb ) == '{}' ) {
                let $this = this
                let couponAllTb = jQuery( '#operating_personal_coupon_all_tb' ).DataTable( {
                    ajax: {
                        url: this.storageSiteUrl+'/api-json/xkhy/v2/userCoupon/' + this.currentMemberId,
                        type: 'GET',
                        data: {
                            is_member_id: true,
                            coupon_use_status: {
                                code: 1,
                                title: '未使用'
                            }
                        },
                        dataSrc: 'data',
                        // success:function(res){
                        //   console.log(res)
                        // }
                    },
                    lengthMenu: [ 5 ],
                    order:[4,'desc'],
                    language: {
                        url: 'Chinese.json'
                    },
                    initComplete: function() {
                      // dataTable 外围边框样式class
                      jQuery('#operating_personal_coupon_all_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                    },
                    drawCallback: function() {
                        jQuery( '.operating_personal_coupon_btn' ).unbind( 'click' )
                        jQuery( '.operating_personal_coupon_btn' ).click( function() {
                            if ( jQuery( this ).is( ':checked' ) ) {
                                $this.couponChangeOffId = jQuery( this ).attr( 'data-id' )
                            } else {
                                $this.couponChangeOffId = 0
                            }
                        } )
                    },
                    preDrawCallback: function() {
                        jQuery( '.form-control' ).attr( 'placeholder', '请输入优惠券名称' )
                    },
                    columns: [ {
                            data: 'coupon_name'
                        },
                        {
                            data: 'coupon_type',
                            render: function( data ) {
                                if ( data ) {
                                    let jsonObj = JSON.parse( data )
                                    return jsonObj.title
                                }
                                return ''
                            }
                        },
                        {
                            data: 'coupon_use_type',
                            render:function(data,type,full,meta){
                              if(data){
                                let jsonObj = JSON.parse(data);
                                if(jsonObj.code == 1){
                                  return jsonObj.title + '使用'
                                }
                                if(jsonObj.code == 2){
                                  return '消费满' + full.coupon_use_type_value + '元使用'
                                }
                              }else{
                                return ''
                              }
                            }
                        },
                        {
                            data: 'coupon_startdate_type_value'
                        },
                        {
                            data: "coupon_expiration_type_value",
                            render: function( data, type, full, meta ) {
                                if ( full.coupon_expiration_type == 1 ) {
                                    let jsonObj = JSON.parse( data )
                                    return jsonObj.eDate
                                } else if ( full.coupon_expiration_type == 2 ) {
                                    return data
                                }
                            }
                        },
                        {
                            data: 'id',
                            render: function( data, type, full, meta ) {
                                return '<label class="mt-radio  rechange_operation">' +
                                    '<input type="radio" class="operating_personal_coupon_btn" data-id="' + data + '" name="rechange_coupon"/>' +
                                    '<span></span>' +
                                    '</label>';
                            }
                        }
                    ]
                } )
                this.couponAllTb = couponAllTb
            } else {
                this.couponAllTb.ajax.reload()
            }

        },
        // 查看全部可用优惠券-浮层表格
        showCouponLayerTb() {
          if(this.pickedOperateType == 1){
            if ( JSON.stringify( this.couponLayerTb ) == '{}' ) {
                let $this = this
                let couponLayerTb = jQuery( '#operating_personal_coupon_layer_tb' ).DataTable( {
                    ajax: {
                        url: this.storageSiteUrl+'/api-json/xkhy/v2/userCoupon/' + this.currentMemberId,
                        type: 'GET',
                        data: {
                            is_member_id: true,
                            coupon_use_status: {
                                code: 1,
                                title: '未使用'
                            }
                        },
                        dataSrc: 'data',
                    },
                    lengthMenu: [ 20, 30, 50, 100, 200 ],
                    pageLength: 20,
                    order: [ 4, 'desc' ],
                    language: {
                        url: 'Chinese.json'
                    },
                    initComplete: function() {
                      // dataTable 外围边框样式class
                      jQuery('#operating_personal_coupon_layer_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                    },
                    preDrawCallback: function() {
                        jQuery( '.form-control' ).attr( 'placeholder', '请输入优惠券名称' )
                    },
                    drawCallback: function() {
                        couponLayerTb.off( 'click' );
                        couponLayerTb.on( 'click', 'tr', function() {
                            $this.couponLayerData = couponLayerTb.row( this ).data()
                        } )
                        jQuery( '.operating_personal_coupon_btn' ).unbind( 'click' )
                        jQuery( '.operating_personal_coupon_btn' ).click( function( e ) {
                            if ( jQuery( this ).is( ':checked' ) ) {
                                $this.couponPickedId = jQuery( this ).attr( 'data-id' )
                            } else {
                                $this.couponPickedId = 0
                            }
                            e.stopPropagation();
                        } )
                    },
                    columns: [ {
                            data: 'coupon_name'
                        },
                        {
                            data: 'coupon_type',
                            render: function( data ) {
                                if ( data ) {
                                    let jsonObj = JSON.parse( data )
                                    return jsonObj.title
                                }
                                return ''
                            }
                        },
                        {
                            data: 'coupon_use_type',
                            render:function(data,type,full,meta){
                              if(data){
                                let jsonObj = JSON.parse(data);
                                if(jsonObj.code == 1){
                                  return jsonObj.title + '使用'
                                }
                                if(jsonObj.code == 2){
                                  return '消费满' + full.coupon_use_type_value + '元使用'
                                }
                              }else{
                                return ''
                              }
                            }
                        },
                        {
                            data: 'coupon_startdate_type_value'
                        },
                        {
                            data: "coupon_expiration_type_value",
                            render: function( data, type, full, meta ) {
                                if ( full.coupon_expiration_type == 1 ) {
                                    let jsonObj = JSON.parse( data )
                                    return jsonObj.eDate
                                } else if ( full.coupon_expiration_type == 2 ) {
                                    return data
                                }
                            }
                        },
                        {
                            data: 'id',
                            render: function( data, type, full, meta ) {
                                return '<label class="mt-radio  rechange_operation">' +
                                    '<input type="radio" class="operating_personal_coupon_btn" data-id="' + data + '" name="rechange_coupon"/>' +
                                    '<span></span>' +
                                    '</label>';
                            }
                        }
                    ]
                } )
                this.couponLayerTb = couponLayerTb
            } else {
                this.couponLayerTb.ajax.reload()
            }
            this.showLayerTable = true
          }
        },
        // 确认选择浮层的优惠券到智能筛选列表
        pickedLayerCoupon() {
            // 如果之前已经选择了其他优惠券并进行了折扣，这里重新选择需要重置折扣
            this.inputDiscount = 0

            if ( this.couponPickedId > 0 ) {
                if ( JSON.stringify( this.couponTb ) == '{}' ) {
                    let $this = this
                    let couponTb = jQuery( '#operating_personal_coupon_tb' ).DataTable( {
                        data: [ this.couponLayerData ],
                        preDrawCallback: function() {
                            jQuery( '#operating_personal_coupon_tb_wrapper>div:first-child' ).css( 'display', 'none' )
                            jQuery( '#operating_personal_coupon_tb_wrapper>div:last-child' ).css( 'display', 'none' )
                        },
                        drawCallback: function() {
                            jQuery( '.operating_personal_coupon_btn' ).unbind( 'click' )
                            jQuery( '.operating_personal_coupon_btn' ).click( function() {
                                if ( jQuery( this ).is( ':checked' ) ) {
                                    $this.couponData = couponTb.data()[ 0 ] // 拿到优惠券对象的数据
                                    // console.log($this.couponData)
                                    // return
                                    let couponTypeObj = JSON.parse( $this.couponData.coupon_type )

                                    if ( couponTypeObj.code == 1 ) {
                                        $this.inputDiscount = $this.couponData.coupon_discount_price
                                    }
                                    if ( couponTypeObj.code == 2 ) {
                                        $this.inputDiscount = ( 10 - parseFloat( $this.couponData.coupon_discount_ratio ) ) / 10 * parseFloat( $this.inputMoneyChange ).toFixed( 2 )
                                    }

                                    $this.couponIsChecked = true
                                } else {
                                    $this.inputDiscount = 0
                                }
                            } )
                        },
                        language: {
                            url: 'Chinese.json'
                        },
                        columns: [
                            {
                                data: 'coupon_name'
                            },
                            {
                                data: 'coupon_type',
                                render: function( data ) {
                                    let jsonObj = JSON.parse( data )
                                    return jsonObj.title
                                }
                            },
                            {
                                data: 'coupon_use_type',
                                render:function(data,type,full,meta){
                                  if(data){
                                    let jsonObj = JSON.parse(data);
                                    if(jsonObj.code == 1){
                                      return jsonObj.title + '使用'
                                    }
                                    if(jsonObj.code == 2){
                                      return '消费满' + full.coupon_use_type_value + '元使用'
                                    }
                                  }else{
                                    return ''
                                  }
                                }
                            },
                            {
                                data: 'coupon_startdate_type_value'
                            },
                            {
                                data: "coupon_expiration_type_value",
                                render: function( data, type, full, meta ) {
                                    if ( full.coupon_expiration_type == 1 ) {
                                        let jsonObj = JSON.parse( data )
                                        return jsonObj.eDate
                                    } else if ( full.coupon_expiration_type == 2 ) {
                                        return data
                                    }
                                }
                            },
                            {
                                data: {},
                                render: function( data, type, full, meta ) {
                                    return '<label class="mt-radio  rechange_operation">' +
                                        '<input type="radio" class="operating_personal_coupon_btn" name="rechange_coupon"/>' +
                                        '<span></span>' +
                                        '</label>';
                                }
                            }
                        ]
                    } );
                    this.couponTb = couponTb
                } else {
                    this.couponTb.clear()
                    this.couponTb.row.add( this.couponLayerData )
                    this.couponTb.draw()
                }
            }
            // this.couponTb.ajax().data = this.couponLayerData
            // console.log(this.couponTb.ajax())
            this.showLayerTable = false
        },
        // 智能筛选获取可用的优惠券
        getAvailableCoupon() {
            let $this = this
            // 扣减状态才去获取可用的优惠券
            if ( this.pickedOperateType == 1 ) {
                let couponTb = jQuery( '#operating_personal_coupon_tb' ).DataTable( {
                    ajax: {
                        url: this.storageSiteUrl+'/api-json/xkhy/v1/userCoupon/' + this.currentMemberId,
                        type: 'GET',
                        data: {
                            is_member_id: true,
                            exec_filter: true,
                            input_money_change: this.inputMoneyChange
                        },
                        dataSrc: 'data',
                        // success: function(res) {
                        //   console.log(res)
                        // }
                    },
                    destroy: true,
                    lengthMenu: [ 5 ],
                    preDrawCallback: function() {
                        jQuery( '#operating_personal_coupon_tb_wrapper>div:first-child' ).css( 'display', 'none' )
                        jQuery( '#operating_personal_coupon_tb_wrapper>div:last-child' ).css( 'display', 'none' )
                    },
                    initComplete: function() {
                        jQuery( '.operating_personal_coupon_btn' ).unbind( 'click' )
                        jQuery( '.operating_personal_coupon_btn' ).click( function() {
                            if ( jQuery( this ).is( ':checked' ) ) {
                                $this.couponData = couponTb.ajax.json().data[ 0 ] // 拿到优惠券对象的数据
                                let couponTypeObj = JSON.parse( $this.couponData.coupon_type )

                                if ( couponTypeObj.code == 1 ) {
                                    $this.inputDiscount = $this.couponData.coupon_discount_price
                                }
                                if ( couponTypeObj.code == 2 ) {
                                    $this.inputDiscount = ( 10 - parseFloat( $this.couponData.coupon_discount_ratio ) ) / 10 * parseFloat( $this.inputMoneyChange ).toFixed( 2 )
                                }

                                $this.couponIsChecked = true
                            } else {
                                $this.inputDiscount = 0
                            }
                        } )
                    },
                    language: {
                        url: 'Chinese.json'
                    },
                    columns: [
                        {
                            data: 'coupon_name'
                        },
                        {
                            data: 'coupon_type',
                            render: function( data ) {
                                let jsonObj = JSON.parse( data )
                                return jsonObj.title
                            }
                        },
                        {
                            data: 'coupon_use_type',
                            render:function(data,type,full,meta){
                              if(data){
                                let jsonObj = JSON.parse(data);
                                if(jsonObj.code == 1){
                                  return jsonObj.title + '使用'
                                }
                                if(jsonObj.code == 2){
                                  return '消费满' + full.coupon_use_type_value + '元使用'
                                }
                              }else{
                                return ''
                              }
                            }
                        },
                        {
                            data: 'coupon_startdate_type_value'
                        },
                        {
                            data: "coupon_expiration_type_value",
                            render: function( data, type, full, meta ) {
                                if ( full.coupon_expiration_type == 1 ) {
                                    let jsonObj = JSON.parse( data )
                                    return jsonObj.eDate
                                } else if ( full.coupon_expiration_type == 2 ) {
                                    return data
                                }
                            }
                        },
                        {
                            data: {},
                            render: function( data, type, full, meta ) {
                                return '<label class="mt-radio  rechange_operation">' +
                                    '<input type="radio" class="operating_personal_coupon_btn" name="rechange_coupon"/>' +
                                    '<span></span>' +
                                    '</label>';
                            }
                        }
                    ]
                } );
                this.couponTb = couponTb
            }
        },
        // 监听输入金额，并刷新可用的优惠券表格
        freshAvailableCoupon() {
            if ( JSON.stringify( this.couponTb ) != '{}' ) {
                this.couponTb.settings()[ 0 ].ajax.data = {
                    is_member_id: true,
                    exec_filter: true,
                    input_money_change: this.inputMoneyChange
                }
                this.couponTb.ajax.url( this.storageSiteUrl+'/api-json/xkhy/v1/member/' + this.currentMemberId ).load() // 这里后期优化
                this.inputDiscount = 0
            }
        },
        execTrade() {
            if(this.inputMoneyChange >0 ){
              this.showBgShadow = true
              this.showDialog[ 0 ].trade = true
              this.showDialog[ 0 ].tradeMsg = '您确认此次操作?'
            }else{
              this.showOperatingShadow = true
              this.showOperatingDialog[0].fail = true
              this.showOperatingDialog[0].failMsg = '请先输入操作金额！'
            }

        },
        execTradedGo() {
            this.showBgShadow = !this.showBgShadow
            this.showloading = true
            // 本次交易结算类型：扣减
            if ( this.pickedOperateType == 1 ) {
                this.showloading = false
                // 是否使用了可用的优惠券
                if ( this.couponIsChecked == true ) {
                    var data = {
                        exec_trade: true,
                        money_change: this.moneyChange,
                        change_type: this.pickedOperateType,
                        operator_user_id: this.currentOperatorUserId,
                        userCoupon_id: this.couponData.id, //区别于未使用优惠券的扣减
                        input_money_change: this.inputMoneyChange, //区别于未使用优惠券的扣减
                    }
                } else {
                    var data = {
                        exec_trade: true,
                        money_change: this.moneyChange,
                        change_type: this.pickedOperateType,
                        operator_user_id: this.currentOperatorUserId,
                    }
                }
            }
            // 本次交易结算类型：充值
            if ( this.pickedOperateType == 2 ) {
                this.showloading = false
                var data = {
                    exec_trade: true,
                    money_change: this.moneyChange,
                    change_type: this.pickedOperateType,
                    operator_user_id: this.currentOperatorUserId,
                }
            }
            if ( this.inputMoneyChange > 0 ) {
                let $this = this
                jQuery.ajax( {
                    url: this.storageSiteUrl+'/api-json/xkhy/v2/member/' + this.currentMemberId,
                    type: 'PUT',
                    data: {
                        update_obj: data
                    },
                    dataType: 'json',
                    success: function( res ) {
                        if ( res.erron === 0 ) {
                            // $this.showBgShadow = !$this.showBgShadow
                            $this.showloading = false
                            $this.$router.push( {
                                name: 'operating_home'
                            } )
                        } else {
                            // $this.showBgShadow = !$this.showBgShadow
                            $this.showloading = false
                            $this.showOperatingShadow = true
                            $this.showOperatingDialog[ 0 ].fail = true
                            $this.showOperatingDialog[ 0 ].failMsg = res.message
                        }
                    }
                } )
            }
        },
        // 确认充值或扣减、取消按钮
        execTradedBack() {
            this.showBgShadow = false
        },
        // 核销优惠券
        execChangeOff() {
            // 判断是否已选可选优惠券
            if ( this.couponChangeOffId > 0 ) {
                this.showCodeShadow = true
                this.showCodeDialog[ 0 ].code = true
                this.showCodeDialog[ 0 ].codeMsg = '您确认此次操作!'
            } else {
                this.showOperatingShadow = true
                this.showOperatingDialog[ 0 ].fail = true
                this.showOperatingDialog[ 0 ].failMsg = '请先选择优惠券!'
            }
        },
        execCodeGo() {
            this.showCodeShadow = !this.showCodeShadow
            this.showloading = true;
            let $this = this
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v2/userCoupon/' + this.couponChangeOffId,
                type: 'PUT',
                data: {
                    exec_charge_off: true,
                    operator_user_id: this.currentOperatorUserId
                },
                dataType: 'json',
                success: function( res ) {
                    // console.log( res )
                    if ( res.erron === 0 ) {
                        $this.showloading = false;
                        $this.$router.push( {
                            name: 'operating_home',
                            query: {
                                tableShowIdx: 2
                            }
                        } )
                    } else {
                        $this.showloading = false;
                        $this.showOperatingShadow = true
                        $this.showOperatingDialog[ 0 ].fail = true
                        $this.showOperatingDialog[ 0 ].failMsg = '此次操作失败!'
                    }
                }
            } )
        },
        /*核销优惠券取消按钮*/
        execCodeBack() {
            this.showCodeShadow = false
        },
        // 此次操作失败或者没有选择优惠券的弹窗
        execfailGo() {
            this.showOperatingShadow = false
        }
    },
    filters: {
        formatUserSex( val ) {
            if ( val == 1 )
                return '男'
            if ( val == 2 )
                return '女'
        }
    },
    created() {
        let $this = this
        jQuery.ajax( {
            url: this.storageSiteUrl+'/api-json/xkhy/v1/member/' + this.currentMemberId,
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function( res ) {
                if ( res.erron === 0 ) {
                    $this.memberInfo = res.data
                }
            }
        } )
    },
    mounted() {
       // 控制左边导航栏页面点击刷新的时候样式保留
        jQuery( '.public-home' ).removeClass( 'open' )
        jQuery( '.page-operatepage' ).addClass( 'open' )
        jQuery( '.public-home ul' ).hide();
        jQuery( '.operateMenu' ).show();
        // let $this = this
        // jQuery('#service').DataTable({
        //   "ajax": "consumption.txt",
        //   "pagingType": "simple_numbers",
        //   "language": {
        //     url: 'Chinese.json'
        //   },
        //   "columns": [{
        //       "data": "user_id"
        //     },
        //     {
        //       "data": "user_wxnickname"
        //     },
        //     {
        //       "data": "user_wxheadimgurl"
        //     },
        //     {
        //       "data": "grade"
        //     },
        //     {
        //       "data": "balance"
        //     },
        //   ]
        // });
        // jQuery('#available_coupon').DataTable({
        //   "ajax": "consumption.txt",
        //   "pagingType": "simple_numbers",
        //   'lengthMenu': [
        //     [-1],
        //     ['全部']
        //   ],
        //   initComplete: function() {
        //     jQuery('#operating_personal_coupon_btn').unbind('click')
        //     jQuery('#operating_personal_coupon_btn').click(function() {
        //       console.log(jQuery(this).attr('name'))
        //     })
        //   },
        //   'buttons': [
        //     'pageLength'
        //   ],
        //   "language": {
        //     url: 'Chinese.json'
        //   },
        //   "columns": [{
        //       "data": "user_id"
        //     },
        //     {
        //       "data": "user_wxnickname"
        //     },
        //     {
        //       "data": "user_wxheadimgurl"
        //     },
        //     {
        //       "data": "grade"
        //     },
        //     {
        //       "data": "operation",
        //       "render": function(data, type, full, meta) {
        //         return '<label class="mt-radio  rechange_operation">' +
        //           '<input type="radio" id="operating_personal_coupon_btn" name="rechange_coupon"/>' +
        //           '<span></span>' +
        //           '</label>';
        //       }
        //     }
        //   ]
        // });




        // jQuery('#operating_personal_coupon_all_tb').DataTable({
        //   "ajax": "consumption.txt",
        //   "pagingType": "simple_numbers",
        //   'lengthMenu': [
        //     [5, 10, -1],
        //     ['5', '10', '全部']
        //   ],
        //   'buttons': [
        //     'pageLength'
        //   ],
        //   "language": {
        //     url: 'Chinese.json'
        //   },
        //   "columns": [{
        //       "data": "user_id"
        //     },
        //     {
        //       "data": "user_wxnickname"
        //     },
        //     {
        //       "data": "user_wxheadimgurl"
        //     },
        //     {
        //       "data": "grade"
        //     },
        //     {
        //       "data": "operation",
        //       "render": function(data, type, full, meta) {
        //         return '<label class="mt-radio rechange_operation">' +
        //           '<input type="radio" name="use_coupon"/>' +
        //           '<span></span>' +
        //           '</label>';
        //       }
        //     }
        //   ]
        // });
        // tab切换
        // jQuery(function() {
        //   window.onload = function() {
        //     var $li = $('#tab li');
        //     var $ul = $('#content ul');
        //     $li.click(function() {
        //       var $this = $(this);
        //       var $t = $this.index();
        //       $li.removeClass();
        //       $this.addClass('current');
        //       $ul.css('display', 'none');
        //       $ul.eq($t).css('display', 'block');
        //     })
        //   }
        // });
        //根据jQuery选择器找到需要加载ystep的容器
        //loadStep 方法可以初始化ystep
        jQuery( ".ystep" ).loadStep( {
            //ystep的外观大小
            //可选值：small,large
            size: "small",
            //ystep配色方案
            //可选值：green,blue
            color: "lightblue",
            //ystep中包含的步骤
            steps: [ {
                //步骤名称
                // title: "普通会员",
            }, {
                // title: "白银会员",
            }, {
                // title: "黄金会员",
            }, {
                // title: "铂金会员",
            }, {
                // title: "钻石会员",
            } ]
        } );
        jQuery( ".ystep" ).setStep( 0 );
        // jQuery('.selectcoupon_right').click(function() {
        //   jQuery('.floating_layer').show();
        //   // 弹出浮层时禁止底部页面滚动
        //   document.documentElement.style.overflowY = "hidden";
        // })
        // jQuery('.layer_title').click(function() {
        //   jQuery('.floating_layer').hide();
        //   // 关闭浮层时页面可以滚动
        //   document.documentElement.style.overflowY = "scroll";
        // })
        // 确认
        // jQuery('.layer_confirm').click(function() {
        //   jQuery('.floating_layer').hide();
        // })
    }
}
</script>

<style lang="css" scoped>
@import '../../assets/css/dataTable.css';
@import '../../assets/css/editystep.css';

.membership {
  background: #eee;
  /*height: 3rem;*/
  margin: 0.7rem 0;
  padding-bottom: 30px;
}

.membership_head {
  text-align: center;
}
.membership_head img {
  width: 55px;
  margin-top: -25px;
  border-radius: 50%;
}
.membership_line {
  width: 90%;
  border: 1px solid #E5E5E5;
  margin-left: 5%;
  margin-top: 10px;
}
.membership_space {
  margin-top: 0.2rem;
  padding: 0 12%;
}
.membership_left{
  text-align: left;
  padding:0;
  display: inline-block;
  width: 60px;
}
.membership_right{
  text-align: left;
  padding: 0;
  display: inline-block;
}

/*tab标签*/
#tab {
  overflow: hidden;
  zoom: 1;
}

#tab li {
  float: left;
  cursor: pointer;
  padding: 0 10px;
  /*margin-top: 0.3rem;*/
  color:rgba(64,67,72,0.5);
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
}

#tab li.current {
  text-align: center;
  border-radius: 5px;
  color: #404348;
  text-decoration: none;
}
#content {
  border-top-width: 0;
}

/**/
.records {
  background: #eee;
  height: 45px;
  margin: 0.5rem 0;
  margin-bottom: 6px;
  line-height: 45px;
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

/*充值*/
.select_coupon {
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  margin: 0;
  padding: 0;
}
.select_coupon>div:nth-child(1) {
  padding-top: 0.2rem;
}
.selectcoupon_right {
  width: 80px;
  height: 0.5rem;
  line-height: 0.5rem;
  display: block;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  float: right;
  margin: 0.2rem auto;
  color: #fff;
  cursor: pointer;
}
.recharge_balance {
  background: #F5F5F5;
  line-height: 0.6rem;
  text-align: center;
  color: #E84C3A;
  font-size: 18px;
  font-weight: bold;
}
.recharge_right {
  text-align: right;
  margin: 0.8rem 0;
  height: 1.4rem;
  line-height: 1.4rem;
  border-right: 1px solid #eee;
}
.recharge_right>label:nth-child(1) {
  font-size: 20px;
  color: #E84C3A;
}
.recharge_right>label:nth-child(2) {
  font-size: 30px;
  color: #E84C3A;
}
.recharge_left {
  text-align: left;
  height: 1.4rem;
  margin: 0.8rem 0rem;
}
.recharge_left input[type=text] {
  height: 0.4rem;
  width: 15%;
  text-align: center;
  margin-top: 0.3rem;
  margin-left: 6%;
}
.recharge_money {
  height: 3rem;
  border: 1px solid #eee;
}
@media (max-width: 1000px) {
  .recharge_left {
    text-align: right;
  }
}

.calculation {
  text-align: right;
  font-size: 20px;
  /*line-height: 1rem;*/
  margin-top: 5px;
}
.showcoupon_confirm {
  width: 80px;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-right: 15px;
  margin-top:15px;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  float: right;
  color: #fff;
  cursor: pointer;
}

.layer_confirm {
  width: 80px;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  margin: 0.2rem auto;
  color: #fff;
  cursor: pointer;
}

.edit_service {
  margin: 0;
  padding: 0;
}

.add_service {
  width: 10%;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  margin: 0.3rem auto;
  color: #fff;
  cursor: pointer;
  display: inline-block;
}

.new_add {
  width: 10%;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  margin: 0.3rem auto;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  float: right;
}

.new_reduce {
  margin-left: 3% !important;
  width: 60px;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  margin: 0.3rem auto;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  float: right;
}

.write_off {
  width: 60px;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #E94C3A;
  border-radius: 5px;
  text-align: center;
  margin: 0.3rem auto;
  float: right;
  color: #fff;
  cursor: pointer;
}
</style>
