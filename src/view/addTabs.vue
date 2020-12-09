<template>
<Row>
    <i-col span="10" offset="7">
        <Card>
            <Tabs v-model="tabs">
                <TabPane label="航线添加" name="airline_add">
                    <flight-add/>
                </TabPane>
                <TabPane label="机场添加" name="airport_add">
                    <airport-add/>
                </TabPane>
                <TabPane label="航空公司添加" name="company_add">
                    <company-add/>
                </TabPane>
                <TabPane label="飞机型号添加" name="planeType_add">
                    <plane-type-add/>
                </TabPane>
                <TabPane label="航线添加" name="route_add">
                    <route-add/>
                </TabPane>
            </Tabs>
        </Card>
    </i-col>
</Row>
</template>
<script>
import FlightAdd from './addInfo/flight_add.vue'
import AirportAdd from './addInfo/airport_add.vue'
import CompanyAdd from './addInfo/company_add.vue'
import PlaneTypeAdd from './addInfo/planetype_add.vue'
import RouteAdd from './addInfo/route_add.vue'
export default {
  name: 'AddTabs',
  components: {
    FlightAdd,
    AirportAdd,
    CompanyAdd,
    PlaneTypeAdd,
    RouteAdd
  },
  data () {
    return {
      tabs: 'airline_add'
    }
  }
}
</script>
<style>
</style>
