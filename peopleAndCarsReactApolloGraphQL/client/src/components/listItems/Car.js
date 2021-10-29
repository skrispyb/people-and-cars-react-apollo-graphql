import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import UpdateCar from '../forms/UpdateCar';
import RemoveCar from '../buttons/RemoveCar';
import { EditOutlined } from '@ant-design/icons';

const getStyles = () => ({
  card: {
      width: '500px',
      marginBottom: '16px',
  }
})

const Car = (props) => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles();
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate()
  }, [])


  const updateStateVariableCar = (variable, value) => {
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

  const handleButtonClick = () => {
    setEditMode(!editMode)
    forceUpdate()
  }

  return (
    <div>
      {editMode ? (<UpdateCar
        id={id}
        year={year}
        make={make}
        model={model}
        price={price}
        personId={personId}
        onButtonClick={handleButtonClick}
        updateStateVariableCar={updateStateVariableCar} />) :
        (<Card style={styles.card}          
          type="inner" title={make+" "+model}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
             />
          ]}>
          Year: <b>{year}</b> | Make: <b>{make}</b> | Model: <b>{model}</b> | Price: $ <b>{price}.00</b>
        </Card>)
      }
    </div>
  )
}

export default Car