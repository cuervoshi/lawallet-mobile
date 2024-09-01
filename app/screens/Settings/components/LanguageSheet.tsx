import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import Radio from "@/components/ui/Radio";
import { useTranslations } from "@/i18n/I18nProvider";
import { appTheme } from "@/utils/theme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";

const LanguageSheet = ({ onClose }: { onClose: () => void }) => {
  const { i18n, lng, changeLanguage } = useTranslations();

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) onClose();
  }, []);

  return (
    <BottomSheet
      onChange={handleSheetChanges}
      snapPoints={["90%"]}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: appTheme.colors.gray15,
        flex: 1,
        maxHeight: "100%",
        maxWidth: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Heading as="h4" align="center" color="white">
        {i18n.t("LANGUAGE")}
      </Heading>

      <BottomSheetView
        style={{
          backgroundColor: appTheme.colors.gray15,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Container>
          <Radio
            text={i18n.t("ENGLISH")}
            checked={lng === "en"}
            onPress={() => {
              if (lng !== "en") changeLanguage("en", true);
            }}
          />

          <Radio
            text={i18n.t("SPANISH")}
            checked={lng === "es"}
            onPress={() => {
              if (lng !== "es") changeLanguage("es", true);
            }}
          />
        </Container>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default LanguageSheet;
