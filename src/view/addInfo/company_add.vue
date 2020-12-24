<template>
  <Row>
    <Form :label-width="100">
        <FormItem label="航空公司名称">
          <div class="input_width_150">
            <Input v-model="name" />
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
import { addCompany } from '@/api/addInfo'
import { getErrModalOptions } from '@/libs/util'
export default {
  name: 'CompanyAdd',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        await addCompany({ name: this.name })
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
