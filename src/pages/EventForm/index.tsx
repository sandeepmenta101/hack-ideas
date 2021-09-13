import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSelector, useDispatch } from "react-redux";

import CustomSelect from "../../common/CustomSelect";
import { addEvent } from "../../redux/actions/addevents.actions";
import { RootState } from "../../store";
import { EventInterface } from './../../interfaces/Event.interface';
import styles from '../../styles/styles.module.scss';

const initialForm: any = {
  name: "",
  description: "",
  startDate: "",  
  endDate: "",
};
export default function EventForm() {
  const [eventData, setEventData] = useState<EventInterface>(initialForm);
  const [disabledSubmit, setDisableSubmit] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { apiStatus, apiResponse } = useSelector(
    (state: RootState) => state.addEvents
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [toggleAlert, setToggleAlert] = useState<boolean>(false);
  const [inputStartDateAlert, setInputStartDateAlert] = useState<boolean>(false);
  const [formValidation, setFormValidation] = useState({name: {required: true, touched: false}, description: { required: true, touched: false }, startDate: {required: true, touched: false, invalid: false}, endDate: {required: true, touched: false, invalid: false}, tags: {required: true, touched: false}});
  const { events } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    const formValues = Object.values(eventData);
    if (formValues.every((value: any) => value?.length > 0)) {
      setDisableSubmit(false);
    }
  }, [eventData]);

  useEffect(() => {
    if (apiStatus === "Fail") {
      setToggleAlert(true);
    } else if (apiStatus === "Success") {
      setToggleAlert(true);
    } else {
      setToggleAlert(false);
    }
  }, [apiStatus]);

  const createEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = {...eventData, tags: selectedOptions, votes: 0, id: events.length + 1};
    dispatch(addEvent(formData));
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

  const handleselectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const selecedOptionIndex = selectedOptions.indexOf(name);
    let allSelectedOptions = [...selectedOptions];
    if(selecedOptionIndex === -1 && checked){
      allSelectedOptions.push(name);
    }else{
      allSelectedOptions.splice(selecedOptionIndex, 1);
    }
    setSelectedOptions(allSelectedOptions);
  };

  const handleDateChange = (name: string, e: any) => {
    const currentDate = new Date().getTime();
    if(name === 'startDate' && e.target.valueAsNumber > currentDate){
      setEventData((prevState: any) => {
        return {
          ...prevState,
          [name]: e.target.value,
        };
      });
      setFormValidation((prevState: any) => {
        return {
          ...prevState,
          [name]: {
            required: true,
            invalid: false
          }
        }
      })
    }else if(name === 'startDate'){
      setFormValidation((prevState) => {
        return {
          ...prevState,
          [name]: {
            required: true,
            touched: true,
            invalid: true
          }
        }
      })
    }
    if(name === 'endDate'){
      const startDate = new Date(eventData.startDate).getTime();
      const endDate = e.target.valueAsNumber;
      if(startDate > endDate){
        setFormValidation((prevState) => {
          return {
            ...prevState,
            endDate: {
              required: true,
              touched: true,
              invalid: true
            }
          }
        })
      }else{
        setEventData((prevState: any) => {
          return {
            ...prevState,
            [name]: e.target.value,
          };
        });
        setFormValidation((prevState) => {
          return {
            ...prevState,
            endDate: {
              required: false,
              touched: false,
              invalid: false
            }
          }
        })
      }
    }
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

  const handleBlurChange = (e: any) => {
    const { name, value } = e.target;
    if(value.length === 0){
      setFormValidation((prevState) => {
        return {
          ...prevState,
          [name]: {
            required: true,
            touched: true
          }
        }
      })
    }else{
      setFormValidation((prevState) => {
        return {
          ...prevState,
          [name]: {
            required: false,
            touched: true
          }
        }
      })
    }
  }
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
            label="Event Name *"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              value={eventData.name ?? ""}
              onChange={handleInputChange}
              required
              onBlur={handleBlurChange}
            />
            {formValidation && formValidation.name && formValidation.name.required && formValidation.name.touched && <p className={styles.error}>Please enter the event name</p>}
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
          <FloatingLabel label="Start date *">
            <input
              className="form-control"
              type="datetime-local"
              name="startDate"
              onChange={(e) => handleDateChange("startDate", e)}
              value={eventData.startDate}
              required
            />
            {formValidation.startDate.invalid && <p className={styles.error}>Start Date should be greater than current date</p>}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEventEndDate">
          <FloatingLabel label="End date *">
            <input
              className="form-control"
              type="datetime-local"
              name="endDate"
              onChange={(e) => handleDateChange("endDate", e)}
              value={eventData.endDate}
              required
            />
            { formValidation.endDate.invalid && <p className={styles.error}>End Date should be greater than start date</p> }
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEventDescription">
          <FloatingLabel label="Description *">
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter description"
              value={eventData.description ?? ""}
              onChange={handleInputChange}
              style={{ height: "150px" }}
              required
              onBlur={handleBlurChange}
            />
            {formValidation.description.required && formValidation.description.touched && <p className={styles.error}>Please enter the Event Description</p>}
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
