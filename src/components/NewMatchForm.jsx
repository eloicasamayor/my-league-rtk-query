// Dependencies
import { useInsertMatchMutation } from "../redux";
import { useRef } from "react";

export function NewMatchForm({ teams, currentLeague }) {
  const [insertMatch, requestResult] = useInsertMatchMutation();
  const dateRef = useRef();
  const localTeamRef = useRef();
  const visitorTeamRef = useRef();
  return (
    <>
      <h2>Create new match</h2>
      <form>
        <label htmlFor={"date"}>Date:</label>
        <input
          type={"datetime-local"}
          id={"date"}
          name={"date"}
          ref={dateRef}
          required
        />
        <br />
        <label htmlFor={"local_team"}>Local team:</label>
        <select name="local_team" id="local_team" ref={localTeamRef} required>
          {teams &&
            teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
        <br />
        <label htmlFor={"visitor_team"}>Visitor team:</label>
        <select
          id={"visitor_team"}
          name={"visitor_team"}
          ref={visitorTeamRef}
          required
        >
          {teams &&
            teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
        <br />
        <button
          type={"button"}
          onClick={async (e) => {
            e.preventDefault();
            await insertMatch({
              date: dateRef.current.value,
              local_team: localTeamRef.current.value,
              visitor_team: visitorTeamRef.current.value,
              league: currentLeague.id,
            });
          }}
        >
          submit
        </button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
