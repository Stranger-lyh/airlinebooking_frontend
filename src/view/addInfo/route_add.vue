<template>
  <Row>
    <Form label-width=80>
        <FormItem label="起飞机场">
          <div class="input_width_150">
            <Select v-model="from">
                <Option v-for="item in airports" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="降落机场">
          <div class="input_width_150">
            <Select v-model="to">
                <Option v-for="item in airports" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">Submit</Button>
          <Button  style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
  </Row>
</template>
<script>
import { addRoute } from '@/api/addInfo'
import { queryAllAirport } from '@/api/query'
import { getErrModalOptions } from '@/libs/util'
export default {
  name: 'RouteAdd',
  data () {
    return {
      airports: [],
      from: '',
      to: ''
    }
  },
  mounted () {
    this.queryAirports()
  },
  methods: {
    async handleSubmit () {
      try {
        await addRoute({ id1: this.from, id2: this.to })
        this.$Message.success('success')
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    },

    async queryAirports () {
      try {
        let res = await queryAllAirport()
        this.airports = res.data
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    }
  }
}
</script>
<style>
</style>
