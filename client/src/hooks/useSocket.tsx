import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import deckMapActions from "../store/deckMap/deckMapActions";
import { useDispatch } from "react-redux";
import { CargoQueueItem } from "../types/CargoQueueItem";
import cargoQueueActions from "../store/cargoQueue/cargoQueueActions";
import { Settings } from "../types/settings";
import appActions from "../store/app/appActions";
import { SERVER_PREFIX } from './../constants';

const useSocket = (isLoggedIn: boolean, voyageId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && voyageId !== "") {
      const updateCargoPlacements = (socket: SocketIOClient.Socket) => {
        socket.on(`cargoPlacements___${voyageId}`, (payload: any) => {
          console.log("cargo placements updated, ", payload);
          dispatch(deckMapActions.setCargoPlacements(payload));
        });
      };
      const updateCargoQueue = (socket: SocketIOClient.Socket) => {
        socket.on(
          `cargoQueueUpdated___${voyageId}`,
          (payload: CargoQueueItem[]) => {
            dispatch(cargoQueueActions.setCargoQueue(payload));
          }
        );
      };
      const updateSettings = (socket: SocketIOClient.Socket) => {
        socket.on(`settingsUpdated___${voyageId}`, (payload: Settings) => {
          dispatch(appActions.setSettings(payload));
        });
      };

      // const socket = socketIOClient("http://192.168.1.228:4000");
      const socket = socketIOClient(SERVER_PREFIX);
      console.log("connecting to socket");
      updateCargoPlacements(socket);
      updateCargoQueue(socket);
      updateSettings(socket);
      return () => {
        socket.disconnect();
      };
    }
  }, [dispatch, isLoggedIn, voyageId]);
};

export default useSocket;
