import React from "react";
import "./LoadmasterData.scss";

export const LoadmasterData: React.FC = () => (
  <table className="DataTable">
    <tbody>
      <tr className="DataRow">
        <td>Displacement</td>
        <td>26381</td>
        <td>mT</td>
      </tr>
      <tr className="DataRow">
        <td>Deadweight</td>
        <td>12981,3</td>
        <td>mT</td>
      </tr>
      <tr className="DataRow">
        <td>Draft at MS</td>
        <td>7,175</td>
        <td>m</td>
      </tr>
      <tr className="DataRow">
        <td>Trim</td>
        <td>0,27</td>
        <td>m Aft</td>
      </tr>
      <tr className="DataRow">
        <td>Heel</td>
        <td>0,3</td>
        <td>° Port</td>
      </tr>
      <tr className="DataRow">
        <td>G'M Actual</td>
        <td>1,57</td>
        <td>m</td>
      </tr>
      <tr className="DataRow">
        <td>G'M Min.</td>
        <td>1,12</td>
        <td>m</td>
      </tr>
    </tbody>
  </table>
);
