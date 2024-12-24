import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  useDeleteUser,
  useGetUserById,
  useUpdateUserPoints,
} from '@/api/users';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { Points } from '@/widgets/cashier/ui/points';
import { Button } from '@/shadcn/components/ui/button.tsx';
import { Trash } from 'lucide-react';
import { RegisterUser } from '@/feature/registerUser';

export const Cashier = () => {
  const { id } = useParams();
  return (
    <div className={'flex justify-around'}>
      <RegisterUser />
      {id && <ManualPointsChange />}
    </div>
  );
};

const COFFEE_PRICE = 5;

const useCoffee = () => {
  const [pointCounter, setPointCounter] = useState(0);
  const [coffeeCounter, setCoffeeCounter] = useState(0);

  return {
    coffeePrice: COFFEE_PRICE,
    coffeeCounter,
    pointCounter,
    setPointCounter,
    setCoffeeCounter,
  };
};

const ManualPointsChange = () => {
  const {
    coffeePrice,
    coffeeCounter,
    pointCounter,
    setPointCounter,
    setCoffeeCounter,
  } = useCoffee();
  const { id: idRaw } = useParams();
  const id = Number(idRaw);
  const { userDetails, setUserDetails } = useGetUserById(id);
  const { updateUserPoints } = useUpdateUserPoints();
  const { deleteUser } = useDeleteUser();

  const handleSubmitWithConfirmation = async () => {
    if (!userDetails) return;

    const confirmed = window.confirm(
      'Вы уверены, что хотите обновить баллы пользователя?'
    );

    if (confirmed) {
      const updatedPoints = userDetails.points + pointCounter;
      await updateUserPoints(id, { points: updatedPoints });
      const pointAfterChange = userDetails.points + pointCounter;
      const sum = pointAfterChange - coffeeCounter * coffeePrice;
      setUserDetails((prev) =>
        prev
          ? {
              ...prev,
              points: sum,
            }
          : prev
      );
      setPointCounter(0);
    }
  };
  const handleDeleteUser = async () => {
    if (!userDetails) return;

    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить пользователя?'
    );

    if (confirmed) {
      await deleteUser(id);
    }
  };

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
    <Card className="w-[450px]">
      <CardHeader>
        <div className={'flex justify-between'}>
          <div>
            <CardTitle>Профиль</CardTitle>
            <CardDescription>
              {capitalizeName(userDetails?.name)}{' '}
              {formatedPhone(userDetails?.phone)}
            </CardDescription>
          </div>
          <div>
            <Button
              size={'icon'}
              variant="destructive"
              onClick={handleDeleteUser}
            >
              <Trash />
            </Button>
          </div>
          {/*<div>*/}
          {/*  <CoffeeCards />*/}
          {/*</div>*/}
        </div>
      </CardHeader>
      <CardContent>
        <Points
          points={userDetails?.points ?? 0}
          coffeePrice={coffeePrice}
          coffeeCounter={coffeeCounter}
          pointCounter={pointCounter}
          setPointCounter={setPointCounter}
          setCoffeeCounter={setCoffeeCounter}
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          onClick={handleSubmitWithConfirmation}
          disabled={pointCounter === 0 && coffeeCounter === 0}
          className={'flex-grow'}
        >
          Обновить баллы
        </Button>
      </CardFooter>
    </Card>
  );
};
