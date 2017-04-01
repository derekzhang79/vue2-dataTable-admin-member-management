<template lang="html">
  <div class="page-content-wrapper">
    <div class="page-content" :class="{'page-content-closed':menushirinkStatus}">
      <div class="container-fluid">
          <div class="row">
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <a class="dashboard-stat dashboard-stat-v2 yellow" href="#">
                      <div class="details">
                          今日
                      </div>
                       <div class="details-number">
                           <p>新会员数</p>
                           <p>{{memberTimeCount.today_add_member}}</p>
                      </div>
                     <div class="visual">
                          <i class="icon iconfont">&#xe64b;</i>
                      </div>
                  </a>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <a class="dashboard-stat dashboard-stat-v2 green" href="#">
                      <div class="details">
                          今日
                      </div>
                      <div class="details-number">
                          <p>充值会员数</p>
                          <p>{{memberTimeCount.today_amount_member}}</p>
                      </div>
                      <div class="visual">
                          <i class="icon iconfont">&#xe64b;</i>
                      </div>
                  </a>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <a class="dashboard-stat dashboard-stat-v2 red-sunglo" href="#">
                      <div class="details">
                          今日
                      </div>
                      <div class="details-number">
                          <p>会员消费金额</p>
                          <p>{{memberTimeCount.today_member_Deductible}}</p>
                      </div>
                      <div class="visual">
                          <i class="icon iconfont">&#xe628;</i>
                      </div>
                  </a>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <a class="dashboard-stat dashboard-stat-v2 green-jungle" href="#">
                      <div class="details">
                          今日
                      </div>
                      <div class="details-number">
                          <p>会员充值金额</p>
                          <p>{{memberTimeCount.today_member_amount}}</p>
                      </div>
                      <div class="visual">
                          <i class="icon iconfont">&#xe628;</i>
                      </div>
                  </a>
              </div>
          </div>
      </div>
      <div class="yestoday-index">
          <div class="public-title-two">
              昨日指标
          </div>
          <div class="yestoday-index-th public-title-three">
              <div>新会员数</div>
              <div>充值会员数</div>
              <div>会员总数</div>
              <div>会员消费金额</div>
              <div>会员充值金额</div>
          </div>
          <div class="yestoday-index-tr">
              <div>{{memberTimeCount.yesterday_add_member}}</div>
              <div>{{memberTimeCount.yesterday_amount_member}}</div>
              <div>{{memberTimeCount.yesterday_member}}</div>
              <div>{{memberTimeCount.yesterday_member_Deductible}}</div>
              <div style="border-right: none;">{{memberTimeCount.yesterday_member_amount}}</div>
          </div>
      </div>
      <div class="lastmonth-index">
          <div class="public-title-two">
              上月指标
          </div>
          <div class="yestoday-index-th public-title-three">
              <div>新会员数</div>
              <div>充值会员数</div>
              <div>会员总数</div>
              <div>会员消费金额</div>
              <div>会员充值金额</div>
          </div>
          <div class="yestoday-index-tr">
              <div>{{memberTimeCount.month_add_member}}</div>
              <div>{{memberTimeCount.month_amount_member}}</div>
              <div>{{memberTimeCount.month_member}}</div>
              <div>{{memberTimeCount.month_member_amount}}</div>
              <div style="border-right: none;">{{memberTimeCount.month_member_Deductible}}</div>
          </div>
      </div>
      <div class="more-index">
          <div class="more-index-title public-title-two">
              <span>更多指标</span>
              <ul id="myTab" class="nav nav-tabs">
                  <li :class="{active:activeMemberTab}" @click="getMemberTab"><a>新会员数</a></li>
                  <li :class="{active:activeRechargeTab}" @click="getRechargeTab"><a>充值会员数</a></li>
                  <li :class="{active:activeTotalTab}" @click="getTotalTab"><a>会员总数</a></li>
                  <li :class="{active:activeConsumeTab}" @click="getConsumeTab"><a class="tabLength">会员消费金额</a></li>
                  <li :class="{active:activeMrechargeTab}" @click="getMrechargeTab"><a class="tabLength">会员充值金额</a></li>
              </ul>
          </div>
          <div id="myTabContent" class="tab-content">
              <!-- 选择时间 -->
              <div class="member-time">
                  <div class="daynum"  @click="getRecentlyDay">
                      <span><font v-text="textRecentlyDay"></font><i class="iconfont selectdayicon">&#xe633;</i></span>
                  </div>
                  <ul v-show="showRecentlyDay" class="showdaystyle" >
                      <li  id="aRecent7DaysDemo3" :class='{selectstyle:select7DayRel}' @click="hideRecentlyDay(1)" >最近7天 </li>
                      <li id="aRecent15DaysDemo3" :class='{selectstyle:select15DayRel}' @click="hideRecentlyDay(2)" >最近15天</li>
                      <li id="aRecent30DaysDemo3" :class='{selectstyle:select30DayRel}' @click="hideRecentlyDay(3)" >最近30天</li>
                  </ul>
                  <div class="ta_date" id="div_date_demo3">
                      <span class="date_title" id="date_demo3"></span>
                      <a class="opt_sel" id="input_trigger_demo3" href="#">
                          <i class="i_orderd"></i>
                      </a>
                  </div>

              </div>

              <!-- 新会员 充值会员数 会员总数 会员消费金额 会员充值金额 -->
              <div :class="[{active:memberTab},'tab-pane']" id="member-num">
                  <div id="member-table" style="height: 6rem;"></div>
                  <div class="member-num">
                      <span></span>新会员数
                  </div>
              </div>
              <div :class="[{active:rechargeTab},'tab-pane']" id="recharge-num">
                  <div id="recharge-table" style="height: 6rem;"></div>
                  <div class="member-num">
                      <span></span>充值会员数
                  </div>
              </div>
              <div :class="[{active:totalTab},'tab-pane']" id="member-totalnum">
                  <div id="member-total-table" style="height: 6rem;"></div>
                  <div class="member-num">
                      <span></span>会员总数
                  </div>
              </div>
              <div :class="[{active:consumeTab},'tab-pane']" id="consume-num">
                  <div id="consume-table" style="height: 6rem;"></div>
                  <div class="member-num">
                      <span></span>会员消费金额
                  </div>
              </div>
              <div :class="[{active:mrechargeTab},'tab-pane']" id="mrecharge-num">
                  <div id="mrecharge-table" style="height: 6rem;"></div>
                  <div class="member-num">
                      <span></span>会员充值金额
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            storageSiteUrl:JSON.parse(localStorage.getItem('site_url')), // 本地配置好的站点地址,非常重要误删
            memberTimeCount: {},
            activeMemberTab: true,
            activeRechargeTab: false,
            activeTotalTab: false,
            activeConsumeTab: false,
            activeMrechargeTab: false,
            memberTab: true,
            rechargeTab: false,
            totalTab: false,
            consumeTab: false,
            mrechargeTab: false,
            myEndDate: '',
            myStartDate: '',
            showRecentlyDay: false,
            select7DayRel: true,
            select15DayRel: false,
            select30DayRel: false,
            textRecentlyDay: "最近7天"

        }
    },
    props: [ 'menushirinkStatus' ], // 是否显示缩放菜单栏
    methods: {
        getMemberTab() {
            var myChart_member = echarts.init( document.getElementById( 'member-table' ) );
            // 指定图表的配置项和数据
            var option_member;
            option_member = {
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 'auto'
                    },
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    // 控制y轴线是否显示
                    axisLine: {
                        show: false
                    },
                    // 控制网格线是否显示
                    splitLine: {
                        show: true
                    },
                    // 控制Y轴上的刻度线是否显示
                    axisTick: {
                        show: false
                    }
                },
                series: [ {
                    name: '新会员数',
                    symbolSize: 6,
                    symbol: 'circle',
                    lineStyle: { //线条样式
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [ {
                                offset: 0,
                                color: 'rgba(233, 76, 59, 0.1)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(233, 76, 59, 0.1)'
                            } ], false ),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E94C3B',
                            show: true,
                            textStyle: {
                                color: '#E94C3B'
                            },
                            label: {
                                show: false
                            }
                        }

                    },
                    type: 'line',
                    stack: '总量',
                    data: []
                } ]
            };
            myChart_member.setOption( option_member );
            myChart_member.showLoading() //数据加载完之前先显示一段简单的loading动画
            var __xMemberdates = []; //日期（实际用来盛放X轴坐标值）
            var __yMemberNums = []; //新增会员（实际用来盛放Y轴坐标值）
            let $this = this;
            // 页面初始化时候去请求新会员数的图表数据
            // console.log( '------------' + this.myStartDate )
            // console.log( '------------' + this.myEndDate )
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
                type: 'GET',
                data: {
                    member_count: true,
                    add_member: true,
                    startDate: $this.myStartDate,
                    endDate: $this.myEndDate
                },
                success: function( res ) {
                    // console.log( res )
                    if ( res ) {
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __xMemberdates.push( res.data[ i ].date );
                        }
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __yMemberNums.push( res.data[ i ].count );
                        }
                        myChart_member.hideLoading() // 隐藏图表加载loading动画
                        // 重绘图表
                        myChart_member.setOption( {
                            xAxis: {
                                data: __xMemberdates
                            },
                            series: [ {
                                data: __yMemberNums
                            } ]
                        } )
                    }
                    if ( res.erron === 0 ) {
                        myChart_member.hideLoading()
                    }

                },
                error: function( errormes ) {
                    myChart_member.hideLoading()
                }
            } );

            this.activeMemberTab = true;
            this.activeRechargeTab = false;
            this.activeTotalTab = false;
            this.activeConsumeTab = false;
            this.activeMrechargeTab = false;
            this.memberTab = true;
            this.rechargeTab = false;
            this.totalTab = false;
            this.consumeTab = false;
            this.mrechargeTab = false;
        },
        getRechargeTab() {
            var myChart_recharge = echarts.init( document.getElementById( 'recharge-table' ) );
            var option_recharge;
            // 指定图表的配置项和数据
            option_recharge = {
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 'auto'
                    },
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    // 控制y轴线是否显示
                    axisLine: {
                        show: false
                    },
                    // 控制网格线是否显示
                    splitLine: {
                        show: true
                    },
                    // 控制Y轴上的刻度线是否显示
                    axisTick: {
                        show: false
                    }
                },
                series: [ {
                    name: '充值会员数',
                    symbolSize: 6,
                    symbol: 'circle',
                    lineStyle: { //线条样式
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [ {
                                offset: 0,
                                color: 'rgba(233, 76, 59, 0.1)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(233, 76, 59, 0.1)'
                            } ], false ),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E94C3B',
                            show: true,
                            textStyle: {
                                color: '#E94C3B'
                            },
                            label: {
                                show: false
                            }
                        }

                    },
                    type: 'line',
                    stack: '总量',
                    data: []
                } ]
            };
            myChart_recharge.setOption( option_recharge );
            myChart_recharge.showLoading()
            var __xRechargeDates = [];
            var __yRechargNums = [];
            let $this = this;
            // 页面初始化时候去请求新会员数的图表数据
            // console.log( '============' + this.myStartDate )
            // console.log( '=============' + this.myEndDate )
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
                type: 'GET',
                data: {
                    member_count: true,
                    amount_member: true,
                    startDate: $this.myStartDate,
                    endDate: $this.myEndDate
                },
                success: function( res ) {
                    console.log( res )
                    if ( res ) {
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __xRechargeDates.push( res.data[ i ].date );
                        }
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __yRechargNums.push( res.data[ i ].count );
                        }
                        myChart_recharge.hideLoading() // 隐藏图表加载loading动画
                        // 重绘图表
                        myChart_recharge.setOption( {
                            xAxis: {
                                data: __xRechargeDates
                            },
                            series: [ {
                                data: __yRechargNums
                            } ]
                        } )
                    }
                },
                error: function( errormes ) {
                    myChart_recharge.hideLoading()
                }
            } );
            this.activeMemberTab = false;
            this.activeRechargeTab = true;
            this.activeTotalTab = false;
            this.activeConsumeTab = false;
            this.activeMrechargeTab = false;
            this.memberTab = false;
            this.rechargeTab = true;
            this.totalTab = false;
            this.consumeTab = false;
            this.mrechargeTab = false;
        },
        getTotalTab() {
            var myChart_tmember = echarts.init( document.getElementById( 'member-total-table' ) );
            // 指定图表的配置项和数据
            var option_tmember;
            option_tmember = {
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 'auto'
                    },
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    // 控制y轴线是否显示
                    axisLine: {
                        show: false
                    },
                    // 控制网格线是否显示
                    splitLine: {
                        show: true
                    },
                    // 控制Y轴上的刻度线是否显示
                    axisTick: {
                        show: false
                    }
                },
                series: [ {
                    name: '会员总数',
                    symbolSize: 6,
                    symbol: 'circle',
                    lineStyle: { //线条样式
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [ {
                                offset: 0,
                                color: 'rgba(233, 76, 59, 0.1)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(233, 76, 59, 0.1)'
                            } ], false ),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E94C3B',
                            show: true,
                            textStyle: {
                                color: '#E94C3B'
                            },
                            label: {
                                show: false
                            }
                        }

                    },
                    type: 'line',
                    stack: '总量',
                    data: []
                } ]
            };
            myChart_tmember.setOption( option_tmember );
            myChart_tmember.showLoading()
            var __xTotalDates = [];
            var __yTotalNums = [];
            let $this = this;
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
                type: 'GET',
                data: {
                    member_count: true,
                    member_total: true,
                    startDate: $this.myStartDate,
                    endDate: $this.myEndDate
                },
                success: function( res ) {
                    console.log( res )
                    if ( res ) {
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __xTotalDates.push( res.data[ i ].date );
                        }
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __yTotalNums.push( res.data[ i ].count );
                        }
                        myChart_tmember.hideLoading() // 隐藏图表加载loading动画
                        // 重绘图表
                        myChart_tmember.setOption( {
                            xAxis: {
                                data: __xTotalDates
                            },
                            series: [ {
                                data: __yTotalNums
                            } ]
                        } )
                    }
                    if ( res.erron === 0 ) {
                        myChart_tmember.hideLoading()
                    }

                },
                error: function( errormes ) {
                    myChart_tmember.hideLoading()
                }
            } );
            this.activeMemberTab = false;
            this.activeRechargeTab = false;
            this.activeTotalTab = true;
            this.activeConsumeTab = false;
            this.activeMrechargeTab = false;
            this.memberTab = false;
            this.rechargeTab = false;
            this.totalTab = true;
            this.consumeTab = false;
            this.mrechargeTab = false;
        },
        getConsumeTab() {
            var myChart_consume = echarts.init( document.getElementById( 'consume-table' ) );
            // 指定图表的配置项和数据
            var option_consume;
            option_consume = {
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 'auto'
                    },
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [ {
                    name: '会员消费金额',
                    symbolSize: 6,
                    symbol: 'circle',
                    lineStyle: { //线条样式
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [ {
                                offset: 0,
                                color: 'rgba(233, 76, 59, 0.1)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(233, 76, 59, 0.1)'
                            } ], false ),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E94C3B',
                            show: true,
                            textStyle: {
                                color: '#E94C3B'
                            },
                            label: {
                                show: false
                            }
                        }

                    },
                    type: 'line',
                    stack: '总量',
                    data: []
                } ]
            };
            myChart_consume.setOption( option_consume );
            myChart_consume.showLoading()
            var __xConsumeDates = [];
            var __yConsumeNums = [];
            let $this = this;
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
                type: 'GET',
                data: {
                    member_count: true,
                    member_Deductible: true,
                    startDate: $this.myStartDate,
                    endDate: $this.myEndDate
                },
                success: function( res ) {
                    console.log( res )
                    console.log( '==================>>>>>' + res.data[ 0 ].count )
                    if ( res ) {
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __xConsumeDates.push( res.data[ i ].date );
                        }
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __yConsumeNums.push( res.data[ i ].count );
                        }
                        myChart_consume.hideLoading()
                        myChart_consume.setOption( {
                            xAxis: {
                                data: __xConsumeDates
                            },
                            series: [ {
                                data: __yConsumeNums
                            } ]
                        } )
                    }
                    if ( res.erron === 0 ) {
                        myChart_consume.hideLoading()
                    }

                },
                error: function( errormes ) {
                    myChart_consume.hideLoading()
                }
            } );
            this.activeMemberTab = false;
            this.activeRechargeTab = false;
            this.activeTotalTab = false;
            this.activeConsumeTab = true;
            this.activeMrechargeTab = false;
            this.memberTab = false;
            this.rechargeTab = false;
            this.totalTab = false;
            this.consumeTab = true;
            this.mrechargeTab = false;
        },
        getMrechargeTab() {
            var myChart_mrecharge = echarts.init( document.getElementById( 'mrecharge-table' ) );
            // 指定图表的配置项和数据
            var option_mrecharge;
            option_mrecharge = {
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 'auto'
                    },
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [ {
                    name: '会员充值金额',
                    symbolSize: 6,
                    symbol: 'circle',
                    lineStyle: { //线条样式
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [ {
                                offset: 0,
                                color: 'rgba(233, 76, 59, 0.1)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(233, 76, 59, 0.1)'
                            } ], false ),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E94C3B',
                            show: true,
                            textStyle: {
                                color: '#E94C3B'
                            },
                            label: {
                                show: false
                            }
                        }

                    },
                    type: 'line',
                    stack: '总量',
                    data: []
                } ]
            };
            myChart_mrecharge.setOption( option_mrecharge );
            myChart_mrecharge.showLoading()
            var __xMrechargeDates = [];
            var __yMrechargeNums = [];
            let $this = this;
            jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
                type: 'GET',
                data: {
                    member_count: true,
                    member_amount: true,
                    startDate: $this.myStartDate,
                    endDate: $this.myEndDate
                },
                success: function( res ) {
                    console.log( res )
                    if ( res ) {
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __xMrechargeDates.push( res.data[ i ].date );
                        }
                        for ( var i = 0; i < res.data.length; i++ ) {
                            __yMrechargeNums.push( res.data[ i ].count );
                        }
                        myChart_mrecharge.hideLoading()
                        myChart_mrecharge.setOption( {
                            xAxis: {
                                data: __xMrechargeDates
                            },
                            series: [ {
                                data: __yMrechargeNums
                            } ]
                        } )
                    }
                    if ( res.erron === 0 ) {
                        myChart_mrecharge.hideLoading()
                    }

                },
                error: function( errormes ) {
                    myChart_mrecharge.hideLoading()
                }
            } );
            this.activeMemberTab = false;
            this.activeRechargeTab = false;
            this.activeTotalTab = false;
            this.activeConsumeTab = false;
            this.activeMrechargeTab = true;
            this.memberTab = false;
            this.rechargeTab = false;
            this.totalTab = false;
            this.consumeTab = false;
            this.mrechargeTab = true;
        },
        //
        getBeforeDate( n ) {
            var s;
            var n = n;
            var myDate = new Date();
            var myDateyear = myDate.getFullYear();
            var myDatemon = myDate.getMonth() + 1;
            var myDateday = myDate.getDate();
            if ( myDateday <= n ) {
                if ( myDatemon > 1 ) {
                    myDatemon = myDatemon - 1;
                } else {
                    myDateyear = myDateyear - 1;
                    myDatemon = 12;
                }
            }
            myDate.setDate( myDate.getDate() - n );
            myDateyear = myDate.getFullYear();
            myDatemon = myDate.getMonth() + 1;
            myDateday = myDate.getDate();
            s = myDateyear + "-" + ( myDatemon < 10 ? ( '0' + myDatemon ) : myDatemon ) + "-" + ( myDateday < 10 ? ( '0' + myDateday ) : myDateday );
            return s;
        },
        //
        getRecentlyDay() {
            this.showRecentlyDay = true;

        },
        hideRecentlyDay( daysType ) {
            this.showRecentlyDay = false;
            if ( daysType == 1 ) {
                this.select7DayRel = true;
                this.select15DayRel = false;
                this.select30DayRel = false;
                this.textRecentlyDay = '最近7天';

            } else if ( daysType == 2 ) {
                this.select7DayRel = false;
                this.select15DayRel = true;
                this.select30DayRel = false;
                this.textRecentlyDay = '最近15天';

            } else if ( daysType == 3 ) {
                this.select7DayRel = false;
                this.select15DayRel = false;
                this.select30DayRel = true;
                this.textRecentlyDay = '最近30天';

            }
        }
    },
    created() {
        let $this = this
        jQuery.ajax( {
            url: this.storageSiteUrl+'/api-json/xkhy/v1/member',
            type: 'GET',
            data: {
                member_time_count: true
            },
            success: function( res ) {
                $this.memberTimeCount = res.data
                // console.log(res)

            }
        } );
    },
    mounted() {
        // 控制左边导航栏刷新的时候样式保留
        jQuery( '.public-home ul' ).hide();
        jQuery( '.public-home' ).removeClass( 'open' )
        jQuery( '.page-homepage' ).addClass( 'open' )
        // 权限管理
        var sessionStorage = new Object();
        sessionStorage.tabIndex = 0;
        $( '.blend-tab' ).tab( {
            animate: true,
            start: sessionStorage.tabIndex
        } );
        var $this = this;
        var dateRange = new pickerDateRange( 'date_demo3', {
            aRecent7Days: 'aRecent7DaysDemo3', //最近7天
            aRecent15Days: 'aRecent15DaysDemo3',
            aRecent30Days: 'aRecent30DaysDemo3',
            isTodayValid: false,
            startDate: $this.getBeforeDate( 7 ), // 开始日期(即页面初始化的时候前6天的日期)
            endDate: $this.getBeforeDate( 1 ), // 结束日期(及页面初始化时候默认今天的日期)
            defaultText: ' 至 ',
            inputTrigger: 'input_trigger_demo3',
            theme: 'ta',
            success: function( obj ) {
                // $("#dCon_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
                $this.myStartDate = obj.startDate;
                $this.myEndDate = obj.endDate;

                if ( $this.activeMemberTab == true ) {
                    $this.getMemberTab() // 修改日期以后进行查新会员数的图表数据

                } else if ( $this.activeRechargeTab == true ) {
                    $this.getRechargeTab() // 修改日期以后进行查充值会员数的图表数据

                } else if ( $this.activeTotalTab == true ) {
                    $this.getTotalTab() // 修改日期以后进行查会员总数的图表数据

                } else if ( $this.activeConsumeTab == true ) {
                    $this.getConsumeTab() // 修改日期以后进行查会员消费金额的图表数据

                } else if ( $this.activeMrechargeTab == true ) {
                    $this.getMrechargeTab() // 修改日期以后进行查会员充值金额的图表数据

                } else {

                }

            }
        } );
        // $('.selectday').change(function(){
        //     var opt = $('.selectday').val();
        //     if(opt=='1'){
        //         $('.selectday').attr('id','aRecent7DaysDemo3')
        //     }
        //     if(opt=='2'){
        //         $('.selectday').attr('id','aRecent15DaysDemo3')
        //     }
        //     if(opt=='3'){
        //         $('.selectday').attr('id','aRecent30DaysDemo3')
        //     }
        // });
        // 初始化的时候传默认日期进行查询(即最近7天的数据)
        this.myStartDate = dateRange.mOpts.startDate;
        this.myEndDate = dateRange.mOpts.endDate;
        this.getMemberTab()
    }
}
</script>

<style lang="css" scoped>
  /*主要内容区域*/
  .page-content{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 35px;
  }
  .page-bar {
      background-color: #fff;
      position: relative;
      padding: 0 20px;
      margin: -25px -20px 0;
      border-bottom: 1px solid #e7ecf1;
      height:0.7rem;
  }
  .page-toolbar {
      display: inline-block;
      float: right;
  }
  .btn.btn-sm {
      margin-top: 0;
      padding: 0.08rem 18px;
      font-size: 12px;
      line-height: 1.5;
  }
  .dashboard-stat.yellow {
      background-color: #f4ae6b;
  }
  .dashboard-stat {
      display: block;
      margin-bottom: 35px;
      overflow: hidden;
      border-radius: 4px;
  }
  .date_icon{
      font-size:18px;
  }
  .dashboard-stat.dashboard-stat-v2 .visual {
      padding-top: 40px;
      margin-bottom: 40px;
  }
  .dashboard-stat .visual {
      width: 25px;
      height: 48px;
      display: block;
      float: right;
      padding-top: 10px;
      /*padding-left: 15px;*/
      padding-right:80px;
      margin-bottom: 15px;
      font-size: 35px;
      line-height: 35px;
  }
  .visual i{
      font-size:80px;
      color:rgba(0,0,0,.08);
  }
  .dashboard-stat.green {
      background-color: #5ab6c7;
  }
  .dashboard-stat.red-sunglo {
      background-color: #f4786b;
  }
  .dashboard-stat.green-jungle {
      background-color: #5fd879;
  }
  a, button, code, div, img, input, label, li, p, pre, select, span, svg, table, td, textarea, th, ul {
      -webkit-border-radius: 0!important;
      -moz-border-radius: 0!important;
      border-radius: 0!important;
  }
  a:link{
      text-decoration: none;

  }
  .details{
      font-size: 0.3rem;
      height:0.6rem;
      line-height:0.6rem;
      background:rgba(0,0,0,0.1);
      color:#F7F9FB;
      padding-left:30px;
  }
  .details-number{
      font-size: 0.3rem;
      height:0.6rem;
      line-height:0.6rem;
      color:#F7F9FB;
      padding-top:10px;
      padding-left:30px;
      float:left;
  }
  .yestoday-index{
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      margin-bottom: 30px;
  }
  .yestoday-index-th>div{
      display: inline-block;
      width: 19%;
      text-align: center;
  }
  .yestoday-index-tr{
      width: 100%;
      line-height: 100px;
      border: 1px solid #f5f5f5;
      font-size: 14px;
      /*font-weight: 700;*/
  }
  .yestoday-index-tr>div{
      display: inline-block;
      width: 19%;
      text-align: center;
      border-right: 1px solid #f5f5f5;
  }
  .lastmonth-index{
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      margin-bottom: 30px;
  }
  .more-index-title ul li a.tabLength{
    width: 106px;
  }
  .more-index-title ul li.active a,.more-index-title ul li.active a:focus,.more-index-title ul li.active a:hover{
      border: none;
      background-color: #fff;
      color: #404347;
  }
  .tab-content{
      width: 100%;
      border: 1px solid #eee;
  }
  .member-time{
      height: 35px;
      width: 100%;
      background-color: #f5f5f5;
  }
  .member-time .daynum>span{
      padding: 7px;
      border: none;
      outline: none;
      background-color: #f5f5f5;
      border-right: 1px solid #dcdada;
      height: 35px;
  }
  .daynum{
    cursor: pointer;
  }
  .member-time .daynum,.member-time .ta_date{
      display: inline-block;
      float: none;
      float: none;
      background: none;
      margin: 0;
      border: none;
      vertical-align: middle;
      box-shadow: none;
  }
  .member-time .ta_date{
    border-right: 1px solid #dcdada;
  }
  .member-time .ta_date .date_title{
    height: 35px;
    line-height: 35px;
    color: #404347;
    border-right: none;
  }
  .member-num{
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
  }
  .member-num span{
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50% !important;
      background-color: #E94C3B;
      margin-right: 10px;
  }
  .tab-content>.tab-pane{
      display: block;
      height: 0;
      overflow-y: hidden;
  }
  .tab-content>.active{
      height: auto;
      display: block;
  }
  .selectdayicon{
    font-size:17px;
  }
  .showdaystyle{
    position: absolute;
    z-index: 999999;
    background-color: #fff;
  }
  .showdaystyle li{
    padding: 7px;
    border: none;
    outline: none;
    border-right: 1px solid #dcdada;
    height: 35px;
    width:82px;
  }
  .showdaystyle:hover li{
      background-color: #fff;
      cursor: pointer;
  }
  .showdaystyle li:hover{
      background-color: #F2C4B7;
      cursor: pointer;
  }
  .showdaystyle li:nth-child(3){
    border-bottom: 1px solid #dcdada;
  }
  .selectstyle{
    background-color: #F2C4B7;
  }
</style>
ne-height: 1.5;
  }
  .dashboard-stat.yellow {
      background-color: #f4ae6b;
  }
  .dashboard-stat {
      display: block;
      margin-bottom: 35px;
      overflow: hidden;
      border-radius: 4px;
  }
  .date_icon{
      font-size:18px;
  }
  .dashboard-stat.dashboard-stat-v2 .visual {
      padding-top: 40px;
      margin-bottom: 40px;
  }
  .dashboard-stat .visual {
      width: 25px;
      height: 48px;
      display: block;
      float: right;
      padding-top: 10px;
      /*padding-left: 15px;*/
      padding-right:80px;
      margin-bottom: 15px;
      font-size: 35px;
      line-height: 35px;
  }
  .visual i{
      font-size:80px;
      color:rgba(0,0,0,.08);
  }
  .dashboard-stat.green {
      background-color: #5ab6c7;
  }
  .dashboard-stat.red-sunglo {
      background-color: #f4786b;
  }
  .dashboard-stat.green-jungle {
      background-color: #5fd879;
  }
  a, button, code, div, img, input, label, li, p, pre, select, span, svg, table, td, textarea, th, ul {
      -webkit-border-radius: 0!important;
      -moz-border-radius: 0!important;
      border-radius: 0!important;
  }
  a:link{
      text-decoration: none;

  }
  .details{
      font-size: 0.3rem;
      height:0.6rem;
      line-height:0.6rem;
      background:rgba(0,0,0,0.1);
      color:#F7F9FB;
      padding-left:30px;
  }
  .details-number{
      font-size: 0.3rem;
      height:0.6rem;
      line-height:0.6rem;
      color:#F7F9FB;
      padding-top:10px;
      padding-left:30px;
      float:left;
  }
  .yestoday-index{
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      margin-bottom: 30px;
  }
  .yestoday-index-th>div{
      display: inline-block;
      width: 19%;
      text-align: center;
  }
  .yestoday-index-tr{
      width: 100%;
      line-height: 100px;
      border: 1px solid #f5f5f5;
      font-size: 14px;
      /*font-weight: 700;*/
  }
  .yestoday-index-tr>div{
      display: inline-block;
      width: 19%;
      text-align: center;
      border-right: 1px solid #f5f5f5;
  }
  .lastmonth-index{
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      margin-bottom: 30px;
  }
  .more-index{
      padding-left: 15px;
      padding-right: 15px;
  }
  .more-index-title ul{
      display: inline-block;
      font-size: 14px;
      vertical-align: middle;
      margin-left: 20px;
      border: none;
      font-weight: normal;
  }
  .more-index-title ul li{
      margin-bottom: 0;
      margin-left: 10px;
  }
  .more-index-title ul li a{
      border: none;
      color: rgba(64, 67, 71, 0.5);
      padding: 2px 10px;
      border-radius: 5px !important;
      background-color: #f5f5f5;
      cursor: pointer;
  }
  .more-index-title ul li a:hover{
      background-color: #f5f5f5;
  }
  .more-index-title ul li.active a,.more-index-title ul li.active a:focus,.more-index-title ul li.active a:hover{
      border: none;
      background-color: #fff;
      color: #404347;
  }
  .tab-content{
      width: 100%;
      border: 1px solid #eee;
  }
  .member-time{
      height: 35px;
      width: 100%;
      background-color: #f5f5f5;
  }
  .member-time .daynum>span{
      padding: 7px;
      border: none;
      outline: none;
      background-color: #f5f5f5;
      border-right: 1px solid #dcdada;
      height: 35px;
  }
  .daynum{
    cursor: pointer;
  }
  .member-time .daynum,.member-time .ta_date{
      display: inline-block;
      float: none;
      float: none;
      background: none;
      margin: 0;
      border: none;
      vertical-align: middle;
      box-shadow: none;
  }
  .member-time .ta_date{
    border-right: 1px solid #dcdada;
  }
  .member-time .ta_date .date_title{
    height: 35px;
    line-height: 35px;
    color: #404347;
    border-right: none;
  }
  .member-num{
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
  }
  .member-num span{
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50% !important;
      background-color: #E94C3B;
      margin-right: 10px;
  }
  .tab-content>.tab-pane{
      display: block;
      height: 0;
      overflow-y: hidden;
  }
  .tab-content>.active{
      height: auto;
      display: block;
  }
  .selectdayicon{
    font-size:17px;
  }
  .showdaystyle{
    position: absolute;
    z-index: 999999;
    background-color: #fff;
  }
  .showdaystyle li{
    padding: 7px;
    border: none;
    outline: none;
    border-right: 1px solid #dcdada;
    height: 35px;
    width:82px;
  }
  .showdaystyle:hover li{
      background-color: #fff;
      cursor: pointer;
  }
  .showdaystyle li:hover{
      background-color: #F2C4B7;
      cursor: pointer;
  }
  .showdaystyle li:nth-child(3){
    border-bottom: 1px solid #dcdada;
  }
  .selectstyle{
    background-color: #F2C4B7;
  }
</style>
