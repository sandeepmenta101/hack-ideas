import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormSelect from 'react-bootstrap/FormSelect';
import { useSelector, useDispatch } from 'react-redux';

import CustomSelect from "../../common/CustomSelect";
import { addEvent } from "../../redux/actions/addevents.actions";
import { RootState } from '../../store';

const initialForm: any = {
    name: "",
    description: "",
    tags: '',
    startDate: '',
    endDate: '',
}
export default function EventForm() {
  const [eventData, setEventData] = useState(initialForm);
  const [disabledSubmit, setDisableSubmit] = useState(true);
  const dispatch = useDispatch();
  const { apiStatus, apiResponse } = useSelector((state: RootState) => state.addEvents)

  useEffect(() => {
    const formValues = Object.values(eventData);
    if(formValues.every((value: any) => value?.length > 0)){
      setDisableSubmit(false);
    }
  }, [eventData]);

  const createEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(addEvent(eventData));
  };

  const selectedValues = () => {};

  const onRemove = () => {};

  const onSelect = () => {};

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prevState: any) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleDateChange = (name: string, e: any) => {
    setEventData((prevState: any) => {
      return {
        ...prevState,
        [name]: e.target.value
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <Form className="container border p-4 mt-3">
      <FloatingLabel controlId="floatingInputGrid" label="Event Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          name="name"
          value={eventData.name ?? ""}
          onChange={handleInputChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Select Tag" className="mb-3">
        <FormSelect aria-label="Floating label select example" onChange={handleSelectChange} name="tags" value={eventData.tags}>
          <option></option>
          <option value="feature">Feature</option>
          <option value="tech">Tech</option>
          <option value="non-tech">Non Tech</option>
        </FormSelect>
      </FloatingLabel>
      <Form.Group className="mb-3" controlId="formBasicStartDate">
        <FloatingLabel label="Start date">
          <input className="form-control" type="datetime-local" name="startDate" onChange={(e) => handleDateChange('startDate', e)} value={eventData.startDate}/>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEventEndDate">
        <FloatingLabel label="End date">
          <input className="form-control" type="datetime-local" name="endDate" onChange={(e) => handleDateChange('endDate', e)} value={eventData.endDate}/>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEventDescription">
        <FloatingLabel label="Description">
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Enter description"
            value={eventData.description ?? ""}
            onChange={handleInputChange}
            style={{height: '150px'}}
          />
        </FloatingLabel>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        className="col-12"
        onClick={createEvent}
        disabled={disabledSubmit}
      >
        Add Event
      </Button>
    </Form>
  );
}
