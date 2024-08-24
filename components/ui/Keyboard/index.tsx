import React from "react";
import Svg, { Path } from "react-native-svg";
import { Flex } from "../Flex";
import { Heading } from "../Heading";
import { baseTheme } from "../theme";
import { KeyboardProps } from "./types";
import { Button } from "../Button";
import { Text, View } from "react-native";

function ClearCharacterIcon() {
  return (
    <Svg viewBox="0 0 24 24" fill={baseTheme.colors.success}>
      <Path
        fillRule="evenodd"
        d="M8 5a.53.53 0 00-.431.222l-3.923 5.486a1.641 1.641 0 00-.047 1.839L7.58 18.77c.092.143.25.23.42.23h11.359c.906 0 1.641-.735 1.641-1.641V6.64C21 5.735 20.265 5 19.359 5H8zm1.646 3.146a.5.5 0 01.708 0l3.127 3.128 3.094-3.126a.5.5 0 01.71.704l-3.097 3.129 3.166 3.165a.5.5 0 01-.708.708l-3.162-3.163-3.129 3.16a.5.5 0 01-.71-.703l3.132-3.164-3.13-3.13a.5.5 0 010-.708z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

const timeOut: Record<string, NodeJS.Timeout> = {};

export function Keyboard({ numpadData }: KeyboardProps) {
  const { handleNumpad, intAmount, resetAmount, concatNumber, deleteNumber } =
    numpadData;

  const handleDeleteOnMouseDown = () =>
    (timeOut.reset = setTimeout(() => resetAmount(), 500));

  const handleDeleteOnMouseUp = () => clearTimeout(timeOut?.reset);

  return (
    <Flex direction="column" justify="space-between" align="center" gap={32}>
      <Flex justify="space-between" align="center" gap={16}>
        <Button variant="borderless" onPress={() => handleNumpad("1")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            1
          </Heading>
        </Button>
        <Button variant="borderless" onPress={() => handleNumpad("2")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            2
          </Heading>
        </Button>
        <Button variant="borderless" onPress={() => handleNumpad("3")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            3
          </Heading>
        </Button>
      </Flex>

      <Flex justify="space-between" align="center" gap={16}>
        <Button variant="borderless" onPress={() => handleNumpad("4")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            4
          </Heading>
        </Button>
        <Button variant="borderless" onPress={() => handleNumpad("5")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            5
          </Heading>
        </Button>
        <Button variant="borderless" onPress={() => handleNumpad("6")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            6
          </Heading>
        </Button>
      </Flex>

      <Flex justify="space-between" align="center" gap={16}>
        <Button variant="borderless" onPress={() => handleNumpad("7")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            7
          </Heading>
        </Button>
        <Button variant="borderless" onPress={() => handleNumpad("8")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            8
          </Heading>
        </Button>
        <Button variant="borderless" onPress={() => handleNumpad("9")}>
          <Heading as="h2" color={baseTheme.colors.success}>
            9
          </Heading>
        </Button>
      </Flex>

      <Flex justify="space-between" align="center" gap={16}>
        <Button variant="borderless" onPress={() => handleNumpad("00")}>
          <Heading as="h2" align="center" color={baseTheme.colors.success}>
            00
          </Heading>
        </Button>

        <Button variant="borderless" onPress={() => handleNumpad("0")}>
          <Heading as="h2" align="center" color={baseTheme.colors.success}>
            0
          </Heading>
        </Button>

        <Button
          variant="borderless"
          onPressIn={handleDeleteOnMouseDown}
          onPressOut={handleDeleteOnMouseUp}
          onPress={deleteNumber}
        >
          <ClearCharacterIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
