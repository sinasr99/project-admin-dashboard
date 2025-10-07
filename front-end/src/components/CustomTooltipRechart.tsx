import {FC} from "react";

type CustomTooltipProps = {
    active?: boolean;
    payload?: any[];
    label?: string;
    tooltipKey: string,
    afterValue: string
}

const CustomTooltipRechart: FC<CustomTooltipProps> = ({afterValue, tooltipKey, payload, label, active}) => {
    if (!label || !active || !payload || !payload.length) return null;
    const customLabel = `${label.slice(0, 3)} ${label.slice(3, label.length)}`

    return (
        <div
            className={`p-2 text-xs xs:text-base shadow-md dark:text-white rounded-md bg-white dark:bg-zinc-700`}
        >
            <p className="font-bold mb-1">{customLabel}</p>
            {payload.map((entry, index) => (
                <p key={index}>
                    {tooltipKey} : {entry.value} {afterValue}
                </p>
            ))}
        </div>
    );
}

export default CustomTooltipRechart