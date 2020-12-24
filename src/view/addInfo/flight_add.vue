<template>
  <Row>
    <Form :label-width="80">
        <FormItem label="航线">
          <div style="width:250px;">
            <Select v-model="flightInfo.route_id">
              <Option
                v-for="item in routes"
                :key="item.routeid"
                :value="item.routeid"
              >{{item.name1 + '--' + item.name2}}</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="飞机id">
          <div style="width:150px;">
            <Input v-model="flightInfo.plane_id"/>
          </div>
        </FormItem>
        <FormItem label="起飞时间">
          <DatePicker v-model="flightInfo.time1" transfer type="datetime"  format="yyyy-MM-dd HH:mm" placeholder="Select date" style="width: 250px"/>
        </FormItem>
        <FormItem label="降落时间">
          <DatePicker v-model="flightInfo.time2" transfer type="datetime"  format="yyyy-MM-dd HH:mm" placeholder="Select date" style="width: 250px"/>
        </FormItem>
        <FormItem label="价格">
            <div style="width:150px;">
            <Input v-model="flightInfo.price"/>
          </div>
        </FormItem>
        <FormItem label="票数">
            <div style="width:150px;">
            <Input v-model="flightInfo.num"/>
          </div>
        </FormItem>
        <FormItem>
          <Button @click="handleSubmit" type="primary">Submit</Button>
          <Button  style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
  </Row>
</template>
<script>
import { addFlight } from '@/api/addInfo'
import { queryAllRoute } from '@/api/query'
import { getErrModalOptions } from '@/libs/util'
export default {
  name: 'FlightAdd',
  data () {
    return {
      flightInfo: {},
      routes: []
    }
  },

  async mounted () {
    let res = await queryAllRoute()
    this.routes = res.data
    console.log(this.routes)
  },

  methods: {
    async handleSubmit () {
      try {
        let time1 = this.dateFormat('YYYY-mm-dd HH:MM:SS', this.flightInfo.time1)
        let time2 = this.dateFormat('YYYY-mm-dd HH:MM:SS', this.flightInfo.time2)
        this.flightInfo.time1 = time1
        this.flightInfo.time2 = time2
        await addFlight({ ...this.flightInfo })
        this.$Message.success('success')
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    },

    dateFormat (fmt, d) {
      let ret
      var date = new Date(d)
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
      };
      return fmt
    }
  }
}
</script>
<style>
</style>
