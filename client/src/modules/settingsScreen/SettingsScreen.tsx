import React, { useEffect, useState } from "react";
import _ from "lodash";
import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import { getSettings, updateSettings } from "../../api/endpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Loader } from "../../components/loader";
import Separator from "../../components/separator";
import Button from "../../components/button";
import Text from "../../components/text";
import FlexContainer from "../../components/flexContainer";
import { settingsFactory } from "../../types/settings";

export const EnterCargoScreen = () => {
  const { vesselId } = useSelector((state: RootState) => state.appReducer);

  const [settings, setSettings] = useState(settingsFactory());
  const [initialSettings, setInitialSettings] = useState(settingsFactory());
  const [isSaving, setIsSaving] = useState(false);

  // Fetch settings from API
  useEffect(() => {
    fetchSettings(vesselId);
  }, []);

  const fetchSettings = async (vesselId: string) => {
    const result = await getSettings(vesselId);
    setSettings(result);
    setInitialSettings(result);
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

  if (settings.vesselId === "undefined" || isSaving) {
    return <Loader />;
  }

  return (
    <BlueBackground>
      <Paper>
        <Text value="Bumper to bumper distance" />
        <input
          value={settings.bumperToBumperDistance || 0}
          onChange={(e) =>
            setSettings({
              ...settings,
              bumperToBumperDistance: +e.target.value,
            })
          }
        />
        <Separator />
        <FlexContainer flexDirection="row" justifyContent="space-between">
          <Button
            type="neutral"
            label="Undo"
            onClick={() => setSettings({ ...initialSettings })}
          />
          <Button label="Save" type="positive" onClick={saveButtonClick} />
        </FlexContainer>
      </Paper>
    </BlueBackground>
  );
};

export default EnterCargoScreen;
