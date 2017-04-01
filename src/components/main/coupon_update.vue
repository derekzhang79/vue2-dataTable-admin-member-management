<template lang="html">
    <div class="page-content-wrapper">
        <div class="page-content" :class="{'page-content-closed':menushirinkStatus}">
            <div class="page-bar">
                <div>优惠券管理</div>
            </div>
            <!-- form表单内容 -->
            <div id="coupon_message" >
                <div class="build_coupon">
                    <div class="alreadyuse">
                        <div class="stamp row">
                            <div class="par par_use col-xs-6">
                                <div class="stamptype">
                                    <!-- <sup class="sign">{{couponDiscountUnit}}</sup> -->
                                    <sup class="sign" v-show="type.code == 2">{{couponDiscountUnit}}</sup>
                                    <sup class="sign" v-show="type.code == 1"><i class="icon iconfont iconExchangeMon">&#xe628;</i></sup>
                                    <span>{{couponDiscount | formatDiscount(type)}}</span>
                                    <i class="iconfont icon iconExchangeFree" v-show="type.code == 3">&#xe741;</i>
                                    <div class="limit" v-show="couponUse == 1">无门槛使用</div>
                                    <div class="limit" v-show="couponUse == 2 && couponUseValue">满{{couponUseValue}}元使用</div>
                                </div>
                            </div>
                            <div class="use col-xs-6">
                                <div class="range">{{couponName}}</div>
                                <div class="coupontype">类型 : {{type.title}}</div>
                                <div class="usetype">
                                    <span class="date"  v-show="this.couponExpiryValue[1].sDate && this.couponExpiryValue[1].eDate">{{this.couponExpiryValue[1].sDate + ' 至 ' +this.couponExpiryValue[1].eDate}}</span>
                                    <span class="immediatelyuse">立即使用</span>
                                </div>
                                <div class="line"></div>
                                <div class="publicnumber"  v-show="couponGet == 2 && couponGetValue[0].value">消费满{{couponGetValue[0].value}}元获得</div>
                                <div class="publicnumber"  v-show="couponGet == 3 && couponGetValueShow != ''">{{couponGetValueShow+'等途径获得'}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="records public-title-two">
                    <div class="operating_history">基本信息</div>
                </div>
                <div class="row setting">
                    <div class="setting_info public-title-three"></div>
                    <form action="" method="" class="">
                        <div>
                            <span class="validity">商户</span>
                            <img src="http://xkhy.wxkydd.com/xkhy/wp-content/uploads/sites/3/2017/01/xk_logo.png" class="merchant">
                            <span>{{sellerInfo.sellerName}}</span>
                        </div>
                        <div>
                            <span class="validity">标题</span>
                            <div class="validitytype">
                                <input v-model="couponName " type="text" name="" placeholder="" maxlength="14" />
                                <div class="explain"> 建议填写折扣券 "折扣额度" 及自定义内容,描述卡券提供的具体优惠</div>
                            </div>
                        </div>
                        <div v-show="type.code != 3">
                            <span class="validity">折扣额度</span>
                            <div class="validitytype">
                                <input v-model="couponDiscount" type="number" class="quota" min="0.1"
                                 placeholder="" />{{couponDiscountUnit}}
                                <div class="explain" v-show="type.code == 2?discountRatioTipShow = true:discountRatioTipShow"> 请填写0.1-9.9之间的数字，精确到小数点后一位</div>
                            </div>
                        </div>
                        <div>
                            <span class="validity">颜色</span>
                            <input id="full">
                        </div>
                        <div>
                            <span class="validity">有效期</span>
                            <div class="validitytype">
                                <label class="mt-radio">
                                    <input type="radio" name="timeRadios" id="optionsRadios2" value="1" v-model="couponExpiry"> 领取后，
                                    <span></span>
                                </label>
                                <select name="select_day" id="" v-model="couponExpiryValue[0].sDay">
                                    <option value="0">当天</option>
                                    <option value="1">1天后</option>
                                    <option value="2">2天后</option>
                                </select>
                                <span>生效,有效天数</span>
                                <select name="effect_day" id="" v-model="couponExpiryValue[0].eDay">
                                    <option value="3">3天</option>
                                    <option value="7">7天</option>
                                    <option value="10">10天</option>
                                </select>
                                <br>
                                <label class="mt-radio">
                                    <input type="radio" name="timeRadios" id="optionsRadios1" value="2"  v-model="couponExpiry">  固定日期
                                    <span></span>
                                </label>
                                <div class="ta_date" id="div_date_demo3">
                                    <div class="limit-click-layer" v-show="limitClickShow">
                                      <!-- 限制点击浮层 -->
                                    </div>
                                    <span class="date_title" id="date_demo3" ></span>
                                    <a class="opt_sel" id="input_trigger_demo3" >
                                        <i class="i_orderd"></i>
                                    </a>
                                </div>
                                <!--  -->
                            </div>
                        </div>
                        <!-- <div>
                            <span class="validity">可用时段 :</span>
                            <label class="mt-radio">
                                <input type="radio" name="availRadios" id="" value="" >全部时间段
                                <span></span>
                            </label>
                        </div> -->
                        <div>
                            <span class="validity">使用条件</span>
                            <div class="validitytype">
                                 <label class="mt-radio">
                                    <input type="radio" name="conditionRadios"  value="1" v-model="couponUse">无门槛使用
                                    <span></span>
                                </label>
                                <br>
                                <label class="mt-radio">
                                    <input type="radio" name="conditionRadios"   id="radio_threshold" value="2" v-model="couponUse">有门槛使用
                                    <span></span>
                                </label>
                                <br>
                                满 <input type="number" name="coupontext" value="" v-model="couponUseValue"  id="satisfyuse" min="0" step="1"> 元减使用
                            </div>
                        </div>
                        <div>
                            <span class="validity">来源途径</span>
                            <div class="validitytype">
                                <!-- <label class="mt-radio">
                                    <input type="radio" name="channelRadios" id="" value="首次关注公众号获得" v-model="coupon_source" @focus="first_concern">首次关注
                                    <span></span>
                                </label>
                                <br> -->
                                <label class="mt-radio">
                                    <input type="radio" name="channelRadios" value="2" v-model="couponGet">满送，
                                    <span></span>
                                </label>
                               满<input type="number" id="radio_follow" v-model="couponGetValue[0].value" min="0" step="1">元获得
                               <br>
                               <label class="mt-radio">
                                    <input type="radio" name="channelRadios" value="3" v-model="couponGet">特定操作
                                    <span></span>
                               </label>
                               <label class="lbl-opration"><input type="checkbox" name="operatetype" class="operation" value="1/关注公众号" v-model="couponGetOptValue">关注公众号</label>
                               <label class="lbl-opration"><input type="checkbox" name="operatetype" class="operation" value="2/推荐新人" v-model="couponGetOptValue">推荐新人</label>
                               <label class="lbl-opration"><input type="checkbox" name="operatetype" class="operation" value="3/完善个人信息" v-model="couponGetOptValue">完善个人信息</label>
                               <label class="lbl-opration"><input type="checkbox" name="operatetype" class="operation" value="4/首次充值" v-model="couponGetOptValue">首次充值</label>

                               <label class="mt-radio">
                                    <input type="radio" name="channelRadios" value="1" v-model="couponGet">优惠派送
                                    <span></span>
                               </label>
                              <!--   <label class="mt-radio">
                                    <input type="radio" name="channelRadios" id="" value="">
                                    <span></span>
                                </label>
                                <span> 消费满 </span><input type="text" name="" id="" value=""><span>  可获得</span> -->
                            </div>
                        </div>
                        <div>
                            <span class="validity">发放形式</span>
                            <div class="validitytype">
                                 <label class="mt-radio">
                                    <input type="radio" name="userRadios" id="" value="1" v-model="couponSend">用户自领
                                    <span></span>
                                </label>
                                <br>
                                <label class="mt-radio">
                                    <input type="radio" name="userRadios" id="" value="2" v-model="couponSend">商家发放
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <span class="validity">选择会员</span>
                            <div class="validitytype">
                                 <label class="mt-radio">
                                    <input type="radio" name="memberRadios" id="" value="0" v-model="couponMember">全部会员
                                    <span></span>
                                </label><br>
                                <label class="mt-radio">
                                    <input type="radio" name="memberRadios" id="" value="1" v-model="couponMember">普通会员
                                    <span></span>
                                </label><br>
                                <label class="mt-radio">
                                    <input type="radio" name="memberRadios" id="" value="2" v-model="couponMember">白银会员
                                    <span></span>
                                </label><br>
                                 <label class="mt-radio">
                                    <input type="radio" name="memberRadios" id="" value="3" v-model="couponMember">黄金会员
                                    <span></span>
                                </label><br>
                                <label class="mt-radio">
                                    <input type="radio" name="memberRadios" id="" value="4" v-model="couponMember">铂金会员
                                    <span></span>
                                </label><br>
                                <label class="mt-radio">
                                    <input type="radio" name="memberRadios" id="" value="5" v-model="couponMember">钻石会员
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <span class="validity">领券限制</span>
                            <div class="validitytype">
                                <input  type="number" v-model="couponCountLimit" min="1" step="1">张
                                <div class="explain">每个用户领券上线限制,默认为1</div>
                            </div>
                        </div>
                        <div>
                            <span class="validity">库存</span>
                            <div class="validitytype">
                                <input  type="number" v-model="couponStock" min="1" step="1">张
                            </div>
                        </div>
                        <!-- <div>
                            <span class="validity">适用门店</span>
                            <div class="validitytype">
                                 <label class="mt-radio">
                                    <input type="radio" name="grantRadios" id="" value="1" v-model="couponStore">全部门店适用
                                    <span></span>
                                </label>
                                <br>
                                <label class="mt-radio">
                                    <input type="radio" name="grantRadios" id="" value="2" v-model="couponStore">部分门店适用
                                    <span></span>
                                </label>
                                <br>
                                <a href="#">添加适用门店</a>
                            </div>
                        </div> -->
                    </form>
                </div>
            </div>
            <!-- 确认保存弹窗提示 -->
            <div class="floating_layer" v-show="showDialogValidateMsg">
                <div class="layerInfo">
                    <ul class="prompt" >
                        <li>温馨提示</li>
                        <li>优惠券信息不完整,请填写完整信息！</li>
                        <li ><span @click="closeDialogValidateMsg">确认</span></li>
                    </ul>
                </div>
            </div>
            <!-- <div class="floating_layer" v-show="showDialogReleaseMsg">
                <ul class="prompt" >
                    <li>温馨提示</li>
                    <li>{{releaseStatus == 1 ? '优惠券发布成功！':'此优惠券暂时不能发布，请确认是否已保存?'}}</li>
                    <li @click="closeDialogReleaseMsg">确认</li>
                </ul>
            </div> -->
            <div class="floating_layer" v-show="showDialogSaveMsg">
                <div class="layerInfo">
                    <ul class="prompt" >
                        <li>温馨提示</li>
                        <li>优惠券已保存！</li>
                        <li><span @click="closeDialogSaveMsg">确认</span></li>
                    </ul>
                </div>
            </div>
            <!--  -->
            <div class="release">
              <span class="save" @click="saveCoupon"  v-text="saveStatus == 1 ? '已保存':'保存'"></span>
              <span @click="returnPage">返回</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    // vue实现页面输入预览
    data() {
        return {
            storageSiteUrl:JSON.parse(localStorage.getItem('site_url')), // 本地配置好的站点地址,非常重要误删
            currentCouponId: this.$route.params.coupon_id, // 当前传入的coupon_id
            sellerInfo: {}, // 商家基本信息
            type: {}, // 优惠券类型
            couponName: '', //优惠券名称
            couponDiscount: '', //优惠券折扣
            couponDiscountUnit: '', //优惠券折扣单位
            couponColor: '', // 优惠券颜色
            couponExpiry: '', //有效期单选按钮
            couponExpiryValue: [ { //有效期选择的值
                sDay: '',
                sUnit: 'day',
                eDay: '',
                eUnit: 'day'
            }, {
                sDate: '',
                eDate: ''
            } ],
            couponUse: '', // 使用条件单选按钮
            couponUseValue: '', // 使用条件类型的值
            couponGet: '', // 来源途径单选按钮
            couponGetValue: [ {
                value: '' //来源途径类型1的值
            }, {
                value: [] // 来源途径类型2的值
            } ],
            couponGetOptValue: [], // 来源途径为特定操作类型时的选项值
            couponGetValueShow: [], // 来源途径为特定操作类型时的选项值-仅用于预览显示
            couponSend: '', // 发放形式单选按钮
            couponMember: '', // 会员限制单选按钮
            couponCountLimit: 1, // 获取数量限制,默认为1
            couponStock: '', // 优惠券库存
            couponStore: 1, // 使用门店单选按钮
            couponStoreValue: [], // 使用门店的值

            discountRatioTipShow: false, //折扣券折扣额度提示信息是否显示
            saveStatus: 0, // 优惠券保存状态，默认为0，未保存

            showDialogValidateMsg: false, // 优惠券内容验证的提示
            showDialogSaveMsg: false, // 优惠券保存成功的提示

            limitClickShow: true, // 时间选择插件限制点击浮层
        }
    },
    props: [ 'menushirinkStatus' ], // 是否显示缩放菜单栏
    watch: {
        couponExpiry( val ) {
            if ( val == 1 ) {
                jQuery( 'select[name=select_day],select[name=effect_day]' ).attr( 'disabled', false )
                this.limitClickShow = true
                jQuery( '.date' ).html( '' )
                jQuery( '#date_demo3' ).html( '' )
            } else if ( val == 2 ) {
                jQuery( 'select[name=select_day],select[name=effect_day]' ).attr( 'disabled', true )
                this.couponExpiryValue[ 0 ].sDay = ''
                this.couponExpiryValue[ 0 ].eDay = ''
                this.limitClickShow = false
            }
        },
        couponUse( val ) {
            if ( val == 1 ) {
                jQuery( 'input#satisfyuse' ).attr( 'disabled', true )
                this.couponUseValue = ''
            } else if ( val == 2 ) {
                jQuery( 'input#satisfyuse' ).attr( 'disabled', false )
            }
        },
        couponGet( val ) {
            if ( val == 1 ) {
                this.couponGetValue[ 0 ].value = ''
                this.couponGetOptValue = Array()
                jQuery( 'input#radio_follow' ).attr( 'disabled', false )
                jQuery( 'input.operation' ).attr( 'disabled', false )
            } else if ( val == 2 ) {
                this.couponGetOptValue = Array()
                jQuery( 'input#radio_follow' ).attr( 'disabled', false )
                jQuery( 'input.operation' ).attr( 'disabled', true )
            } else if ( val == 3 ) {
                this.couponGetValue[ 0 ].value = ''
                jQuery( 'input#radio_follow' ).attr( 'disabled', true )
                jQuery( 'input.operation' ).attr( 'disabled', false )
            }
        },
        couponGetOptValue( val ) {
            this.couponGetValue[ 1 ].value = Array()
            this.couponGetValueShow = Array()
            for ( let i = 0; i < this.couponGetOptValue.length; i++ ) {
                // 获得符合格式的选项值对象数组
                this.couponGetValue[ 1 ].value[ i ] = {
                    code: this.couponGetOptValue[ i ].split( '/' )[ 0 ],
                    title: this.couponGetOptValue[ i ].split( '/' )[ 1 ]
                }
                if ( i > 1 ) {
                    this.couponGetValueShow[ i ] = '...' //当选中的特定操作的选项值大于2个时，加入省略字符，并直接返回
                    break;
                }
                // 获取仅用于预览显示的选项值数组
                this.couponGetValueShow[ i ] = this.couponGetOptValue[ i ].split( '/' )[ 1 ]
            }
        },
        couponDiscount: function( val ) {
            if ( this.type.code == 2 ) {
                var temp = /^\d+(\.\d+)?$/;
                if ( temp.test( val ) == false || val < 0 ) {
                    this.couponDiscount = ''
                    return
                }
                if ( val > 9.9 ) {
                    this.couponDiscount = 9.9
                    return
                }
                if ( /^\d\.\d+$/.test( val ) ) {
                    if ( val.split( '.' )[ 1 ].toString().length > 1 ) {
                        this.couponDiscount = parseFloat( val ).toFixed( 1 )
                    }
                }
            }
        },

    },
    filters: {
        formatDiscount( val, type ) {
            if ( val != '' ) {
                if ( type.code == 1 ) {
                    return parseInt( val )
                } else {
                    return parseFloat( val ).toFixed( 1 )
                }
            }
        }
    },
    methods: {
        // 页面点击保存
        saveCoupon() {
            if ( this.saveStatus == 1 ) {
                return // 如果优惠券已保存，不再做保存的操作
            }

            let update_obj = {
                type: this.type,
                coupon_name: this.couponName,
                coupon_color: this.couponColor,
                coupon_expiration_type: this.couponExpiry,
                coupon_send_type: this.couponSend,
                coupon_member_type: this.couponMember,
                coupon_get_limit: this.couponCountLimit,
                coupon_stock: this.couponStock,
                coupon_use_store_type: this.couponStore,
            }

            // 判断折扣赋值
            if ( this.type.code == 1 ) { // 代金券
                update_obj.coupon_discount_price = this.couponDiscount
            } else if ( this.type.code == 2 ) { // 折扣券
                update_obj.coupon_discount_ratio = this.couponDiscount
            }

            // 判断有效期
            if ( this.couponExpiry == 1 ) {

                update_obj.coupon_expiration_type_value = this.couponExpiryValue[ 0 ]
                // 判断是否填入了值
                if ( this.couponExpiryValue[ 0 ].sDay === '' || this.couponExpiryValue[ 0 ].eDay === '' ) {
                    this.showDialogValidateMsg = !this.showDialogValidateMsg
                    return
                }
            } else if ( this.couponExpiry == 2 ) {
                update_obj.coupon_startdate_type_value = this.couponExpiryValue[ 1 ].sDate // 生效时间
                update_obj.coupon_expiration_type_value = this.couponExpiryValue[ 1 ].eDate // 到期时间
                // 判断是否填入了值
                if ( this.couponExpiryValue[ 1 ].sDate === '' || this.couponExpiryValue[ 1 ].eDate === '' ) {
                    this.showDialogValidateMsg = !this.showDialogValidateMsg
                    return
                }
            }

            // 判断使用条件
            if ( this.couponUse == 1 ) {
                update_obj.coupon_use_type = {
                    code: this.couponUse,
                    title: '无门槛'
                }
            } else if ( this.couponUse == 2 ) {
                update_obj.coupon_use_type = {
                    code: this.couponUse,
                    title: '满减'
                }
                update_obj.coupon_use_type_value = this.couponUseValue
                // 判断是否填入了值
                if ( this.couponUseValue == '' ) {
                    this.showDialogValidateMsg = !this.showDialogValidateMsg
                    return
                }
            }

            // 判断来源途径
            if ( this.couponGet == 1 ) {
                update_obj.coupon_get_type = {
                    code: 1, // 因为对应数据表为1
                    title: '无门槛'
                }
            } else if ( this.couponGet == 2 ) {
                update_obj.coupon_get_type = {
                    code: 2, // 因为对应数据表为2
                    title: '满送'
                }
                update_obj.coupon_get_type_value = this.couponGetValue[ 0 ].value
                // 判断是否填入了值
                if ( this.couponGetValue[ 0 ].value == '' ) {
                    this.showDialogValidateMsg = !this.showDialogValidateMsg
                    return
                }
            } else if ( this.couponGet == 3 ) {
                update_obj.coupon_get_type = {
                    code: 3, // 因为对应数据表为3
                    title: '特定操作'
                }
                update_obj.coupon_get_type_value = this.couponGetValue[ 1 ].value
                // 判断是否填入了值
                if ( this.couponGetValue[ 1 ].value == '' ) {
                    this.showDialogValidateMsg = !this.showDialogValidateMsg
                    return
                }
            }

            // 判断信息是否填写完整，如不完整弹窗提示,如果完整，将数据传进去后台
            if ( this.couponDiscount == '' && this.type.code != 3 ) {
                this.showDialogValidateMsg = !this.showDialogValidateMsg
            }

            // 判断信息是否填写完整，如不完整弹窗提示,如果完整，将数据传进去后台
            if ( this.type == '' ||
                this.couponName == '' ||
                this.couponCountLimit == '' ||
                this.couponStock == ''
            ) {
                this.showDialogValidateMsg = !this.showDialogValidateMsg;
            } else {
                let $this = this
                jQuery.ajax( {
                    url: this.storageSiteUrl+'/api-json/xkhy/v2/coupon/' + this.currentCouponId,
                    type: 'PUT',
                    data: {
                        update_obj: update_obj
                    },
                    dataType: 'json',
                    success: function( res ) {
                        if ( res.erron == 0 ) {
                            $this.showDialogSaveMsg = true
                            $this.saveStatus = 1 // 优惠券已保存状态
                        }
                    }
                } );
            }
        },
        // 返回上一页
        returnPage() {
            this.$router.push( '/coupon_home?tableShowIdx=' + this.$route.query.tableShowIdx )
        },
        // 弹窗提示里面的确认保存
        closeDialogValidateMsg() {
            this.showDialogValidateMsg = false;
        },
        // 关闭优惠券保存成功的提示框
        closeDialogSaveMsg() {
            this.showDialogSaveMsg = false
        },
    },
    created() {
        let $this = this
        // 获取优惠券所有信息
        jQuery.ajax( {
            url: this.storageSiteUrl+'/api-json/xkhy/v2/coupon/' + this.currentCouponId,
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function( res ) {
                if ( res.erron == 0 ) {
                    // 拿到优惠券所有的信息注册到vue变量中
                    let data = res.data // 数据来源
                    let couponTypeObj = JSON.parse( data.type )
                    let couponUseTypeObj = JSON.parse( data.coupon_use_type )
                    let couponGetTypeObj = JSON.parse( data.coupon_get_type )

                    $this.type = couponTypeObj // 类型

                    if ( couponTypeObj.code == 1 ) { // 折扣额度
                        $this.couponDiscount = data.coupon_discount_price
                        $this.couponDiscountUnit = '元'
                    } else if ( couponTypeObj.code == 2 ) {
                        $this.couponDiscount = data.coupon_discount_ratio
                        $this.couponDiscountUnit = '折'
                    }

                    if ( data.coupon_expiration_type == 1 ) { // 有效期
                        $this.couponExpiry = 1
                        $this.couponExpiryValue[ 0 ] = JSON.parse( data.coupon_expiration_type_value )
                    } else if ( data.coupon_expiration_type == 2 ) {
                        $this.couponExpiry = 2
                        $this.couponExpiryValue[ 1 ].sDate = data.coupon_startdate_type_value
                        $this.couponExpiryValue[ 1 ].eDate = data.coupon_expiration_type_value
                    }

                    $this.couponUse = couponUseTypeObj.code // 使用条件
                    if ( couponUseTypeObj.code == 1 ) {
                        $this.couponUseValue = ''
                    } else if ( couponUseTypeObj.code == 2 ) {
                        $this.couponUseValue = data.coupon_use_type_value
                    }

                    $this.couponGet = couponGetTypeObj.code // 来源途径
                    if ( couponGetTypeObj.code == 2 ) {
                        $this.couponGetValue[ 0 ].value = data.coupon_get_type_value
                    } else if ( couponGetTypeObj.code == 3 ) {
                        $this.couponGetValue[ 1 ].value = JSON.parse( data.coupon_get_type_value )
                        $this.couponGetValue[ 1 ].value.forEach( function( value, key ) {
                            $this.couponGetOptValue.push( value.code + '/' + value.title )
                        } )
                    }
                    // console.log($this.couponGetValue[1].value)

                    $this.couponName = data.coupon_name // 优惠券名称
                    $this.couponColor = data.coupon_color // 颜色
                    $this.couponSend = data.coupon_send_type // 发放形式
                    $this.couponMember = data.coupon_member_type // 会员限制
                    $this.couponCountLimit = data.coupon_get_limit // 领券限制
                    $this.couponStock = data.coupon_stock // 库存
                    $this.couponStore = data.coupon_use_store_type // 适用门店

                    $this.$nextTick( function() {
                        jQuery( "#full" ).spectrum( {
                            allowEmpty: true,
                            color: $this.couponColor,
                            showInput: true,
                            containerClassName: "full-spectrum",
                            showInitial: true,
                            showPalette: true,
                            showSelectionPalette: true,
                            showAlpha: true,
                            maxPaletteSize: 10,
                            preferredFormat: "hex",
                            localStorageKey: "spectrum.demo",
                            move: function( color ) {
                                updateBorders( color );
                            },
                            show: function() {},
                            beforeShow: function() {},
                            hide: function( color ) {
                                updateBorders( color );
                            },
                            palette: [
                                [ "rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(153, 153, 153)", "rgb(183, 183, 183)",
                                    "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(239, 239, 239)", "rgb(243, 243, 243)", "rgb(255, 255, 255)"
                                ],
                                [ "rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                                    "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"
                                ],
                                [ "rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                                    "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                                    "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                                    "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                                    "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                                    "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                                    "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                                    "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                                    "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
                                    "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",
                                    "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                                    "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"
                                ]
                            ]
                        } );
                        jQuery( '.par' ).css( 'background-color', $this.couponColor );
                        jQuery( '.immediatelyuse ' ).css( 'background-color', $this.couponColor );

                        $this.dateRange = new pickerDateRange( 'date_demo3', {
                            aRecent7Days: 'aRecent7DaysDemo3', //最近7天
                            isTodayValid: false,
                            defaultText: ' 至 ',
                            stopToday: false,
                            isTodayValid: true,
                            startDate: $this.couponExpiryValue[ 1 ].sDate, // 开始日期
                            endDate: $this.couponExpiryValue[ 1 ].eDate, // 结束日期
                            calendars: 2, // 展示的月份数，最大是2
                            // minValidDate : '1489680000', //最小可用时间，控制日期选择器的可选力度
                            minValidDate: Date.parse( new Date() ) / 1000, //最小可用时间，控制日期选择器的可选力度
                            theme: 'ta',
                            success: function( obj ) {
                                // $("#dCon_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
                                jQuery( '.date' ).html( jQuery( '#date_demo3' ).html() ); // 预览中的日期

                                $this.couponExpiryValue[ 1 ].sDate = obj.startDate;
                                $this.couponExpiryValue[ 1 ].eDate = obj.endDate;
                            }
                        } )
                    } )
                }
            }
        } );

        // 获取商家基本信息
        jQuery.ajax( {
            url: this.storageSiteUrl+'/api-json/xkhy/v2/seller',
            type: 'GET',
            data: {
              seller_info: true
            },
            success: function( res ) {
              $this.sellerInfo = res.data;
            }
        } );
    },
    mounted() {
        jQuery( '.public-home' ).removeClass( 'open' )
        jQuery( '.page-couponpage' ).addClass( 'open' )
        jQuery( '.public-home ul' ).hide()
        jQuery( '.couponMenu' ).show()
        let $this = this
        // 修改卡片颜色
        jQuery( '#full' ).change( function() {
            var changeColor = jQuery( '.sp-preview-inner' ).css( 'background-color' );
            $this.couponColor = changeColor
            jQuery( '.par' ).css( 'background-color', changeColor );
            jQuery( '.immediatelyuse ' ).css( 'background-color', changeColor );
        } )
    }
}
</script>

<style lang="css" scoped>
   /*中间部分样式*/
#coupon_message{
  margin-bottom: 80px;
}
.build_coupon{
    background:#eee;
    height:3rem;
    margin:0.7rem 0 0.2rem 0;
}
/*优惠券格式*/
/*优惠券*/
/*已使用*/
.alreadyuse{
    width:100%;
    position:relative;
    padding-top:16px;
}
.stamp{
    width:400px;
    height:130px;
    margin:0 auto;
    background: #fff;
}
.stamptype{
    margin-top:30px;
    height:100px;
    position: relative;
}
.par{
    width:130px;
    height:130px;
    background-color: rgb(238, 204, 204);
    text-align:center;
    color:white;
    padding:0;
}
.sign{
    font-size: 22px;
}
.par span{
    font-size:36px;
}
.copy{
    display:inline-block;
}
.iconExchangeMon{
    position: relative;
    top:3px;
    font-size:24px;
}
.iconExchangeFree{
    position:relative;
    font-size:50px;
    top:-5px;
}
.limit{
    position:absolute;
    text-align: center;
    top:78px;
    bottom:0;
    left:0;
    right:0;
}
.use{
    width:270px;
    height:130px;
    color:#9A9A9A;
    padding:0;
    padding-left:15px;
}
.range{
    padding-top:0.3rem;
    font-size:18px;
    color:#000;
}
.coupontype{
    padding-top:0.1rem;
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
    background-color: rgb(238, 204, 204);
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
    top: 2rem;
    padding: 0;
    color: #D6D6D6;
}
/**/
.records{
    margin:0.5rem 0 10px 0;
}
.setting{
    background:#fff;
    margin:0;
    border:1px solid #eee;
}
.setting_info{
    height: 35px;
}
/**/
form{
    margin-left:auto;
    margin-right:auto;
    /*max-width:60%;*/
    width: 600px;
    background: #fff;
    padding: 20px 20px 20px 20px;
    font: 14px Arial, Helvetica, sans-serif;
    margin-top:20px;
}
form>div{
    margin-top: 20px;
    font-weight: bold;
}
form>div:nth-child(1){
    margin-top:0;
}
label{
    display: block;
    margin: 0px 0px 20px;
}
label.lbl-opration{
  display: inline-block;
  cursor: pointer;
}
.merchant{
    width:33px;
    height:33px;
}
.validity{
    float: left;
    width: 20%;
    text-align: left;
    padding-right: 30px;
    margin-top: 7px;
}
input[type="text"], input[type="number"],select {
    color: #888;
    width: 48%;
    padding: 0px 0px 0px 5px;
    border: 2px solid #EEE;
    outline: 0;
    font: 200 12px/25px Arial, Helvetica, sans-serif;
    height: 30px;
    line-height:15px;
    margin: 2px 6px 0px 0px;
    border-radius: 5px;
    background: #fff;
}
select{
    width:25%;
}
.quota{
    width:30% !important;
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
    padding-top:6px;
    margin-bottom: 3px;
    cursor: pointer;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
}
.mt-checkbox, .mt-radio,.mt-checkbox,.mt-radio {
    display: inline-block;
    /*margin-right: 15px;*/
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

.validitytype{
    display:inline-block;
    width:80%;
}
.validitytype input[type=checkbox]{
    margin: 0;
    vertical-align: middle;
    cursor: pointer;
}
.validitytype a{
    margin-left:30px;
    text-decoration:underline;
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
    box-shadow:none;
    -webkit-box-shadow:none;
    -moz-box-shadow: none;
    /* box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); */
    /* box-shadow: 0px 1px 1px rgba(218,218,218,0.8); */
    float: none;
    display: inline-block;
}
.ta_date .date_title {
    padding: 6px 17px;
}
.ta_date .opt_sel {
    width:14px;
    margin: 0 auto;
}
.ta_ipt_text_s{
    margin:0 !important;
}
.ta_calendar_footer {
    height: 42px;
}
.save{
    margin-right: 10%;
}
.release{
    width:100%;
    position:fixed;
    bottom:0;
    background: #f5f5f5;
    text-align: center;
    color: #fff;
    margin-left:-35px;
    margin-right: 35px;
    font-weight: 700;
    border-top:1px solid #EDEDED;
    height:70px;
}
.release span{
  border-bottom: 1px solid #fff;
  cursor: pointer;
  position: absolute;
  border:0px ;
  color:#E94C3B;
  border-radius: 5px;
  width:90px;
  padding-top:6px;
  padding-bottom:6px;
  margin-top:18px;
  width:150px;
  color:#fff;
  background: #E94C3B;
}
.release span:nth-child(1){
  left:27%;
}
/*.release span:hover{
  background: #C42C1A;
}*/
.release span:nth-child(2){
  left:48%;
}
/*时间插件样式*/
.ta_date{
  position:relative;
}
.limit-click-layer{
  position:absolute;
  width:100%;
  height:100%;
  opacity: 0;
}
</style>
