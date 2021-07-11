import "./CallIcon.scss";
import classNames from "classnames";

type CallIconProps = {
  disabled?: boolean;
  incoming?: boolean;
  voicemail?: boolean;
};

const defaultProps: CallIconProps = {
    disabled: false,
    incoming: true,
    voicemail: false
}
/**
 * Call icon
 */
const CallIcon = ({ disabled, incoming, voicemail }: CallIconProps) => {

  return (
    <div className="phappy-call-icon">
      <i
        className={classNames("icon fas has-text-primary", {
          "disabled has-text-grey-lighter": disabled,
          "fa-phone-square-alt": !voicemail,
          "fa-voicemail": voicemail,
        })}
      ></i>
      <i
        className={classNames("icon fas has-text-grey", {
          "disabled has-text-grey-lighter": disabled,
          "fa-arrow-down": !voicemail,
          "fa-arrow-up": !incoming && !voicemail,
        })}
      ></i>
    </div>
  );
};

CallIcon.defaultProps = defaultProps;

export default CallIcon;
