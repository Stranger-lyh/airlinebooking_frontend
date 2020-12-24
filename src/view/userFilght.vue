<template>
  <div
    ref="dom"
    style="width: 300px;height:270px;"
  />
</template>
<script>
import echarts from 'echarts'
import tdTheme from '../components/charts/theme.json'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'UserFilght',
  props: {
    bills: {
      type: Array
    }
  },
  data () {
    return {
      graphData: [],
      links: []
    }
  },
  computed: {
    chartOption: function () {
      return {
        tooltip: {
          formatter: function (params) {
            if (params.value) {
              let date = new Date(params.value[0])
              let dateString = (date.getMonth() + 1) + '-' + date.getDate() + ':' + params.value[1].toString() + '个航班'
              return dateString
            } else {
              return ''
            }
          }
        },
        calendar: {
          top: 'middle',
          left: 'center',
          orient: 'vertical',
          cellSize: [40, 40],
          yearLabel: { show: false },
          dayLabel: {
            firstDay: 1,
            nameMap: 'cn'
          },
          monthLabel: { show: false },
          range: '2020-12'
        },
        series: [{
          type: 'graph',
          edgeSymbol: ['none', 'arrow'],
          coordinateSystem: 'calendar',
          links: this.links,
          symbolSize: 15,
          calendarIndex: 0,
          itemStyle: {
            color: 'yellow',
            shadowBlue: 9,
            shadowOffsetX: 1.5,
            shadowOffsetY: 3,
            shadowColor: '#555'
          },
          lineStyle: {
            color: '#D10E00',
            width: 1,
            opacity: 1
          },
          data: this.graphData,
          z: 20
        }]
      }
    },

    listenChange: function () {
      return {
        a: this.bills
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
      this.graphData = []
      let thisTime = new Date(Date.now())
      let month = thisTime.getFullYear() + '-' + (thisTime.getMonth() + 1) + '-' + '01'
      let firstDayTime = new Date(month)
      console.log(firstDayTime.valueOf())
      console.log(this.bills)
      const dateReg = /^(\d{4})-(\d{2})-(\d{2})$/
      let billsThisMonth = this.bills.filter(item => {
        let itemYear = dateReg.exec(item.date)[1]
        let itemMonth = dateReg.exec(item.date)[2]
        let yEqual = itemYear === thisTime.getFullYear().toString()
        let mEqual = itemMonth === (thisTime.getMonth() + 1).toString()
        return yEqual && mEqual
      })
      let monthData = {}
      billsThisMonth.forEach(item => {
        let day = dateReg.exec(item.date)[3]
        let unixTime = firstDayTime.valueOf() + 3600 * 24 * 1000 * (parseInt(day) - 1)
        if (monthData[unixTime.toString()] === undefined) {
          monthData[unixTime.toString()] = 1
        } else {
          monthData[unixTime.toString()] = monthData[unixTime.toString()] + 1
        }
      })
      console.log(monthData)
      for (var time in monthData) {
        this.graphData.push([Number(time), monthData[time]])
      }
      this.graphData = this.graphData.sort((a, b) => a[0] - b[0])
      // this.graphData = JSON.parse(JSON.stringify(res))
      this.links = this.graphData.map(function (item, idx) {
        return {
          source: idx,
          target: idx + 1
        }
      })
      this.links.pop()
    }
  }
}
</script>
<style>
</style>
