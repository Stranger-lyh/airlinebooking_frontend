<template>
    <Table
    :data="flightData"
    :columns="column"
    />
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'FlightCheck',
  data () {
    return {
      column: [
        { title: '航班id', key: 'flight_id' },
        { title: '起飞时间', key: 'take_off' },
        { title: '降落时间', key: 'land_time' },
        { title: '价格', key: 'price' }
      ],
      flightData: [
        { flight_id: 1, take_off: '2020-11-19 10:00', land_time: '2020-11-19 12:00', price: 200 },
        { flight_id: 2, take_off: '2020-11-19 10:00', land_time: '2020-11-19 12:00', price: 200 },
        { flight_id: 3, take_off: '2020-11-19 10:00', land_time: '2020-11-19 12:00', price: 200 },
        { flight_id: 4, take_off: '2020-11-19 10:00', land_time: '2020-11-19 12:00', price: 200 }
      ]
    }
  },

  mounted () {
    this.getUserInfo().then(res => {
      console.log(res)
    })
  },

  methods: {
    ...mapActions([
      'getUserInfo'
    ])
  }
}
</script>
<style>
</style>
