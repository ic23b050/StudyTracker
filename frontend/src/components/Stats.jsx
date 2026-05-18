function Stats({ total, completed, open }) {
  return (
    <div className="stats">
      <div className="card">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="card">
        <h3>Open</h3>
        <p>{open}</p>
      </div>
    </div>
  );
}

export default Stats;
