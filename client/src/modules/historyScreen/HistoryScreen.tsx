import React, { useEffect, useState } from "react";
import { getLog } from "../../api/log";
import Text from "../../components/text";
import { Log } from "../../types/log";
import { Loader } from "../../components/loader";
import "./HistoryScreen.scss";
import { getServerDateAsTime } from "../../functions/date";
import HeaderAvoider from "../../components/headerAvoider";
import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";

export const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const result = await getLog();
        setHistory(result);
        setLoading(false);
      } catch (error) {
        // show error info
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <HeaderAvoider>
      <BlueBackground>
        <Paper className="HistoryScreenPaper">
          <Text size="medium" value="History" />
          <div className="HistoryTableContainer">
            <table className="HistoryTable">
              <thead>
                <tr className="HistoryRow">
                  <th className="HistoryTH">Info</th>
                  <th className="HistoryTH">User</th>
                  <th className="HistoryTH">Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((log: Log) => (
                  <tr key={log.id} className="HistoryRow">
                    <td>{log.text}</td>
                    <td>{log.username}</td>
                    <td>{getServerDateAsTime(log.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </BlueBackground>
    </HeaderAvoider>
  );
};
