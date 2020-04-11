import React, { useEffect, useState } from "react";
import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import { getSettings, updateSettings } from "../../api/endpoints";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Loader } from "../../components/loader";
import Separator from "../../components/separator";
import Button from "../../components/button";
import Text from "../../components/Text";
import FlexContainer from "../../components/flexContainer";
import { settingsFactory } from "../../types/settings";

export const EnterCargoScreen = () => {
  const { vesselId } = useSelector((state: RootState) => state.appReducer);

  const [settings, setSettings] = useState(settingsFactory());
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();

  // Fetch settings from API
  useEffect(() => {
    fetchSettings(vesselId);
  }, []);

  const fetchSettings = async (vesselId: string) => {
    const result = await getSettings(vesselId);
    setSettings(result);
  };

  const saveButtonClick = async () => {
    // Spara ner settings till APIet
    if (!settings) {
      return;
    }

    try {
      setIsSaving(true);
      await updateSettings(settings);
    } catch (error) {
      // show error
    }
    setIsSaving(false);
  };

  const undoButtonClick = () => {
    // Restore to initial settings
    //
    // TODO: Fortsätt här med  att mnecka
  };

  if (settings.vesselId === "undefined" || isSaving) {
    return <Loader />;
  }

  return (
    <BlueBackground>
      <Paper>
        <Text type="header3" value="Bumper to bumper distance" />
        <input
          type="number"
          step="0.1"
          value={settings.bumperToBumperDistance && 0}
          onChange={(e) =>
            dispatch(
              setSettings({
                ...settings,
                bumperToBumperDistance: +e.target.value,
              })
            )
          }
        />

        <Separator />
        <FlexContainer flexDirection="row" justifyContent="space-between">
          <Button type="neutral" label="Cancel" onClick={undoButtonClick} />
          <Button label="Save" type="positive" onClick={saveButtonClick} />
        </FlexContainer>
      </Paper>
    </BlueBackground>
  );
};

export default EnterCargoScreen;
