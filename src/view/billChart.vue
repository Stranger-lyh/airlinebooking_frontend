<template>
  <div
    ref="dom"
    style="width: 400px;height:300px;"
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
      this.updateData()
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(this.chartOption)
      })
    }
  },
  mounted () {
    this.updateData()
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(this.chartOption)
    })
  },

  methods: {
    updateData () {

    }
  }
}
</script>
<style>
</style>
