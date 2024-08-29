"use client";
import { useCardsContext } from "@/app/screens/Settings/Cards/context/CardsContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Feedback } from "@/components/ui/Input/Feedback";
import { InputGroup } from "@/components/ui/Input/InputGroup";
import { InputGroupRight } from "@/components/ui/Input/InputGroupRight";
import { InputWithLabel } from "@/components/ui/Input/InputWithLabel";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Text";
import useErrors from "@/hooks/useErrors";
import { regexComment } from "@/utils/constants";
import { appTheme } from "@/utils/theme";
import { roundToDown, useFormatter } from "@lawallet/react";
import { CardPayload, CardStatus, Limit } from "@lawallet/react/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Switch } from "react-native";

const regexNumbers: RegExp = /^[0123456789]+$/;

const defaultTXLimit: Limit = {
  name: "Transactional limit",
  description: "Spending limit per transaction",
  token: "BTC",
  amount: BigInt(100000000000).toString(),
  delta: 0,
};

const defaultDailyLimit: Limit = {
  name: "Daily limit",
  description: "Spending limit per day",
  token: "BTC",
  amount: BigInt(1000000000).toString(),
  delta: 86400,
};

type LimitsConfigOptions = "tx" | "daily";

const NAME_MAX_LENGTH = 32;
const DESC_MAX_LENGTH = 64;

const ConfigCardView = () => {
  const errors = useErrors();
  const router = useRouter();
  const params = useLocalSearchParams();

  const uuid: string = useMemo(() => params.uuid as string, []);

  const { cardsData, cardsConfig, loadInfo, updateCardConfig } =
    useCardsContext();

  const [newConfig, setNewConfig] = useState<CardPayload>({
    name: "",
    description: "",
    status: CardStatus.ENABLED,
    limits: [],
  });

  const selectedLimit: LimitsConfigOptions = useMemo(() => {
    if (!newConfig.limits.length) return "tx";

    const limitDelta: number = newConfig.limits[0].delta;
    return limitDelta === defaultTXLimit.delta ? "tx" : "daily";
  }, [newConfig.limits]);

  const handleChangeLimit = (text: string) => {
    errors.resetError();
    const targetValue = text ?? 0;
    if (targetValue.length && !regexNumbers.test(targetValue)) {
      errors.modifyError("ONLY_NUMBERS_ALLOWED");
      return;
    }

    const inputAmount: number = !targetValue ? 0 : parseFloat(targetValue);
    const mSats: number = inputAmount * 1000;

    setNewConfig({
      ...newConfig,
      limits: [
        selectedLimit === "tx"
          ? { ...defaultTXLimit, amount: BigInt(mSats).toString() }
          : { ...defaultDailyLimit, amount: BigInt(mSats).toString() },
      ],
    });
  };

  const handleChangeName = (name: string) => {
    errors.resetError();

    setNewConfig({
      ...newConfig,
      name,
    });
  };

  const handleChangeDesc = (description: string) => {
    errors.resetError();

    setNewConfig({
      ...newConfig,
      description,
    });
  };

  const handleSaveConfig = async () => {
    if (!newConfig.name.length) return errors.modifyError("EMPTY_NAME");
    if (newConfig.name.length > NAME_MAX_LENGTH)
      return errors.modifyError("MAX_LENGTH_NAME", {
        length: `${NAME_MAX_LENGTH}`,
      });
    if (!regexComment.test(newConfig.name))
      return errors.modifyError("INVALID_USERNAME");

    if (newConfig.description.length > DESC_MAX_LENGTH)
      return errors.modifyError("MAX_LENGTH_DESC", {
        length: `${DESC_MAX_LENGTH}`,
      });
    if (!regexComment.test(newConfig.description))
      return errors.modifyError("INVALID_USERNAME");

    const updated: boolean = await updateCardConfig(uuid, newConfig);
    if (updated) router.push("/settings/cards");
  };

  useEffect(() => {
    if (!cardsConfig.cards?.[uuid] || !cardsData?.[uuid]) return;
    const { name, description, status, limits } = cardsConfig.cards[uuid];

    const txLimit = limits.find((limit: Limit) => {
      if (limit.delta === defaultTXLimit.delta) return limit;
    });

    const dailyLimit = limits.find((limit: Limit) => {
      if (limit.delta === defaultDailyLimit.delta) return limit;
    });

    const preloadConfig: CardPayload = {
      name,
      description,
      status,
      limits: txLimit
        ? [txLimit]
        : dailyLimit
        ? [dailyLimit]
        : [defaultTXLimit],
    };

    setNewConfig(preloadConfig);
  }, [cardsConfig.cards]);

  const { formatAmount } = useFormatter({ currency: "SAT", locale: "es" });
  if (!loadInfo.loading && !cardsData?.[uuid]) return null;

  return (
    <MainContainer>
      <Navbar
        showBackPage={true}
        title={loadInfo.loading ? "Cargando..." : cardsData[uuid].design.name}
        overrideBack="/settings/cards"
      />

      <Container>
        {loadInfo.loading ? (
          <ActivityIndicator size={"large"} color={appTheme.colors.success} />
        ) : (
          <Flex direction="column" gap={24}>
            <InputWithLabel
              onChangeText={handleChangeName}
              isError={
                errors.isExactError("EMPTY_NAME") ||
                errors.isExactError("MAX_LENGTH_NAME", {
                  length: `${NAME_MAX_LENGTH}`,
                })
              }
              name="card-name"
              label={"Nombre"}
              placeholder={"Nombre"}
              value={newConfig.name}
            />

            <Divider y={16} />

            <InputWithLabel
              onChangeText={handleChangeDesc}
              isError={errors.isExactError("MAX_LENGTH_DESC", {
                length: `${DESC_MAX_LENGTH}`,
              })}
              name="card-desc"
              label={"Descripción"}
              placeholder={"Descripción"}
              value={newConfig.description}
            />

            <Divider y={24} />

            <Flex direction="column">
              <Heading as="h5" color={appTheme.colors.text}>
                Limites
              </Heading>

              <Flex justify="space-between" align="center">
                <Text isBold={true}>Tipo de limite</Text>

                <Flex align="center" flex={0} gap={8}>
                  <Label>Transacción</Label>
                  <Switch
                    value={selectedLimit === "daily"}
                    onValueChange={(bool) => {
                      setNewConfig({
                        ...newConfig,
                        limits: [
                          !bool
                            ? {
                                ...defaultTXLimit,
                                amount: newConfig.limits[0].amount,
                              }
                            : {
                                ...defaultDailyLimit,
                                amount: newConfig.limits[0].amount,
                              },
                        ],
                      });
                    }}
                  />
                  <Label>Diario</Label>
                </Flex>
              </Flex>

              <InputGroup>
                <InputWithLabel
                  onChangeText={handleChangeLimit}
                  type="number"
                  name="max-amount"
                  label={"Monto máximo"}
                  placeholder="0"
                  value={(newConfig.limits.length
                    ? roundToDown(Number(newConfig.limits[0].amount) / 1000, 0)
                    : 0
                  ).toString()}
                />

                <InputGroupRight>
                  <Text align="center" size="small">
                    SAT
                  </Text>
                </InputGroupRight>
              </InputGroup>
            </Flex>

            <Flex justify="center">
              <Text color={appTheme.colors.warning}>
                {/* {newConfig.limits.length && Number(newConfig.limits[0].amount) > 0
                ? t(`LIMIT_CARD_PER_${selectedLimit === "tx" ? "TX" : "DAY"}`, {
                    sats: formatAmount(
                      Number(newConfig.limits[0].amount) / 1000
                    ),
                  })
                : t("NO_LIMIT_SET")} */}
                {newConfig.limits.length &&
                Number(newConfig.limits[0].amount) > 0
                  ? `Tu tarjeta tendrá un limite de ${formatAmount(
                      Number(newConfig.limits[0].amount) / 1000
                    )} ${
                      selectedLimit === "tx" ? "en un único pago" : "por día"
                    }`
                  : "No hay limites definidos"}
              </Text>
            </Flex>
          </Flex>
        )}

        <Flex align="center" justify="center">
          <Feedback
            show={errors.errorInfo.visible}
            status={errors.errorInfo.visible ? "error" : undefined}
          >
            {errors.errorInfo.text}
          </Feedback>
        </Flex>

        <Flex justify="center" align="center" gap={8}>
          <Button
            variant="bezeledGray"
            onPress={() => router.push("/settings/cards")}
          >
            <Text>Cancelar</Text>
          </Button>
          <Button onPress={handleSaveConfig}>
            <Text>Guardar</Text>
          </Button>
        </Flex>
      </Container>
    </MainContainer>
  );
};

export default ConfigCardView;
