import { useEffect, useState } from "react";
import { Container, Row, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { RootState } from "../../store";
import EventCard from "../../common/card";
import useLocalStorage from "../../customHooks/useLocalStorage";
import styles from '../../styles/login.module.scss';
import { EventInterface } from "../../interfaces/Event.interface";
import { fetchEvents } from "../../redux/actions/dashboard.actions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const {events} = useSelector((state: RootState) => state.dashboard);
  const [selectedTag, setSelectedTag] = useState('');
  const [employee] = useLocalStorage('employee');
  const history = useHistory();

  useEffect(() => {
    if(!employee?.isAuthenticated){
      history.push('/login');
    }else if(employee.isAuthenticated){
      dispatch(fetchEvents());
    }
  }, []);

  const setTag = (e: any) => {
    setSelectedTag(e);
  }

  return (
    <>
      <Container className="mt-3">
        <Row>
          <h1 className="col-10">Welcome {employee.employeeName}, </h1>
          {events.length > 0 && <DropdownButton className="col-2" title={selectedTag.length === 0 ? 'Sort by' : <p className={styles.capitalize}>{selectedTag}</p>} onSelect={setTag}>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="tech">Tech</Dropdown.Item>
              <Dropdown.Item eventKey="feature">Feature</Dropdown.Item>
              <Dropdown.Item eventKey="non-tech">Non Tech</Dropdown.Item>
            </Dropdown.Menu>
          </DropdownButton>}
        </Row>
          {events?.length === 0 ? <h3 className="text-center">No Events</h3> : <Row xs={1} md={3} className="g-4">{events.map((event: EventInterface) => (
            <EventCard {...event} />
          ))}</Row>}
      </Container>
    </>
  );
}
