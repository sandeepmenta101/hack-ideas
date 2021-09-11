import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import CustomSelect from "../../common/CustomSelect";
export default function EventForm() {
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    tags: [],
    startDate: "",
    endDate: "",
  });
  const [disabledSubmit, setDisableSubmit] = useState(true);

  const createEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const selectedValues = () => {};

  const onRemove = () => {};

  const onSelect = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEventData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <Form className="container border p-4 mt-3">
      <FloatingLabel controlId="floatingInputGrid" label="Event Name">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          name="eventName"
          value={eventData.eventName ?? ""}
          onChange={handleInputChange}
        />
      </FloatingLabel>
      <Form.Group className="mb-3" controlId="formBasicTags">
        <Form.Label>Tags</Form.Label>
        <CustomSelect />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicStartDate">
        <FloatingLabel label="Start date">
          <Form.Control type="datetime-local" name="startDate" />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEventEndDate">
        <FloatingLabel label="End date">
          <Form.Control type="datetime-local" name="endDate" />
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
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="success" type="submit"  className="col-12" onClick={createEvent} disabled={disabledSubmit}>
        Submit
      </Button>
    </Form>
  );
}
