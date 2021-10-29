import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from 'antd';
import { GET_PEOPLE, UPDATE_CAR } from "../../queries";
import { useMutation, useQuery } from "@apollo/client";

const { Option } = Select;

const UpdateCar = (props) => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [updateCar] = useMutation(UPDATE_CAR)
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = (values) => {
    const { year, make, model, price } = values

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateCar: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId
        }
      }
    })
    props.onButtonClick();
  }
    
  const updateStateVariable = (variable, value) => {
    props.updateStateVariableCar(variable, value)
    switch(variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }
  
  const onChange = (value) => {
    setPersonId(value);
  }

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if(loading) return 'Loading...'
  if(error) return `Error! ${error.message}`

  return (
    <Form
    form={form}
    name='update-car-form'
    layout='inline'
    onFinish={onFinish}
    initialValues={{
      year: year,
      make: make,
      model: model,
      price: price,
      personId: personId
    }}
    size='large'
    >
      <Form.Item
      name='year'
      rules={[{ required: true, message: 'Please input your car\'s year!' }]}
      >
        <Input
        onChange={e => updateStateVariable('year', e.target.value)} />
      </Form.Item>
      <Form.Item
      name='make'
      rules={[{ required: true, message: 'Please input your car\'s make!' }]}
      >
        <Input
        onChange={e => updateStateVariable('make', e.target.value)} />
      </Form.Item>
      <Form.Item
      name='model'
      rules={[{ required: true, message: 'Please input your car\'s model!' }]}
      >
        <Input
        onChange={e => updateStateVariable('model', e.target.value)} />
      </Form.Item>
      <Form.Item
      name='price'
      rules={[{ required: true, message: 'Please input your car\'s price!' }]}
      >
        <Input
        onChange={e => updateStateVariable('price', e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data.people.map(({ id, firstName, lastName }) => (<Option key={id} value={id}>{firstName} {lastName}</Option>) )}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        { () => (
          <Button
          type='primary'
          htmlType='submit'
          disabled={
              (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price')) || form.getFieldsError().filter(({ errors }) => errors.length).length
          }>Update Car</Button>)
        }
      </Form.Item>
      <Form.Item>
        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form.Item>
    </Form>
  )
}

export default UpdateCar