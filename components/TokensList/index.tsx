import { CurrenciesList, useSettings } from "@lawallet/react";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Button } from "../ui/Button";
import { Flex } from "../ui/Flex";
import { Text } from "../ui/Text";
import { TokenListStyle } from "./style";

export function TokenList() {
  const settings = useSettings();

  return (
    <TokenListStyle>
      <Flex align="center">
        {CurrenciesList.map((currency) => {
          const selected: boolean = settings.props.currency === currency;

          return (
            <Button
              key={currency}
              variant={selected ? "bezeled" : "borderless"}
              size="small"
              onPress={() => settings.changeCurrency(currency)}
              style={{ maxWidth: 80 }} // Se establece maxWidth directamente en el botón
            >
              <Text color="white">{currency}</Text>
            </Button>
          );
        })}
      </Flex>
    </TokenListStyle>
  );
}
