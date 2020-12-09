<template>
  <Row>
    <Form label-width=80>
        <FormItem label="机场名称">
          <div class="input_width_150">
            <Input v-model="name" />
          </div>
        </FormItem>
        <FormItem label="机场地点">
          <div class="input_width_150">
            <Input v-model="place" />
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
import { addAirport } from '@/api/addInfo'
import { getErrModalOptions } from '@/libs/util'
export default {
  name: 'AirportAdd',
  data () {
    return {
      name: '',
      place: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        await addAirport({ name: this.name, place: this.place })
        this.$Message.success('success')
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    }
  }
}
</script>
<style>
.input_width_150{
    width:150px;
}
</style>
