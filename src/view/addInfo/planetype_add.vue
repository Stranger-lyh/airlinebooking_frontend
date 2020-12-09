<template>
  <Row>
    <Form label-width=80>
        <FormItem label="型号名称">
          <div class="input_width_150">
            <Input v-model="name" />
          </div>
        </FormItem>
        <FormItem label="载客量">
          <div class="input_width_150">
            <Input v-model="capacity" />
          </div>
        </FormItem>
        <FormItem label="最大航程">
          <div class="input_width_150">
            <Input v-model="voyage" />
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
import { addPlaneType } from '@/api/addInfo'
import { getErrModalOptions } from '@/libs/util'
export default {
  name: 'PlaneTypeAdd',
  data () {
    return {
      name: '',
      capacity: '',
      voyage: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        await addPlaneType({ name: this.name, capacity: this.capacity, voyage: this.voyage })
        this.$Message.success('success')
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    }
  }
}
</script>
<style>
</style>
