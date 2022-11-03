import { Button, Result } from "components";
import { UI_TEXT } from "helpers/constants";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title={UI_TEXT.SOMETHING_WENT_WRONG.TITLE}
          subTitle={UI_TEXT.SOMETHING_WENT_WRONG.SUB_TITLE}
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              {" "}
              {UI_TEXT.SOMETHING_WENT_WRONG.BUTTON}
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
