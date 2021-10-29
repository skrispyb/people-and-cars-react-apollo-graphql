import React, { useEffect, useState } from 'react';
import { Card, List } from "antd";
import { EditOutlined } from '@ant-design/icons';
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import LearnMore from '../buttons/LearnMore';
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../../queries';

const getStyles = () => ({
  card: {
      width: '500px',
      borderRadius: '16px 16px 0 0'
  }
})

const Person = (props) => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate()
  }, [])

  const styles = getStyles();

  const {loading, error, data } = useQuery(GET_CARS);
  if(loading) return 'Loading...'
  if(error) return `Error! ${error.message}`

  const updateStateVariablePerson = (variable, value) => {
    switch(variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (<UpdatePerson
        id={props.id}
        firstName={props.firstName}
        lastName={props.lastName}
        onButtonClick={handleButtonClick}
        updateStateVariablePerson={updateStateVariablePerson} />) :
          (<Card style={styles.card}
            actions={[
              <LearnMore id={id} />,
              <EditOutlined key='edit' onClick={handleButtonClick} />,
              <RemovePerson id={id} firstName={firstName} lastName={lastName} />
            ]}>
              <b>{firstName} {lastName}</b> owns the following cars:
              <List size="small">{data.cars.filter(car => car.personId === id).map((car) => (
                <List.Item key={car.id}>🚗 {car.model}</List.Item>
              ))}</List>
          </Card>)
      }
    </div>
  )
}

export default Person