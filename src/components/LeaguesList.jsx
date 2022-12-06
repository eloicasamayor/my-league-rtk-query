// Dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteLeagueMutation } from "../api/leagues";

// Components
import { EditLeagueForm } from "./EditLeagueForm";
export function LeaguesList({ leaguesData, leaguesIsLoading, leaguesRefetch }) {
  const [leagueToEdit, setLeagueToEdit] = useState();

  const [deleteLeague] = useDeleteLeagueMutation();

  if (leaguesIsLoading) {
    return "loading...";
  }
  return (
    <>
      <table>
        <tr>
          <th>name</th>
          <th>description</th>
          <th>actions</th>
        </tr>
        {leaguesData.map((league) => (
          <>
            <tr>
              <td>
                <Link to={league.urlname}>{league.name}</Link>
              </td>
              <td>{league.description}</td>
              <td>
                <button
                  onClick={() => {
                    setLeagueToEdit(league);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await deleteLeague(league);
                    leaguesRefetch();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          </>
        ))}
      </table>
      <EditLeagueForm
        leagueToEdit={leagueToEdit ?? {}}
        leaguesRefetch={leaguesRefetch}
      />
    </>
  );
}