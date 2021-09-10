import { Form, Button } from "react-bootstrap";

export default function EventForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control type="text" name="eventName" placeholder="Enter Event name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEventName">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" placeholder="Enter description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEventName">
        <Form.Label>Start date</Form.Label>
        <Form.Control type="date" name="startDate"  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEventName">
        <Form.Label>End date</Form.Label>
        <Form.Control type="date" name="endDate"  />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
