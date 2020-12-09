<template>
  <Row>
    <Form label-width=80>
        <FormItem label="航线id">
          <div style="width:150px;">
            <Input v-model="flightInfo.route_id"/>
          </div>
        </FormItem>
        <FormItem label="飞机id">
          <div style="width:150px;">
            <Input v-model="flightInfo.plane_id"/>
          </div>
        </FormItem>
        <FormItem label="起飞时间">
          <DatePicker v-model="flightInfo.time1" type="datetime"  format="yyyy-MM-dd HH:mm" placeholder="Select date" style="width: 250px"/>
        </FormItem>
        <FormItem label="降落时间">
          <DatePicker v-model="flightInfo.time2" type="datetime"  format="yyyy-MM-dd HH:mm" placeholder="Select date" style="width: 250px"/>
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
export default {
  name: 'FlightAdd',
  data () {
    return {
      flightInfo: {}
    }
  },

  methods: {
    handleSubmit () {
      let time1 = this.flightInfo.time1
      console.log(this.flightInfo.time1)
      console.log(time1.valueOf())
    }
  }
}
</script>
<style>
</style>
