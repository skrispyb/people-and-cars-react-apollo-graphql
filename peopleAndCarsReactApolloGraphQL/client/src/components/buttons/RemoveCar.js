import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { filter } from "lodash";
import { DeleteOutlined } from '@ant-design/icons';
import { GET_CARS, REMOVE_CAR } from "../../queries";

const RemoveCar = ({ id, year, make, model, price, personId }) => {
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate()
  }, [])

  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const data = cache.readQuery({ query: GET_CARS })
      cache.writeQuery({ 
        query: GET_CARS,
        data: {
          cars: filter(data.cars, c => {
            return c.id !== removeCar.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?')

    if (result) {
      removeCar({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeCar: {
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
    }
  }

  return (
    <DeleteOutlined
    key='Delete'
    onClick={handleButtonClick}
    style={{ color: 'red' }} />
  )
}

export default RemoveCar