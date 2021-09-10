import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import EventCard from "../../common/card";
export default function Dashboard() {
  const dispatch = useDispatch();
  const { employeeName } = useSelector((state: RootState) => state.login);
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

  return (
    <>
      <Container>
        <Row>
          <h1>Welcome, Sandeep</h1>
        </Row>
        <Row xs={1} md={2} className="g-4">
          {events.map((event) => (
            <EventCard {...event} />
          ))}
        </Row>
      </Container>
    </>
  );
}
