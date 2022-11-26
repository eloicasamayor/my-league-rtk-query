// Dependencies
import { useParams } from "react-router-dom";

// Components
import { MatchesList } from "../components/MatchesList";
import { Classification } from "../components/Classification";
import { PlayersList } from "../components/PlayersList";
export function LeaguePage() {
  const { urlname } = useParams();

  return (
    <div>
      <h1>{urlname}</h1>
      <Classification />
      <hr />
      <MatchesList />
      <hr />
      <PlayersList />
    </div>
  );
}
