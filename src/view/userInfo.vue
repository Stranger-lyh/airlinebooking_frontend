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
                    <ListItem><h4>账户余额:</h4>&nbsp;&nbsp;<Tag color="green">{{accountData.balance}}</Tag>元</ListItem>
                </List>
                如果信息有误,请联系管理员
            </Card>
        </i-col>
        <i-col offset="1" span="6">
          <Card>
            <h4>我本月的行程</h4>
            <user-filght :bills="bills"/>
          </Card>
        </i-col>
        <i-col offset="1" span="6">
            <Card>
                <h3>您现在的会员等级是:</h3>
                <Tag :color="color">{{accountData.levelname}}</Tag>
                <h3>您现在享有的折扣是:</h3>
                <Tag :color="color">{{discount}}</Tag>
            </Card>
        </i-col>
    </Row>
    <Divider>我的航班</Divider>
    <Table
      :data="bills"
      :columns="column"
      size="large"
    />
</div>
</template>
<script>
import { mapActions } from 'vuex'
import { queryAccount, queryAllBill } from '@/api/query'
import UserFilght from './userFilght.vue'
export default {
  components: { UserFilght },
  name: 'UserInfo',
  data () {
    return {
      column: [
        { title: '航班id', key: 'flightid' },
        { title: '日期',
          render: (h, params) => {
            return h('font', {
              style: {
                fontSize: '20px'
              }
            }, params.row.date)
          } },
        { title: '起飞-降落地点', key: 'place' },
        { title: '起飞时间',
          key: 'time',
          render: (h, params) => {
            return h('div', {}, [
              h('font', {
                style: {
                  fontSize: '20px'
                }
              }, params.row.startTime),
              h('br', {}),
              h('font', {
                style: {
                  fontSize: '8px'
                }
              }, params.row.startPortName)
            ])
          },
          renderHeader: (h, params) => {
            return h('Tag', {
              props: {
                color: 'cyan'
              }
            }, '\xa0\xa0\xa0\xa0\xa0起飞时间\xa0\xa0\xa0\xa0\xa0')
          }
        },
        { title: '降落时间',
          key: 'time',
          render: (h, params) => {
            return h('div', {}, [
              h('font', {
                style: {
                  fontSize: '20px'
                }
              }, params.row.arriveTime),
              h('br', {}),
              h('font', {
                style: {
                  fontSize: '8px'
                }
              }, params.row.arrivePortName)
            ])
          },
          renderHeader: (h, params) => {
            return h('Tag', {
              props: {
                color: 'red'
              }
            }, '\xa0\xa0\xa0\xa0\xa0降落时间\xa0\xa0\xa0\xa0\xa0')
          }
        },
        { title: '行李托运重量',
          render: (h, params) => {
            return h('font', {
              style: {
                fontSize: '12px'
              }
            }, params.row.weight + ' KG')
          } }
      ],
      userName: '',
      accountData: {},
      color: 'default',
      discount: '',
      bills: []
    }
  },

  async mounted () {
    let res = await this.getUserInfo()
    this.userName = res.name
    let account = await queryAccount()
    this.accountData = account.data.find(item => item.accountid === this.userName)
    this.getTagColor()
    res = await queryAllBill()
    let originBills = res.data
    this.getMyBills(originBills)
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
    },

    getMyBills (originBills) {
      let TempBills = originBills.filter(item => item.customerid === this.accountData.customerid)
      const timeReg = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/
      let res = TempBills.map(item => {
        let newItem = {}
        newItem.flightid = item.flightid
        newItem.place = item.fromplace + '  ---  ' + item.toplace
        newItem.date = timeReg.exec(item.starttime)[1]
        newItem.startTime = timeReg.exec(item.starttime)[2]
        newItem.arriveTime = timeReg.exec(item.arrivetime)[2]
        newItem.startPortName = item.fromport
        newItem.arrivePortName = item.toport
        newItem.weight = item.weight
        return newItem
      })
      this.bills = JSON.parse(JSON.stringify(res))
    }
  }
}
</script>
<style scoped>
</style>
