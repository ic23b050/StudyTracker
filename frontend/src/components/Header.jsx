function Header({ onLogout, userName }) {
  return (
    <div className="header">
      <h1>Study Tracker</h1>
      <p>Organize your learning tasks.</p>
      {userName && <p>Logged in as {userName}</p>}
      {userName && <button onClick={onLogout}>Logout</button>}
    </div>
  );
}

export default Header;
