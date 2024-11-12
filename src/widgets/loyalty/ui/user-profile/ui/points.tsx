import { Button } from "../../../../../shared/ui/button";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../../../app/theme";
import { Coffee } from "lucide-react";

type PointsProps = {
  points: number;
  coffeePrice: number;
  coffeeCounter: number;
  pointCounter: number;
  setPointCounter: (value: number) => void;
  setCoffeeCounter: (value: number) => void;
};

const useCoffee = ({
  points,
  coffeePrice,
  coffeeCounter,
  pointCounter,
  setPointCounter,
  setCoffeeCounter,
}: PointsProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [highlight, setHighlight] = useState({
    current: false,
    change: false,
    availableCoffee: false,
    coffeeCounter: false,
    sum: false,
  });

  const activateHighlight = (field: keyof typeof highlight) => {
    setHighlight((prev) => ({ ...prev, [field]: true }));
    setTimeout(
      () =>
        setHighlight((prev) => ({
          ...prev,
          [field]: false,
        })),
      500,
    );
  };

  const pointAfterChange = points + pointCounter;
  const availableCoffee = Math.floor(pointAfterChange / coffeePrice);
  const sum = pointAfterChange - coffeeCounter * coffeePrice;

  const info = {
    current: points,
    change: pointCounter >= 0 ? "+" + pointCounter : pointCounter,
    availableCoffee,
    coffeeCounter,
    sum,
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    activateHighlight("current");
  }, [info.current]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight("change");
  }, [info.change]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight("availableCoffee");
  }, [info.availableCoffee]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight("coffeeCounter");
  }, [info.coffeeCounter]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight("sum");
  }, [info.sum]);

  const isDecreasePointDisabled = sum <= 0;
  const isIncreasePointDisabled = false;
  const isDecreaseCoffeeDisabled = coffeeCounter <= 0;
  const isIncreaseCoffeeDisabled = coffeeCounter >= availableCoffee;

  const handleDecreasePoints = () => {
    setPointCounter(pointCounter - 1);
  };
  const handleIncreasePoints = () => {
    setPointCounter(pointCounter + 1);
  };
  const handleDecreaseCoffee = () => {
    setCoffeeCounter(coffeeCounter - 1);
  };
  const handleIncreaseCoffee = () => {
    setCoffeeCounter(coffeeCounter + 1);
  };

  return {
    info,
    isDecreasePointDisabled,
    isIncreasePointDisabled,
    isDecreaseCoffeeDisabled,
    isIncreaseCoffeeDisabled,
    handleDecreasePoints,
    handleIncreasePoints,
    handleDecreaseCoffee,
    handleIncreaseCoffee,
    highlight,
  };
};

export const Points: FC<PointsProps> = ({
  points,
  coffeePrice,
  coffeeCounter,
  pointCounter,
  setPointCounter,
  setCoffeeCounter,
}) => {
  const pointsStatus = pointCounter > 0 ? "+" : pointCounter < 0 ? "-" : "0";
  const {
    info,
    isDecreasePointDisabled,
    isIncreasePointDisabled,
    isDecreaseCoffeeDisabled,
    isIncreaseCoffeeDisabled,
    handleDecreasePoints,
    handleIncreasePoints,
    handleDecreaseCoffee,
    handleIncreaseCoffee,
    highlight,
  } = useCoffee({
    points,
    coffeePrice,
    coffeeCounter,
    pointCounter,
    setPointCounter,
    setCoffeeCounter,
  });

  return (
    <PointSection $status={pointsStatus}>
      <PointsWrapper>
        <div
          className={`grid-item current ${highlight.current ? "highlight" : ""}`}
        >
          <div className={"grid-title"}>Сейчас</div>
          <div className={"grid-value"}>{info.current}</div>
        </div>
        <div
          className={`grid-item change ${highlight.change ? "highlight" : ""}`}
        >
          <div className={"grid-title"}>
            Сколько добавляем или убираем баллов
          </div>
          <div className={"grid-value"}>{info.change}</div>
        </div>
        <div
          className={`grid-item coffee ${highlight.availableCoffee ? "highlight" : ""}`}
        >
          <div className={"grid-title"}>Кофе (доступно)</div>
          <div className={"grid-value"}>{info.availableCoffee}</div>
        </div>
        <div
          className={`grid-item coffee-spent ${highlight.coffeeCounter ? "highlight" : ""}`}
        >
          <div className={"grid-title"}>Кофе (тратим)</div>
          <div className={"grid-value"}>{info.coffeeCounter}</div>
        </div>
        <div className={`grid-item sum ${highlight.sum ? "highlight" : ""}`}>
          <div className={"grid-title"}>Останется</div>
          <div className={"grid-value"}>{info.sum}</div>
        </div>
      </PointsWrapper>
      <ButtonGroup>
        <StyledButton
          disabled={isDecreasePointDisabled}
          onClick={handleDecreasePoints}
        >
          -
        </StyledButton>
        <StyledButton
          disabled={isIncreasePointDisabled}
          onClick={handleIncreasePoints}
        >
          +
        </StyledButton>

        <StyledButton
          disabled={isDecreaseCoffeeDisabled}
          onClick={handleDecreaseCoffee}
        >
          - <Coffee />
        </StyledButton>
        <StyledButton
          disabled={isIncreaseCoffeeDisabled}
          onClick={handleIncreaseCoffee}
        >
          + <Coffee />
        </StyledButton>
      </ButtonGroup>
    </PointSection>
  );
};

const PointSection = styled.div<{ $status: "-" | "0" | "+" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: ${theme.colors.background.secondary};
  width: 450px;
`;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  width: 100%;

  .grid-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${theme.colors.border.hover};

    .grid-title {
      ${theme.typography.h5}
    }

    .grid-value {
      ${theme.typography.h3}
    }
  }

  .current {
  }

  .change {
  }

  .coffee {
  }

  .coffee-pent {
  }

  .sum {
  }

  /* Класс для анимации */

  .highlight {
    .grid-value {
      animation: highlight-animation 300ms ease-in-out;
    }
  }

  /* Определяем анимацию подсветки */
  @keyframes highlight-animation {
    0% {
      color: ${theme.colors.success.main};
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
      color: ${theme.colors.text.main};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  width: 50px;
  height: 50px;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.interactive.hover};
  }
`;
