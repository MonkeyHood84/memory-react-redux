class OptionsComponent extends React.Component {
  render() {
    return (
      <aside className="col-xs-4 text-right game-options">
      <button className="btn btn-xs btn-success" onClick={() => this.props.onResetGame()}>
        <span className="glyphicon glyphicon-refresh" aria-hidden="true">   </span>  RESTART</button>
     </aside>
    );
  }
};