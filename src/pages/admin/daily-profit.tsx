import {
  Box,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import DailyProfit from "components/card/dailyProfit";
import AdminLayout from "layouts/admin";
import Nft1 from "img/nfts/Nft1.png";
import Nft2 from "img/nfts/Nft2.png";
import Nft3 from "img/nfts/Nft3.png";
import Nft4 from "img/nfts/Nft4.png";
import useDailyProfit from "hooks/usePlans";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useApi from "hooks/useApi";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SetDailyProfit() {
  const { plans, mutate } = useDailyProfit();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setProfitPercent } = useApi();
  const [selectedPlanId, setSelectedPlanId] = useState("");

  const schema = yup.object().shape({
    profitPercent: yup.string().required("Please enter a new profit percent"),
  });

  const onSubmit = async (data: any) => {
    await setProfitPercent({
      planId: selectedPlanId,
      percent: data.profitPercent,
    });
    reset();
    onClose();
    mutate();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getImage = (planId: string | number) => {
    switch (planId) {
      case 1:
        return Nft1;
      case 2:
        return Nft2;
      case 3:
        return Nft3;
      case 4:
        return Nft4;
    }
  };

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ base: 1, md: 2, xl: 4 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          {plans?.map((plan: any) => (
            <DailyProfit
              key={plan.id}
              name={plan.plan}
              image={getImage(plan.id)}
              range={`${plan.minReturn}% - ${plan.maxReturn}%`}
              minDeposit={plan.minDeposit}
              timeLock={plan.timeLock}
              dailyPercent={plan.dailyPercent}
              onSetPercent={() => {
                setSelectedPlanId(plan.id);
                onOpen();
              }}
            />
          ))}
        </SimpleGrid>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            reset();
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Set profit percent</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form>
                <FormControl isInvalid={!!errors.profitPercent}>
                  <Input
                    mb="16px"
                    type="number"
                    id="profitPercent"
                    placeholder="Please enter new percent"
                    {...register("profitPercent")}
                  />
                  {errors.profitPercent && (
                    <FormErrorMessage>
                      {errors.profitPercent?.message?.toString()}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Close
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                colorScheme="brand"
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </AdminLayout>
  );
}
