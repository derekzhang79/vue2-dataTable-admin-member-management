<template lang="html">
  <div class="login-page-container">
    <div class="set">
      <i class="icon iconfont" @click="showSiteInput = !showSiteInput">&#xe617;</i>
    </div>
    <div class="site" v-show="showSiteInput">
      <div class="site-content">
        <div class="site-content-title">站点地址</div>
        <div class="site-content-validateMsg">
          <div class="" v-show="siteUrlValidateMsgShow">
            提示：输入的站点地址无效！
          </div>
        </div>
        <div class="site-content-input">
          <input type="text" placeholder="请输入站点地址" v-model="siteUrlInput">
        </div>
        <div class="site-content-button">
          <button @click="showSiteInput = !showSiteInput">取消</button>
          <button @click="confirmConfigSiteUrl()">确认</button>
        </div>
      </div>
    </div>
    <div class="login-page-content">
      <div class="content">
        <div>
          <label for=""></label>
          <div class="title contentRight">
            <p><i class="icon iconfont">&#xe724;</i></p>
            登录
          </div>
        </div>
        <div class="info">
          <label for="user">用户名：</label>
          <div class="contentRight">
            <i class="icon iconfont">&#xe638;</i>
            <input type="text" id="user" name="" value="" v-model="userLogin" autocomplete="new-text">
          </div>
        </div>
        <div class="info">
          <label for="password">密　码：</label>
          <div class="contentRight">
            <i class="icon iconfont">&#xe648;</i>
            <input type="password" id="password" name="password" autocomplete="new-password" value="" v-model="userPassword" @keyup.enter="execLogin">
          </div>
        </div>
        <div class="noticeInfo">
          <label for=""></label>
          <div class="contentRight notice">
            {{errorMessage}}
          </div>
        </div>
        <div>
          <label for=""></label>
          <div class="contentRight">
            <button type="button" name="button" @click="execLogin">登&nbsp;录</button>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      @小快网络2017
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            userLogin: '',
            userPassword: '',
            errorMessage: '', // 如果登陆不成功，返回的错误信息
            currentUser: {},
            isUserLogin: false,
            showSiteInput: false,
            siteUrlInput: JSON.parse(localStorage.getItem('site_url')) ? JSON.parse(localStorage.getItem('site_url')) : '', // 输入的站点地址
            storageSiteUrl: JSON.parse(localStorage.getItem('site_url')) || {}, // 本地配置好的站点地址
            siteUrlValidateMsgShow: false, // 是否显示站点地址验证提示信息
        }
    },
    methods: {
        confirmConfigSiteUrl() {
          let $this = this
          jQuery.ajax( {
            url: this.siteUrlInput+'/api-json/xkhy/v2/user', // http://pw.demo.kaensoft.com/rest-api/api-json/xkhy/v2/user
            type: 'GET',
            data: {
              exec_site_url_validate:true, // 验证输入的站点地址是否正确
            },
            dataType: 'json',
            success: function( res ) {
              if(res.erron == 0){
                localStorage.setItem('site_url',JSON.stringify($this.siteUrlInput));
                $this.storageSiteUrl = JSON.parse(localStorage.getItem('site_url'));
                $this.showSiteInput = !$this.showSiteInput;
                $this.siteUrlValidateMsgShow = false;
              }else{
                $this.siteUrlValidateMsgShow = true;
              }
            },
            error:function(){
              $this.siteUrlValidateMsgShow = true;
            }
          } )
        },
        execLogin() {
          if( JSON.stringify(this.storageSiteUrl) != '{}' ){
            if ( this.userLogin != '' && this.userPassword != '' ) {
              let $this = this
              jQuery.ajax( {
                url: this.storageSiteUrl+'/api-json/xkhy/v2/user',
                type: 'POST',
                data: {
                  exec_login: true,
                  user_login: this.userLogin,
                  user_password: this.userPassword,
                },
                dataType: 'json',
                success: function( res ) {
                  console.log(res)
                  if ( res.erron == 2 ) { // 登陆不成功
                    $this.errorMessage = res.message
                  }
                  if ( res.ID > 0 ) { // 登陆成功
                    $this.isUserLogin = true
                    $this.currentUser = res
                    sessionStorage.setItem( 'user_id', $this.currentUser.ID )
                    sessionStorage.setItem( 'user_data', JSON.stringify( $this.currentUser.data ) )
                    $this.$emit( 'exec-login', $this.isUserLogin )
                  }
                },
                error:function(){
                  $this.errorMessage = '网络错误，无法正常访问！';
                }
              } )
            } else {
              this.errorMessage = '用户名和密码不能为空!'
            }
          }else{
            this.showSiteInput = !this.showSiteInput;
          }
        }
    },
}
</script>

<style lang="css">
.login-page-container .site{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 9999;
}
.login-page-container .site .site-content{
  width: 500px;
  margin: 20% auto;
  text-align: center;
  font-size: 25px;
  color: #E94C3B;
  background-color: #fff;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 5px;
}
.site-content-validateMsg{
  height:30px;
  line-height: 30px;
  font-size:16px;
}
.site-content-input{
  margin-bottom: 30px;
}
.site-content-input input{
  height: 50px;
  width: 400px;
  border: 2px solid #E94C3B;
  text-align: center;
  border-radius: 5px;
  outline: none;
  color: #666;
  font-size: 20px;
}
.site-content-button button{
  height: 50px;
  width: 100px;
  line-height: 50px;
  background-color: #E94C3B;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
}
.site-content-button button:nth-child(1){
  margin-right: 20px;
}
.site-content-button button:nth-child(2){
  margin-left: 20px;
}
.login-page-container .set{
  position: absolute;
  top: 5px;
  right: 40px;
}
.login-page-container .set i{
  font-size: 40px;
  font-weight: 700;
  color: #E94C3B;
  cursor: pointer;
}
.login-page-content{
  position: absolute;
  top: 46%;
  transform: translateY(-50%);
  border-radius: 10px;
  margin-left: 17%;
}
.login-page-content label{
  display: inline-block;
  cursor: pointer;
  width: 130px;
  font-size: 25px;
  color: #fff;
  font-weight: normal;
  line-height: 50px;
}
.login-page-content .contentRight{
  display: inline-block;
  width: 350px;
}
.login-page-content .contentRight input{
  width: 350px;
  height: 50px;
  color: #fff;
  border-radius: 5px;
  background-color: rgba(233, 76, 59, 0.3);
  border: none;
  outline: none;
  padding: 0 0 0 50px;
  box-shadow: inset 2px 2px #b57979;
}
.login-page-content .info{
  position: relative;
  font-size: 25px;
  margin-bottom: 15px;
}
.login-page-content .info i{
  position: absolute;
  font-size: 30px;
  color: #fff;
  left: 145px;
}
.login-page-content .title{
  font-size: 35px;
  color: #E94C3B;
  text-align: center;
  margin-bottom: 25px;
}
.login-page-content .title i{
  font-size: 60px;
}
.login-page-content .title p{
  height: 75px;
}
.noticeInfo{
  height: 30px;
}
.noticeInfo .notice{
  height: 30px;
  width: 350px;
  color: #fff;
  font-size: 20px;
  margin-left: 8px;
  /*margin-top: 10px;*/
}
.login-page-content button{
  width: 350px;
  height: 50px;
  color: #fff;
  background-color: #E94C3B;
  font-size: 25px;
  border-radius: 5px;
  outline: none;
  border: none;
  margin-left: 4px;
  margin-top: 15px;
  line-height: 50px;
}
.copyright{
  width:100%;
  position:fixed;
  bottom:0.5rem;
  text-align: center;
  font-size:15px;
  color:#8e8c8c;
}
</style>
