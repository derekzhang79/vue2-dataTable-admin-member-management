<template lang="html">
   <div class="page-content-wrapper">
        <div class="page-content" :class="{'page-content-closed':menushirinkStatus}">
            <div class="page-bar">
                <div>个人中心</div>
            </div>
            <div class="row membership">
                <div class="membership_head"><img :src="memberInfo.wx_headimgurl" alt=""></div>
                <div v-if="isViewStatus" class="edit" @click="activeEditStatus">编辑</div>
                <div v-else class="save" @click="saveUserInfo(memberInfo.id)">保存</div>
                <!-- 确认保存弹窗提示 -->
                <div class="floating_layer" v-show="showNoticeMsg">
                    <div class="layerInfo">
                       <ul class="prompt" >
                            <li>温馨提示</li>
                            <li>手机号码有误,请重新填写！</li>
                            <li><span @click="closeNoticeMsg">确认</span></li>
                        </ul>
                    </div>
                </div>
                <div class="ystep"></div>
                <div class="growthgrade">
                    <div>普通会员</div>
                    <div>白银会员</div>
                    <div>黄金会员</div>
                    <div>铂金会员</div>
                    <div>钻石会员</div>
                </div>
                <div class="membership_line"></div>
                <div class="row membership_space">
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">会员ID</div>
                        <div class="membership_right">{{memberInfo.member_number}}</div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">微信昵称</div>
                        <div class="membership_right">{{memberInfo.wx_nickname}}</div>
                    </div>
                     <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">真实姓名</div>
                        <div v-if="isViewStatus" class="membership_right">{{memberInfo.user_real_name}}</div>
                        <input v-else class="membership_right userinfo_input" v-model="memberInfo.user_real_name" maxlength="5">
                    </div>
                     <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">积分</div>
                        <div class="membership_right">0</div>
                    </div>
                </div>
                <div class="row membership_space">
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">手机号</div>
                        <div v-if="isViewStatus" class="membership_right">{{memberInfo.user_real_mobilephone}}</div>
                        <input v-else class="membership_right userinfo_input tel" v-model="memberInfo.user_real_mobilephone">

                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">性别</div>
                        <div v-if="isViewStatus" class="membership_right">{{memberInfo.user_real_sex}}</div>
                        <!-- <input v-else class="membership_right userinfo_input" v-model="memberInfo.user_real_sex"> -->
                        <select v-else name="" id="" class="membership_right userinfo_input" v-model="memberInfo.user_real_sex">
                            <option value="男" >男</option>
                            <option value="女" >女</option>
                        </select>

                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">生日</div>
                        <div v-if="isViewStatus" class="membership_right">{{memberInfo.user_real_birthday}}</div>
                        <input v-else type="date" class="membership_right userinfo_input" v-model="memberInfo.user_real_birthday">
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 ">
                        <div class="membership_left">地区</div>
                        <div class="membership_right">{{`${memberInfo.user_real_province} ${memberInfo.user_real_city}`}}</div>
                    </div>
                </div>
                <div class="row membership_space">
                    <div class="remark">
                        <div class="membership_left">备注</div>
                        <div v-if="isViewStatus" class="membership_right">{{memberInfo.vender_remark}}</div>
                        <input v-else class="membership_right userinfo_input" v-model="memberInfo.vender_remark" maxlength="100">

                    </div>
                </div>
            </div>
            <!-- 服务列表 -->
            <!-- <div class="row records">
                <div class="col-lg-12 col-md-12 col-sm-24 col-xs-48 ">
                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-4 operating_history">服务列表</div>
                    <ul id="tab_service" class="tab col-lg-8 col-md-8 col-sm-16 col-xs-32">
                        <li class="current">全部</li>
                        <li>进行中</li>
                        <li>已完成</li>
                    </ul>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 view_all" id="service_view">查看全部</div>
                </div>
            </div> -->
            <!-- 服务列表content -->
            <!-- <div id="content_service">
                <ul  class="row" style="display:block;">
                    <div class="col-md-12 col-sm-12">
                        <table id="service_list" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>服务名称</th>
                                    <th>类型</th>
                                    <th>剩余次数</th>
                                    <th>失效时间</th>
                                    <th>状态</th>
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
                    </div>
                </ul>
            </div> -->
             <!-- 点击查看服务列表全部的浮层 -->
            <!-- <div class="floating_layer" id="service_layer">
                <div class='layer_frame'>
                    <div class="layer_title">
                        <div >服务列表</div>
                        <img src="../../assets/images/layer_close.png" alt="" >
                    </div>
                    <div class="layer_table">
                        <table id="service_whole" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>服务名称</th>
                                    <th>类型</th>
                                    <th>剩余次数</th>
                                    <th>失效时间</th>
                                    <th>状态</th>
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
                    </div>
                    <div class='layer_confirm'>确认</div>
                </div>
            </div> -->

            <!-- 优惠卡券 -->
            <div class="records public-title-two more-index-title">
                    <div class="operating_history">优惠卡券</div>
                    <ul id="tab_coupon" class="tab nav nav-tabs">
                        <!-- <li :class="{current:couponAll}" @click="getCouponAll">全部</li> -->
                        <li :class="{current:couponNotUsed}" @click="getCouponNotUsed"><a>未使用</a></li>
                        <li :class="{current:couponUsed}" @click="getCouponUsed"><a>已使用</a></li>
                        <li :class="{current:couponExp}" @click="getCouponExp"><a>已过期</a></li>
                    </ul>
                    <div class="view_all" id="member_personalCenter_coupon_all_btn" @click="showCouponAll()" >查看全部 ></div>
            </div>
            <!-- 优惠卡券content -->
            <div id="content_coupon">
                <ul  class="row" style="display:block;">
                    <div class="col-md-12 col-sm-12">
                        <table id="member_personalCenter_coupon_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <!-- <th>ID</th> -->
                                    <th>优惠券名称</th>
                                    <th>类型</th>
                                    <th>使用条件</th>
                                    <th>领取时间</th>
                                    <th>失效时间</th>
                                    <th>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="6">加载中...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ul>
            </div>
            <!-- 点击查看优惠卡券全部的浮层 -->
            <div v-show="showCouponAllList" class="floating_layer" id="coupon_layer">
                <div class="layerInfo">
                    <div class='layer_frame'>
                        <div class="layer_title">
                            <div >优惠卡券列表</div>
                            <img src="../../assets/images/layer_close.png" alt="" @click="showCouponAllList = !showCouponAllList">
                        </div>
                        <div class="layer_table">
                            <table id="member_personalCenter_coupon_all_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>优惠券名称</th>
                                        <th>类型</th>
                                        <th>领取时间</th>
                                        <th>失效时间</th>
                                        <th>状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="6"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class='layer_confirm' @click="showCouponAllList = !showCouponAllList">确认</div>
                    </div>
                </div>
            </div>
            <!--  消费记录的-->
            <div class="records public-title-two more-index-title">
                <div class="operating_history">消费记录</div>
                <ul id="tab_consumption" class="tab nav nav-tabs">
                    <!-- <li class="current">全部</li> -->
                    <li class="current"><a>金额</a></li>
                    <!-- <li>服务</li> -->
                </ul>
                <div class="view_all" id="consumption_view" @click="showConsumptionAll">查看全部 ></div>
            </div>
            <!--  -->
            <div id="content_consumption">
                <ul  class="row" style="display:block;">
                    <div class="col-md-12 col-sm-12">
                        <table id="member_personalCenter_consumption_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>消费金额</th>
                                    <th>优惠抵扣</th>
                                    <th>类型</th>
                                    <th>操作时间</th>
                                    <th>操作状态</th>
                                    <!-- <th>使用门店</th> -->
                                    <th>实付金额</th>
                                    <th>操作员</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="8">加载中...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ul>
            </div>
            <!-- 点击查看消费记录全部的浮层 -->
            <div v-show="showConsumptionAllList" class="floating_layer" id="consumption_layer">
                <div class="layerInfo">
                    <div class='layer_frame'>
                        <div class="layer_title">
                            <div >消费记录列表</div>
                            <img src="../../assets/images/layer_close.png" alt="" @click="showConsumptionAllList = !showConsumptionAllList">
                        </div>
                        <div class="layer_table">
                            <table id="member_personalCenter_consumption_all_tb" class="table table-bordered table-hover datatables_center" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>消费金额</th>
                                        <th>优惠抵扣</th>
                                        <th>类型</th>
                                        <th>操作时间</th>
                                        <th>操作状态</th>
                                        <!-- <th>使用门店</th> -->
                                        <th>实付金额</th>
                                        <th>操作员</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="8">加载中...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class='layer_confirm' @click="showConsumptionAllList = !showConsumptionAllList">确认</div>
                    </div>
                </div>
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
            memberInfo: {}, // 会员基本信息对象数据
            isViewStatus: true, // 会员基本信息是显示or编辑状态
            showNoticeMsg: false,
            couponTb: {},
            // couponAll: true,
            couponNotUsed: true,
            couponUsed: false,
            couponExp: false,
            showCouponAllList: false, // 显示所有的优惠卡券浮层
            couponAllTb: {}, // 显示所有的优惠卡券table对象
            showConsumptionAllList: false, // 显示所有的消费记录浮层
            consumptionAllTb: {} // 显示所有的消费记录table对象
        }
    },
    props: [ 'menushirinkStatus' ], // 是否显示缩放菜单栏
    methods: {
        activeEditStatus() {
            this.isViewStatus = !this.isViewStatus
        },
        saveUserInfo( member_id ) {
            let $this = this
            // var phone = $('.tel').val;
            var phone = $this.memberInfo.user_real_mobilephone;
            if ( !( /^1[3|4|5|7|8]\d{9}$/.test( phone ) ) ) {
                $this.showNoticeMsg = !$this.showNoticeMsg;
                return;
            }
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v1/member/' + member_id,
                type: 'PUT',
                data: {
                    update_obj: this.memberInfo
                },
                dataType: 'json',
                success: function( res ) {
                    $this.isViewStatus = !$this.isViewStatus
                    $this.isViewDate = false
                }
            } )
        },
        closeNoticeMsg() {
            this.showNoticeMsg = false;
        },
        // getCouponAll() {
        //   this.couponTb.on('preXhr.dt', function(e, settings, data) {
        //     let order_number = data.order[0].column
        //     let order_dir = data.order[0].dir
        //     let order_column = data.columns[order_number].data
        //
        //     settings.ajax.data = {
        //       draw: data.draw,
        //       start: data.start,
        //       length: data.length,
        //       search_value: data.search.value,
        //       order_column: order_column,
        //       order_dir: order_dir,
        //       is_member_id: true,
        //       serviceSide_mode: true
        //     }
        //   })
        //   this.couponTb.ajax.reload()
        //   this.couponAll = true
        //   this.couponNotUsed = false
        //   this.couponUsed = false
        //   this.couponExp = false
        // },
        getCouponNotUsed() {
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
                    is_member_id: true,
                    coupon_use_status: {
                        code: 1,
                        title: '未使用'
                    },
                    serviceSide_mode: true
                }
            } )
            this.couponTb.ajax.reload()
            // this.couponAll = false
            this.couponNotUsed = true
            this.couponUsed = false
            this.couponExp = false
        },
        getCouponUsed() {
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
                    is_member_id: true,
                    coupon_use_status: {
                        code: 2,
                        title: '已使用'
                    },
                    serviceSide_mode: true
                }
            } )
            this.couponTb.ajax.reload()
            // this.couponAll = false
            this.couponNotUsed = false
            this.couponUsed = true
            this.couponExp = false
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
                    is_member_id: true,
                    coupon_use_status: {
                        code: 3,
                        title: '已过期'
                    },
                    serviceSide_mode: true
                }
            } )
            this.couponTb.ajax.reload()
            // this.couponAll = false
            this.couponNotUsed = false
            this.couponUsed = false
            this.couponExp = true
        },
        showCouponAll() {
            this.showCouponAllList = true
            let $this = this
            if ( JSON.stringify( this.couponAllTb ) == '{}' ) {
                let couponAllTb = jQuery( '#member_personalCenter_coupon_all_tb' )
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
                            is_member_id: true,
                            serviceSide_mode: true
                        }
                    } )
                    .DataTable( {
                        ajax: {
                            url: this.storageSiteUrl+'/api-json/xkhy/v1/userCoupon/' + this.$route.params.member_id,
                            type: 'GET',
                            data: {
                                is_member_id: true,
                                serviceSide_mode: true
                            },
                            dataSrc: 'data',
                        },
                        lengthMenu: [ 20, 30, 50, 100, 200 ],
                        pageLength: 20,
                        processing: true,
                        serverSide: true,
                        order: [
                            [ 2, 'desc' ]
                        ],
                        initComplete: function() {
                          // dataTable 外围边框样式class
                          jQuery('#member_personalCenter_coupon_all_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                        },
                        preDrawCallback: function() {
                            jQuery( '.form-control' ).attr( 'placeholder', '请输入优惠券名称' )
                        },
                        language: {
                            url: 'Chinese.json'
                        },
                        columns: [
                            {
                                data: 'coupon_name'
                            },
                            {
                                data: "coupon_type",
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
                                data: 'coupon_expiration_type_value',
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
                                data: 'coupon_use_status',
                                render: function( data ) {
                                    let jsonObj = JSON.parse( data )
                                    return jsonObj.title
                                }
                            }
                        ]
                    } );
                $this.couponAllTb = couponAllTb
            } else {
                this.couponAllTb.ajax.reload()
            }
        },
        showConsumptionAll() {
            this.showConsumptionAllList = true
            let $this = this
            if ( JSON.stringify( this.consumptionAllTb ) == '{}' ) {
                let consumptionAllTb = jQuery( '#member_personalCenter_consumption_all_tb' )
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
                            is_member_id: true,
                            serviceSide_mode: true
                        }
                    } )
                    .DataTable( {
                        ajax: {
                            url: this.storageSiteUrl+'/api-json/xkhy/v2/member_log/' + this.$route.params.member_id,
                            type: 'GET',
                            data: {
                                is_member_id: true,
                                serviceSide_mode: true
                            },
                            dataType: 'json',
                            // success: function(res) {
                            //   console.log(res)
                            // }
                        },
                        lengthMenu: [ 20, 30, 50, 100, 200 ],
                        pageLength: 20,
                        processing: true,
                        serverSide: true,
                        order: [
                            [ 3, 'desc' ]
                        ],
                        initComplete: function() {
                          // dataTable 外围边框样式class
                          jQuery('#member_personalCenter_consumption_all_tb_wrapper').addClass('dataTables_wrapper_outer_border');
                        },
                        preDrawCallback: function() {
                            jQuery( '.form-control' ).attr( 'placeholder', '请输入优惠抵扣' )
                            jQuery( '#member_personalCenter_consumption_tb_wrapper>div:first-child,#member_personalCenter_consumption_tb_wrapper>div:last-child' ).hide()
                        },
                        language: {
                            url: 'Chinese.json'
                        },
                        columns: [ {
                                data: 'money_change',
                                render: function( data, type, full, meta ) {
                                    let typeObj = JSON.parse( full.type )
                                    if ( typeObj.code == 1 ) {
                                        return '-' + data
                                    }
                                    if ( typeObj.code == 2 || typeObj.code == 3 ) {
                                        return '+' + data
                                    }
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
                                    return ''
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
                                    return ''
                                }
                            },
                            // {
                            //   data: 'operator_store',
                            // },
                            {
                                data: 'money_real_change',
                                render: function( data, type, full, meta ) {
                                    let typeObj = JSON.parse( full.type )
                                    if ( typeObj.code == 1 ) {
                                        return '-' + data
                                    }
                                    if ( typeObj.code == 2 || typeObj.code == 3 ) {
                                        return '+' + data
                                    }
                                }
                            },
                            {
                                data: 'operator_name',
                            },
                        ]
                    } );
                $this.consumptionAllTb = consumptionAllTb
            } else {
                this.consumptionAllTb.ajax.reload()
            }
        },
    },
    created() {
        let $this = this
        // 获取会员基本信息
        jQuery.ajax( {
            url: this.storageSiteUrl+'/api-json/xkhy/v1/member/' + this.$route.params.member_id,
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function( res ) {
                if ( res.erron === 0 ) {
                    if ( res.data.user_real_sex == 1 )
                        res.data.user_real_sex = '男'
                    if ( res.data.user_real_sex == 2 )
                        res.data.user_real_sex = '女'
                    $this.memberInfo = res.data
                }
            }
        } )

    },
    mounted() {
        // 控制左边导航栏刷新的时候样式
        jQuery( '.public-home' ).removeClass( 'open' )
        jQuery( '.page-memberpage' ).addClass( 'open' )
        jQuery( '.public-home ul' ).hide();
        jQuery( '.memberMenu' ).show();
        // 获取会员优惠券信息
        let couponTb = jQuery( '#member_personalCenter_coupon_tb' )
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
                    is_member_id: true,
                    coupon_use_status: {
                        code: 1,
                        title: '未使用'
                    },
                    serviceSide_mode: true
                }
            } )
            .DataTable( {
                ajax: {
                    url: this.storageSiteUrl+'/api-json/xkhy/v2/userCoupon/' + this.$route.params.member_id,
                    type: 'GET',
                    data: {
                        is_member_id: true,
                        serviceSide_mode: true
                    },
                    dataType: 'json',
                    // success: function(res) {
                    //   console.log(res)
                    // }
                },
                lengthMenu: [ 1, 2, 3, 5, 10 ],
                pageLength: 5,
                processing: true,
                serverSide: true,
                order: [
                    [ 0, 'desc' ]
                ],
                preDrawCallback: function() {
                    jQuery( '#member_personalCenter_coupon_tb_wrapper>div:first-child,#member_personalCenter_coupon_tb_wrapper>div:last-child' ).hide()
                },
                language: {
                    url: 'Chinese.json'
                },
                columns: [
                    {
                        data: 'coupon_name'
                    },
                    {
                        data: "coupon_type",
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
                        data: 'coupon_expiration_type_value',
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
                        data: 'coupon_use_status',
                        render: function( data ) {
                            let jsonObj = JSON.parse( data )
                            return jsonObj.title
                        }
                    }
                ]
            } );
        this.couponTb = couponTb
        // 获取会员消费记录信息
        let consumptionTb = jQuery( '#member_personalCenter_consumption_tb' )
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
                    is_member_id: true,
                    serviceSide_mode: true
                }
            } )
            .DataTable( {
                ajax: {
                    url: this.storageSiteUrl+'/api-json/xkhy/v2/member_log/' + this.$route.params.member_id,
                    type: 'GET',
                    data: {
                        is_member_id: true,
                        serviceSide_mode: true
                    },
                    dataSrc: 'data',
                },
                lengthMenu: [ 1, 2, 3, 5, 10 ],
                pageLength: 5,
                processing: true,
                serverSide: true,
                order: [
                    [ 0, 'desc' ]
                ],
                preDrawCallback: function() {
                    jQuery( '#member_personalCenter_consumption_tb_wrapper>div:first-child,#member_personalCenter_consumption_tb_wrapper>div:last-child' ).hide()
                },
                language: {
                    url: 'Chinese.json'
                },
                columns: [ {
                        data: 'money_change',
                        render: function( data, type, full, meta ) {
                            let typeObj = JSON.parse( full.type )
                            if ( typeObj.code == 1 ) {
                                return '-' + data
                            }
                            if ( typeObj.code == 2 || typeObj.code == 3 ) {
                                return '+' + data
                            }
                        }
                    },
                    {
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
                        data: 'create_date'
                    },
                    {
                        data: 'type',
                        render: function( data ) {
                            if ( data ) {
                                let jsonObj = JSON.parse( data )
                                return jsonObj.title
                            }
                            return ''
                        }
                    },
                    // {
                    //   data: 'operator_store',
                    // },
                    {
                        data: 'money_real_change',
                        render: function( data, type, full, meta ) {
                            let typeObj = JSON.parse( full.type )
                            if ( typeObj.code == 1 ) {
                                return '-' + data
                            }
                            if ( typeObj.code == 2 || typeObj.code == 3 ) {
                                return '+' + data
                            }
                        }
                    },
                    {
                        data: 'operator_name',
                    },
                ]
            } );
        this.couponTb = couponTb

        // 服务列表的查看全部按钮
        jQuery( '#service_whole' ).DataTable( {
            "ajax": "consumption.txt",
            "pagingType": "simple_numbers",
            'lengthMenu': [
                [ -1 ],
                [ '全部' ]
            ],
            'buttons': [
                'pageLength'
            ],
            "language": {
                url: 'Chinese.json'
            },
            "columns": [ {
                    "data": "user_id"
                },
                {
                    "data": "user_wxnickname"
                },
                {
                    "data": "user_wxheadimgurl"
                },
                {
                    "data": "grade"
                },
                {
                    "data": "balance"
                },
            ]
        } );

        //优惠卡券的查看全部按钮
        // jQuery('#member_personalCenter_coupon_all_tb').DataTable({
        //   "ajax": "consumption.txt",
        //   "pagingType": "simple_numbers",
        //   'lengthMenu': [
        //     [-1],
        //     ['全部']
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
        //       "data": "name"
        //     }
        //   ]
        // });

        // 消费记录的查看全部按钮
        // jQuery('#consumption_whole').DataTable({
        //   "ajax": "consumption.txt",
        //   "pagingType": "simple_numbers",
        //   'lengthMenu': [
        //     [-1],
        //     ['全部']
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
        //       "data": "money"
        //     },
        //     {
        //       "data": "operator"
        //     }
        //   ]
        // // });
        // 切换Tab
        // jQuery(function() {
        //   window.onload = function() {
        //     var $li_service = $('#tab_service li');
        //     var $ul_service = $('#content_service ul');
        //     $li_service.click(function() {
        //       var $this = $(this);
        //       var $t = $this.index();
        //       $li_service.removeClass();
        //       $this.addClass('current');
        //       $ul_service.css('display', 'none');
        //       $ul_service.eq($t).css('display', 'block');
        //     });
        //     //
        //     var $li_coupon = $('#tab_coupon li');
        //     var $ul_coupon = $('#content_coupon ul');
        //     $li_coupon.click(function() {
        //       var $this = $(this);
        //       var $t = $this.index();
        //       $li_coupon.removeClass();
        //       $this.addClass('current');
        //       $ul_coupon.css('display', 'none');
        //       $ul_coupon.eq($t).css('display', 'block');
        //     });
        //     //
        //     var $li_consumption = $('#tab_consumption li');
        //     var $ul_consumption = $('#content_consumption ul');
        //     $li_consumption.click(function() {
        //       var $this = $(this);
        //       var $t = $this.index();
        //       $li_consumption.removeClass();
        //       $this.addClass('current');
        //       $ul_consumption.css('display', 'none');
        //       $ul_consumption.eq($t).css('display', 'block');
        //     });
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
        jQuery( ".ystep" ).setStep( 1 );
        //
        // jQuery('#service_view').click(function() {
        //   jQuery('#service_layer').show();
        //   // 弹出浮层时禁止底部页面滚动
        //   document.documentElement.style.overflowY = "hidden";
        // })
        // jQuery('.layer_title').click(function() {
        //   jQuery('#service_layer').hide();
        //   // 关闭浮层时页面可以滚动
        //   document.documentElement.style.overflowY = "auto";
        // })
        // // 优惠卡券
        // jQuery('#member_personalCenter_coupon_all_btn').click(function() {
        //   jQuery('#coupon_layer').show();
        //   document.documentElement.style.overflowY = "hidden";
        // })
        // jQuery('.layer_title').click(function() {
        //   jQuery('#coupon_layer').hide();
        //   document.documentElement.style.overflowY = "auto";
        // })
        // jQuery('.layer_confirm').click(function() {
        //   jQuery('.floating_layer').hide();
        //   document.documentElement.style.overflowY = "auto";
        // })
        // // 消费记录
        // jQuery('#consumption_view').click(function() {
        //   jQuery('#consumption_layer').show();
        //   document.documentElement.style.overflowY = "hidden";
        // })
        // jQuery('.layer_title').click(function() {
        //   jQuery('#consumption_layer').hide();
        //   document.documentElement.style.overflowY = "auto";
        // })
        // jQuery('.layer_confirm').click(function() {
        //   jQuery('.floating_layer').hide();
        //   document.documentElement.style.overflowY = "auto";
        //
        // })

    }
}
</script>
<style lang="css" scoped>
    @import '../../assets/css/editystep.css';
   /**/
    .membership{
        background: #eee;
        /*height: 3rem;*/
        margin: 0.7rem 0;
        padding-bottom: 30px;
    }
    .membership_head{
        text-align:center;
    }
    .membership_head img{
        width: 55px;
        margin-top: -25px;
        border-radius: 50%;
    }
    .membership_line{
        width:90%;
        border:1px solid #E5E5E5;
        margin-left:5%;
        margin-top:10px;
    }
    .membership_space{
        /*text-align: center;*/
        margin-top:0.2rem;
        padding:0 12%;
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
        width: 153px;
    }
    .remark{
        margin-left: 15px;
    }
    select{
        width:153px;
        height:22px;
    }
    input[type="date"]{
        width:153px;
        height:22px;
        outline:none;
    }
    /**/
    /*tab标签*/
    .content {
        border-top-width:0;
    }
    /**/
    .records{
        margin-bottom: 4px;
    }
    .operating_history{
        display: inline-block;
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
    /**/
    .edit,.save{
        position: absolute;
        background: #fff;
        border-radius: 5px;
        width: 80px;
        text-align: center;
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        right: 47px;
    }
    /**/
    .growthgrade {
        width: 43%;
        margin-left: 32%;
    }
    .growthgrade>div{
        display:inline-block;
        width:18%;
    }
    /*充值*/
    .select_coupon{
        border-right:1px solid #eee;
        border-left:1px solid #eee;
        margin:0;
        padding:0;
    }
    .select_coupon>div:nth-child(1){
        padding-top:0.2rem;
    }
    .selectcoupon_right{
        width:10%;
        height:0.5rem;
        line-height:0.5rem;
        display:block;
        background:#E94C3A;
        border-radius:5px;
        text-align:center;
        float:right;
        margin:0.2rem auto;
        color:#fff;
        cursor: pointer;
    }

    #recharge{

    }
    .recharge_balance {
        background: #F5F5F5;
        line-height: 0.6rem;
        text-align: center;
        color: #E84C3A;
        font-size: 18px;
        font-weight: bold;
    }
    .recharge_right{
        text-align:right;
        margin:0.8rem 0;
        height:1.4rem;
        line-height:1.4rem;
        border-right:1px solid #eee;

    }
    .recharge_right>label:nth-child(1){
        font-size:20px;
        color: #E84C3A;

    }
    .recharge_right>label:nth-child(2){
        font-size:30px;
        color: #E84C3A;

    }
    .recharge_left{
        text-align: left;
        height:1.4rem;
        margin:0.8rem 0rem;

    }
    .recharge_left input[type=text]{
        height: 0.4rem;
        width: 15%;
        text-align: center;
        margin-top:0.3rem;
        margin-left:6%;
    }
   /* .recharge_left input[type=radio]{
        padding:0 10%;
    }*/
    .recharge_money{
        height:3rem;
        border:1px solid #eee;
    }
    @media (max-width: 1000px) {
        .recharge_left{
            text-align: right;
        }
    }
    /*选择按钮*/
    form{
        margin-top:0.1rem;
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
    .rechange_operation{
        padding-left:0;
    }

    /*datatables*/

    /**/
    .view_all{
        width: 80px;
        padding:0;
        height:25px;
        line-height:25px;
        background: #E94C3A;
        border-radius: 5px;
        text-align: center;
        float:right;
        color: #fff;
        cursor: pointer;
        margin-top:10px;
        margin-right: 10px;
        font-weight: normal;
        font-size: 14px;
    }
    .layer_confirm{
        width: 80px;
        height:25px;
        line-height:25px;
        background: #E94C3A;
        border-radius: 5px;
        text-align: center;
        margin: 0.2rem auto;
        color: #fff;
        cursor: pointer;
    }

    /**
    * 用户信息栏-input样式
    */
    .userinfo_input{
      border:none;
      width: 153px;
    }
</style>
e>
