import { useState, useEffect } from "react";

const usePointTable = ({
  name,
  isSingle,
}: {
  name: string;
  isSingle: boolean;
}) => {
  const [leagueData, setLeagueData] = useState<any>({});
  const [maps, setMaps] = useState<{ key: string; name: string }[]>([]);
  const [leagues, setLeagues] = useState<string[]>([]);
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [pointData, setPointData] = useState<
    { team: string; played: number; points: number; scoreDiff: string }[]
  >([]);

  useEffect(() => {
    const url = `https://cs-score.firebaseio.com/${name}.json`;
    fetch(url)
      .then((res) => res.json())
      .then((responseData) => {
        const defaultLeague = responseData.leagues[0];
        const defaultMap = "overall";
        setLeagueData(responseData);
        setLeagues(responseData.leagues);
        setSelectedLeague(defaultLeague);
        if (isSingle) {
          setMaps(responseData[defaultLeague]["maps"]);
          setSelectedMap(defaultMap);
          const leaguePoints =
            responseData[defaultLeague]["points"][defaultMap];
          setPointData(formPointArray(leaguePoints));
        } else {
          const { points: leaguePoints } = responseData[defaultLeague];
          setPointData(formPointArray(leaguePoints));
        }
      });
  }, [name, isSingle]);

  const onLeagueChange = (event: any) => {
    const changedLeague = event.target.value;
    setSelectedLeague(changedLeague);
    if (isSingle) {
      const defaultMap = "overall";
      const leaguePoints = leagueData[changedLeague]["points"][defaultMap];
      setSelectedMap(defaultMap);
      setMaps(leagueData[changedLeague]["maps"]);
      setPointData(formPointArray(leaguePoints));
    } else {
      const { points: leaguePoints } = leagueData[changedLeague];
      setPointData(formPointArray(leaguePoints));
    }
  };

  const onMapChange = (event: any) => {
    const changedMap = event.target.value;
    const leaguePoints = leagueData[selectedLeague]["points"][changedMap];
    setSelectedMap(changedMap);
    setPointData(formPointArray(leaguePoints));
  };

  const formPointArray = (leaguePoints: any) =>
    Object.keys(leaguePoints).map((team) => ({ ...leaguePoints[team], team }));

  return {
    maps,
    leagues,
    selectedMap,
    selectedLeague,
    pointData,
    onMapChange,
    onLeagueChange,
  };
};

export default usePointTable;
