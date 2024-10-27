import { FC, InputHTMLAttributes, useEffect, useRef } from 'react';
import IMask, { MaskedOptions } from 'imask';

export type MaskedInputProps = InputHTMLAttributes<HTMLInputElement> & {
    maskOptions: MaskedOptions;
}

export const MaskedInput: FC<MaskedInputProps> = (props) => {
    const {maskOptions, onChange, ...otherProps} = props;
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            const mask = IMask(inputRef.current, maskOptions);

            mask.on('accept', () => {
                if (inputRef.current && 'dispatchEvent' in inputRef.current) {
                    const event = new Event('input', {bubbles: true});
                    inputRef.current.dispatchEvent(event);
                }
            });

            return () => {
                mask.destroy();
            };
        }
    }, [maskOptions]);

    return <input ref={inputRef} onChange={onChange} {...otherProps} />;
};