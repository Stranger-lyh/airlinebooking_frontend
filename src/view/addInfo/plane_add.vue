<template>
  <Row>
    <Form :label-width="90">
        <FormItem label="飞机型号">
          <div class="input_width_150">
            <Select v-model="type_id">
                <Option v-for="item in planeTypes" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="所属航空公司">
          <div class="input_width_150">
            <Select v-model="company_id">
                <Option v-for="item in companys" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </FormItem>
        <FormItem label="服役年限">
          <div class="input_width_150">
            <Input v-model="work_time" />
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
import { addPlane } from '@/api/addInfo'
import { queryAllPlaneType, queryAllCompany } from '@/api/query'
import { getErrModalOptions } from '@/libs/util'
export default {
  name: 'PlaneAdd',
  data () {
    return {
      planeTypes: [],
      companys: [],
      type_id: '',
      company_id: '',
      work_time: ''
    }
  },
  mounted () {
    this.queryPlaneType()
    this.queryCompany()
  },
  methods: {
    async handleSubmit () {
      try {
        await addPlane({ type_id: this.type_id, company_id: this.company_id, work_time: this.work_time })
        this.$Message.success('success')
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    },

    async queryPlaneType () {
      try {
        let res = await queryAllPlaneType()
        this.planeTypes = res.data
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    },

    async queryCompany () {
      try {
        let res = await queryAllCompany()
        this.companys = res.data
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    }
  }
}
</script>
<style>
</style>
