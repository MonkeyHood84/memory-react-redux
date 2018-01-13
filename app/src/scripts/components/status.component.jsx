class StatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.status !== "COMPLETED") {
      return null;
    }
    return (
      <div>
        <h2>Congratulations!</h2>
      </div>
    );
  }
};