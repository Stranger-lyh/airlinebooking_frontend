<template>
    <Card>
        <all-flight-chart/>
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
      flightData: []
    }
  },
  async mounted () {
    let res = await queryAllFlight()
    this.flightData = res.data
  },
  methods: {

  }
}
</script>
<style scoped>

</style>
