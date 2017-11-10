<template>
  <div class="login-content">
    <div class="text-center login-logo">
      <img src=".././assets/images/logo.png" alt="">
      <p>代理管理平台</p>
    </div>
    <div class="login-input">
      <div class="login-ip">
        <i class="iconfont icon-yonghu1"></i>
        <input type="text" placeholder="请输入登录账号" v-model="userID">
      </div>
      <div class="login-ip">
        <i class="iconfont icon-mima"></i>
        <input type="password" placeholder="请输入登录密码" v-model="userPwd">
      </div>
      <div class="login-check">
        <div>
          <label for="">
            <input type="checkbox" :checked="agreeLogin" @click="agreeAr">
            <i @click="showAr">我已阅读并同意《用户服务条款》</i>
          </label>
        </div>
        <div>
          <label for="">
            <input type="checkbox" :checked="rememberPwd" @click="agreeRemember">
            <i>记住密码</i>
          </label>
        </div>
      </div>
    </div>
    <x-button type="primary" :show-loading="showLoading" @click.native="login" class="login-btn">登录</x-button>
    <footer class="login-footer">
      <p>copyright&copy;Yiugame</p>
    </footer>
    <div @click="showAr" class="login-argument-content" v-show="showArgument">
      <p style="text-align: center">《11万州麻将》代理合作协议</p>
      <p style='padding-left: 1rem;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎您注册/登录使用《11万州麻将》的代理后台系统（下称“本系统”）。
      请您在注册/登录本系统前仔细阅读《11万州麻将》代理合作协议（下称“本协议”）的所有内容,
      特别是有关代理的义务的条款，以及免除、限制我方责任的条款。本协议是重庆隆讯科技有限公司（下称我方）
      与《11万州麻将》代理（下称“代理”或“你方”）所约定的规范双方权利、义务关系的电子合同（买卖合同）。
      如您对本协议任何内容有异议，请不要登录/使用本系统。当您点击确认键登录或使用本系统相关服务,
      则视为您已仔细阅读本协议所有内容，同意接受本协议的所有规定及我方相关政策的约束，成为代理，
      有权从我方批量购买《11万州麻将》（下称本游戏）的房卡等产品或服务，并对外转售。</p>
      <p>一、合作内容</p>
      <p style='padding-left: 1rem;'>1、协助我方提升本游戏的房卡销售数量，提升本游戏的玩家用户规模。</p>
      <p style='padding-left: 1rem;'>2、为实现前述目的，你方可通过线下场所或线上渠道（Q群、QQ、贴吧、论坛、空间、微信、微博等）、
      自身人际关系、非官方网络资源等各种合法方式和渠道，推广本游戏，我方将提供必要的支持和协助。</p>
      <p style='padding-left: 1rem;'>3、为实现前述目的，双方共同将为本游戏做正面宣传，扩大本游戏的知名度和美誉度。</p>
      <p>二、代理的权利和义务</p>
      <p style='padding-left: 1rem;'>1、代理成为本游戏的房卡和其他相关服务的批发商，有权从我方以低于市场统一定价的价格、
      大批量购买本游戏的房卡和其他相关服务，并以市场统一定价对外转售</p>
      <p style='padding-left: 1rem;'>2、代理有权参与我方组织的市场推广活动，并从我方获得相应的奖励。</p>
      <p style='padding-left: 1rem;'>3、代理不享有本游戏在任何区域的独家合作资格。</p>
      <p style='padding-left: 1rem;'>4、代理不得从我方之外的其他途径购买本游戏的房卡和其他相关服务，不得互相串货，不得私自降价销售，
      不得扰乱本游戏房卡和相关服务的市场价格体系。</p>
      <p style='padding-left: 1rem;'>5、代理不得对用户歧视性销售，不得捆绑销售、搭便车销售。</p>
      <p style='padding-left: 1rem;'>6、在合作推广过程中，代理的任何行为均不得包含有虚假、诱骗、违反国家法律法规的内容，
      也不得做出有悖于我方对外公布的相关公告、协议内容的承诺或行为，不得通过组织、参与违法活动来追求销售业绩。
      如有发现，你方独自承担一切法律后果，且我方有权向国家有关机关做举报。</p>
      <p style='padding-left: 1rem;'>7、代理有义务积极维护和宣传我方的品牌、业务和政策，不煽动、不参与任何形式的不利于我方品牌、业务、
      政策的活动。你方不可假冒和改变我方的商标、标志、商业信息等，不得故意造成与我方产品或服务的混淆，
      不得以我方公司或员工名义对外从事任何活动。</p>
      <p style='padding-left: 1rem;'>8、代理须保证在进行本游戏推广之前已经获得线上或者线下场所的许可，并遵守相应的线上线下法律规章制度，
      否则由此产生的纠纷和可能导致的一切责任由代理本人承担；代理同意我方对此免责。</p>
      <p style='padding-left: 1rem;'>9、代理理解并认可，代理在注册和使用本系统过程中所提供的个人资料及相关信息是我方判断你方身份的重要依据，
      你方应根据要求尽可能提供详尽的信息，并确保信息的完整性、合法性和真实性。如代理提交的资料有任何变动，
      必须在本系统中及时更新,必要时以电话或邮件形式告知我方管理人员，以保证其资料准确性。
      如果代理不能提供准确完整的个人信息、未及时更新相关信息或者提供相关的资料，
      将导致我方无法准确判断代理的身份，从而影响到推广收益发放等操作。因此给代理造成的损失，我方不承担任何责任。</p>
      <p style='padding-left: 1rem;'>10、如因代理提交的信息资料不真实、不准确、不完整、不合法从而导致我方作出错误判断、遭受直接或间接经济损失的，
      我方有权立即取消该代理的资格并追究代理的法律责任。</p>
      <p style='padding-left: 1rem;'>11、代理仅能依据本协议约定的内容，从事本游戏的推广活动，不得将本协议约定的权利、义务转让给任何第三方，
      不得擅自委托第三方从事本游戏的推广行为。</p>
      <p style='padding-left: 1rem;'>12、代理拥有自主的权利，可单方面随时决定终止与我方的合作、并停止使用本系统相关服务。
      如我方对本协议内容或相关服务等作出任何变更，而代理不同意有关变更内容的，代理应立即终止与我方的合作、
      并停止使用本系统相关服务。</p>
      <p>三、权利和义务</p>
      <p style='padding-left: 1rem;'>1、我方会对代理提交的注册信息和资料进行及时审核，并有权根据我方业务发展需要，做出通过或不通过的决定。</p>
      <p style='padding-left: 1rem;'>2、我方有权了解代理的推广情况，获得与代理信息和推广业绩相关的必要的资料、数据和有关证据。</p>
      <p style='padding-left: 1rem;'>3、我方会根据代理的销售业绩和我方政策，将代理应得的收益及时支付到位。</p>
      <p style='padding-left: 1rem;'>4、我方将通过本系统的消息通知、电子邮件等方式，将最新的公司政策（包括但不限于优惠政策、
      对代理的销售业绩要求等）下发给代理。代理有义务遵守、配合公司的各项政策。</p>
      <p style='padding-left: 1rem;'>5、我方有权根据实际需要随时修改本协议，并通过公告、系统消息或邮件等形式公布，修改自公告公布之日、
      或消息送达代理邮箱之日起生效。代理如有异议，可立即停止本协议。</p>
      <p style='padding-left: 1rem;'>6、我方有权单方随时变更、中断或终止本系统及相关服务，且不需对玩家或任何第三方负责。除本协议另有约定外，
      我方将以电话、短信、系统消息/页面或者电子邮件方式通知代理。终止合作通知自发出之时即视为送达。
      如因代理资料中登记的联络方式不正确、不完整或者不真实而导致联络失败的，我方无需对因此导致的任何损失或损害承担法律责任。</p>
      <p style='padding-left: 1rem;'>7、我方有权根据公司业务发展需要，终止本协议涉及的合作。在此情况下，我方应通过发布公告等形式通知代理，
      协议的终止自公告发布之日起生效。</p>" +
      <p style='padding-left: 1rem;'>8、我方将竭力保证本游戏相关系统和数据的稳定，但因技术问题或第三方原因导致产品宕机、数据丢失等问题，
      我方不向你方或其他第三方承担赔偿、补偿的法律义务。</p>
      <p style='padding-left: 1rem;'>9、我方有权要求代理配合我方的相关推广工作，以保证推广本游戏的效果和效率。</p>
      <p style='padding-left: 1rem;'>10、尊重个人隐私是我方的重要政策。在未经授权的情况下，我方不会公开或向第三方透露代理在申请时提交的个人资料。
      但如根据法律规定或政府有权部门的有效命令，或在以下三种情况下，我方可不经授权而向相关部门或第三方公开或透露代理的个人信息：</p>
      <p style='padding-left: 1rem;'>(1)在紧急情况下维护代理个人、第三人或社会大众的财产或人身安全；</p>
      <p style='padding-left: 1rem;'>(2)保持、维护我方的知识产权或其它合法权益；</p>
      <p style='padding-left: 1rem;'>(3)根据本游戏服务的相关规则、制度、条款，应当公开或披露的。</p>
      <p>四、声明</p>
      <p style='padding-left: 1rem;'>我方与代理在此声明：双方不会因根据本协议产生的合作，构成任何形式的劳动合同关系或劳务关系。
      代理不隶属于我方，不受我方内部规章制度的约束。我方不承担代理的任何费用，包括但不限于因代理自身开展推广活动所产生的成本、
      社会保险、福利和医疗保险费用等。</p>
      <p style='padding-left: 1rem;'>我方与代理共同在此声明：本协议不包含任何可能理解为双方之间设立一种代理关系的内容。
      代理无权代表我方对外缔结合同。代理未经我方允许不得以我方名义开展任何形式的活动、宣传或者从事违法犯罪，
      否则一切后果由代理自行承担，我方保留追究其法律责任的权利。</p>
      <p>五、违约责任</p>
      <p style='padding-left: 1rem;'>如代理有违反本协议第二条第4、5、6、7、8、9、10、11款之规定的行为，我方有权根据代理的违约事实和严重程度，
      对其采取扣发推广收益、停止发放推广收益、扣减代理所持房卡、作废代理所持房卡、暂停推广合作资格、
      停止推广合作资格等措施，并有权向代理追讨其通过不当行为所获得的利益。</p>
      <p style='padding-left: 1rem;'>代理对此充分理解并认可。</p>
      <p>六、不可抗力</p>
      <p style='padding-left: 1rem;'>1、一方因不可抗力不能履行本协议的，根据不可抗力的影响，可以部分或者全部免除违约责任。但一方迟延履行后发生不可抗力的，不能免除责任。</p>
      <p style='padding-left: 1rem;'>2、一方因不可抗力不能履行本协议的，应当及时通知对方，以减轻可能给对方造成的损失，并在合理期限内提供证明。
      未及时通知的，对因迟延通知而造成的扩大损失依然承担赔偿责任。</p>
      <p style='padding-left: 1rem;'>3、一方因不可抗力不能履行合同，但尚未造成对本协议根本违约的，另一方应该在履约时间上给予对方适当的宽限；
      如果因不可抗力导致不能实现本协议目的的，双方均有权解除本协议。</p>
      <p>七、协议的生效和终止</p>
      <p style='padding-left: 1rem;'>1、协议的生效：本协议自您登录推广系统并点击“我已同意《用户服务条款》”时生效。</p>
      <p style='padding-left: 1rem;'>2. 下列情形之一出现时，本协议终止：</p>
      <p style='padding-left: 1rem;'>（1）本协议约定的合作期限届满；</p>
      <p style='padding-left: 1rem;'>（2）本游戏终止运营；</p>
      <p style='padding-left: 1rem;'>（3）在本协议有效期内，代理被依法追究刑事责任的，我方将有权单方面终止本协议；</p>
      <p style='padding-left: 1rem;'>（4）其他按照法律规定以及本协议约定的终止情况</p>
      <p>八、其他约定</p>
      <p style='padding-left: 1rem;'>本协议未尽事宜，可由双方另行签订补充协议予以明确。补充协议的内容与本协议的内容有冲突的，优先适用补充协议的规定。</p>
      <p style='padding-left: 1rem;'>代理与我方在合作中产生的争议，应当友好协商解决；协商不成的，任何一方均有权向我方所在地有管辖权的法院提起诉讼。</p>
    </div>
    <actionsheet v-model="showArgument">
    </actionsheet>
  </div>
</template>

<script>
    import {Group, XButton, Actionsheet} from 'vux'
    import axios from 'axios'
    import urlHeader from '@/libs/urlHeader'
    export default {
      data () {
        return {
          showLoading: false,
          showArgument: false,
          agreeLogin: true,
          rememberPwd: true,
          userID: '',
          userPwd: ''
        }
      },
      created () {
        let password = JSON.stringify(this.$local.fetch('userPwd'))
        this.userID = this.$base64.base64decode(this.$local.fetch('userID'))
        if (password == '') {
          this.userPwd = ''
        } else {
          this.userPwd = this.$base64.base64decode(this.$local.fetch('userPwd'))
        }
      },
      components: {
        XButton,
        Group,
        Actionsheet
      },
      methods: {
        login () {
          let that = this
          if (this.agreeLogin && this.userPwd != '' && this.userID != '') {
            this.showLoading = true
            let param = new URLSearchParams()
            param.append("USERNAME", this.userID)
            param.append("PASSWORD", this.userPwd)
            param.append("re_pass", "true")
            axios.post(urlHeader.urlHeader + '/Restructure/index.php/Home/Login/login', param)
              .then((res) => {
                if (res.data == 1 || res.data == 2 || res.data == 3 || res.data == 4) {
                  let uID = that.$base64.base64encode(that.userID)
                  that.$local.save('userID', uID)
                  if (that.rememberPwd) {
                    let uPwd = that.$base64.base64encode(that.userPwd)
                    that.$local.save('userPwd', uPwd)
                  } else {
                    that.$local.save('userPwd', '')
                  }
                  // 这个加的登录判断哈
                  that.$local.saveSession('loginState', that.$base64.base64encode('libaicheng'))
                  that.showLoading = false
                  that.$router.push('/index')
                } else if (res.data == 5) {
                  that.showLoading = false
                  that.$vux.alert.show({
                    title: '错误提示',
                    content: '您的账号已被冻结，请联系官方管理人员！'
                  })
                } else {
                  that.showLoading = false
                  that.$vux.alert.show({
                    title: '错误提示',
                    content: '用户名或密码错误！'
                  })
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } else if (!this.agreeLogin) {
            this.$vux.alert.show({
              title: '错误提示',
              content: '请仔细阅读《11万州麻将》代理合作协议，并同意后再进行登录'
            })
          } else if (this.userPwd == '' || this.userID == '') {
            this.$vux.alert.show({
              title: '错误提示',
              content: '账号或密码不能为空！'
            })
          }
        },
        showAr () {
          this.showArgument = !this.showArgument
        },
        agreeAr () {
          this.agreeLogin = !this.agreeLogin
        },
        agreeRemember () {
          this.rememberPwd = !this.rememberPwd
        }
      }
    }
</script>

<style>
  .weui-dialog__hd .weui-dialog__title{
    color: red !important;
  }
  .weui-dialog__btn {
    background-color: rgb(076, 142, 252);
    color: white !important;
  }
  .weui-dialog{
    border-radius: 1.6rem!important;
  }
</style>
