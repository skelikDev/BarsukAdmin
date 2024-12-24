import { CoffeeCard } from '@/widgets/cashier/ui/coffee-card';

export const CoffeeCards = () => {
  const point = 7;
  const presentCost = 7;

  const coffeeCount = Math.floor(point / presentCost);
  const remainder = point % presentCost;
  const array =
    remainder === 0
      ? Array.from({ length: coffeeCount + 1 })
      : Array.from({ length: coffeeCount });
  return (
    <div className={'relative h-[80px] w-[150px]'}>
      {array.map((_, index) => {
        return (
          <CoffeeCard
            key={index}
            foreground={index < coffeeCount}
            count={index === coffeeCount - 1 ? remainder : undefined}
            className={`absolute left-0 top-0 w-full origin-bottom-right`}
            style={{
              transform: `translateX(${coffeeCount - index * 5}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
