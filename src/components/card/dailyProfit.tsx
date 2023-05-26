// Chakra imports
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { Image } from "components/image/Image";

export default function DailyProfit(props: {
  image: string;
  name: string;
  range: string;
  minDeposit: number;
  timeLock: number;
  dailyPercent: number;
  onSetPercent: () => void;
}) {
  const {
    image,
    name,
    range,
    minDeposit,
    timeLock,
    dailyPercent,
    onSetPercent,
  } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <AspectRatio ratio={7 / 5}>
            <Image src={image} w={"100%"} borderRadius="20px" alt="" />
          </AspectRatio>
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb="auto"
          >
            <Flex direction="column">
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb="10px"
                fontWeight="bold"
                me="14px"
              >
                {name}
              </Text>
              <Text
                color={textColor}
                fontSize="sm"
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                Return: {range}
              </Text>
              <Text
                color={textColor}
                fontSize="sm"
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                Min deposit: {minDeposit} $
              </Text>
              <Text
                color={textColor}
                fontSize="sm"
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                Time lock: {timeLock} month{timeLock === 1 ? "" : "s"}
              </Text>
            </Flex>
          </Flex>
          <Flex flex={1} />
          <Flex
            align={{
              base: "center",
              md: "center",
              "2xl": "center",
            }}
            justify="space-between"
            direction={{
              base: "column",
              sm: "row",
              md: "row",
              xl: "column",
            }}
            my="25px"
          >
            <Text fontWeight="700" fontSize="sm" color={textColorBid}>
              Daily percent: {dailyPercent} %
            </Text>
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              onClick={onSetPercent}
            >
              Set daily profit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
