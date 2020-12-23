<template>
<div>
    <Row>
        <i-col offset="2" span="6">
            <Card>
                <List border size="large">
                    <ListItem><h4>id:</h4>&nbsp;&nbsp;{{ accountData.accountid }}</ListItem>
                    <ListItem><h4>身份证号:</h4>&nbsp;&nbsp;{{ accountData.customerid }}</ListItem>
                    <ListItem><h4>姓名:</h4>&nbsp;&nbsp;{{ accountData.name }}</ListItem>
                    <ListItem><h4>联系方式:</h4>&nbsp;&nbsp;{{ accountData.telnum }}</ListItem>
                </List>
                如果信息有误,请联系管理员
            </Card>
        </i-col>
        <i-col offset="8" span="6">
            <Card>
                <h3>您现在的会员等级是:</h3>
                <Tag :color="color">{{accountData.levelname}}</Tag>
                <h3>您现在享有的折扣是:</h3>
                <Tag :color="color">{{discount}}</Tag>
            </Card>
        </i-col>
    </Row>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import { queryAccount } from '@/api/query'
export default {
  name: 'UserInfo',
  data () {
    return {
      userName: '',
      accountData: {},
      color: 'default',
      discount: ''
    }
  },

  async mounted () {
    let res = await this.getUserInfo()
    this.userName = res.name
    let account = await queryAccount()
    this.accountData = account.data.find(item => item.accountid === this.userName)
    this.getTagColor()
  },

  methods: {
    ...mapActions([
      'getUserInfo'
    ]),

    getTagColor () {
      let level = this.accountData.levelid
      let levelMap = {
        '1': 'gold',
        '2': 'volcano',
        '3': 'default'
      }
      let discountMap = {
        '7': '七折',
        '8': '八折',
        '10': '无折扣'
      }
      this.color = levelMap[level]
      this.discount = discountMap[this.accountData.discount]
    }
  }
}
</script>
<style scoped>
</style>
