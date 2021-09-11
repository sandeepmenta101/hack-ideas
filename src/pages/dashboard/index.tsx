import { useEffect, useState } from "react";
import { Container, Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { RootState } from "../../store";
import EventCard from "../../common/card";
import useLocalStorage from "../../customHooks/useLocalStorage";
export default function Dashboard() {
  const dispatch = useDispatch();
  const { employeeName } = useSelector((state: RootState) => state.login);
  const [selectedTag, setSelectedTag] = useState('');
  const [employee] = useLocalStorage('employee');
  const history = useHistory();

  useEffect(() => {
    if(!employee?.isAuthenticated){
      history.push('/login');
    }
  }, []);

  const events = [
    {
      name: "Hackathon",
      date: "15-09-2021",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      votes: 16,
      tags: ["feature", "tech"],
    },
    {
      name: "Cyber Hackathon",
      date: "15-09-2021",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      votes: 16,
      tags: ["feature", "tech"],
    },
    {
      name: "Frontend Hackathon",
      date: "15-09-2021",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      votes: 26,
      tags: ["feature"],
    },
    {
      name: "Hackers",
      date: "15-09-2021",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      votes: 0,
      tags: ["tech"],
    },
  ];

  const setTag = (e: any) => {
    console.log(e);
  }

  return (
    <>
      <Container className="mt-3">
        <Row>
          <h1 className="col-10">Welcome, {employeeName}</h1>
          <Dropdown className="col-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic" onSelect={(e) => console.log(e)}>
              Sort By Tag: {selectedTag}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="tech">Tech</Dropdown.Item>
              <Dropdown.Item eventKey="feature">Feature</Dropdown.Item>
              <Dropdown.Item eventKey="non-tech">Non Tech</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Row xs={1} md={3} className="g-3">
          {events.map((event) => (
            <EventCard {...event} />
          ))}
        </Row>
      </Container>
    </>
  );
}
