import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import Car from '../listItems/Car';

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Cars = ({ data, res }) => {
  const styles = getStyles()
  const [, forceUpdate] = useState()
  
  useEffect(() => {
      forceUpdate({})
  }, [])

  return (
    <List grid={{ gutter: 20, column: 1}} style ={styles.list}>
      {data.cars.filter(car => car.personId === res.data.person.id).map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <Car id={id} year={year} make={make} model={model} price={price} personId={personId} />
        </List.Item>
      ))}
    </List>
  )
}

export default Cars