import { FC, useEffect, useState } from 'react';
import { CircleParking, Coffee } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shadcn/components/ui/table.tsx';
import { Button } from '@/shadcn/components/ui/button.tsx';
import { cn } from '@/shadcn/lib/utils.ts';
import classes from './style.module.css';

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
      500
    );
  };

  const pointAfterChange = points + pointCounter;
  const availableCoffee = Math.floor(pointAfterChange / coffeePrice);
  const sum = pointAfterChange - coffeeCounter * coffeePrice;

  const info = {
    current: points,
    change: pointCounter >= 0 ? '+' + pointCounter : pointCounter,
    availableCoffee,
    coffeeCounter,
    sum,
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    activateHighlight('current');
  }, [info.current]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight('change');
  }, [info.change]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight('availableCoffee');
  }, [info.availableCoffee]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight('coffeeCounter');
  }, [info.coffeeCounter]);

  useEffect(() => {
    if (!hasMounted) return;

    activateHighlight('sum');
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
    <>
      <Table className={'overflow-hidden text-base'}>
        <TableBody>
          <TableRow>
            <TableCell>Сейчас</TableCell>
            <TableCell
              className={cn('w-16', classes.highlight?.toString(), {
                [classes.highlight?.toString() ?? '']: highlight.current,
              })}
            >
              {info.current}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Изменение баллов</TableCell>
            <TableCell
              className={cn('w-16', {
                [classes.highlight?.toString() ?? '']: highlight.change,
              })}
            >
              {info.change}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Кофе (доступно)</TableCell>
            <TableCell
              className={cn('w-16', {
                [classes.highlight?.toString() ?? '']:
                  highlight.availableCoffee,
              })}
            >
              {info.availableCoffee}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Кофе (тратим)</TableCell>
            <TableCell
              className={cn('w-16', {
                [classes.highlight?.toString() ?? '']: highlight.coffeeCounter,
              })}
            >
              {info.coffeeCounter}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Останется</TableCell>
            <TableCell
              className={cn('w-16', {
                [classes.highlight?.toString() ?? '']: highlight.sum,
              })}
            >
              {info.sum}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className={'flex w-full justify-between'}>
        <div className={'flex flex-grow flex-col items-center'}>
          <span className={'text-2xl'}>Баллы</span>
          <div className={'flex justify-center gap-4'}>
            <Button
              disabled={isDecreasePointDisabled}
              onClick={handleDecreasePoints}
              className={'text-xl'}
            >
              <CircleParking /> -
            </Button>
            <Button
              disabled={isIncreasePointDisabled}
              onClick={handleIncreasePoints}
              className={'text-xl'}
            >
              <CircleParking /> +
            </Button>
          </div>
        </div>

        <div className={'flex flex-grow flex-col items-center'}>
          <span className={'text-2xl'}>Кофе</span>
          <div className={'flex justify-center gap-4'}>
            <Button
              disabled={isDecreaseCoffeeDisabled}
              onClick={handleDecreaseCoffee}
              className={'text-xl'}
            >
              <Coffee /> -
            </Button>
            <Button
              disabled={isIncreaseCoffeeDisabled}
              onClick={handleIncreaseCoffee}
              className={'text-xl'}
            >
              <Coffee /> +
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
