import React, { useState } from "react";
import { Paper } from "../../components/paper";
import { updateSettings } from "../../api/endpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Settings } from "../../types/settings";
import { Loader } from "../../components/loader";
import Separator from "../../components/separator";
import Button from "../../components/button";
import Text from "../../components/text";
import TextInput from "../../components/textInput";
import { FlexRowEndContainer } from "../../components/flexContainer";
import { toStringSafe } from "../../functions/string";
import { BlueBackground } from "../../components/blueBackground";
import "./SettingsScreen.scss";
import useToast from "../../hooks/useToast";

export const SettingsScreen = () => {
  const { settings } = useSelector((state: RootState) => state.appReducer);
  const toast = useToast();
  const [tempSettings, setTempSettings] = useState(settings);

  const [isSaving, setIsSaving] = useState(false);

  const saveButtonClick = async () => {
    // Spara ner settings till APIet
    if (!tempSettings) {
      return;
    }

    try {
      if (!fieldsAreValid(tempSettings)) {
        // Inform user and return
        return;
      }
      setIsSaving(true);

      await updateSettings(tempSettings);
      toast.success("Settings saved");
    } catch (error) {
      // show error
      toast.error("Failed to save settings");
    }
    setIsSaving(false);
  };

  const fieldsAreValid = (settings: Settings) =>
    isFinite(settings.bumperToBumperDistance) && isFinite(settings.defaultVCG);

  if (!settings) {
    return <Loader />;
  }

  return (
    <BlueBackground>
      <Paper className="Settings">
        <Text size="medium" value="Settings" />
        <Separator />
        <table>
          <tbody>
            <tr>
              <td className="Label">
                <Text size="standard" value="B2B distance" />
              </td>
              <td className="Input">
                <TextInput
                  size="standard"
                  value={toStringSafe(tempSettings.bumperToBumperDistance)}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      bumperToBumperDistance: e.target.value,
                    })
                  }
                  onSubmit={() => null}
                />
              </td>
            </tr>
            <tr>
              <td className="Label">
                <Text size="standard" value="Default VCG" />
              </td>
              <td className="Input">
                <TextInput
                  size="standard"
                  value={toStringSafe(tempSettings.defaultVCG)}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      defaultVCG: e.target.value,
                    })
                  }
                  onSubmit={() => null}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <Separator />
        <FlexRowEndContainer>
          <Button
            label="SAVE"
            color="green"
            onClick={saveButtonClick}
            size="medium"
            loading={isSaving}
          />
        </FlexRowEndContainer>
      </Paper>
    </BlueBackground>
  );
};

export default SettingsScreen;
