import * as React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shadcn/components/ui/command.tsx';
import { cn } from '@/shadcn/lib/utils.ts';
import { CommandLoading } from '@/shadcn/components/cmdk';
import { Card } from '@/shadcn/components/ui/card.tsx';
import { ScrollArea } from '@/shadcn/components/ui/scroll-area.tsx';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ComboboxItem =
  | { id: string | number; el: ReactNode }
  | { href: string; label: string };

type TInputComboboxProps = {
  className?: string;
  inputProps: React.ComponentProps<typeof CommandInput>;
  isLoading?: boolean;
  isLoadingText?: string;
  emptyText?: string;
  items: ComboboxItem[];
  onSelect?: (value: string) => void;
};

export const InputCombobox: FC<TInputComboboxProps> = ({
  className,
  inputProps,
  isLoading,
  isLoadingText = 'Loading...',
  emptyText = 'No items found',
  items,
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const isShouldShow = !isLoading || items.length !== 0;

  return (
    <div className={cn('relative flex h-full w-full flex-col', className)}>
      <Command shouldFilter={false}>
        <CommandInput
          {...inputProps}
          placeholder={'Поиск'}
          onFocus={(event) => {
            console.log('focus');
            setOpen(true);
            if (inputProps.onFocus) {
              inputProps.onFocus(event);
            }
          }}
          onBlur={(event) => {
            console.log('blur');
            setOpen(false);
            if (inputProps.onBlur) {
              inputProps.onBlur(event);
            }
          }}
        />
        <Card
          className={cn(
            'absolute top-[calc(100%_+_4px)] z-40 w-full overflow-hidden transition-all duration-300 ease-in-out',
            'data-[state=closed]:p-0 data-[state=open]:p-4',
            'data-[state=open]:border-1 data-[state=closed]:border-0',
            'data-[state=open]:translate-x[0] data-[state=closed]:-translate-x[100%]',
            'data-[state=closed]:scale-y-150 data-[state=open]:scale-y-100',
            'data-[state=closed]:blur data-[state=open]:blur-none',
            'data-[state=closed]:h-0 data-[state=open]:h-[132px]',
            { 'h-[40px]': isShouldShow }
          )}
          data-state={open ? 'open' : 'closed'}
        >
          <ScrollArea className={'h-[100px]'}>
            <CommandList>
              {isLoading && <CommandLoading>{isLoadingText}</CommandLoading>}
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  if ('id' in item) {
                    console.log(item);
                    return (
                      <CommandItem
                        onSelect={onSelect}
                        key={item.id}
                        value={item.id.toString()}
                      >
                        {item.el}
                      </CommandItem>
                    );
                  }
                  return (
                    <Link to={item.href} key={'id'}>
                      {item.label}
                    </Link>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Card>
      </Command>
    </div>
  );
};
