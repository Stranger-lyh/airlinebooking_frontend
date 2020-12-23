<template>
<div>
  <Row>
    <i-col span="8">
    <Card>
      <Row>
        <i-col offset="4">
          <Form :model="filter" :label-width="80">
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
        </List>
    </Modal>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import { queryAllFlight } from '@/api/query'
export default {
  name: 'FlightCheck',
  data () {
    return {
      column: [
        { title: '航班id', key: 'flight_id' },
        { title: '起飞-降落地点', key: 'place' },
        { title: '时间', key: 'time', minWidth: 150 },
        { title: '航空公司', key: 'companyName' },
        { title: '价格', key: 'price' },
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
      confirmData: {}
    }
  },

  async mounted () {
    this.getUserInfo().then(res => { console.log(res) })
    let res = await queryAllFlight()
    this.originFlightData = res.data
    this.getFlightData()
  },

  methods: {
    ...mapActions([
      'getUserInfo'
    ]),

    onBook (data) {
      this.bookingModal = true
      this.confirmData.time = data.time
      this.confirmData.place = data.place
      this.confirmData.price = data.price
    },

    getFlightData () {
      this.flightData = []
      this.originFlightData.map(item => {
        let newItem = {}
        newItem.flight_id = item.id
        newItem.place = item.startPorPlace + '--' + item.arrivePortPlace
        newItem.time = item.startTime + '--' + item.arriveTime
        newItem.price = item.price
        newItem.companyName = item.companyName
        this.flightData.push(newItem)
      })
    },

    onConfirmBooking () {

    },

    onConfirmFilter () {
      this.getFlightData()
      let filghtAfterFilter = this.flightData
      let flag = false
      let startReg = this.filter.start === undefined ? undefined : new RegExp('^' + this.filter.start + '--')
      if (startReg !== undefined) {
        filghtAfterFilter = filghtAfterFilter.filter(item => startReg.test(item.place))
        flag = true
      }

      let endReg = this.filter.end === undefined ? undefined : new RegExp('--' + this.filter.end + '$')
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
    },

    getTimeTag (str) {

    }
  }
}
</script>
<style>
.input_width_150{
    width:150px;
}
</style>
