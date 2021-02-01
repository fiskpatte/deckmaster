import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import deckMapActions from "../store/deckMap/deckMapActions";
import { useDispatch } from "react-redux";
import { CargoQueueItem } from "../types/CargoQueueItem";
import cargoQueueActions from "../store/cargoQueue/cargoQueueActions";
import { Settings } from "../types/settings";
import appActions from "../store/app/appActions";
import { SuggestedCargoPlacement } from "../types/deckMap";

const apiHost = process.env.REACT_APP_API_HOST || "";

const useSocket = (isLoggedIn: boolean, voyageId: string, vesselId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && voyageId !== "") {
      const updateCargoPlacements = (socket: SocketIOClient.Socket) => {
        socket.on(`cargoPlacements___${voyageId}`, (payload: any) => {
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
        socket.on(`settingsUpdated___${vesselId}`, (payload: Settings) => {
          dispatch(appActions.setSettings(payload));
        });
      };

      const updateSuggestedCargoPlacement = (socket: SocketIOClient.Socket) => {
        socket.on(
          `suggestedCargoPlacementUpdated__${voyageId}`,
          (payload: SuggestedCargoPlacement) => {
            dispatch(deckMapActions.setSuggestedCargoPlacement(payload));
          }
        );
      };

      // const socket = socketIOClient("http://192.168.1.228:4000");
      const socket = socketIOClient(apiHost);
      updateCargoPlacements(socket);
      updateCargoQueue(socket);
      updateSettings(socket);
      updateSuggestedCargoPlacement(socket);
      return () => {
        socket.disconnect();
      };
    }
  }, [dispatch, isLoggedIn, voyageId, vesselId]);
};

export default useSocket;
