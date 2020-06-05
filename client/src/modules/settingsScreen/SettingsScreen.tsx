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
import ContentContainer from "../../components/contentContainer";
import { toStringSafe } from "../../functions/string";

export const SettingsScreen = () => {
  const { settings } = useSelector((state: RootState) => state.appReducer);

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
    } catch (error) {
      // show error
    }
    setIsSaving(false);
  };

  const fieldsAreValid = (settings: Settings) =>
    !isNaN(settings.bumperToBumperDistance) && !isNaN(settings.defaultVCG);

  if (!settings || isSaving) {
    return <Loader />;
  }

  return (
    <ContentContainer>
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
                  value={toStringSafe(tempSettings.bumperToBumperDistance)}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      bumperToBumperDistance: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td style={{ width: "200px" }}>
                <Text size="standard" value="Default VCG" />
              </td>
              <td>
                <TextInput
                  size="standard"
                  value={toStringSafe(tempSettings.defaultVCG)}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      defaultVCG: e.target.value,
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
    </ContentContainer>
  );
};

export default SettingsScreen;
