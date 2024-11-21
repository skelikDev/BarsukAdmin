import { UserDetailsResponse } from "../../../../api/type.ts";
import { FC, useEffect, useState } from "react";
import { userApi } from "../../../../api/user";
import styled from "styled-components";
import { Button } from "../../../../shared/ui/button";
import { Points } from "./ui/points.tsx";
import { theme } from "../../../../app/theme";

type UserProfileProps = {
  id: string;
};

const COFFEE_PRICE = 5;

const useCoffee = () => {
  // TODO спустить на уровень ниже в компонент Points
  const [pointCounter, setPointCounter] = useState(0);
  // TODO спустить на уровень ниже в компонент Points
  const [coffeeCounter, setCoffeeCounter] = useState(0);

  return {
    coffeePrice: COFFEE_PRICE,
    coffeeCounter,
    pointCounter,
    setPointCounter,
    setCoffeeCounter,
  };
};

export const UserProfile: FC<UserProfileProps> = ({ id }) => {
  const [userDetails, setUserDetails] = useState<UserDetailsResponse | null>(
    null,
  );
  const {
    coffeePrice,
    coffeeCounter,
    pointCounter,
    setPointCounter,
    setCoffeeCounter,
  } = useCoffee();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const data = await userApi.getUserDetails(id);
      setUserDetails(data);
    } catch (err) {
      console.log(err);
      setError("Не удалось загрузить данные пользователя. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleSubmitWithConfirmation = async () => {
    if (!userDetails) return;

    const confirmed = window.confirm(
      "Вы уверены, что хотите обновить баллы пользователя?",
    );
    if (confirmed) {
      setIsLoading(true);
      const updatedPoints = userDetails.points + pointCounter;
      await userApi.updateUserPoints(id, { points: updatedPoints });
      const pointAfterChange = userDetails.points + pointCounter;
      const sum = pointAfterChange - coffeeCounter * coffeePrice;
      setUserDetails((prev) =>
        prev
          ? {
              ...prev,
              points: sum,
            }
          : prev,
      );
      setIsLoading(false);
      setPointCounter(0);
    }
  };

  // const { name, phone, points } = userDetails;
  const capitalizeName = (name?: string) => {
    if (!name) {
      return name;
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const formatedPhone = (phone?: string) => {
    if (!phone) {
      return phone;
    }
    return `+${phone.slice(0, 1)}(${phone.slice(1, 4)})${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
  };
  return (
    <Wrapper>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <UserInfo>
            <h6 className="user-name">
              Имя: {capitalizeName(userDetails?.name)}
            </h6>
            <h6 className="user-phone">
              Телефон: {formatedPhone(userDetails?.phone)}
            </h6>
          </UserInfo>
          <Points
            points={userDetails?.points ?? 0}
            coffeePrice={coffeePrice}
            coffeeCounter={coffeeCounter}
            pointCounter={pointCounter}
            setPointCounter={setPointCounter}
            setCoffeeCounter={setCoffeeCounter}
          />
          <ChangePointsButton
            onClick={handleSubmitWithConfirmation}
            disabled={pointCounter === 0}
          >
            Обновить баллы
          </ChangePointsButton>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 30px;
  border-radius: 12px;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.border.main};
  background-color: ${theme.colors.background.main};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  .user-name,
  .user-phone {
    color: ${theme.colors.text.secondary};
  }
`;

const ChangePointsButton = styled(Button)`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: ${theme.colors.interactive.main};
  color: #ffffff;

  &:hover {
    background-color: ${theme.colors.interactive.hover};
  }

  &:disabled {
    background-color: ${theme.colors.background.hover};
    color: ${theme.colors.text.secondary};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error.main};
  ${theme.typography.caption};
  text-align: center;
`;
