// Dependencies
import { useRef } from "react";

// Api
import { useUpdatePlayerMutation, useGetTeamsQuery } from "../redux";

export function EditPlayerForm({ player = {}, teamsData }) {
  const { id, name, team } = player;
  const [editPlayer, requestResult] = useUpdatePlayerMutation();
  const nameRef = useRef();
  const teamRef = useRef();
  const teams = useGetTeamsQuery();

  if (teams.isLoading) {
    return "loading...";
  }
  return (
    <>
      <h2>Edit Player</h2>
      <form>
        <label htmlFor={"name"}>Name:</label>
        <input
          type={"text"}
          id={"name"}
          name={"name"}
          ref={nameRef}
          defaultValue={player.name}
          required
        />
        <br />
        <label htmlFor={"team"}>Team:</label>
        <select name="team" id="team" ref={teamRef} value={team} required>
          {teamsData &&
            teamsData.map((teamData) => (
              <option key={teamData.id} value={teamData.id}>
                {teamData.name}
              </option>
            ))}
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            editPlayer({
              id,
              name: nameRef.current.value,
              team: teamRef.current.value,
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
