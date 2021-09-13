import { useEffect, useState } from "react";
import { Container, Row, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { RootState } from "../../store";
import EventCard from "../../common/card";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { EventInterface } from "../../interfaces/Event.interface";
import { fetchEvents, sortByTag } from "../../redux/actions/dashboard.actions";
import CardShimmer from "../../common/cardShimmer";

const cardShimmerArr = ['1', '2', '3','4', '5'];

export default function Dashboard() {
  const dispatch = useDispatch();
  const {events, isLoading} = useSelector((state: RootState) => state.dashboard);
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
    dispatch(sortByTag(e));
  }

  return (
    <>
      <Container className="mt-3">
        <Row>
          <h1 className="col-10">Welcome {employee.employeeName}, </h1>
          <DropdownButton className="col-2" title={<p>Sort by: {selectedTag}</p>} onSelect={setTag}>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Tech">Tech</Dropdown.Item>
              <Dropdown.Item eventKey="Feature">Feature</Dropdown.Item>
              <Dropdown.Item eventKey="Non Tech">Non Tech</Dropdown.Item>
            </Dropdown.Menu>
          </DropdownButton>
        </Row>
          { events.length === 0 && isLoading &&  cardShimmerArr.map((card) => <CardShimmer key={card} />)}
          {events?.length === 0 ? <h3 className="text-center">No Events</h3> : <Row xs={1} md={2} className="g-4 mt-2">{events.map((event: EventInterface) => (
            <EventCard {...event} />
          ))}</Row>}
      </Container>
    </>
  );
}
