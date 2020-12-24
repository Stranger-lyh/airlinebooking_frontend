<template>
<div>
  <Row>
    <i-col span="24">
    <Card>
      <Row>
        <i-col offset="4">
          <Form ref="formInline" :model="filter"  inline>
            <FormItem label="起飞地点">
              <div class="input_width_150">
                <Input v-model="filter.start"/>
              </div>
            </FormItem>
            <FormItem label="降落地点">
              <div class="input_width_150">
                <Input v-model="filter.end"/>
              </div>
            </FormItem>
            <FormItem label="航空公司">
              <div class="input_width_150">
                <Input v-model="filter.company"/>
              </div>
            </FormItem>
            <FormItem>
                <br>
                <Button type="primary" @click="onConfirmFilter">筛选</Button>
                <Button type="primary" style="margin-left: 8px" @click="onClearFilter">清空查询条件</Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </Card>
    </i-col>
  </Row>
    <Table
      :data="flightData"
      :columns="column"
      size="large"
    />
    <Modal
      v-model="bookingModal"
      title="确认订票"
      @on-ok="onConfirmBooking"
      >
      <List header="机票信息确认" border size="large">
            <ListItem>
              <h5>起降地点:</h5>&nbsp;
              {{ confirmData.place }}
            </ListItem>
            <ListItem>
              <h5>起降时间:</h5>&nbsp;
              {{ confirmData.time }}
            </ListItem>
            <ListItem>
              <h5>机票价格:</h5>&nbsp;
              {{ confirmData.price }}
            </ListItem>
            <ListItem>
              <Radio v-model="luggage">托运行李</Radio>
            </ListItem>
            <ListItem>
              <Input v-model="weight" :disabled="!luggage" placeholder="托运行李的重量(KG)"/>
            </ListItem>
        </List>
    </Modal>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import { queryAllFlight } from '@/api/query'
import { addBill } from '@/api/addInfo'
import { getErrModalOptions } from '@/libs/util'
export default {
  name: 'FlightCheck',
  data () {
    return {
      column: [
        { title: '航班id', key: 'flight_id' },
        { title: '日期',
          render: (h, params) => {
            return h('font', {
              style: {
                fontSize: '20px'
              }
            }, params.row.date)
          } },
        { title: '起飞-降落地点', key: 'place'
        },
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
        { title: '航空公司', key: 'companyName' },
        { title: '价格',
          render: (h, params) => {
            return h('div', {}, [
              h('font', {
                style: {
                  'color': 'red',
                  'fontSize': '20px',
                  'text-align': 'center'
                }
              }, params.row.price),
              h('font', {
                style: {
                  fontSize: '8px'
                }
              }, ' 起')
            ])
          }
        },
        { title: '操作',
          render: (h, params) => {
            return h('Button', {
              on: {
                'click': () => { this.onBook(params.row) }
              },
              props: {
                type: 'primary'
              }
            }, '订票')
          }
        }
      ],
      flightData: [],
      bookingModal: false,
      startPlace: '',
      filter: {},
      originFlightData: [],
      confirmData: {},
      luggage: false,
      weight: '',
      userId: ''
    }
  },

  async mounted () {
    this.getUserInfo().then(res => {
      console.log(res)
      this.userId = res.user_id
    })
    let res = await queryAllFlight()
    this.originFlightData = res.data
    this.getFlightData()
    this.filter.end = this.$store.state.app.gotoPlace === '' ? undefined : this.$store.state.app.gotoPlace
    this.onConfirmFilter()
  },

  methods: {
    ...mapActions([
      'getUserInfo'
    ]),

    onBook (data) {
      this.luggage = false
      this.weight = undefined
      this.bookingModal = true
      this.confirmData.time = data.time
      this.confirmData.place = data.place
      this.confirmData.price = data.price
      this.confirmData.flight_id = data.flight_id
    },

    getFlightData () {
      this.flightData = []
      const timeReg = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}/
      this.originFlightData.map(item => {
        let newItem = {}
        newItem.flight_id = item.id
        newItem.place = item.startPorPlace + '  ---  ' + item.arrivePortPlace
        newItem.time = item.startTime + '  ---  ' + item.arriveTime
        newItem.price = item.price
        newItem.companyName = item.companyName

        newItem.date = timeReg.exec(item.startTime)[1]
        newItem.startTime = timeReg.exec(item.startTime)[2]
        newItem.arriveTime = timeReg.exec(item.arriveTime)[2]
        newItem.startPortName = item.startPortName
        newItem.arrivePortName = item.arrivePortName
        this.flightData.push(newItem)
      })
    },

    async onConfirmBooking () {
      try {
        let customerid = this.userId
        let flightid = this.confirmData.flight_id
        let weight = this.weight || 0
        console.log({ customerid, flightid, weight })
        await addBill({ customerid, flightid, weight })
        this.$Message.success('success')
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    },

    onConfirmFilter () {
      this.getFlightData()
      let filghtAfterFilter = this.flightData
      let flag = false
      let startReg = this.filter.start === undefined ? undefined : new RegExp('^' + this.filter.start + '  ---')
      if (startReg !== undefined) {
        filghtAfterFilter = filghtAfterFilter.filter(item => startReg.test(item.place))
        flag = true
      }

      let endReg = this.filter.end === undefined ? undefined : new RegExp('---  ' + this.filter.end + '$')
      if (endReg !== undefined) {
        filghtAfterFilter = filghtAfterFilter.filter(item => endReg.test(item.place))
        flag = true
      }

      let companyReg = this.filter.company === undefined ? undefined : new RegExp(this.filter.company)
      if (companyReg !== undefined) {
        filghtAfterFilter = filghtAfterFilter.filter(item => companyReg.test(item.companyName))
        flag = true
      }
      if (flag) {
        this.flightData = filghtAfterFilter
      }
    },

    onClearFilter () {
      this.filter = {}
      this.getFlightData()
      this.$store.commit('setGoto', '')
    },

    getTimeTag (str) {

    }
  }
}
</script>
<style scoped>
.input_width_150{
    width:150px;
}
</style>
