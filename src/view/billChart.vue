<template>
  <div
    ref="dom"
    style="width: 700px;height:500px;"
  />
</template>
<script>
import echarts from 'echarts'
import tdTheme from '../components/charts/theme.json'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'BillChart',
  props: {
    times: {
      type: Array
    },
    data: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  computed: {
    chartOption: function () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}元'
        },
        xAxis: {
          type: 'category',
          data: this.times
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.data,
          type: 'line',
          smooth: true
        }]
      }
    },

    listenChange: function () {
      return {
        a: this.data
      }
    }
  },
  watch: {
    listenChange: function () {
      console.log(this.data)
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(this.chartOption)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(this.chartOption)
    })
  },

  methods: {
  }
}
</script>
<style>
</style>
