import React from "react";
import { Segment, Icon } from "semantic-ui-react";

export default class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error !== null) {
      return (
        <Segment color="red">
          <Icon name="bug" circular />
          {error.toString()}
        </Segment>
      );
    }

    return children;
  }
}
