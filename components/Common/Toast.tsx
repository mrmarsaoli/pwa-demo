import { CSSProperties, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { Spacer } from "./Spacer";

interface ToastProps {
  /**
   * Toast message
   */
  message: string;
  /**
   * Type of toast
   */
  type?: keyof typeof toastTypeMap;
  /**
   * Is toast opened
   */
  open?: boolean;
  /**
   * when toast hide
   */
  timeOut?: number;
  /**
   * Centerize toast to certain element
   */
  wrapper?: string;
  /**
   * Show icon
   */
  icon?: boolean;
  /**
   * Show close button
   */
  closeButton?: boolean;
  /**
   * On click event
   */
  onClick?: () => void;
  /**
   * On close event
   */
  onClose?: () => void;
}

export const Toast = ({
  message,
  type = "success",
  open = false,
  wrapper,
  timeOut = 2000,
  icon = true,
  closeButton = false,
  onClick,
  onClose,
}: ToastProps) => {
  const [show, setShow] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const [wrapperStyle, setWrapperStyle] = useState<CSSProperties>({});
  const [snackbarTimeout, setSnackbarTimeout] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();

  useEffect(() => {
    handleToast();
    autoHideToast();
  }, [open]);

  const handleToast = () => {
    setToastPosition();
    setShow(open);
  };

  const setToastPosition = () => {
    if (!wrapper) {
      setWrapperStyle({});
      setStyle({});
      return;
    }

    const _wrapper = document.getElementById(wrapper);

    if (!_wrapper) {
      setWrapperStyle({});
      setStyle({});
      return;
    }

    const left = _wrapper.offsetLeft;
    const top = _wrapper.offsetTop;
    const width = _wrapper.offsetWidth;
    const height = _wrapper.offsetHeight;

    setWrapperStyle({
      position: "fixed",
      left,
      top: top + height,
      width,
    });

    setStyle({
      position: "absolute",
    });
  };

  const autoHideToast = () => {
    if (snackbarTimeout) {
      clearTimeout(snackbarTimeout);
    }

    setSnackbarTimeout(
      setTimeout(() => {
        handleClose();
      }, timeOut)
    );
  };

  const renderCloseButton = () => {
    return <Icon name="x-outline" size="lg" onClick={() => handleClose()} />;
  };

  const handleClose = () => {
    if (!onClose) {
      return;
    }

    onClose();
  };

  const handleOnClick = () => {
    if (!onClick) {
      return;
    }

    onClick();
  };

  return (
    <div style={wrapperStyle}>
      <div
        onClick={() => handleOnClick()}
        role={!!onClick ? "button" : undefined}
        aria-label="toast"
        data-testid="toast_component"
        className={`flex flex-col leading-normal bottom-4 rounded-md px-4 py-4 md:py-5 w-margined-full-width md:max-w-4xl fixed left-1/2 -translate-x-1/2 transform transition-all ${
          show ? "opacity-100 z-50" : "opacity-0 -z-50"
        } ${toastTypeMap[type]}`}
        style={style}
      >
        <div className={`flex items-center`}>
          {icon && (
            <>
              <ToastIcon type={type}></ToastIcon>
              <div className="w-2.5"></div>
            </>
          )}
          <p className="text-sm">{message}</p>
          {closeButton && (
            <>
              <Spacer></Spacer>
              <div className="w-2.5"></div>
              {renderCloseButton()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ToastIcon = ({ type }: { type: keyof typeof toastTypeMap }) => {
  const renderIcon = () => {
    if (type === "success") {
      return (
        <div className="flex justify-center items-center w-8 h-8 bg-green-500 rounded-lg">
          <Icon name="check-outline" color="#FFFFFF" size="lg" />
        </div>
      );
    }

    if (type === "error") {
      return (
        <div className="flex justify-center items-center w-8 h-8 bg-red-600 rounded-lg">
          <Icon name="bell-outline" color="#FFFFFF" size="lg" />
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center w-8 h-8 bg-blue-700 rounded-lg">
        <Icon name="information-circle-outline" color="#FFFFFF" size="lg" />
      </div>
    );
  };

  return (
    <div className="flex-shrink-0 h-5 flex items-center">{renderIcon()}</div>
  );
};

const toastTypeMap = {
  success:
    "bg-green-50 text-green-600 border border-green-200 rounded-md drop-shadow-md",
  error:
    "bg-red-50 text-red-500 border border-red-200 rounded-md drop-shadow-md",
  information:
    "bg-blue-100 text-blue-700 border border-blue-300 rounded-md drop-shadow-md",
};
