import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

import { EventInterface } from "../../interfaces/Event.interface";
import styles from "../../styles/card.module.scss";
export default function EventCard({
  name,
  votes,
  description,
  tags,
  startDate,
  endDate,
}: EventInterface) {
  
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
        <span className={styles.img}>{name[0]}</span>
        <span className={styles.title}>{name}</span>
        </div>
        <div>
          {
            Array.isArray(tags) && tags.length > 0 && tags?.map((tag, i) => <Badge bg="success" key={`badge=${i}`}>{tag}</Badge>)
          }
        </div>
      </div>
      <div className={styles.cardBody}>
        {description.length > 500 ? (<OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => renderTooltip(props, description)}
          >
            <div className={`${styles.module} ${styles.lineClamp}`}>
            <p>{description}</p>
            </div>
          </OverlayTrigger>
        ) : (
          <p>{description}</p>)}
      </div>
      <div className={styles.cardFooter}>
        <p>From: {new Date(startDate).toLocaleString()} - To: {new Date(endDate).toLocaleString()}</p>
        <p><i className="fas fa-thumbs-up"></i> {votes === undefined ? '0 voted': votes + ' voted'}</p>
      </div>
    </div>
  );
}

const renderTooltip = (props: any, content: string) => (
  <Tooltip id="button-tooltip" {...props}>
    {content}
  </Tooltip>
);
