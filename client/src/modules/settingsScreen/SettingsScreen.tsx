import React, { useEffect, useState } from "react";
import { BlueBackground } from "../../components/blueBackground";
import { Paper } from "../../components/paper";
import { getSettings, updateSettings } from "../../api/endpoints";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
import { Loader } from "../../components/loader";
import Separator from "../../components/separator";
import Button from "../../components/button";
import Text from "../../components/text";
import { settingsFactory } from "../../types/settings";
import TextInput from "../../components/textInput";
import { FlexRowEndContainer } from "../../components/flexContainer";

export const SettingsScreen = () => {
  // const { vesselId } = useSelector((state: RootState) => state.appReducer);
  const vesselId = "TEST";
  const [settings, setSettings] = useState(settingsFactory());
  const [isSaving, setIsSaving] = useState(false);

  // Fetch settings from API
  useEffect(() => {
    fetchSettings(vesselId);
  }, [vesselId]);

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

  if (settings.vesselId === "undefined" || isSaving) {
    return <Loader />;
  }

  return (
    <BlueBackground>
      <Paper>
        <Text size="medium" value="Settings" />
        <Separator />
        <table>
          <tbody>
            <tr>
              <td style={{ width: "200px" }}>
                <Text size="standard" value="B2B distance" />
              </td>
              <td>
                <TextInput
                  size="standard"
                  value={settings.bumperToBumperDistance.toString() || "0"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      bumperToBumperDistance: +e.target.value,
                    })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        <Separator />
        <FlexRowEndContainer>
          <Button
            label="Save"
            type="positive"
            onClick={saveButtonClick}
            size="standard"
          />
        </FlexRowEndContainer>
      </Paper>
    </BlueBackground>
  );
};

export default SettingsScreen;
