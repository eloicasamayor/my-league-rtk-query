import _ from "lodash";
import { useState } from "react";
import { useDeleteMatchMutation } from "../api/matches";
import { EditMatchForm } from "./EditMatchForm";

export function MatchesList({
  teams,
  selectedTeam,
  matchesData,
  matchesIsLoading,
  matchesRefetch,
}) {
  const [deleteMatch] = useDeleteMatchMutation();
  const [matchToEdit, setMatchToEdit] = useState({});

  if (matchesIsLoading) {
    return "loading...";
  }
  function getTeamNameWithId(id) {
    if (teams) {
      return teams.find((team) => team.id === id).name;
    } else {
      return id;
    }
  }

  if (selectedTeam) {
    matchesData = matchesData.filter((match) => {
      debugger;
      return (
        match.local_team === selectedTeam || match.visitor_team === selectedTeam
      );
    });
    debugger;
  }

  return (
    <section>
      {matchesIsLoading ? (
        <h2>loading ...</h2>
      ) : (
        <>
          {matchesData.length ? (
            <table>
              <thead>
                <tr>
                  <th>local team</th>
                  <th></th>
                  <th></th>
                  <th>visitor team</th>
                  <th>date</th>
                  <th>played</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {matchesData.map((match, i) => (
                  <tr key={match.date + i}>
                    <td>{getTeamNameWithId(match.local_team)}</td>
                    <td>{match.local_goals}</td>
                    <td>{match.visitor_goals}</td>
                    <td>{getTeamNameWithId(match.visitor_team)}</td>
                    <td>{match.date}</td>
                    <td>{match.played.toString()}</td>
                    <td>
                      <button
                        onClick={() =>
                          setMatchToEdit({
                            id: match.id,
                            localTeam: match.local_team,
                            visitorTeam: match.visitor_team,
                            played: match.played,
                            localGoals: match.local_goals,
                            visitorGoals: match.visitor_goals,
                            localScorers: match.local_scorers,
                            visitorScorers: match.visitor_scorers,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          await deleteMatch({ id: match.id });
                          matchesRefetch();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No matches found for this team"
          )}
          {!selectedTeam && (
            <EditMatchForm matchToEdit={matchToEdit} refetch={matchesRefetch} />
          )}
        </>
      )}
    </section>
  );
}