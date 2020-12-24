<template>
<div>
<Row>
    <i-col span="18" offset="3">
        <Card>
            <Tabs v-model="tabs">
                <Row>
                    <i-col span="4" offset="10"></i-col>
                </Row>
                <TabPane label="平台营业额" name="billChats">
                    <Row>
                        <i-col span="20" offset="2">
                            <bill-chart :times="time" :data="data"/>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="航班添加" name="airline_add">
                    <Row>
                        <i-col span="8" offset="6">
                            <flight-add/>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="机场添加" name="airport_add">
                    <Row>
                        <i-col span="8" offset="6">
                            <airport-add/>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="航空公司添加" name="company_add">
                    <Row>
                        <i-col span="8" offset="6">
                            <company-add/>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="飞机型号添加" name="planeType_add">
                    <Row>
                        <i-col span="8" offset="6">
                            <plane-type-add/>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="航线添加" name="route_add">
                    <Row>
                        <i-col span="8" offset="6">
                            <route-add/>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="飞机添加" name="plane_add">
                    <Row>
                        <i-col span="8" offset="6">
                            <plane-add/>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="账户添加" name="account_add">
                    <Row>
                        <i-col span="8" offset="6">
                            <account-add/>
                        </i-col>
                    </Row>
                </TabPane>
            </Tabs>
        </Card>
    </i-col>
</Row>
</div>
</template>
<script>
import FlightAdd from './addInfo/flight_add.vue'
import AirportAdd from './addInfo/airport_add.vue'
import CompanyAdd from './addInfo/company_add.vue'
import PlaneTypeAdd from './addInfo/planetype_add.vue'
import RouteAdd from './addInfo/route_add.vue'
import PlaneAdd from './addInfo/plane_add.vue'
import AccountAdd from './addInfo/account_add.vue'
import BillChart from './billChart.vue'
import { estimateBill } from '@/api/query'
export default {
  name: 'AddTabs',
  components: {
    FlightAdd,
    AirportAdd,
    CompanyAdd,
    PlaneTypeAdd,
    RouteAdd,
    PlaneAdd,
    AccountAdd,
    BillChart
  },
  data () {
    return {
      tabs: 'billChats',
      time: [],
      data: []
    }
  },
  async mounted () {
    let res = await estimateBill()
    console.log(res)
    let time = []
    let data = []
    res.data.forEach(item => {
      time.push(item.time)
      data.push(item.price)
    })
    console.log(time)
    this.time = JSON.parse(JSON.stringify(time))
    this.data = JSON.parse(JSON.stringify(data))
  }
}
</script>
<style>
</style>
