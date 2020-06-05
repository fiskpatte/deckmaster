import React, { useEffect, useState } from "react";
import { getLog } from "../../api/log";
import Text from "../../components/text";
import { Log } from "../../types/log";
import { Loader } from "../../components/loader";

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
    <div style={{ margin: "30px", backgroundColor: "white" }}>
      <Text size="medium" value="History" />
      <table>
        <thead>
          <tr>
            <th>Info</th>
            <th>User</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((log: Log) => (
            <tr key={log.id}>
              <td>{log.text}</td>
              <td>{log.username}</td>
              <td>{log.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
