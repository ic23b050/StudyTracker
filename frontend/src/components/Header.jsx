function Header({ onLogout }) {
  return (
    <div className="header">
      <h1>Study Tracker</h1>
      <p>Organize your learning tasks.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Header;
