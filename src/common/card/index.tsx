import { Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

import { EventInterface } from "../../interfaces/Event.interface";
import styles from "../../styles/login.module.scss";
export default function EventCard({
  name,
  votes,
  description,
  tags,
  startDate,
  endDate
}: EventInterface) {
  console.log(votes);

  return (
    <Card className={styles.cardContainer}>
      <Card.Header>{name}</Card.Header>
      <div>
        {Array.isArray(tags) &&
          tags.map((tag) => (
            <Badge pill className={`${styles.badge} mr-2`}>
              {tag}
            </Badge>
          ))}
      </div>
      <Card.Body>
        {description.length > 64 ? (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => renderTooltip(props, description)}
          >
            <p className={styles.threedots}>{description}</p>
          </OverlayTrigger>
        ) : (
          <p>{description}</p>
        )}
      </Card.Body>
      <Card.Footer>
        <small>Start: {new Date(startDate).toLocaleDateString()}  {new Date(startDate).toLocaleTimeString()} - End: {new Date(endDate).toLocaleDateString()} { new Date(endDate).toLocaleTimeString()} </small>
        <p className="float-end">{votes === undefined ? 0 : votes} Voted</p>
      </Card.Footer>
    </Card>
  );
}

const renderTooltip = (props: any, content: string) => (
  <Tooltip id="button-tooltip" {...props}>
    {content}
  </Tooltip>
);
