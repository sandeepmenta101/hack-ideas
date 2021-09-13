import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSelector, useDispatch } from "react-redux";

import CustomSelect from "../../common/CustomSelect";
import { addEvent } from "../../redux/actions/addevents.actions";
import { RootState } from "../../store";

const initialForm: any = {
  name: "",
  description: "",
  startDate: "",  
  endDate: "",
};
export default function EventForm() {
  const [eventData, setEventData] = useState(initialForm);
  const [disabledSubmit, setDisableSubmit] = useState(true);
  const dispatch = useDispatch();
  const { apiStatus, apiResponse } = useSelector(
    (state: RootState) => state.addEvents
  );
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [toggleAlert, setToggleAlert] = useState(false);

  console.log(apiStatus, apiResponse);

  useEffect(() => {
    const formValues = Object.values(eventData);
    if (formValues.every((value: any) => value?.length > 0)) {
      setDisableSubmit(false);
    }
  }, [eventData]);

  useEffect(() => {
    if (apiStatus === "Fail") {
    } else if (apiStatus === "Success") {
    } else {
    }
  }, [apiStatus]);

  const createEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(addEvent({ ...eventData, tags: selectedOptions }));
  };

  const removeOption = (option: string) => {
    let allOptions = [...selectedOptions];
    allOptions = allOptions.filter((optionName) => {
      if (optionName !== option) {
        return optionName;
      }
    });
    setSelectedOptions(allOptions);
  };

  const handleselectOption = (e: any) => {
    const { name, checked } = e.target;
    const prevSelectedOptions: any = [...selectedOptions, name];
    if (checked) {
      setSelectedOptions(prevSelectedOptions);
    }
  };

  const handleDateChange = (name: string, e: any) => {
    setEventData((prevState: any) => {
      return {
        ...prevState,
        [name]: e.target.value,
      };
    });
  };

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
    <>
      {toggleAlert && (
        <Alert
          show={toggleAlert}
          variant={apiStatus === "Fail" ? "danger" : "success"}
          className="mt-3"
          dismissible
          onClose={() => setToggleAlert(false)}
        >
          <p>{apiResponse}</p>
        </Alert>
      )}
      <Form className="container border p-4 mt-3">
        <Form.Group>
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Event Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              name="name"
              value={eventData.name ?? ""}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <CustomSelect
            removeOption={removeOption}
            selectOption={handleselectOption}
            selectedOptions={selectedOptions}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStartDate">
          <FloatingLabel label="Start date">
            <input
              className="form-control"
              type="datetime-local"
              name="startDate"
              onChange={(e) => handleDateChange("startDate", e)}
              value={eventData.startDate}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEventEndDate">
          <FloatingLabel label="End date">
            <input
              className="form-control"
              type="datetime-local"
              name="endDate"
              onChange={(e) => handleDateChange("endDate", e)}
              value={eventData.endDate}
            />
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
              style={{ height: "150px" }}
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
    </>
  );
}
