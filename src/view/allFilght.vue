<template>
    <Card>
        <Row>
            <i-col offset="2" span="20">
                <all-flight-chart :routes="routes" :values="values"/>
            </i-col>
        </Row>
    </Card>
</template>
<script>
import allFlightChart from './allFlightChart.vue'
import { queryAllFlight } from '@/api/query'
export default {
  components: { allFlightChart },
  name: 'AllFilght',
  data () {
    return {
      flightData: [],
      routes: [],
      values: {}
    }
  },
  async mounted () {
    let res = await queryAllFlight()
    this.flightData = res.data
    this.getData()
    console.log(this.routes)
    console.log(this.values)
  },
  methods: {
    getData () {
      let routes = []
      let values = {}
      this.flightData.forEach(item => {
        let start = item.startPorPlace
        let arrive = item.arrivePortPlace
        routes.push([start, arrive])
        values[start] = values[start] === undefined ? 1 : values[start] + 1
        values[arrive] = values[arrive] === undefined ? 1 : values[arrive] + 1
      })
      this.routes = JSON.parse(JSON.stringify(routes))
      this.values = JSON.parse(JSON.stringify(values))
    }
  }
}
</script>
<style scoped>

</style>
