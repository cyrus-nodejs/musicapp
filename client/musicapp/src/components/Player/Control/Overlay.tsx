import { RefAttributes } from "react";
import { Tooltip, TooltipProps } from "react-bootstrap";
import { JSX } from "react/jsx-runtime";
export const ShuffleTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Shuffle
    </Tooltip>
  );

  export const RepeatTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Repeat
    </Tooltip>
  );

  export const NextTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Next
    </Tooltip>
  );

  export const PrevTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Previous
    </Tooltip>
  );

  export const ForwardTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Forward
    </Tooltip>
  );

  export const BackwardTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Backward
    </Tooltip>
  );

  export const PlayTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Play 
    </Tooltip>
  );

  export const PauseTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Pause
    </Tooltip>
  );

  export const MuteTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Mute
    </Tooltip>
  );

  export const LowVolumeTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Vol Low
    </Tooltip>
  );

  export const HighVolumeTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
      Vol High
    </Tooltip>
  );