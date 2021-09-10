import { Card, Badge } from 'react-bootstrap';

import { EventInterface } from '../../interfaces/Event.interface';
export default function EventCard({ name, votes, description, tags, date  }: EventInterface){
    return(
        <Card>
            <Card.Header>{name}</Card.Header>
            {
                Array.isArray(tags) && tags.map((tag) => <Badge>{tag}</Badge>)
            }
            <Card.Body>
                {description}
            </Card.Body>
            <Card.Footer>
                <small>{new Date(date).toLocaleDateString()}</small>
                <p>{votes} Voted</p>
            </Card.Footer>
        </Card>
    )
}